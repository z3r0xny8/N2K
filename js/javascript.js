// Data providers untuk navigasi
const providers = [
  { id: 'pp', name: 'PRAGMATIC PLAY', logo: 'img/pp/0.webp' },
  { id: 'pg', name: 'PG SOFT', logo: 'img/pg/0.webp' },
  { id: 'jl', name: 'JILI', logo: 'img/jl/0.webp' },
  { id: 'hb', name: 'HABANERO', logo: 'img/hb/0.webp' },
  { id: 'sg', name: 'SPADEGAMING', logo: 'img/sg/0.webp' },
  { id: 'nlc', name: 'NOLIMIT CITY', logo: 'img/nlc/0.webp' },
  { id: 'fs', name: 'FAST SPIN', logo: 'img/fs/0.webp' },
  { id: 'jg', name: 'JOKER GAMING', logo: 'img/jg/0.webp' },
  { id: 'mg', name: 'MICROGAMING', logo: 'img/mg/0.webp' },
  { id: '5gg', name: '5G GAMING', logo: 'img/5gg/0.webp' },
  { id: 'hg', name: 'HACKSAW GAMING', logo: 'img/hg/0.webp' },
  { id: 'ns', name: 'NEXTSPIN', logo: 'img/ns/0.webp' },
  { id: 'ps', name: 'PLAYSTAR', logo: 'img/ps/0.webp' },
  { id: 'pt', name: 'PLAYTECH', logo: 'img/pt/0.webp' },
  { id: 'ap', name: 'ADAVANT PLAY', logo: 'img/ap/0.webp' },
  { id: 'cq9', name: 'CQ9', logo: 'img/cq9/0.webp' },
  { id: 'wg', name: 'WOW GAMING', logo: 'img/wg/0.webp' },
  { id: 'l22', name: 'LIVE22', logo: 'img/l22/0.webp' },
  { id: 'sbo', name: 'SBO SLOT', logo: 'img/sbo/0.webp' }
];

// Preload provider logos untuk performa lebih baik
function preloadProviderLogos() {
  providers.forEach(provider => {
    const img = new Image();
    img.src = provider.logo;
  });
}

// Cache DOM elements yang sering digunakan
let cachedElements = {};

// Fungsi untuk cache DOM elements
function cacheElements() {
  cachedElements = {
    currentProviderLogo: document.getElementById('currentProviderLogo'),
    currentProvider: document.getElementById('currentProvider'),
    prevProvider: document.getElementById('prevProvider'),
    nextProvider: document.getElementById('nextProvider'),
    rtpValues: document.querySelectorAll('.rtp-value'),
    rtpBars: document.querySelectorAll('.rtp-bar'),
    mainButtons: document.querySelectorAll('.main-button'),
    providerSections: document.querySelectorAll('.provider-section')
  };
}

let currentProviderIndex = 0;

// Cache untuk menyimpan RTP values agar tidak berubah saat ganti provider
let rtpCache = {};
let rtpInitialized = false;

// Fungsi untuk menghasilkan RTP acak
function generateRandomRTP() {
  // Menghasilkan RTP antara 50% hingga 99%
  return Math.floor(Math.random() * 50) + 50;
}

// Fungsi untuk generate unique key untuk setiap game item
function getGameKey(element, index) {
  const gameItem = element.closest('.game-item');
  const providerSection = element.closest('.provider-section');
  const providerId = providerSection ? providerSection.id : 'unknown';
  const gameName = gameItem ? gameItem.querySelector('.game-name')?.textContent : '';
  return `${providerId}_${gameName}_${index}`;
}

// Fungsi untuk menentukan kelas warna RTP berdasarkan nilai
function getRTPColorClass(rtpValue) {
  if (rtpValue >= 85) {
    return 'high'; // Hijau untuk 85-99%
  } else if (rtpValue >= 65) {
    return 'medium'; // Kuning untuk 65-84%
  } else {
    return 'low'; // Merah untuk 50-65%
  }
}

