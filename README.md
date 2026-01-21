# 🎰 RTP NAGA2000

## 📖 Deskripsi

RTP NAGA2000 adalah website informasi RTP (Return to Player) untuk berbagai game slot online. Website ini menampilkan informasi RTP live dari berbagai provider slot populer dengan tampilan yang modern dan responsif.

---

## ✨ Fitur

### 🎮 Multi-Provider Support
Website mendukung **19 provider slot** populer:

| Provider | ID | Provider | ID |
|----------|-----|----------|-----|
| Pragmatic Play | `pp` | PG Soft | `pg` |
| JILI | `jl` | Habanero | `hb` |
| Spadegaming | `sg` | Nolimit City | `nlc` |
| Fast Spin | `fs` | Joker Gaming | `jg` |
| Microgaming | `mg` | 5G Gaming | `5gg` |
| Hacksaw Gaming | `hg` | Nextspin | `ns` |
| Playstar | `ps` | Playtech | `pt` |
| Adavant Play | `ap` | CQ9 | `cq9` |
| WOW Gaming | `wg` | Live22 | `l22` |
| SBO Slot | `sbo` | | |

### 📊 RTP Live Display
- **RTP Bar Dinamis**: Menampilkan persentase RTP dengan progress bar berwarna
- **Color Coding**:
  - 🟢 **Hijau** (High): RTP 85% - 99%
  - 🟡 **Kuning** (Medium): RTP 65% - 85%
  - 🔴 **Merah** (Low): RTP 50% - 65%
- **RTP Range**: Value RTP antara 50% hingga 99%

### ⏱️ Time-Based RTP Refresh
- RTP di-refresh **otomatis setiap 5 Menit**
- RTP **tidak berubah** saat ganti provider (swipe/klik)
- Menggunakan sistem **cache** untuk konsistensi data

### 👆 Swipe Gesture Navigation
- **Swipe kiri**: Navigasi ke provider berikutnya
- **Swipe kanan**: Navigasi ke provider sebelumnya
- **Mouse drag**: Support untuk desktop
- **Smooth animation**: Transisi slide yang halus

### 🔘 Button Navigation
- Tombol **Previous** (←) dan **Next** (→)
- Menampilkan logo dan nama provider aktif
- Navigasi dengan animasi slide

### 📱 Progressive Web App (PWA)
- **Installable**: Bisa diinstall sebagai aplikasi
- **Offline Support**: Bekerja tanpa koneksi internet
- **Service Worker**: Caching otomatis untuk performa optimal
- **App-like Experience**: Tampilan fullscreen tanpa browser UI

### 🚀 Performance Optimizations
- **Lazy Loading**: Gambar dimuat sesuai kebutuhan
- **Image Preloading**: Logo provider di-preload
- **DOM Caching**: Element DOM di-cache untuk performa
- **Hardware Acceleration**: CSS transform untuk animasi smooth
- **Optimized Animations**: Menggunakan `will-change` dan `translateZ`

