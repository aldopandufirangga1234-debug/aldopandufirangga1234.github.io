# Panduan Musik Lokal

## 🎵 **Musik yang Digunakan**

File musik yang digunakan dalam undangan pernikahan:
- **Nama File**: `wave to earth - love. (Official Lyric Video) [Q49pnA4jsp8].mp3`
- **Format**: MP3
- **Durasi**: Full song dengan loop otomatis

## 📁 **Struktur File Musik**

```
undangan pernikahan/
├── index.html
├── buka-undangan.html
├── style.css
├── script.js
├── wave to earth - love. (Official Lyric Video) [Q49pnA4jsp8].mp3
└── [file lainnya...]
```

## 🎮 **Cara Menggunakan Musik**

### 1. **Di Halaman Buka Undangan (`buka-undangan.html`)**
- Klik tombol **"Putar Musik"**
- Musik lokal akan diputar otomatis
- Jika gagal, akan fallback ke YouTube

### 2. **Di Undangan Utama (`index.html`)**
- Klik tombol **"Play Music"** di hero section
- Atau gunakan music player di pojok kanan bawah
- Musik akan loop otomatis

### 3. **Kontrol Musik**
- **Play/Pause**: Tombol play/pause di music player
- **Stop**: Tombol stop untuk menghentikan musik
- **YouTube**: Tombol YouTube untuk beralih ke versi YouTube

## 🔧 **Konfigurasi Audio**

### HTML Audio Element
```html
<audio id="backgroundMusic" loop>
    <source src="wave to earth - love. (Official Lyric Video) [Q49pnA4jsp8].mp3" type="audio/mpeg">
    <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav">
</audio>
```

### JavaScript Control
```javascript
// Play musik lokal
function playMusic() {
    backgroundMusic.play().then(() => {
        isPlaying = true;
        showNotification('Musik lokal diputar', 'success');
    }).catch(error => {
        showNotification('Tidak dapat memutar musik lokal', 'error');
    });
}
```

## 📱 **Optimasi Mobile**

### Android
- **Auto-play**: Diblokir oleh browser, perlu interaksi user
- **Touch events**: Responsif terhadap sentuhan
- **Haptic feedback**: Getaran saat kontrol musik

### iOS
- **Safari**: Membutuhkan user gesture untuk play
- **Chrome**: Support auto-play dengan interaksi

## 🎯 **Fitur Musik**

### ✅ **Yang Sudah Diimplementasikan**
- **Musik lokal** sebagai prioritas utama
- **Fallback ke YouTube** jika musik lokal gagal
- **Loop otomatis** untuk pengalaman berkelanjutan
- **Kontrol play/pause/stop** yang lengkap
- **Notification system** untuk feedback user
- **Mobile-optimized** controls

### 🎵 **Kualitas Audio**
- **Format**: MP3 (kompatibel dengan semua browser)
- **Bitrate**: Optimal untuk web streaming
- **Size**: Dioptimalkan untuk loading cepat
- **Loop**: Seamless loop tanpa gap

## 🚨 **Troubleshooting**

### Masalah: Musik Tidak Berputar
**Solusi:**
1. Pastikan file musik ada di folder yang sama
2. Cek nama file harus sama persis (case sensitive)
3. Pastikan browser support MP3
4. Coba refresh halaman

### Masalah: Auto-play Tidak Bekerja
**Solusi:**
1. Klik tombol play manual
2. Pastikan ada interaksi user terlebih dahulu
3. Cek setting browser untuk auto-play

### Masalah: Musik Terputus
**Solusi:**
1. Pastikan koneksi internet stabil
2. Cek apakah file musik tidak corrupt
3. Coba gunakan fallback YouTube

## 🔄 **Fallback System**

### Prioritas Musik:
1. **Musik lokal** (MP3) - Prioritas utama
2. **YouTube** - Jika musik lokal gagal
3. **Default sound** - Jika semua gagal

### Error Handling:
```javascript
// Try local music first
localMusic.play().then(() => {
    console.log('Local music playing');
}).catch(error => {
    console.log('Local music failed, trying YouTube');
    playYouTubeMusic();
});
```

## 📊 **Performance**

### Loading Time:
- **Musik lokal**: ~2-5 detik (tergantung ukuran file)
- **YouTube**: ~3-8 detik (tergantung koneksi)
- **Fallback**: Instant

### Memory Usage:
- **Musik lokal**: Minimal (streaming)
- **YouTube**: Sedang (iframe)
- **Browser cache**: Otomatis

## 🎨 **Customization**

### Mengganti Musik:
1. Ganti file `wave to earth - love. (Official Lyric Video) [Q49pnA4jsp8].mp3`
2. Update nama file di HTML
3. Pastikan format MP3
4. Test di browser

### Mengganti Kontrol:
```javascript
// Custom music controls
function customPlay() {
    // Your custom logic here
    backgroundMusic.play();
}
```

## 📞 **Support**

Jika ada masalah dengan musik:
1. Cek console browser untuk error
2. Pastikan file musik tidak corrupt
3. Test dengan browser berbeda
4. Cek network connection

---

**Musik lokal sekarang terintegrasi dengan sempurna! 🎵✨**

