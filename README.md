# ProfileCard

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)

> ProfileCard adalah aplikasi kartu profil sederhana. Pengguna mengambil foto lewat kamera HP dan menangkap koordinat lokasi saat ini via GPS, lalu keduanya ditampilkan sebagai kartu profil yang tersimpan secara lokal.

---

## 📸 Screenshots

| Home (kosong) | Form ProfileCard | Home (terisi) |
|:---:|:---:|:---:|
| ![Home](assets/screenshots/home-empty.png) | ![Form](assets/screenshots/form.png) | ![Home Filled](assets/screenshots/home-filled.png) |

---

## ✨ Fitur Utama

- [x] Ambil foto profil lewat kamera (expo-image-picker), termasuk handle izin ditolak
- [x] Ambil koordinat lokasi saat ini via GPS (expo-location), termasuk handle izin ditolak
- [x] Validasi form (nama minimal 3 karakter, foto wajib diambil sebelum simpan)
- [x] Kartu profil tersimpan secara lokal (AsyncStorage), persist setelah app ditutup
- [x] 2 screen dengan Stack Navigation (Home ↔ ProfileCard)
- [x] Tampilan versi app di app.json terbaca via expo-constants

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React Native + Expo (SDK 51) |
| Navigation | React Navigation v6 (Native Stack) |
| Storage | @react-native-async-storage/async-storage |
| Device | expo-image-picker (kamera), expo-location (GPS) |
| Build | EAS Build (Expo Application Services) |

---

## 📁 Struktur Folder

```
profile-card-app/
├── App.js
├── app.json
├── eas.json
├── package.json
├── index.js
├── babel.config.js
├── src/
│   ├── navigation/AppNavigator.js
│   ├── screens/ (HomeScreen, ProfileCardScreen)
│   └── constants/colors.js
└── assets/
    ├── icon.png
    ├── adaptive-icon.png
    ├── splash.png
    └── screenshots/
```

---

## 🚀 Cara Menjalankan

```bash
git clone https://github.com/USERNAME/profile-card-app.git
cd profile-card-app
npm install
npx expo start
```

Scan QR Code dengan Expo Go di HP.

---

## 📦 Download APK

[Download APK terbaru](LINK_APK_GITHUB_RELEASE_ATAU_EAS_DASHBOARD)

---

## 🌐 Expo Snack

[Buka di Expo Snack](LINK_EXPO_SNACK)

---

## 👤 Developer

**Nama Lengkap** | NIM | Kelas
Universitas Prima Indonesia — Prodi Sistem Informasi
Mata Kuliah: Pemrograman Mobile (TI-MOBILE-01)