// Fungsi untuk memperbarui tampilan RTP bar (dengan sistem cache)
function updateRTPBars(forceRefresh = false) {
  const rtpValues = document.querySelectorAll('.rtp-value');
  const rtpBars = document.querySelectorAll('.rtp-bar');

  // Jika forceRefresh true atau belum pernah diinisialisasi, generate RTP baru
  const shouldGenerateNew = forceRefresh || !rtpInitialized;

  rtpValues.forEach((element, index) => {
    const key = getGameKey(element, index);
    let rtpValue;

    if (shouldGenerateNew) {
      // Generate RTP baru dan simpan ke cache
      rtpValue = generateRandomRTP();
      rtpCache[key] = rtpValue;
    } else {
      // Gunakan nilai dari cache, atau generate jika belum ada
      rtpValue = rtpCache[key];
      if (rtpValue === undefined) {
        rtpValue = generateRandomRTP();
        rtpCache[key] = rtpValue;
      }
    }

    element.textContent = rtpValue + '%';

    // Update bar
    if (rtpBars[index]) {
      // Hapus kelas warna sebelumnya
      rtpBars[index].classList.remove('high', 'medium', 'low');

      // Tambahkan kelas warna baru
      const colorClass = getRTPColorClass(rtpValue);
      rtpBars[index].classList.add(colorClass);

      // Set width bar
      rtpBars[index].style.width = rtpValue + '%';
    }
  });

  // Mark as initialized
  rtpInitialized = true;
}

// Fungsi untuk refresh RTP berdasarkan waktu (force refresh)
function refreshRTPByTimer() {
  updateRTPBars(true); // Force refresh semua RTP dengan nilai baru
}

// Fungsi untuk menampilkan provider yang dipilih
function showProvider(providerId) {
  // Sembunyikan semua provider section
  const allSections = document.querySelectorAll('.provider-section');
  allSections.forEach(section => {
    section.classList.remove('active');
  });

  // Tampilkan provider yang dipilih
  const selectedSection = document.getElementById(providerId);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }
}

// Fungsi untuk memperbarui informasi provider yang sedang aktif
function updateProviderDisplay() {
  const currentProvider = providers[currentProviderIndex];
  document.getElementById('currentProvider').textContent = currentProvider.name;
  document.getElementById('currentProviderLogo').src = currentProvider.logo;

  // Tampilkan provider yang sesuai
  showProvider(currentProvider.id);

  // Tampilkan RTP dari cache (tidak refresh, hanya apply visual)
  setTimeout(() => applyRTPFromCache(), 10);
}

// Fungsi untuk menerapkan RTP dari cache ke UI (tanpa generate ulang)
function applyRTPFromCache() {
  const activeSection = document.querySelector('.provider-section.active');
  if (!activeSection) return;

  const rtpValues = activeSection.querySelectorAll('.rtp-value');
  const rtpBars = activeSection.querySelectorAll('.rtp-bar');

  rtpValues.forEach((element, index) => {
    const key = getGameKey(element, index);
    let rtpValue = rtpCache[key];

    // Jika belum ada di cache, generate dan simpan
    if (rtpValue === undefined) {
      rtpValue = generateRandomRTP();
      rtpCache[key] = rtpValue;
    }

    element.textContent = rtpValue + '%';

    // Update bar
    if (rtpBars[index]) {
      rtpBars[index].classList.remove('high', 'medium', 'low');
      const colorClass = getRTPColorClass(rtpValue);
      rtpBars[index].classList.add(colorClass);
      rtpBars[index].style.width = rtpValue + '%';
    }
  });
}

// Fungsi untuk navigasi provider
function navigateProvider(direction) {
  if (direction === 'next') {
    currentProviderIndex = (currentProviderIndex + 1) % providers.length;
  } else {
    currentProviderIndex = (currentProviderIndex - 1 + providers.length) % providers.length;
  }

  updateProviderDisplay();
}

