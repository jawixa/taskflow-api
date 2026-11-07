# TASKFLOW - Görev ve Proje Yönetim Sistemi API

🇬🇧 [English version](README.en.md)

Node.js ve Express.js ile geliştirilmiş, ekip içi görevlerin oluşturulmasını, çalışanlara atanmasını, durum ve öncelik takibini sağlayan bir REST API'dir. Node.js ile Backend Programlama eğitimi bitirme projesi olarak hazırlanmıştır.

## Özellikler

- Görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme (CRUD)
- Görevlere çalışan atama (`assignee`), durum (`status`) ve öncelik (`priority`) yönetimi
- Tüm istekleri kaydeden Logger middleware (konsol + `logs/requests.log`)
- Veriler JSON dosyasında saklanır, veritabanı kurulumu gerekmez
- Uygun HTTP durum kodları (200, 201, 400, 404, 500)

## Gereksinimler

- [Node.js](https://nodejs.org/) 18 veya üzeri (npm ile birlikte gelir)
- [Postman](https://www.postman.com/downloads/) (testler için)
- Git

## Kurulum

```bash
# 1. Projeyi indirin
git clone https://github.com/jawixa/backend_proje.git
cd taskflow-api

# 2. Bağımlılıkları kurun
npm install

# 3. Sunucuyu başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. Farklı bir port için:

```bash
PORT=4000 npm start          # macOS / Linux
$env:PORT=4000; npm start    # Windows PowerShell
```

Geliştirme sırasında dosya değişikliklerinde otomatik yeniden başlatma için `npm run dev` kullanabilirsiniz.

Sunucu çalışıyorsa `http://localhost:3000` adresi şu yanıtı verir:

```json
{ "name": "TASKFLOW API", "message": "Görev ve Proje Yönetim Sistemi API çalışıyor", "version": "1.0.0" }
```

## API Endpoint'leri

| Method | Endpoint | Açıklama | Başarılı kod |
|---|---|---|---|
| POST | `/tasks` | Yeni görev ekler | 201 |
| GET | `/tasks` | Tüm görevleri listeler | 200 |
| GET | `/tasks/:id` | Tek bir görevin detayını getirir | 200 |
| PUT | `/tasks/:id` | Görevi günceller (gönderilen alanlar değişir) | 200 |
| DELETE | `/tasks/:id` | Görevi siler | 200 |

### Görev modeli

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | number | Otomatik artan benzersiz numara |
| `title` | string | Görev başlığı (**zorunlu**) |
| `description` | string | Açıklama (varsayılan: boş) |
| `status` | string | `pending`, `in-progress`, `completed` (varsayılan: `pending`) |
| `priority` | string | `low`, `medium`, `high` (varsayılan: `medium`) |
| `assignee` | string | Görevin atandığı kişi (varsayılan: `null`) |
| `createdAt` | ISO tarih | Oluşturulma zamanı |
| `updatedAt` | ISO tarih | Son güncelleme zamanı |

### Örnek istek ve yanıt

`POST /tasks`

```json
{
  "title": "Login endpoint'ini yaz",
  "description": "Kullanıcı giriş akışı için endpoint hazırlanacak",
  "priority": "high",
  "assignee": "musa"
}
```

Yanıt (`201 Created`):

```json
{
  "id": 1,
  "title": "Login endpoint'ini yaz",
  "description": "Kullanıcı giriş akışı için endpoint hazırlanacak",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "createdAt": "2026-11-07T18:03:35.052Z",
  "updatedAt": "2026-11-07T18:03:35.052Z"
}
```

### Hata yanıtları

| Kod | Ne zaman? | Örnek |
|---|---|---|
| 400 | `title` eksik, geçersiz `status`/`priority`, geçersiz id veya bozuk JSON | `{ "message": "title alanı zorunludur" }` |
| 404 | Görev veya endpoint bulunamadı | `{ "message": "Görev bulunamadı" }` |
| 500 | Beklenmeyen sunucu hatası | `{ "message": "Sunucu hatası" }` |

## Logger

Her istek için zaman damgası, HTTP metodu, endpoint, durum kodu ve süre kaydedilir. Kayıtlar hem konsola hem `logs/requests.log` dosyasına yazılır:

```
[2026-11-07T18:03:35.058Z] POST /tasks - 201 (12ms)
[2026-11-07T18:03:35.083Z] GET /tasks - 200 (2ms)
```

## Klasör Yapısı

```
taskflow-api/
├── src/
│   ├── app.js                    # Uygulamanın giriş noktası
│   ├── routes/taskRoutes.js      # Görev rotaları
│   ├── controllers/taskController.js  # CRUD iş mantığı
│   ├── middleware/logger.js      # Logger middleware
│   └── data/
│       ├── taskStore.js          # JSON dosyası okuma/yazma
│       └── tasks.json            # Görev verileri
├── docs/
│   ├── PROJE_TANITIM.md          # Proje tanıtım dokümanı
│   ├── POSTMAN_TEST_REHBERI.md   # Test adımları
│   ├── TASKFLOW.postman_collection.json  # Postman koleksiyonu
│   └── screenshots/              # Postman ekran görüntüleri
├── package.json
└── README.md / README.en.md
```

## Postman ile Test

1. Postman'de **Import** ile `docs/TASKFLOW.postman_collection.json` dosyasını içe aktarın.
2. Sunucunun çalıştığından emin olun (`npm start`).
3. Koleksiyonu sırayla çalıştırın. Detaylı adımlar için [docs/POSTMAN_TEST_REHBERI.md](docs/POSTMAN_TEST_REHBERI.md) dosyasına bakın.

## Dokümanlar

- [Proje Tanıtım Dokümanı](docs/PROJE_TANITIM.md)
- [Postman Test Rehberi](docs/POSTMAN_TEST_REHBERI.md)
