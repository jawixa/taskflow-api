# Postman Test Rehberi

Bu rehber, TASKFLOW API'nin Postman ile nasıl test edileceğini ve teslim için hangi ekran görüntülerinin alınacağını anlatır.

## Hazırlık

1. Terminalde proje klasöründe `npm start` komutunu çalıştırın. `TASKFLOW API http://localhost:3000 adresinde çalışıyor` yazısını görmelisiniz.
2. Postman'i açın, **Import** düğmesine tıklayın ve `docs/TASKFLOW.postman_collection.json` dosyasını seçin.
3. Koleksiyon değişkenlerinde `baseUrl` değerinin `http://localhost:3000` olduğunu kontrol edin (farklı port kullandıysanız değiştirin).
4. Test verisini temiz başlatmak için `src/data/tasks.json` dosyasının içeriğini `[]` yapabilirsiniz.

## Test sırası

İstekleri **sırayla** çalıştırın. Görev Ekle isteği oluşan görevin id'sini `taskId` değişkenine kaydeder, sonraki istekler bunu kullanır. Her istekte **Test Results** sekmesinde yeşil geçen testleri görebilirsiniz.

| # | İstek | Beklenen kod | Ne kontrol edilir? |
|---|---|---|---|
| 1 | Görev Ekle (POST /tasks) | 201 | Görev `id` ile oluşur, status `pending` olur |
| 2 | Görevleri Listele (GET /tasks) | 200 | `tasks` dizisi gelir |
| 3 | Görev Detayı (GET /tasks/:id) | 200 | Doğru görev gelir |
| 4 | Görev Güncelle (PUT /tasks/:id) | 200 | Status `in-progress` olur |
| 5 | Görev Sil (DELETE /tasks/:id) | 200 | "Görev silindi" mesajı gelir |
| 6 | Başlıksız Görev Ekle | 400 | Hata mesajı döner |
| 7 | Silinen Görevi Getir | 404 | Görev bulunamadı |
| 8 | Geçersiz ID | 400 | Geçersiz id mesajı döner |

## Alınacak ekran görüntüleri

Her ekran görüntüsünde şunlar **birlikte** görünmelidir: istek metodu ve URL'si, gönderilen body (varsa), yanıt gövdesi ve **durum kodu** (Status: 201 Created gibi). Mümkünse **Test Results** sekmesi de görünsün.

Dosyaları `docs/screenshots/` klasörüne şu adlarla kaydedin:

| Dosya adı | Hangi istek? |
|---|---|
| `01-gorev-ekle.png` | 1 - Görev Ekle |
| `02-gorev-listele.png` | 2 - Görevleri Listele |
| `03-gorev-detay.png` | 3 - Görev Detayı |
| `04-gorev-guncelle.png` | 4 - Görev Güncelle |
| `05-gorev-sil.png` | 5 - Görev Sil |
| `06-hata-basliksiz.png` | 6 - Başlıksız Görev Ekle (isteğe bağlı ama önerilir) |
| `07-hata-bulunamadi.png` | 7 - Silinen Görevi Getir (isteğe bağlı ama önerilir) |

Zorunlu olan ilk beş görüntüdür (ekleme, listeleme, detay, güncelleme, silme). Hata senaryoları ek kanıt olarak puanı güçlendirir.

İsterseniz tüm koleksiyonu **Run collection** ile bir kerede çalıştırıp sonuç özetinin ekran görüntüsünü de `00-koleksiyon-ozeti.png` adıyla ekleyebilirsiniz.

## Logger kontrolü (isteğe bağlı kanıt)

Testlerden sonra terminal çıktısının veya `logs/requests.log` dosyasının bir ekran görüntüsünü `08-logger.png` adıyla kaydedebilirsiniz. Bu, Logger middleware'inin çalıştığının kanıtıdır.