// Fungsi untuk menangani klik tombol MAIN
function handleMainButtonClick(event) {
  // Cari parent game-item dari tombol yang diklik
  const gameItem = event.target.closest('.game-item');
  if (gameItem) {
    // Dapatkan nilai RTP dari game ini
    const rtpElement = gameItem.querySelector('.rtp-value');
    const rtpValue = rtpElement ? rtpElement.textContent : '0%';

    // Log atau tindakan lain saat tombol diklik
    console.log(`Game dengan RTP ${rtpValue} diklik`);

    // Redirect ke link tujuan
    window.open('https://t.ly/NAGA2000', '_blank');
  }
}

// Fungsi untuk inisialisasi event listeners
function initializeEventListeners() {
  // Gunakan cached elements
  if (!cachedElements.prevProvider || !cachedElements.nextProvider) {
    cacheElements();
  }

  // Tombol navigasi provider
  cachedElements.prevProvider.addEventListener('click', () => navigateProvider('prev'));
  cachedElements.nextProvider.addEventListener('click', () => navigateProvider('next'));

  // Tombol MAIN untuk semua game
  cachedElements.mainButtons.forEach(button => {
    button.addEventListener('click', handleMainButtonClick);
  });

  // Refresh RTP secara periodik (setiap 5 Menit) dengan nilai baru
  setInterval(refreshRTPByTimer, 300000);

  // Preload gambar untuk performa lebih baik
  preloadProviderLogos();
}

// Fungsi untuk optimasi gambar lazy loading
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Fungsi untuk inisialisasi aplikasi
function initializeApp() {
  // Cache DOM elements
  cacheElements();

  // Tampilkan provider pertama
  updateProviderDisplay();

  // Setup event listeners
  initializeEventListeners();

  // Setup lazy loading
  initializeLazyLoading();

  // Setup swipe gesture untuk navigasi provider
  initializeSwipeGesture();

  // Update RTP bars saat pertama kali load
  setTimeout(updateRTPBars, 1000);

  // Preload gambar untuk performa lebih baik
  preloadProviderLogos();
}

// Inisialisasi saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', initializeApp);

// Fungsi untuk refresh manual RTP (force generate nilai baru)
function refreshRTP() {
  updateRTPBars(true);
}

// =============================================
// SWIPE GESTURE UNTUK NAVIGASI PROVIDER
// =============================================

// Variabel untuk tracking swipe
let touchStartX = 0;
let touchEndX = 0;
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;
const SWIPE_THRESHOLD = 50; // Minimum jarak swipe dalam pixel

// Fungsi untuk navigasi dengan animasi
function navigateWithAnimation(direction) {
  const currentSection = document.querySelector('.provider-section.active');

  if (currentSection) {
    // Tambahkan animasi keluar
    currentSection.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');

    // Setelah animasi selesai, ganti provider
    setTimeout(() => {
      currentSection.classList.remove('slide-left', 'slide-right');

      // Navigasi ke provider baru
      navigateProvider(direction);

      // Tambahkan animasi masuk ke section baru
      const newSection = document.querySelector('.provider-section.active');
      if (newSection) {
        newSection.classList.add(direction === 'next' ? 'slide-in-left' : 'slide-in-right');

        setTimeout(() => {
          newSection.classList.remove('slide-in-left', 'slide-in-right');
        }, 300);
      }
    }, 250);
  } else {
    navigateProvider(direction);
  }
}

// Fungsi untuk menangani hasil swipe
function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
    if (swipeDistance < 0) {
      // Swipe ke kiri = next provider
      navigateWithAnimation('next');
    } else {
      // Swipe ke kanan = previous provider
      navigateWithAnimation('prev');
    }
  }
}

// Fungsi untuk menangani hasil mouse drag
function handleMouseSwipe() {
  const swipeDistance = mouseEndX - mouseStartX;

  if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
    if (swipeDistance < 0) {
      // Drag ke kiri = next provider
      navigateWithAnimation('next');
    } else {
      // Drag ke kanan = previous provider
      navigateWithAnimation('prev');
    }
  }
}

