# Pertemuan 0: Fullstack Next.js — Fondasi Sebelum Docker & Cloud

> 📖 **Buka [index.html](./index.html) di browser** untuk panduan visual interaktif 8 halaman dengan penjelasan lengkap, animasi SVG, dan contoh kode.
>
> 📊 Atau buka [visual-guide.html](./visual-guide.html) untuk ringkasan semua konsep dalam 1 halaman.

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, mahasiswa mampu:

1. Memahami apa itu React dan Next.js serta hubungannya
2. Membuat project Next.js baru dan menjalankannya
3. Memahami struktur folder App Router
4. Membuat halaman, layout, dan navigasi
5. Menulis CSS (variables, flexbox, grid, responsive)
6. Membuat dan menggunakan component React (props)
7. Memisahkan data dari UI (folder `lib/`)
8. Membuat API route (backend di dalam Next.js)
9. Menggunakan environment variable
10. Menjalankan test sederhana

> 💡 **Pertemuan ini adalah fondasi.** Semua pertemuan selanjutnya (Docker, Kubernetes, CI/CD) menggunakan aplikasi yang sama. Kalau paham Next.js di sini, sisanya tinggal membungkus dan mengotomasi.

---

## 📚 Teori: React vs Next.js

### Apa itu React?

React adalah **library JavaScript** untuk membangun User Interface (UI). React memperkenalkan konsep:

- **Component** — potongan UI yang bisa dipakai ulang
- **JSX** — syntax mirip HTML di dalam JavaScript
- **Props** — data yang dikirim dari parent ke child component
- **State** — data yang bisa berubah dan membuat UI ter-update otomatis

```
React = Library untuk membangun UI dari component
```

### Apa itu Next.js?

Next.js adalah **framework fullstack** yang dibangun di atas React. Next.js menambahkan:

| Fitur | React (saja) | Next.js |
|-------|-------------|---------|
| Routing | Harus install `react-router` | Otomatis dari struktur folder |
| Server-Side Rendering | Harus setup sendiri | Built-in |
| API Backend | Tidak ada | Ada (API routes) |
| Optimasi Gambar | Tidak ada | `<Image>` component |
| Build Production | Harus setup Webpack | `next build` → siap deploy |
| CSS Support | Harus setup sendiri | Global CSS, CSS Modules, Tailwind |

```
Next.js = React + Routing + API + SSR + Optimasi + Build Tools
```

### Kenapa Next.js untuk Praktikum Ini?

```
┌──────────────────────────────────────────────────┐
│  Pertemuan 0: Fullstack Next.js (SAAT INI)       │
│  ↓                                               │
│  Pertemuan 1-3: Dockerize aplikasi Next.js       │
│  ↓                                               │
│  Pertemuan 4-5: Registry & Compose               │
│  ↓                                               │
│  Pertemuan 6-7: Kubernetes deployment            │
│  ↓                                               │
│  Pertemuan 8: UTS — project lengkap              │
└──────────────────────────────────────────────────┘
```

Kita butuh aplikasi **nyata** yang punya UI, API, test, dan konfigurasi — supaya Docker bukan hanya membungkus folder kosong.

---

## 🚀 Praktikum Bagian 1: Setup & Jalankan

### 1.1 Buka Project

```powershell
cd cloud-native-practicum\examples\nextjs-docker-app
```

### 1.2 Install Dependencies

```powershell
npm install
```

> 📝 `npm install` membaca `package.json` dan mengunduh semua library yang dibutuhkan ke folder `node_modules/`.

### 1.3 Jalankan Development Server

```powershell
npm run dev
```

Buka browser: **http://localhost:3000**

> 💡 Development server punya fitur **Hot Reload** — setiap kali file disimpan, browser otomatis ter-update tanpa perlu refresh manual.

### 1.4 Struktur Folder

