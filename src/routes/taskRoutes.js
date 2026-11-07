// Görev (task) rotaları: hangi endpoint hangi controller fonksiyonunu çalıştırır
const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/', taskController.createTask);      // POST   /tasks      -> görev ekle
router.get('/', taskController.getAllTasks);      // GET    /tasks      -> tüm görevleri listele
router.get('/:id', taskController.getTaskById);   // GET    /tasks/:id  -> görev detayı
router.put('/:id', taskController.updateTask);    // PUT    /tasks/:id  -> görevi güncelle
router.delete('/:id', taskController.deleteTask); // DELETE /tasks/:id  -> görevi sil

module.exports = router;
