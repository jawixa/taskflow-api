// TASKFLOW API - Uygulamanın giriş noktası
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Tüm istekleri kaydeden global logger (diğer middleware'lerden önce gelmeli)
app.use(logger);

// Gelen JSON gövdelerini (body) okuyabilmek için
app.use(express.json());

// Kök endpoint: API'nin ayakta olduğunu kontrol etmek için
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'TASKFLOW API',
    message: 'Görev ve Proje Yönetim Sistemi API çalışıyor',
    version: '1.0.0'
  });
});

// Görev rotaları: /tasks altında toplanır
app.use('/tasks', taskRoutes);

// Tanımsız bir endpoint çağrıldığında 404 döndür
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint bulunamadı' });
});

// Beklenmeyen hataları yakalayan genel hata yöneticisi
app.use((err, req, res, next) => {
  // Geçersiz JSON gönderildiğinde 400 döndür
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Geçersiz JSON formatı' });
  }
  console.error(err);
  res.status(500).json({ message: 'Sunucu hatası' });
});

app.listen(PORT, () => {
  console.log(`TASKFLOW API http://localhost:${PORT} adresinde çalışıyor`);
});

module.exports = app;