```
nextjs-docker-app/
├── app/                    ← 📁 HALAMAN & API
│   ├── layout.js           ← Layout global (bungkus semua halaman)
│   ├── page.js             ← Halaman utama → http://localhost:3000/
│   ├── globals.css         ← CSS untuk seluruh aplikasi
│   └── api/                ← 📁 API ROUTES (backend)
│       ├── health/
│       │   └── route.js    ← GET /api/health
│       └── deployments/
│           └── route.js    ← GET /api/deployments
├── components/             ← 📁 COMPONENT (UI yang dipakai ulang)
│   ├── MetricCard.js
│   └── DeploymentStep.js
├── lib/                    ← 📁 DATA & HELPER
│   ├── teachingData.js
│   └── health.mjs
├── tests/                  ← 📁 TEST
│   └── health.test.mjs
├── public/                 ← 📁 FILE STATIS (gambar, favicon)
├── next.config.mjs         ← Konfigurasi Next.js
├── package.json            ← Daftar dependency & scripts
├── Dockerfile              ← (untuk pertemuan selanjutnya)
└── compose.yaml            ← (untuk pertemuan selanjutnya)
```

> 🔑 **Aturan routing App Router**: nama folder = URL path, `page.js` = halaman, `route.js` = API endpoint.

---

## 📚 Praktikum Bagian 2: Layout & Halaman

### 2.1 Layout Global (`app/layout.js`)

Buka file `app/layout.js` — baca komentar di dalamnya.

**Konsep utama:**

```
┌─────────────────────────────────────┐
│  RootLayout (layout.js)             │
│  ┌───────────────────────────────┐  │
│  │  <html>                       │  │
│  │    <body>                     │  │
│  │      {children} ← isi page   │  │
│  │    </body>                    │  │
│  │  </html>                      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

- `layout.js` = bungkus untuk **semua** halaman
- `{children}` = halaman yang sedang dibuka (page.js)
- CSS di-import di sini → berlaku untuk seluruh aplikasi
- `metadata` → mengatur `<title>` dan `<meta>` halaman

### 2.2 Halaman Utama (`app/page.js`)

Buka file `app/page.js` — baca komentar di dalamnya.

**Konsep utama:**

| Konsep | Contoh | Penjelasan |
|--------|--------|------------|
| Import component | `import MetricCard from "../components/MetricCard.js"` | Mengambil component dari file lain |
| Import data | `import { teachingMetrics } from "../lib/teachingData.js"` | Mengambil data dari file terpisah |
| Environment variable | `process.env.NEXT_PUBLIC_DOCKER_IMAGE` | Membaca konfigurasi dari environment |
| JSX | `<h1>Judul</h1>` | Syntax mirip HTML di dalam JavaScript |
| className | `<div className="hero">` | Pengganti `class` di JSX |
| Kurung kurawal | `{message}` | Menampilkan nilai variabel di JSX |
| Loop .map() | `{array.map(item => <Component />)}` | Mengulang array menjadi element |

### 2.3 Latihan: Tambah Halaman Baru

Buat file `app/about/page.js`:

```jsx
export default function About() {
  return (
    <main>
      <h1>Tentang Aplikasi</h1>
      <p>Aplikasi ini dibuat untuk praktikum Cloud Native.</p>
      <p>Nama: [ISI NAMA MAHASISWA]</p>
      <p>NIM: [ISI NIM]</p>
      <a href="/">← Kembali ke beranda</a>
    </main>
  );
}
```

Buka: **http://localhost:3000/about**

> 🔑 Tidak perlu konfigurasi routing! Cukup buat folder + `page.js` → Next.js otomatis membuat route.

---

## 📚 Praktikum Bagian 3: CSS

### 3.1 CSS Variables (`globals.css`)

Buka file `app/globals.css` — baca komentar di bagian atas.

```css
/* Definisi di :root → bisa dipakai di mana saja */
:root {
  --brand: #38bdf8;      /* Warna utama */
  --bg: #08111f;          /* Warna background */
  --text: #e5eefb;        /* Warna teks */
}

