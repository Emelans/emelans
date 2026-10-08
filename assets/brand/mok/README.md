# Emelans / MOK — kumandasız logo pozları

Üç ayrı logo görseli siteye bağlandı: selam veren poz üstbilgide, E harfinin arkasından bakan poz stüdyo bölümünde, sıçrayan poz altbilgide. Kullanıcının karakter referansı değiştirilmedi.

| Dosya | Poz | Boyut |
| --- | --- | --- |
| [emelans-mok-wave-v1.png](emelans-mok-wave-v1.png) | Ayakta, tek eliyle selam veren MOK | 1774 × 887 |
| [emelans-mok-peek-v1.png](emelans-mok-peek-v1.png) | İlk E harfinin arkasından bakan MOK | 1774 × 887 |
| [emelans-mok-jump-v1.png](emelans-mok-jump-v1.png) | İki kolu açık, küçük bir sıçrama yapan MOK | 1774 × 887 |

## Kontrol

- Üç görselde de kumanda ve başka elde tutulan eşya yok.
- Gözle kontrol: turkuaz renk, tepe tutamı, kulaklar, yan çıkıntılar, iki göz, yaramaz ifade ve beş küçük diş düzeni korunmuş; kuyruk eklenmemiş.
- Üçünde de Emelans yazımı doğru ve okunabilir. Yapay görsel üretimiyle hazırlanmış yazılar matematiksel olarak aynı vektör masterdan alınmış kopyalar değildir.
- Üç PNG de dört kanallı RGBA; gerçek alfa şeffaflığı doğrulandı. Alfa min=0, max=255. Siyah görünen önizleme zemini dosyanın arka plan rengi değildir.
- Bunlar 2D raster logo görselleri; 3D model, SVG veya animasyon değildir.
- Üstbilgi yerleşimi beş ekran genişliğinde iki dilde kontrol edildi. Küçük kullanımlar için ayrıca 32/180/192 piksel yüz simgeleri hazırlandı.
- Koyu lacivert yazı açık zemine uygundur; koyu altbilgide bu yüzden açık renkli bir plaka kullanılır.

## Üretim kaydı

Yerleşik görsel üretim/düzenleme aracı kullanıldı, her poz ayrı çağrıyla üretildi. İlk poz önceki onaylı 2D logoyu ve orijinal MOK referansını kullandı. Diğer iki poz ilk yeni pozun stilini ve orijinal referansı kullandı. Şeffaf arka plan üretim sırasında istendi; alfa kanalı korunarak çıktılar değişmeden kopyalandı. Harici API/CLI veya yeniden çizilmiş SVG kullanılmadı.

Sekme simgesi, onaylı selam veren pozdan yerleşik görsel aracıyla türetildi. İstenen düzenleme: yalnızca MOK'un başını, kulaklarını ve tepe tutamını kare şeffaf alanda koru; yazıyı, gövdeyi ve elleri kaldır; yüzü, ifadeyi, renkleri ve çizim tarzını değiştirme. Üretilen PNG yalnızca simge boyutlarına küçültüldü.
