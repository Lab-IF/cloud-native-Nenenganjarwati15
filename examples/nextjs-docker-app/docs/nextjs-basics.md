# Materi Awal: Next.js sebelum Docker

Gunakan materi ini sebelum masuk ke Docker. Targetnya mahasiswa paham dulu apa isi aplikasi Next.js yang nanti akan dimasukkan ke container.

## Tujuan pembelajaran

Setelah praktik ini, mahasiswa mampu:

1. Menjalankan project Next.js secara lokal.
2. Memahami struktur folder App Router.
3. Mengubah halaman UI di `app\page.js`.
4. Mengatur CSS global di `app\globals.css`.
5. Membuat component sederhana di folder `components`.
6. Memahami data/helper di folder `lib`.
7. Membaca API route di `app\api`.
8. Memakai environment variable sederhana.

## 1. Jalankan project

```powershell
cd "cloud-native-practicum\examples\nextjs-docker-app"
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

Command penting:

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Menjalankan development server dengan hot reload |
| `npm test` | Menjalankan test bawaan Node.js |
| `npm run build` | Membuat build production Next.js |
| `npm start` | Menjalankan hasil build production |

## 2. Konsep singkat Next.js

Next.js adalah framework React untuk membuat aplikasi web production. Di contoh ini, Next.js dipakai untuk tiga hal utama:

| Fitur | Contoh di project |
|-------|-------------------|
| Page routing | `app\page.js` menjadi halaman `/` |
| Layout | `app\layout.js` membungkus semua halaman |
| API endpoint | `app\api\health\route.js` menjadi `/api/health` |

Bedanya dengan React/Vite biasa: Next.js sudah membawa routing, API route, build production server, dan optimasi aplikasi.

## 3. Struktur folder yang diajarkan

```text
nextjs-docker-app/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── api/
│       ├── health/route.js
│       └── deployments/route.js
├── components/
│   ├── DeploymentStep.js
│   └── MetricCard.js
├── lib/
│   ├── health.mjs
│   └── teachingData.js
├── public/
│   └── container.txt
├── tests/
│   └── health.test.mjs
├── next.config.mjs
├── package.json
├── Dockerfile
└── compose.yaml
```

| Folder/file | Penjelasan |
|-------------|------------|
| `app` | Routing utama Next.js App Router |
| `app\layout.js` | Layout global dan import CSS |
| `app\page.js` | Halaman utama yang tampil di `/` |
| `app\globals.css` | CSS global untuk seluruh aplikasi |
| `app\api\...\route.js` | Endpoint API |
| `components` | Component React yang bisa dipakai ulang |
| `lib` | Data dan function helper |
| `public` | File statis yang bisa diakses dari browser |
| `tests` | Test otomatis untuk CI/CD |

## 4. File pertama: `app\layout.js`

```js
import "./globals.css";