/* Cara pakai: */
.hero { color: var(--brand); }
```

> 💡 **Keuntungan CSS Variables**: ubah warna di satu tempat (`:root`), otomatis berubah di semua selector yang memakainya.

### 3.2 Flexbox vs CSS Grid

```
┌─────────────────────────────────────────┐
│  FLEXBOX — Layout 1 dimensi             │
│                                         │
│  ┌────┐ ┌────┐ ┌────┐                  │
│  │ A  │ │ B  │ │ C  │  ← satu baris    │
│  └────┘ └────┘ └────┘                  │
│                                         │
│  display: flex;                         │
│  flex-wrap: wrap;                       │
│  gap: 12px;                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  CSS GRID — Layout 2 dimensi            │
│                                         │
│  ┌────┐ ┌────┐ ┌────┐                  │
│  │ A  │ │ B  │ │ C  │  ← baris 1       │
│  ├────┤ ├────┤ ├────┤                  │
│  │ D  │ │ E  │ │ F  │  ← baris 2       │
│  └────┘ └────┘ └────┘                  │
│                                         │
│  display: grid;                         │
│  grid-template-columns: repeat(3, 1fr); │
│  gap: 18px;                             │
└─────────────────────────────────────────┘
```

**Di aplikasi ini:**
- `.heroActions` → Flexbox (tombol berjajar horizontal)
- `.metrics` → Grid 3 kolom (kartu metrik)
- `.contentGrid` → Grid 2 kolom (panel konten)

### 3.3 Responsive Design

```css
/* Default: multi-kolom (desktop) */
.metrics { grid-template-columns: repeat(3, 1fr); }

/* Layar kecil: 1 kolom (mobile/tablet) */
@media (max-width: 900px) {
  .metrics { grid-template-columns: 1fr; }
}
```

### 3.4 Latihan: Tambah Style

1. Buka `app/globals.css`
2. Tambahkan style baru di bagian bawah:

```css
.mahasiswaCard {
  padding: 20px;
  border: 2px solid var(--brand);
  border-radius: 16px;
  background: var(--panel);
  text-align: center;
}

.mahasiswaCard h3 {
  color: var(--brand);
  margin-bottom: 8px;
}
```

3. Pakai di halaman about:

```jsx
export default function About() {
  return (
    <main>
      <h1>Tentang Aplikasi</h1>
      <div className="mahasiswaCard">
        <h3>[NAMA MAHASISWA]</h3>
        <p>NIM: [NIM]</p>
        <p>Kelas: Cloud Native Practicum</p>
      </div>
    </main>
  );
}
```

---

## 📚 Praktikum Bagian 4: Component & Props

### 4.1 Apa itu Component?

Component = **fungsi JavaScript yang mengembalikan JSX (UI)**.

```
┌─────────────────────────────────────┐
│  page.js (Parent)                   │
│                                     │
│  ┌──────────────┐ ┌──────────────┐  │
│  │ MetricCard   │ │ MetricCard   │  │
│  │ value="UI"   │ │ value="API"  │  │
│  │ label="..."  │ │ label="..."  │  │
│  └──────────────┘ └──────────────┘  │
│                                     │
│  Parent mengirim data via PROPS     │
└─────────────────────────────────────┘
```

### 4.2 Component Sederhana (`MetricCard.js`)

Buka file `components/MetricCard.js` — baca komentar di dalamnya.

```jsx
// Menerima props: { value, label }
export default function MetricCard({ value, label }) {
  return (
    <article className="metricCard">
      <span className="metricValue">{value}</span>
      <span className="metricLabel">{label}</span>
    </article>
  );
}
```

**Cara pakai di page.js:**
```jsx
<MetricCard value="UI" label="Halaman utama untuk demo" />
```

### 4.3 Component dengan Object Props (`DeploymentStep.js`)

Buka file `components/DeploymentStep.js` — baca komentar di dalamnya.

Props bisa berupa **objek**:
```jsx
<DeploymentStep step={{ number: "1", title: "Install", description: "...", command: "npm ci" }} />
```

### 4.4 Loop dengan `.map()`

Untuk menampilkan **banyak component** dari array data:

```jsx
// teachingMetrics = [{ value: "UI", label: "..." }, { value: "API", label: "..." }, ...]
{teachingMetrics.map((metric) => (
  <MetricCard key={metric.label} {...metric} />
))}
```

- `.map()` = mengulang setiap item di array
- `key={...}` = wajib di React agar tahu item mana yang berubah
- `{...metric}` = spread operator, mengirim semua property sebagai props

### 4.5 Latihan: Buat Component Sendiri

Buat file `components/MahasiswaCard.js`:

```jsx
export default function MahasiswaCard({ nama, nim, kelas }) {
  return (
    <div className="mahasiswaCard">
      <h3>{nama}</h3>
      <p>NIM: {nim}</p>
      <p>Kelas: {kelas}</p>
    </div>
  );
}
```

Pakai di `app/about/page.js`:

```jsx
import MahasiswaCard from "../../components/MahasiswaCard.js";

