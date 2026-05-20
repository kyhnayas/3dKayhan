# 3D Portfolyo Web Sitesi Proje Gereksinimleri (PRD)

## Proje Özeti

Bu proje, bir 3D Sanatçısı ve Art Direktör için modern, performanslı ve etkileşimli bir portfolyo sitesidir. Tasarım şablonlarına sadık kalınarak **Next.js (App Router)**, **Tailwind CSS** ve animasyonlar için **Framer Motion** kullanılacaktır. İçerik yönetimi lokal `.md` (Markdown) dosyaları üzerinden yapılacaktır.

## Temel Yapı ve Teknolojiler

- **Framework:** Next.js (React)
- **Stil:** Tailwind CSS
- **Animasyon:** Framer Motion (Hero accordion ve filtreleme geçişleri için kritik)
- **Tipografi:** 'Bebas Neue' (Google Fonts üzerinden eklenecek)
- **İçerik:** `gray-matter` ve `remark/rehype` paketleri ile `.md` dosyalarından çekilecek.

## Sayfa ve Component Mimarisi (Parçalanmış Yapı)

### 1. Layout & Header (Sticky)

- **Header:** Sayfa kaydırıldıkça üstte sabit kalacak (Sticky/Slack yapısı). Şeffaf başlayıp scroll ile arka planı hafif bulanık (backdrop-blur) veya düz beyaz olacak.
- **Sol Taraf:** Logo (Harici SVG olarak `public/assets/` klasöründen çekilecek).
- **Orta:** Navigasyon menüsü (HOME, ME, PROJECTS, CONTACT ME).
- **Sağ Taraf:** Sosyal medya ikonları (Instagram, Facebook, Behance/YouTube ikonları).

### 2. Hero Section (Etkileşimli Accordion)

- Ana sayfada tam ekranı kaplayan, yan yana duran görsel sütunlarından oluşacak.
- **Veri Çekme:** `.md` portfolyo dosyaları taranacak ve her kategori için rastgele 1'er tane (veya toplam 4 rastgele) proje seçilerek burada gösterilecek (Manuel seçime gerek kalmayacak).
- **Desktop Animasyonu (Framer Motion):** Sütunlar yan yana duracak. Üzerine gelinen (hover) sütun yatay olarak genişleyecek, diğerleri daralacak. Genişleyen sütunun üzerinde o projenin `description` yazısı ve başlığı belirecek. Üstten ve alttan siyah/koyu puslu geçiş (CSS mask-image: linear-gradient) uygulanacak.
- **Mobil Animasyonu:** Sütunlar alt alta (vertical) dizilecek. Tıklanan veya ekranda ortalanan sütun dikey olarak genişleyecek. Maskeleme mobilde sağdan-soldan yatay puslu geçiş olacak şekilde ayarlanacak.

### 3. Filtrelenebilir Portfolyo Galerisi (Projects)

- Hero bölümünün hemen altında yer alacak.
- **Kategoriler:** ARCHITECTURE, PRODUCT, ADVERTISEMENT, ANIMATION (Tasarımda belirtildiği gibi).
- **Grid Yapısı:** Masonry (tuğla) veya dinamik CSS grid yapısı kullanılacak. Görsellerin kendi en-boy oranlarına göre kutular yerleşecek.
- **Filtreleme:** Kategori başlıklarına tıklandığında seçili olmayanlar kaybolacak, seçilenler yumuşak bir animasyonla (Framer Motion `layout` prop) yeniden sıralanacak.

### 4. Hakkımda (Me) Section

- Aşağıdaki metin tasarıma uygun, temiz bir tipografi ile yerleştirilecek:
  "Art Direktörlük, 3D iç mekan görselleştirme ve modern web geliştirme alanlarında yılların verdiği deneyimle çalışıyorum. Sakarya merkezli olarak İstanbul dahil tüm Türkiye'ye hizmet veriyorum. Blender ile fotogerçekçi 3D görselleştirmeler, mimari renders ve ürün animasyonları üretiyorum. Next.js ile performanslı, SEO uyumlu kurumsal ve e-ticaret web siteleri geliştiriyorum."

### 5. Footer (Ayrı Component)

- Sayfa alt kısmında tasarımı bozmadan yer alacak iletişim bilgileri:
  - **Web:** 3d.kayhanayas.com
  - **E-posta:** 3d@kayhanayas.com
  - **Sosyal Medya:** @kyhnayas (Instagram, Facebook, YouTube)
  - **Tel/WhatsApp:** +90 533 327 81 84
  - **Adres:** Adapazarı, Sakarya, Çark Caddesi

## Dosya Yolları (Assets)

- Tüm görseller, logolar ve ikonlar `public/images/` dizininden çekilecek. Referans görsel yolları buna göre dinamik yazılmalı.