export const metadata = {
  title: "Next.js Docker App",
  description: "Contoh implementasi Next.js yang siap dikemas dengan Docker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```

Yang perlu dijelaskan:

| Bagian | Fungsi |
|--------|--------|
| `import "./globals.css"` | Memasang CSS global ke seluruh halaman |
| `metadata` | Mengatur title dan description halaman |
| `children` | Isi halaman yang sedang dibuka |
| `<html lang="id">` | Menandai bahasa halaman sebagai Indonesia |

## 5. Halaman utama: `app\page.js`

`app\page.js` adalah halaman `/`.

Di file ini mahasiswa bisa melihat:

1. Import component dari `components`.
2. Import data dari `lib\teachingData.js`.
3. Membaca environment variable.
4. Mengembalikan JSX untuk UI.

Contoh bagian environment variable:

```js
const message =
  process.env.NEXT_PUBLIC_APP_MESSAGE ||
  "Aplikasi ini punya UI, API route, env var, dan health check untuk didockerisasi.";
```

Penjelasan:

| Bagian | Arti |
|--------|------|
| `process.env` | Membaca environment variable |
| `NEXT_PUBLIC_` | Prefix agar variable boleh dipakai di sisi browser |
| `||` | Nilai default jika env belum diatur |

## 6. CSS: `app\globals.css`

Project ini memakai CSS biasa dulu, bukan Tailwind. Ini lebih cocok untuk pengantar karena mahasiswa bisa melihat hubungan langsung antara `className` di JSX dan selector CSS.

Contoh di JSX:

```jsx
<section className="hero">
  <p className="eyebrow">Cloud Native + DevOps Practicum</p>
  <h1>Next.js yang benar-benar siap masuk container</h1>
</section>
```

Contoh di CSS:

```css
.hero {
  padding: 36px;
  border: 1px solid var(--line);
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(14, 165, 233, 0.08));
}

.eyebrow {
  color: var(--brand);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
```

Poin CSS yang bisa diajarkan:

| Materi CSS | Contoh di `globals.css` |
|------------|--------------------------|
| CSS variable | `:root { --bg: #08111f; }` |
| Class selector | `.hero`, `.panel`, `.metricCard` |
| Flexbox | `.heroActions { display: flex; }` |
| CSS Grid | `.heroGrid`, `.metrics`, `.contentGrid` |
| Responsive design | `@media (max-width: 900px)` |
| Pseudo-element | `.checkList li::before` |

Cara menambah style baru:

1. Tambahkan `className` di JSX.
2. Buat selector di `app\globals.css`.
3. Simpan file, browser akan update otomatis saat `npm run dev`.

Contoh latihan:

```jsx
<div className="studentBadge">Kelas Next.js</div>
```

Lalu tambahkan CSS:

```css
.studentBadge {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(52, 211, 153, 0.16);
  color: #34d399;
  font-weight: 800;
}
```

Catatan penting:

| Pendekatan CSS | Kapan dipakai |
|----------------|---------------|
| Global CSS | Cocok untuk reset, theme, layout global, dan materi awal |
| CSS Modules | Cocok saat style ingin dibatasi hanya untuk satu component |
| Tailwind CSS | Cocok untuk utility-first styling, tetapi belum dipakai di contoh ini |

## 7. Component: folder `components`

Component dipakai agar UI tidak menumpuk semua di `page.js`.

Contoh `components\MetricCard.js`:

```js
export default function MetricCard({ value, label }) {
  return (
    <article className="metricCard">
      <span className="metricValue">{value}</span>
      <span className="metricLabel">{label}</span>
    </article>
  );
}
```

Cara menjelaskan:

| Konsep | Penjelasan |
|--------|------------|
| `function MetricCard` | Component React |
| `{ value, label }` | Props yang dikirim dari parent |
| `className` | Class CSS, bukan `class` seperti HTML biasa |
| `export default` | Agar component bisa di-import di file lain |

Di `app\page.js`, component dipakai seperti ini:

```jsx
{teachingMetrics.map((metric) => (
  <MetricCard key={metric.label} {...metric} />
))}
```

## 8. Data dan helper: folder `lib`

Folder `lib` berisi logic atau data yang tidak harus ditulis langsung di halaman.

Contoh:

| File | Fungsi |
|------|--------|
| `lib\teachingData.js` | Data card, checklist, dan step deployment |
| `lib\health.mjs` | Function untuk membuat payload health check |

Kenapa ini penting:

1. `page.js` lebih rapi.
2. Data bisa dipakai ulang.
3. Function lebih mudah dites.
4. Pipeline CI/CD bisa mengetes logic tanpa membuka browser.

## 9. API route: `app\api`

Next.js bisa membuat backend endpoint sederhana.

Contoh `app\api\health\route.js`:

```js
import { NextResponse } from "next/server";
import { getHealthPayload } from "../../../lib/health.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHealthPayload());
}
```

Endpoint yang tersedia:

| URL | Fungsi |
|-----|--------|
| `/api/health` | Mengecek status aplikasi |
| `/api/deployments` | Mengembalikan data step deployment |

Coba saat dev server berjalan:

```powershell
curl http://localhost:3000/api/health
curl http://localhost:3000/api/deployments
```

Poin mengajar:

1. File `route.js` menentukan HTTP handler.
2. `GET()` berarti endpoint menerima request GET.
3. `NextResponse.json()` mengembalikan JSON response.
4. Endpoint ini nanti dipakai Docker Compose dan pipeline sebagai health/smoke test.

## 10. Environment variable

Environment variable membuat aplikasi bisa berubah tanpa mengubah kode.

Contoh di development:

```powershell
$env:NEXT_PUBLIC_APP_MESSAGE="Halo dari local dev"
npm run dev
```

Contoh saat Docker nanti:

```powershell
docker run --rm -p 3000:3000 `
  -e APP_ENV=docker `
  -e NEXT_PUBLIC_APP_MESSAGE="Halo dari Docker" `
  nextjs-docker-app:kelas
```

Aturan penting:

| Prefix | Bisa dibaca di browser? | Contoh |
|--------|--------------------------|--------|
| `NEXT_PUBLIC_` | Ya | `NEXT_PUBLIC_APP_MESSAGE` |
| Tanpa prefix | Tidak, hanya server | `APP_ENV`, `APP_VERSION` |

## 11. Public assets

Folder `public` dipakai untuk file statis.

Contoh:

```text
public\container.txt
```

Bisa dibuka di browser:

```text
http://localhost:3000/container.txt
```

Kalau ingin menambahkan gambar:

```text
public\logo.png
```

Lalu akses:

```text
/logo.png
```

## 12. Alur mengajar yang disarankan

| Urutan | Materi | Demo |
|--------|--------|------|
| 1 | Apa itu Next.js | Jelaskan React + routing + API route |
| 2 | Run project | `npm install`, `npm run dev` |
| 3 | Struktur folder | Buka `app`, `components`, `lib`, `public` |
| 4 | Page | Edit teks di `app\page.js` |
| 5 | CSS | Edit warna/class di `app\globals.css` |
| 6 | Component | Tambah data di `lib\teachingData.js` |
| 7 | API route | Buka `/api/health` |
| 8 | Env variable | Ubah `NEXT_PUBLIC_APP_MESSAGE` |
| 9 | Production build | `npm run build`, `npm start` |
| 10 | Docker bridge | Jelaskan bahwa semua ini yang akan masuk image |

## 13. Latihan mahasiswa

### Latihan 1: Ubah teks hero

Edit `app\page.js`, ubah judul utama dan refresh browser.

### Latihan 2: Tambah feature card

Edit `lib\teachingData.js`, tambahkan satu item baru di `featureCards`.

### Latihan 3: Tambah CSS class

Tambahkan badge sederhana di `app\page.js`, lalu style di `app\globals.css`.

### Latihan 4: Buat halaman baru

Buat file:

```text
app\about\page.js
```

Isi:

```js
export default function AboutPage() {
  return (
    <main>
      <section className="panel">
        <p className="eyebrow">Tentang</p>
        <h1>Halaman About</h1>
        <p className="lead">Ini halaman baru dari App Router Next.js.</p>
      </section>
    </main>
  );
}
```

Buka:

```text
http://localhost:3000/about
```

### Latihan 5: Tambah API route baru

Buat file:

```text
app\api\students\route.js
```

Isi:

```js
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    total: 30,
    className: "Cloud Native Practicum"
  });
}
```

Buka:

```text
http://localhost:3000/api/students
```

## 14. Checklist sebelum masuk Docker

Pastikan mahasiswa bisa menjawab:

1. File mana yang menjadi halaman utama?
2. Di mana CSS global di-import?
3. Apa beda `components` dan `lib`?
4. Bagaimana cara membuat API endpoint?
5. Apa fungsi environment variable?
6. Apa beda `npm run dev`, `npm run build`, dan `npm start`?

Setelah ini baru masuk ke Dockerfile. Tekankan bahwa Docker akan membungkus aplikasi Next.js yang sudah bisa jalan, bukan menggantikan pemahaman aplikasi.