// Inisialisasi swipe gesture
function initializeSwipeGesture() {
  const mainContent = document.querySelector('.main-content');

  if (!mainContent) return;

  // Touch events untuk mobile
  mainContent.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  mainContent.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  // Mouse events untuk desktop (drag)
  mainContent.addEventListener('mousedown', (e) => {
    // Jangan aktifkan drag jika click pada tombol atau link
    if (e.target.closest('button, a, .main-button')) return;

    isDragging = true;
    mouseStartX = e.screenX;
    mainContent.style.cursor = 'grabbing';
  });

  mainContent.addEventListener('mouseup', (e) => {
    if (isDragging) {
      mouseEndX = e.screenX;
      handleMouseSwipe();
      isDragging = false;
      mainContent.style.cursor = '';
    }
  });

  mainContent.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      mainContent.style.cursor = '';
    }
  });

  // Prevent text selection saat drag
  mainContent.addEventListener('selectstart', (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  });
}

// =============================================
// POPUP WITHDRAW NOTIFICATION
// Fitur notifikasi withdraw yang muncul secara berkala
// =============================================

// Daftar nama user palsu (disensor) untuk ditampilkan di popup
const names = [
  "Hju***", "Arc*****", "Kat****", "Sen****", "Rin****", "Agu******", "Fit****", "Jo***",
  "Pos**", "Cont***", "Loe*****", "Tam****", "Xcs***", "To0*****", "Y4N****", "Fak****",
  "Gac***", "Mem***", "Udi****", "Dud***", "Zak***", "Abd****", "Nur***", "Wdb****", "Nut***",
];

// Fungsi untuk mengambil nama acak dari daftar
function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
}

// Fungsi untuk menghasilkan nominal acak dengan pembulatan
// Menghasilkan angka kelipatan Rp. 50.000 (contoh: 2.500.000)
function getRandomAmount() {
  const min = 2000000;   // Minimal withdraw (Rp. 2.000.000)
  const max = 20000000;  // Maksimal withdraw (Rp. 20.000.000)
  const step = 50000;    // Kelipatan pembulatan (Rp. 50.000)

  // Kalkulasi jumlah unit berdasarkan step
  const minUnits = min / step;
  const maxUnits = max / step;

  // Random unit antara min dan max
  const randomUnits = Math.floor(Math.random() * (maxUnits - minUnits + 1)) + minUnits;

  // Konversi kembali ke nominal rupiah
  const amount = randomUnits * step;

  // Format menjadi mata uang IDR
  return "Rp. " + amount.toLocaleString("id-ID");
}

// Fungsi utama untuk membuat dan menampilkan popup
function showPopup() {
  const name = getRandomName();
  const amount = getRandomAmount();

  // Buat elemen div baru untuk popup
  const popup = document.createElement("div");
  popup.className = "popup wd";

  // Gunakan textContent (lebih aman dari XSS dibanding innerHTML)
  popup.textContent = `${name} Berhasil Withdraw ${amount}`;

  // Tambahkan ke body document
  document.body.appendChild(popup);

  // Trigger reflow agar animasi CSS transition berjalan
  popup.offsetHeight;

  // Tambahkan class 'show' untuk memulai animasi masuk (slide up)
  popup.classList.add("show");

  // Timer untuk menghilangkan popup
  setTimeout(() => {
    // 1. Hilangkan class 'show' (animasi keluar/fade out)
    popup.classList.remove("show");

    // 2. Tunggu animasi selesai (0.5 detik), lalu hapus elemen dari HTML
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup); // Hapus elemen dari memori/DOM
      }
    }, 500); // Waktu yang sama dengan transition CSS (0.5s)
  }, 4000); // Durasi popup tampil (4 detik)
}

// Jalankan popup secara otomatis setiap 5 detik
setInterval(showPopup, 5000);