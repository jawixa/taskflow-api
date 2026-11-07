# TASKFLOW - Proje Tanıtım Dokümanı

**Proje:** Görev ve Proje Yönetim Sistemi API
**Eğitim:** Node.js ile Backend Programlama - Bitirme Projesi (2026)
**Teknolojiler:** Node.js, Express.js, REST API, JSON

## 1. Projenin Amacı

TASKFLOW, bir yazılım şirketinin ekip içindeki görevleri ve çalışanların sorumluluklarını tek bir merkezden takip edebilmesi için geliştirilmiş bir REST API'dir. Proje, eğitim boyunca edinilen Node.js temelleri, Express.js ile sunucu geliştirme, routing, middleware, CRUD operasyonları ve JSON ile veri yönetimi becerilerini uygulamalı olarak göstermeyi amaçlar.

## 2. Senaryo

Bir yazılım ekibinde görevler dağınık şekilde takip edilmektedir. Hangi görevin kime atandığı, ne durumda olduğu ve ne kadar öncelikli olduğu belirsizdir. TASKFLOW ile ekip lideri veya bir arayüz uygulaması API üzerinden:

- yeni bir görev oluşturabilir (ör. "Login endpoint'ini yaz"),
- görevi bir çalışana atayabilir (`assignee`),
- görevin ilerleyişini takip edebilir (`pending` → `in-progress` → `completed`),
- görevi önceliklendirebilir (`low`, `medium`, `high`),
- görevleri listeleyebilir, detayını görebilir, güncelleyebilir veya silebilir.

Bu API ileride bir web arayüzüne veya mobil uygulamaya bağlanabilecek şekilde tasarlanmıştır.

## 3. Sistem Özellikleri

- **Görev yönetimi (CRUD):** Ekleme, listeleme, detay, güncelleme, silme
- **Atama ve takip:** Her görevde çalışan, durum ve öncelik bilgisi
- **Logger middleware:** Tüm isteklerin zaman damgası, metodu, endpoint'i, durum kodu ve süresi konsola ve `logs/requests.log` dosyasına kaydedilir
- **Hata yönetimi:** Eksik veya geçersiz veride 400, bulunamayan kayıtta 404, beklenmeyen hatada 500 döner
- **Kalıcı veri:** Görevler `src/data/tasks.json` dosyasında saklanır

## 4. Veri Modeli

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | number | Otomatik artan benzersiz numara |
| `title` | string | Görev başlığı (zorunlu) |
| `description` | string | Görev açıklaması |
| `status` | string | `pending`, `in-progress`, `completed` |
| `priority` | string | `low`, `medium`, `high` |
| `assignee` | string | Görevin atandığı çalışan |
| `createdAt` | ISO tarih | Oluşturulma zamanı |
| `updatedAt` | ISO tarih | Son güncelleme zamanı |

## 5. API Endpoint Listesi

| Method | Endpoint | İşlev | Başarılı kod |
|---|---|---|---|
| POST | `/tasks` | Görev ekle | 201 |
| GET | `/tasks` | Görevleri listele | 200 |
| GET | `/tasks/:id` | Görev detayı | 200 |
| PUT | `/tasks/:id` | Görevi güncelle | 200 |
| DELETE | `/tasks/:id` | Görevi sil | 200 |

## 6. Mimari

Proje katmanlı ve modüler bir yapıda kurulmuştur:

- **Routes (`src/routes`):** Hangi endpoint'in hangi fonksiyonu çalıştıracağını belirler.
- **Controllers (`src/controllers`):** İstekleri doğrular ve iş mantığını yürütür.
- **Middleware (`src/middleware`):** Logger, tüm isteklerden önce çalışır.
- **Data (`src/data`):** JSON dosyasına okuma ve yazma işlemlerini yapar.

İstek akışı: `İstek → Logger → JSON Body Parser → Route → Controller → Veri Deposu → Yanıt`

## 7. Test

Tüm CRUD endpoint'leri Postman ile test edilmiştir. Hazır koleksiyon `docs/TASKFLOW.postman_collection.json` dosyasındadır, test ekran görüntüleri `docs/screenshots/` klasöründedir. Başarılı senaryoların yanı sıra eksik başlık (400), geçersiz id (400) ve olmayan kayıt (404) gibi hata senaryoları da test edilmiştir.

## 8. Kapsam

Bu proje yönergedeki zorunlu kapsamı karşılar: çalışan REST API, eksiksiz CRUD, Logger middleware ve Postman testleri. Filtreleme, arama, sayfalama, ayrı validation middleware'i ve raporlama servisleri isteğe bağlı bölümde yer aldığı için bu sürümde bulunmamaktadır ve ileride eklenebilir.