export default function About() {
  return (
    <main>
      <h1>Tim Kami</h1>
      <div className="metrics">
        <MahasiswaCard nama="Ahmad" nim="10520001" kelas="A" />
        <MahasiswaCard nama="Budi" nim="10520002" kelas="A" />
        <MahasiswaCard nama="Citra" nim="10520003" kelas="A" />
      </div>
    </main>
  );
}
```

---

## 📚 Praktikum Bagian 5: Data Terpisah (folder `lib/`)

### 5.1 Kenapa Pisahkan Data?

Buka file `lib/teachingData.js` — baca komentar di dalamnya.

```
❌ Tanpa pemisahan:
   page.js = 300 baris (data + UI campur aduk)

✅ Dengan pemisahan:
   lib/teachingData.js = 70 baris (data saja)
   page.js = 90 baris (UI saja, import data)
```

**Keuntungan:**
1. File lebih pendek dan mudah dibaca
2. Data bisa dipakai di banyak halaman (import ulang)
3. Nanti bisa diganti dengan data dari API/database
4. Bisa di-test terpisah

### 5.2 Struktur Data: Array of Objects

Pola paling umum di React:

```javascript
export const teachingMetrics = [
  { value: "UI", label: "Halaman utama untuk demo di browser" },
  { value: "API", label: "Endpoint health dan deployment" },
  { value: "Docker", label: "Multi-stage build production" }
];
```

Di halaman, data di-loop dengan `.map()`:
```jsx
{teachingMetrics.map((metric) => (
  <MetricCard key={metric.label} {...metric} />
))}
```

### 5.3 Latihan: Tambah Data Mahasiswa

Buat file `lib/mahasiswaData.js`:

```javascript
export const daftarMahasiswa = [
  { nama: "Ahmad", nim: "10520001", kelas: "A" },
  { nama: "Budi", nim: "10520002", kelas: "A" },
  { nama: "Citra", nim: "10520003", kelas: "B" }
];
```

Import dan tampilkan di halaman about:

```jsx
import MahasiswaCard from "../../components/MahasiswaCard.js";
import { daftarMahasiswa } from "../../lib/mahasiswaData.js";

export default function About() {
  return (
    <main>
      <h1>Daftar Mahasiswa</h1>
      <div className="metrics">
        {daftarMahasiswa.map((mhs) => (
          <MahasiswaCard key={mhs.nim} {...mhs} />
        ))}
      </div>
    </main>
  );
}
```

---

## 📚 Praktikum Bagian 6: API Routes (Backend)

### 6.1 Apa itu API Route?

Next.js bisa jadi **fullstack** — frontend DAN backend dalam satu project:

```
┌──────────────────────────────────────┐
│  Next.js Application                 │
│                                      │
│  Frontend (Browser)    Backend (Server)
│  ┌──────────────┐    ┌──────────────┐│
│  │ app/page.js  │    │ app/api/     ││
│  │ (HTML/JSX)   │───▶│ route.js     ││
│  │              │    │ (JSON API)   ││
│  └──────────────┘    └──────────────┘│
└──────────────────────────────────────┘
```

### 6.2 Health Check API (`app/api/health/route.js`)

Buka file `app/api/health/route.js` — baca komentar di dalamnya.

```jsx
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}
```

**Aturan:**
- File harus bernama `route.js` (bukan `page.js`)
- Nama fungsi = HTTP method: `GET()`, `POST()`, `PUT()`, `DELETE()`
- `NextResponse.json()` = mengembalikan response JSON
- Path folder = URL endpoint: `app/api/health/route.js` → `/api/health`

**Coba di browser:** http://localhost:3000/api/health

### 6.3 Membaca Data dari API

Buka tab baru dan coba:
- http://localhost:3000/api/health → status dan uptime server
- http://localhost:3000/api/deployments → data langkah deployment

### 6.4 `dynamic = "force-dynamic"`

```javascript
export const dynamic = "force-dynamic";
```

Tanpa ini, Next.js akan **cache** response API. Artinya `timestamp` tidak berubah meskipun di-refresh. Dengan `force-dynamic`, setiap request menjalankan fungsi ulang.

### 6.5 Latihan: Buat API Route Baru

Buat file `app/api/mahasiswa/route.js`:

```jsx
import { NextResponse } from "next/server";

