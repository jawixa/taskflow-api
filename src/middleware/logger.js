// Logger middleware: API'ye gelen her isteği kayıt altına alır
// Kaydedilen bilgiler: zaman damgası, HTTP metodu, endpoint (+ durum kodu ve süre)
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'requests.log');

// logs klasörü yoksa oluştur
fs.mkdirSync(LOG_DIR, { recursive: true });

const logger = (req, res, next) => {
  const startTime = Date.now();

  // Yanıt gönderildikten sonra durum kodu ve süre de loglanır
  res.on('finish', () => {
    const timestamp = new Date().toISOString();
    const duration = Date.now() - startTime;
    const line = `[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`;

    // Konsola yaz
    console.log(line);

    // Log dosyasına ekle (hata olursa uygulamayı durdurma)
    fs.appendFile(LOG_FILE, line + '\n', (err) => {
      if (err) console.error('Log dosyasına yazılamadı:', err.message);
    });
  });

  next();
};

module.exports = logger;
