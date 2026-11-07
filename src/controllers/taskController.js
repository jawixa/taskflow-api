// Görev controller'ı: CRUD iş mantığı burada
const { readTasks, writeTasks, getNextId } = require('../data/taskStore');

// Geçerli durum ve öncelik değerleri
const VALID_STATUSES = ['pending', 'in-progress', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

// URL'den gelen id'yi sayıya çevirir; geçersizse null döner
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// status ve priority alanlarını kontrol eder; hata varsa mesaj döner
const checkEnums = ({ status, priority }) => {
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return `status şunlardan biri olmalıdır: ${VALID_STATUSES.join(', ')}`;
  }
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return `priority şunlardan biri olmalıdır: ${VALID_PRIORITIES.join(', ')}`;
  }
  return null;
};

// POST /tasks -> yeni görev ekle
exports.createTask = (req, res) => {
  const { title, description, status, priority, assignee } = req.body || {};

  // title zorunlu ve boş olmayan bir metin olmalı
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ message: 'title alanı zorunludur' });
  }

  const enumError = checkEnums({ status, priority });
  if (enumError) {
    return res.status(400).json({ message: enumError });
  }

  const tasks = readTasks();
  const now = new Date().toISOString();

  const newTask = {
    id: getNextId(tasks),
    title: title.trim(),
    description: description || '',
    status: status || 'pending',
    priority: priority || 'medium',
    assignee: assignee || null,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
};

// GET /tasks -> tüm görevleri listele
exports.getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.status(200).json({ count: tasks.length, tasks });
};

// GET /tasks/:id -> tek bir görevin detayı
exports.getTaskById = (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Geçersiz görev id' });
  }

  const task = readTasks().find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  res.status(200).json(task);
};

// PUT /tasks/:id -> görevi güncelle (gönderilen alanlar değişir)
exports.updateTask = (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Geçersiz görev id' });
  }

  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  const { title, description, status, priority, assignee } = req.body || {};

  // title gönderildiyse boş olmamalı
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ message: 'title boş olamaz' });
  }

  const enumError = checkEnums({ status, priority });
  if (enumError) {
    return res.status(400).json({ message: enumError });
  }

  const current = tasks[index];
  const updatedTask = {
    ...current,
    title: title !== undefined ? title.trim() : current.title,
    description: description !== undefined ? description : current.description,
    status: status !== undefined ? status : current.status,
    priority: priority !== undefined ? priority : current.priority,
    assignee: assignee !== undefined ? assignee : current.assignee,
    updatedAt: new Date().toISOString()
  };

  tasks[index] = updatedTask;
  writeTasks(tasks);

  res.status(200).json(updatedTask);
};

// DELETE /tasks/:id -> görevi sil
exports.deleteTask = (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Geçersiz görev id' });
  }

  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  const [deletedTask] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ message: 'Görev silindi', task: deletedTask });
};