const mahasiswa = [
  { nim: "10520001", nama: "Ahmad", kelas: "A" },
  { nim: "10520002", nama: "Budi", kelas: "A" },
  { nim: "10520003", nama: "Citra", kelas: "B" }
];

export function GET() {
  return NextResponse.json({
    total: mahasiswa.length,
    data: mahasiswa
  });
}
```

Coba: http://localhost:3000/api/mahasiswa

---

## 📚 Praktikum Bagian 7: Environment Variable

### 7.1 Apa itu Environment Variable?

Environment variable = **konfigurasi yang bisa diubah tanpa mengubah kode**.

```
┌─────────────────────────────────────────────────┐
│  Kode:  const msg = process.env.APP_MESSAGE     │
│                                                 │
│  Development:  APP_MESSAGE="Halo Dev"           │
│  Docker:       APP_MESSAGE="Halo dari Container"│
│  Production:   APP_MESSAGE="Selamat Datang"     │
│                                                 │
│  Kode SAMA, perilaku BERBEDA tergantung env     │
└─────────────────────────────────────────────────┘
```

### 7.2 Prefix `NEXT_PUBLIC_`

| Jenis | Prefix | Dibaca di | Contoh |
|-------|--------|-----------|--------|
| Public | `NEXT_PUBLIC_` | Browser + Server | `NEXT_PUBLIC_APP_MESSAGE` |
| Private | Tanpa prefix | Server saja | `APP_ENV`, `APP_VERSION` |

> ⚠️ **Jangan taruh secret (password, API key) di `NEXT_PUBLIC_`!** Karena akan terlihat di browser.

### 7.3 File `.env.local`

Buat file `.env.local` di root project:

```
NEXT_PUBLIC_APP_MESSAGE=Halo dari env.local!
APP_ENV=development
APP_VERSION=0.1.0
```

Restart `npm run dev` → pesan di halaman berubah.

### 7.4 Kenapa Penting untuk Docker?

Di Docker, env var dikirim melalui `docker run -e` atau `compose.yaml`:

```yaml
# compose.yaml
services:
  web:
    environment:
      - APP_ENV=production
      - NEXT_PUBLIC_APP_MESSAGE=Halo dari Docker!
```

Ini berarti satu image Docker bisa dipakai di **banyak environment** hanya dengan mengubah env var.

---

## 📚 Praktikum Bagian 8: Testing

### 8.1 Jalankan Test

```powershell
npm test
```

Output yang diharapkan:
```
✔ health payload exposes runtime information
ℹ tests 1
ℹ pass 1
ℹ fail 0
```

### 8.2 Baca File Test (`tests/health.test.mjs`)

Test ini menggunakan **Node.js built-in test runner** (tanpa library tambahan):

```javascript
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getHealthPayload } from "../lib/health.mjs";

describe("health payload", () => {
  it("exposes runtime information", () => {
    const result = getHealthPayload({
      now: new Date("2025-01-01"),
      uptime: 42,
      env: { APP_VERSION: "1.0.0", APP_ENV: "test" }
    });
    assert.equal(result.status, "ok");
    assert.equal(result.version, "1.0.0");
  });
});
```

### 8.3 Kenapa Test Penting?

```
Tanpa test:
  Developer ubah kode → push → deploy → ERROR di production 💥