### 🎨 Modern UI/UX
- **Dark Theme**: Tema gelap yang nyaman di mata
- **Gold Accent**: Aksen warna emas (#DAA520)
- **Responsive Grid**: Layout yang adaptif
- **Hover Effects**: Efek interaktif saat hover
- **Shake Animation**: Logo bergetar untuk attention
- **Marquee Text**: Teks berjalan di bagian atas

### 💸 Popup Withdraw Notification
- **Live Notification**: Popup withdraw yang muncul otomatis setiap 5 detik
- **Random Names**: Menampilkan nama user dengan format sensor (contoh: `Hju***`, `Kat****`)
- **Rounded Amounts**: Nominal dalam kelipatan Rp. 50.000 (range: Rp. 2.000.000 - Rp. 20.000.000)
- **Smooth Animation**: Animasi slide-up yang halus dengan fade effect
- **XSS Safe**: Menggunakan `textContent` untuk keamanan
- **Auto Cleanup**: Elemen popup otomatis dihapus dari DOM setelah animasi selesai

### 🔍 SEO Optimized
- **Meta Tags**: Title, description, keywords lengkap
- **Open Graph**: Support sharing di social media
- **Twitter Card**: Preview yang optimal untuk Twitter
- **Schema.org**: Structured data untuk search engines
- **Semantic HTML**: Penggunaan tag HTML5 yang tepat
- **Canonical URL**: Mencegah duplicate content

### 🛡️ Security Headers
- **Content Security Policy (CSP)**
- **Referrer Policy**: strict-origin-when-cross-origin
- **X-Content-Type-Options**: nosniff

### ♿ Accessibility
- **ARIA Labels**: Label untuk screen readers
- **Semantic Roles**: role="banner", role="main"
- **Alt Text**: Deskripsi untuk semua gambar
- **Keyboard Navigation**: Navigasi dengan keyboard

---

## 🛠️ Teknologi

| Kategori | Teknologi |
|----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **PWA** | Service Worker, Web App Manifest |
| **Images** | WebP Format (optimized) |
| **Hosting** | Cloudflare Pages |
| **Fonts** | Google Fonts |

---

## 📁 Struktur Project

```
N2Kv2/
├── 📄 index.html          # Halaman utama
├── 📄 manifest.json       # PWA manifest
├── 📄 sw.js               # Service Worker
├── 📄 robots.txt          # Search engine rules
├── 📄 README.md           # Dokumentasi
│
├── 📁 css/
│   └── 📄 style.css       # Stylesheet utama
│
├── 📁 js/
│   └── 📄 javascript.js   # Logic aplikasi
│
└── 📁 img/
    ├── 📁 logo/           # Logo website
    ├── 📁 banner/         # Banner images
    ├── 📁 icon/           # PWA icons
    ├── 📁 gif/            # Animated images
    ├── 📁 pp/             # Pragmatic Play games
    ├── 📁 pg/             # PG Soft games
    ├── 📁 jl/             # JILI games
    ├── 📁 hb/             # Habanero games
    ├── 📁 sg/             # Spadegaming games
    ├── 📁 nlc/            # Nolimit City games
    ├── 📁 fs/             # Fast Spin games
    ├── 📁 jg/             # Joker Gaming games
    ├── 📁 mg/             # Microgaming games
    ├── 📁 5gg/            # 5G Gaming games
    ├── 📁 hg/             # Hacksaw Gaming games
    ├── 📁 ns/             # Nextspin games
    ├── 📁 ps/             # Playstar games
    ├── 📁 pt/             # Playtech games
    ├── 📁 ap/             # Adavant Play games
    ├── 📁 cq9/            # CQ9 games
    ├── 📁 wg/             # WOW Gaming games
    ├── 📁 l22/            # Live22 games
    └── 📁 sbo/            # SBO Slot games
```

## 📱 PWA Features

### Install sebagai Aplikasi
1. Buka website di browser
2. Klik icon "Install" atau menu "Add to Home Screen"
3. Aplikasi akan terinstall seperti native app

### Offline Mode
- Service Worker meng-cache semua asset penting
- Gambar game di-cache secara dinamis saat diakses
- Aplikasi tetap bisa digunakan tanpa internet

---

## 🎯 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 11.1+ |
| Edge | 79+ |
| Opera | 47+ |

---

## 📝 Changelog

### v1.1 (Latest)
- ✅ **Popup Withdraw Notification** - Notifikasi withdraw otomatis dengan animasi smooth
- ✅ **Rounded Amount Display** - Nominal kelipatan Rp. 50.000 untuk tampilan lebih realistis
- ✅ **DOM Cleanup** - Optimasi memory dengan auto-remove element

### v1.0
- ✅ Multi-provider navigation dengan swipe gesture
- ✅ Time-based RTP refresh (5 Menit)
- ✅ RTP cache system (tidak refresh saat ganti provider)
- ✅ PWA support dengan offline mode
- ✅ Performance optimizations
- ✅ SEO enhancements

---

## 👨‍💻 Author

Dibuat dengan ❤️ oleh **z3r0xny8**

---

## 📄 License

© 2026 RTP NAGA2000. All rights reserved.
