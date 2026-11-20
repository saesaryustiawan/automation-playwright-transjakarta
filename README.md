# Automation Test DemoQA with Playwright

 End-to-end test untuk situs DemoQA, coding menggunakan TypeScript dan Playwright dengan pola Page Object Model (POM).

## Pre-requisite

- Node.js 22 atau newer
- npm

## Installation

Jalankan perintah berikut dari direktori project:

```bash
npm ci
npx playwright install
```

Secara default test menggunakan `https://demoqa.com`. Untuk mengganti alamat, salin `.env.example` menjadi `.env`, lalu set value `BASE_URL`.

## Menjalankan automation test

```bash
npm test                              # Jalankan semua test di Chromium, Firefox, dan WebKit
npm run test:chromium                 # Jalankan di Chromium saja
npm run test:firefox                  # Jalankan di Firefox saja
npm run test:webkit                   # Jalankan di WebKit saja
npm run test:headed                   # Tampilkan browser saat test berjalan
npm run test:ui                       # Buka Playwright UI Mode
npm run test:debug                    # Jalankan dengan Playwright Inspector
npm run test:smoke                    # Jalankan test berlabel @smoke
npm run test:regression               # Jalankan test berlabel @regression
npm run typecheck                     # Periksa tipe TypeScript
```

Untuk menjalankan satu file test tertentu:

```bash
npx playwright test tests/ui/droppable.spec.ts
```

Opsi Playwright lain, misalnya menjalankan satu browser atau test tertentu, dapat ditambahkan setelah perintah `npx playwright test`:

```bash
npx playwright test --project=chromium
npx playwright test --grep "drags the element"
```

## Melihat Report

Setiap eksekusi membuat report HTML di `playwright-report/` dan report JUnit di `test-results/junit.xml`. Buka report HTML dengan:

```bash
npm run test:report
```

Screenshot dan video disimpan ketika test gagal; trace direkam saat retry/percobaan ulang.

## Skenario yang tersedia

- **Web Tables:** menambahkan data pengguna dari `data/web-table-users.csv` dan memeriksa baris yang tersimpan.
- **Droppable:** menyeret elemen ke area target dan memeriksa teks konfirmasi.
- **Resizable:** mengubah ukuran kotak dan memeriksa dimensinya.
- **Student Registration:** mengisi formulir dan memeriksa data pada modal konfirmasi.

Test berada di `tests/ui/`, sedangkan locator dan aksi halaman berada di `pages/`. Fixture (bersama) tersedia di `fixtures/`.