Dengan test:
  Developer ubah kode → npm test → GAGAL → perbaiki dulu ✅
```

Di pertemuan selanjutnya, test ini akan dijalankan **otomatis** di:
- Dockerfile (stage builder): `RUN npm run test && npm run build`
- CI/CD pipeline: step "test" sebelum "build"

---

## 📚 Praktikum Bagian 9: Build Production

### 9.1 Build

```powershell
npm run build
```

Output:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/deployments
└ ƒ /api/health

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

### 9.2 Apa yang Dihasilkan?

```
.next/
├── standalone/        ← Server production minimal
│   └── server.js      ← Entry point (ini yang dijalankan Docker)
└── static/            ← CSS dan JS yang sudah di-bundle
```

Karena `output: "standalone"` di `next.config.mjs`, Next.js menghasilkan **server.js yang mandiri** — tidak butuh `node_modules` lengkap. Ini yang membuat Docker image sangat kecil.

### 9.3 Konfigurasi (`next.config.mjs`)

Buka file `next.config.mjs` — baca komentar di dalamnya.

| Opsi | Nilai | Fungsi |
|------|-------|--------|
| `output` | `"standalone"` | Build server.js mandiri untuk Docker |
| `reactStrictMode` | `true` | Deteksi bug di development |
| `turbopack.root` | path project | Root folder untuk bundler |

---

## 📝 Ringkasan Konsep

| No | Konsep | File | Penjelasan Singkat |
|----|--------|------|--------------------|
| 1 | Layout | `app/layout.js` | Bungkus global untuk semua halaman |
| 2 | Halaman | `app/page.js` | URL "/" — JSX, className, env var, .map() |
| 3 | CSS Variables | `app/globals.css` | Definisi warna di `:root`, pakai `var()` |
| 4 | Flexbox | `app/globals.css` | Layout 1D (`.heroActions`) |
| 5 | CSS Grid | `app/globals.css` | Layout 2D (`.metrics`, `.contentGrid`) |
| 6 | Responsive | `app/globals.css` | `@media` untuk layar kecil |
| 7 | Component | `components/*.js` | UI yang bisa dipakai ulang |
| 8 | Props | `components/*.js` | Data dari parent ke child |
| 9 | Data Layer | `lib/*.js` | Pemisahan data dari UI |
| 10 | API Route | `app/api/*/route.js` | Backend endpoint (JSON) |
| 11 | Env Variable | `process.env.*` | Konfigurasi tanpa ubah kode |
| 12 | Test | `tests/*.test.mjs` | Validasi otomatis |
| 13 | Build | `next.config.mjs` | `standalone` untuk Docker |

---

## 🏠 Tugas Mandiri

1. **Halaman baru**: Buat halaman `/mahasiswa` yang menampilkan daftar mahasiswa sekelasmu menggunakan component `MahasiswaCard` dan data dari `lib/mahasiswaData.js`
2. **API route baru**: Buat endpoint `/api/mahasiswa` yang mengembalikan data mahasiswa dalam format JSON
3. **Styling**: Tambahkan minimal 3 class CSS baru di `globals.css` dengan menggunakan CSS variables
4. **Responsive**: Pastikan halaman mahasiswa tampil rapi di mobile (gunakan `@media`)
5. **Environment variable**: Tambahkan `NEXT_PUBLIC_KELAS` di `.env.local` dan tampilkan di halaman

**Kumpulkan**: Push ke repository GitHub Classroom masing-masing.

---

## 🔗 Referensi

- [Next.js Documentation](https://nextjs.org/docs) — Dokumentasi resmi
- [React Documentation](https://react.dev) — Belajar React dari dasar
- [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS) — Referensi CSS lengkap
- [App Router Guide](https://nextjs.org/docs/app) — Panduan App Router Next.js

---

## ⏭️ Pertemuan Selanjutnya

Di **Pertemuan 1**, kita mulai membahas **Cloud-Native Principles** dan bagaimana aplikasi Next.js ini cocok dengan arsitektur Cloud-Native (12-Factor App, containerization). Aplikasi yang sudah kamu pahami di sini akan menjadi bahan yang dimasukkan ke Docker.
