// Veri deposu: görevleri tasks.json dosyasında saklar ve okur
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'tasks.json');

// Dosyadaki tüm görevleri dizi olarak döndürür
const readTasks = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    // Dosya yoksa boş liste ile başla
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

// Görev listesini dosyaya yazar
const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Yeni görev için bir sonraki id'yi üretir (mevcut en büyük id + 1)
const getNextId = (tasks) => {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((task) => task.id)) + 1;
};

module.exports = { readTasks, writeTasks, getNextId };
