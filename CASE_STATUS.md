BiSU Backend

Developer Assignment

Requirements

Kullanıcının sipariş işlemlerini gerçekleştirebileceği bir sistem tasarlanması ve sistem
üzerindeki siparişler ve dataların takip edilebileceği bir panel ihtiyacı bulunmaktadır.

Minimum Specifications
OK ● Sipariş oluşturma , iptal ve sipariş tekrarı içeren işlemler yapılması,
OK ● Tüm servislere erişimin Basic Auth ile kısıtlanması,
OK ● Sisteme ürün eklenebilmesi ve ürünlerin listelenmesi için servislerin yaratılması, (Ürün
bilgilerinin güncel tutulması beklenmekte), 
No ● Panel tarafında kullanıcın sipariş detayı bilgilerinin görüntülendiği ve sipariş
hareketlerinin değiştirilebildiği ekran/ekranlar oluşturulması,
No ○ Detay ekranı,
○ İptal, erteleme, iade gibi işlemlerin panelden yapılması,
.. ● Servis dokümanlarının yazılması (swagger), = swagger eklenmeli
?? ● Sipariş oluşumundan 1 dk sonra sipariş yazılacak olan entegrasyon servisine
gönderilmesi ve mongoDb ye kayıt edilebilmesi,
OK ● Gerekli görülen yerlerde cache ve/veya queue yapısı kullanılabilir, 
OK ● Unit testlerin yazılması. => test yazılması

Not: Bu assignment için süre sınırı 1 haftadır.