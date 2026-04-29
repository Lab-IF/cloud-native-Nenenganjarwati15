# Pertemuan 1: Cloud-Native Principles + Pengenalan Next.js

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, mahasiswa diharapkan mampu:
1. Memahami konsep Cloud-Native architecture
2. Mengenal 12-Factor App principles
3. Memahami perbedaan traditional vs cloud-native applications
4. Menjalankan aplikasi Next.js secara lokal
5. Memahami struktur folder App Router Next.js
6. Membuat halaman, component, CSS, dan API route sederhana

## 📚 Teori: Apa itu Cloud-Native?

Cloud-Native adalah pendekatan untuk building dan running applications yang memanfaatkan keuntungan dari cloud computing delivery model.

**Karakteristik:**
- **Containerized**: Packaged dalam containers
- **Dynamically orchestrated**: Automated container lifecycle
- **Microservices-oriented**: Loosely coupled services
- **API-driven**: Communication via APIs

### Cloud-Native Architecture

```
┌─────────────────────────────────────────┐
│     Load Balancer / API Gateway         │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼────┐  ┌────▼─────┐  ┌───▼────┐
│Service │  │ Service  │  │Service │
│   A    │  │    B     │  │   C    │
│(Docker)│  │ (Docker) │  │(Docker)│
└────┬───┘  └────┬─────┘  └───┬────┘
     │           │            │
     └───────────┼────────────┘
                 │
        ┌────────▼─────────┐
        │    Database      │
        └──────────────────┘
```

### 12-Factor App Principles

1. **Codebase**: One codebase tracked in version control
2. **Dependencies**: Explicitly declare dependencies
3. **Config**: Store config in environment variables
4. **Backing Services**: Treat as attached resources
5. **Build, Release, Run**: Separate stages
6. **Processes**: Stateless processes
7. **Port Binding**: Export services via port binding
8. **Concurrency**: Scale out via process model
9. **Disposability**: Fast startup and graceful shutdown
10. **Dev/Prod Parity**: Keep development and production similar
11. **Logs**: Treat logs as event streams
12. **Admin Processes**: Run as one-off processes

### Traditional vs Cloud-Native

| Aspect | Traditional | Cloud-Native |
|--------|------------|--------------|
| Architecture | Monolithic | Microservices |
| Deployment | Manual | Automated (CI/CD) |
| Scaling | Vertical (bigger servers) | Horizontal (more instances) |
| Infrastructure | Physical/VMs | Containers |
| State | Stateful | Stateless |
| Configuration | Files | Environment variables |
| Updates | Downtime | Rolling updates |

---

## 📚 Pengenalan Next.js

### Apa itu Next.js?

Next.js adalah **framework React untuk production**. Berbeda dengan React biasa (Create React App / Vite) yang hanya menghasilkan client-side app, Next.js sudah menyediakan:

| Fitur | React/Vite biasa | Next.js |
|-------|------------------|---------|
| Routing | Perlu install react-router | Sudah built-in (App Router) |
| API backend | Tidak ada | Ada (API Route) |
| Build production | Static files saja | Server production siap deploy |
| Rendering | Client-side only | Server + Client |
| Optimasi | Manual | Otomatis (image, font, code splitting) |

Next.js menggunakan **App Router** — sistem routing berbasis folder di dalam direktori `app/`. Setiap file `page.js` di dalam folder `app/` otomatis menjadi halaman web.

```
app/page.js              →  http://localhost:3000/
app/about/page.js        →  http://localhost:3000/about
app/api/health/route.js  →  http://localhost:3000/api/health
```

### Kenapa Next.js untuk Cloud-Native?

Next.js cocok untuk materi cloud-native karena:
- **Punya UI** — mahasiswa bisa lihat hasilnya di browser
- **Punya API** — bisa dipakai sebagai health check di Docker/K8s
- **Punya environment variable** — konfigurasi bisa diubah tanpa edit kode
- **Punya build production** — `npm run build` menghasilkan server mandiri
- **Siap container** — output standalone cocok untuk Docker image kecil

---

## 📝 Praktikum

### Langkah 1: Struktur Folder Next.js

Buka project contoh di `../examples/nextjs-docker-app`. Berikut strukturnya:

```text
nextjs-docker-app/
├── app/
│   ├── layout.js          # Layout global + import CSS
│   ├── page.js            # Halaman utama (/)
│   ├── globals.css        # CSS global seluruh aplikasi
│   └── api/
│       ├── health/route.js       # GET /api/health
│       └── deployments/route.js  # GET /api/deployments
├── components/
│   ├── DeploymentStep.js  # Component card langkah deploy
│   └── MetricCard.js      # Component card metrik
├── lib/
│   ├── health.mjs         # Function payload health check
│   └── teachingData.js    # Data card, checklist, step
├── public/                # File statis (akses langsung dari browser)
├── tests/
│   └── health.test.mjs   # Test otomatis (Node.js test runner)
├── next.config.mjs        # Konfigurasi Next.js (standalone output)
├── package.json           # Dependencies dan scripts
├── Dockerfile             # Multi-stage build (untuk pertemuan 2-3)
└── compose.yaml           # Docker Compose (untuk pertemuan 4)
```

| Folder/File | Penjelasan |
|-------------|------------|
| `app/` | Routing utama Next.js App Router |
| `app/layout.js` | Layout global, import CSS, metadata halaman |
| `app/page.js` | Halaman utama yang tampil di `/` |
| `app/globals.css` | CSS global untuk seluruh aplikasi |
| `app/api/.../route.js` | Endpoint API (backend sederhana) |
| `components/` | Component React yang bisa dipakai ulang |
| `lib/` | Data dan function helper (bukan halaman) |
| `public/` | File statis yang bisa diakses langsung dari browser |
| `tests/` | Test otomatis untuk CI/CD |
| `next.config.mjs` | Konfigurasi Next.js (`output: "standalone"`) |
| `package.json` | Dependencies dan npm scripts |

### Langkah 2: Menjalankan Project

```powershell
cd "cloud-native-practicum\examples\nextjs-docker-app"
npm install
npm run dev
```

Buka browser: `http://localhost:3000`

**Daftar command penting:**

| Command | Fungsi |
|---------|--------|
| `npm install` | Install semua dependency dari `package.json` |
| `npm run dev` | Menjalankan development server dengan hot reload |
| `npm test` | Menjalankan test bawaan (Node.js test runner) |
| `npm run build` | Membuat build production Next.js |
| `npm start` | Menjalankan hasil build production |

Coba juga akses API endpoint:

```powershell
curl http://localhost:3000/api/health
curl http://localhost:3000/api/deployments
```

### Langkah 3: File Pertama — `layout.js`

`app/layout.js` adalah **layout global** yang membungkus semua halaman:

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

| Bagian | Fungsi |
|--------|--------|
| `import "./globals.css"` | Memasang CSS global ke seluruh halaman |
| `metadata` | Mengatur title dan description halaman (SEO) |
| `{ children }` | Isi halaman yang sedang dibuka (misalnya `page.js`) |
| `<html lang="id">` | Menandai bahasa halaman sebagai Indonesia |

### Langkah 4: Halaman Utama — `page.js`

`app/page.js` adalah halaman `/`. Di file ini kita bisa melihat:

1. **Import component** dari folder `components/`
2. **Import data** dari `lib/teachingData.js`
3. **Membaca environment variable**
4. **Mengembalikan JSX** untuk UI

```js
import DeploymentStep from "../components/DeploymentStep.js";
import MetricCard from "../components/MetricCard.js";
import {
  deploymentSteps, featureCards, runtimeChecks, teachingMetrics
} from "../lib/teachingData.js";

export default function Home() {
  const dockerImage = process.env.NEXT_PUBLIC_DOCKER_IMAGE || "nextjs-docker-app:kelas";
  const message =
    process.env.NEXT_PUBLIC_APP_MESSAGE ||
    "Aplikasi ini punya UI, API route, env var, dan health check.";

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Cloud Native + DevOps Practicum</p>
        <h1>Next.js yang benar-benar siap masuk container</h1>
        <p className="lead">{message}</p>
        {/* ... komponen lainnya ... */}
      </section>
    </main>
  );
}
```

**Poin penting:**
- `className` digunakan di JSX, bukan `class` seperti HTML biasa
- `process.env.NEXT_PUBLIC_...` membaca environment variable
- `||` memberikan nilai default jika env belum diatur
- Component dipanggil seperti tag HTML: `<MetricCard value="UI" label="..." />`

### Langkah 5: CSS di Next.js

Project ini memakai **CSS global biasa** (bukan Tailwind). Ini cocok untuk pengantar karena mahasiswa bisa melihat hubungan langsung antara `className` di JSX dan selector CSS.

#### CSS Variables

```css
:root {
  color-scheme: dark;
  --bg: #08111f;
  --panel: rgba(15, 23, 42, 0.82);
  --text: #e5eefb;
  --brand: #38bdf8;
  --success: #34d399;
}
```

CSS variable didefinisikan di `:root` dan dipakai di mana saja dengan `var(--nama)`.

#### Class Selector

Di JSX:
```jsx
<section className="hero">
  <p className="eyebrow">Cloud Native + DevOps Practicum</p>
</section>
```

Di CSS:
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
  text-transform: uppercase;
}
```

#### Flexbox

```css
.heroActions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
```

#### CSS Grid

```css
.heroGrid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 28px;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.contentGrid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
}
```

#### Responsive Design

```css
@media (max-width: 900px) {
  .heroGrid,
  .contentGrid,
  .metrics,
  .steps {
    grid-template-columns: 1fr;
  }
}
```

#### Cara Menambah Style Baru

1. Tambahkan `className` di JSX:
```jsx
<div className="studentBadge">Kelas Next.js</div>
```

2. Buat selector di `app/globals.css`:
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

3. Simpan file — browser akan update otomatis saat `npm run dev`.

#### Perbandingan Pendekatan CSS

| Pendekatan | Kapan dipakai | Contoh |
|------------|---------------|--------|
| Global CSS | Reset, theme, layout global, materi awal | `app/globals.css` |
| CSS Modules | Style dibatasi untuk satu component | `Button.module.css` |
| Tailwind CSS | Utility-first, project besar | `className="flex gap-4"` |

### Langkah 6: Component React

Component dipakai agar UI tidak menumpuk semua di `page.js`.

Contoh `components/MetricCard.js`:

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

| Konsep | Penjelasan |
|--------|------------|
| `function MetricCard` | Component React (nama harus diawali huruf kapital) |
| `{ value, label }` | Props — data yang dikirim dari parent |
| `className` | Class CSS, bukan `class` seperti HTML biasa |
| `export default` | Agar component bisa di-import di file lain |

Di `page.js`, component dipakai seperti ini:

```jsx
{teachingMetrics.map((metric) => (
  <MetricCard key={metric.label} {...metric} />
))}
```

### Langkah 7: Data & Helper — Folder `lib`

Folder `lib/` berisi logic atau data yang tidak harus ditulis langsung di halaman.

| File | Fungsi |
|------|--------|
| `lib/teachingData.js` | Data card, checklist, dan step deployment |
| `lib/health.mjs` | Function untuk membuat payload health check |

**Kenapa dipisah dari halaman?**
1. `page.js` lebih rapi
2. Data bisa dipakai ulang di beberapa halaman
3. Function lebih mudah dites (`npm test` mengetes `lib/health.mjs`)
4. Pipeline CI/CD bisa mengetes logic tanpa membuka browser

### Langkah 8: API Route

Next.js bisa membuat backend endpoint sederhana di dalam folder `app/api/`.

Contoh `app/api/health/route.js`:

```js
import { NextResponse } from "next/server";
import { getHealthPayload } from "../../../lib/health.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHealthPayload());
}
```

| Konsep | Penjelasan |
|--------|------------|
| `route.js` | File ini menandakan endpoint API (bukan halaman) |
| `GET()` | Function handler untuk HTTP GET request |
| `NextResponse.json()` | Mengembalikan JSON response |
| `dynamic = "force-dynamic"` | Endpoint selalu fresh, tidak di-cache |

Endpoint yang tersedia:

| URL | Fungsi |
|-----|--------|
| `/api/health` | Status aplikasi, uptime, environment |
| `/api/deployments` | Data step deployment untuk demo |

### Langkah 9: Environment Variable

Environment variable membuat aplikasi bisa berubah tanpa mengubah kode.

```powershell
# Set env lalu jalankan dev server
$env:NEXT_PUBLIC_APP_MESSAGE="Halo dari local dev"
npm run dev
```

| Prefix | Bisa dibaca di browser? | Contoh |
|--------|--------------------------|--------|
| `NEXT_PUBLIC_` | ✅ Ya | `NEXT_PUBLIC_APP_MESSAGE` |
| Tanpa prefix | ❌ Tidak (hanya server/API) | `APP_ENV`, `APP_VERSION` |

Di kode:
```js
const message = process.env.NEXT_PUBLIC_APP_MESSAGE || "Nilai default";
```

---

## 📚 Next.js dan 12-Factor App

Berikut bagaimana Next.js sudah mengikuti prinsip 12-Factor:

| Factor | Prinsip | Implementasi di Next.js |
|--------|---------|-------------------------|
| **2 — Dependencies** | Deklarasi eksplisit | `package.json` + `npm ci` |
| **3 — Config** | Config di env variable | `process.env` + prefix `NEXT_PUBLIC_` |
| **5 — Build, Release, Run** | Pisahkan tahap build dan run | `npm run build` → folder `.next/standalone` |
| **7 — Port Binding** | Expose service via port | Next.js bind ke port 3000 |
| **9 — Disposability** | Fast startup & graceful shutdown | Node.js startup cepat, handle SIGTERM |
| **10 — Dev/Prod Parity** | Dev dan prod mirip | `npm run dev` vs `npm start` sama-sama Node.js |
| **11 — Logs** | Log sebagai event stream | `console.log()` ke stdout |

### Contoh Nyata

**Factor 2 — Dependencies:**
```json
{
  "dependencies": {
    "next": "^16.2.4",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  }
}
```
Semua dependency tercatat di `package.json`, di-install dengan `npm ci` (repeatable).

**Factor 3 — Config:**
```js
const message = process.env.NEXT_PUBLIC_APP_MESSAGE || "Default";
const env = process.env.APP_ENV || "development";
```
Konfigurasi dibaca dari environment, bukan hardcode di kode.

**Factor 5 — Build, Release, Run:**
```powershell
npm run build    # Build: compile Next.js
npm start        # Run: jalankan server production
```
Tahap build dan run terpisah. Nanti di Docker, ini menjadi stage berbeda di Dockerfile.

---

## ☁️ Cloud-Native Readiness Checklist (Next.js)

```markdown
- [x] Containerized: Siap dibungkus Docker (ada Dockerfile)
- [x] Stateless: Tidak menyimpan state lokal di filesystem
- [x] Config via ENV: Konfigurasi lewat environment variable
- [x] Health Endpoints: /api/health tersedia
- [x] Logging: console.log ke stdout
- [x] 12-Factor: Mengikuti prinsip 12-factor
- [x] API-driven: REST API endpoint tersedia
- [x] Horizontally Scalable: Bisa jalankan banyak instance
- [x] Versioned: Version di package.json
- [ ] Graceful Shutdown: Akan dipelajari di pertemuan selanjutnya
```

---

## 💪 Tugas Praktikum

### Tugas 1: Setup Environment (20 poin)

1. Install semua tools yang diperlukan:
   - **Node.js** (v20 atau lebih baru) — [nodejs.org](https://nodejs.org)
   - **Docker Desktop** — [docker.com](https://www.docker.com/products/docker-desktop/)
   - **Git** — [git-scm.com](https://git-scm.com)
   - **VS Code** — [code.visualstudio.com](https://code.visualstudio.com)
2. Verify instalasi dengan screenshot:
   - `node --version`
   - `npm --version`
   - `docker --version`
   - `git --version`
3. Clone repository praktikum
4. Dokumentasikan langkah instalasi yang dilakukan

### Tugas 2: Jalankan dan Eksplorasi Next.js App (25 poin)

1. Jalankan project `../examples/nextjs-docker-app`:
   ```powershell
   cd "cloud-native-practicum\examples\nextjs-docker-app"
   npm install
   npm run dev
   ```
2. Screenshot halaman utama di browser (`http://localhost:3000`)
3. Screenshot response API health (`http://localhost:3000/api/health`)
4. Screenshot response API deployments (`http://localhost:3000/api/deployments`)
5. Jalankan test dan screenshot hasilnya:
   ```powershell
   npm test
   ```
6. Jelaskan secara singkat:
   - Apa fungsi file `app/layout.js`?
   - Apa fungsi file `app/page.js`?
   - Apa bedanya folder `components/` dan `lib/`?
   - Bagaimana cara membuat API endpoint?

### Tugas 3: Modifikasi Next.js App (30 poin)

Lakukan modifikasi berikut pada project Next.js:

1. **Ubah hero text** (5 poin):
   Edit `app/page.js`, ubah judul dan deskripsi utama.

2. **Tambah feature card** (5 poin):
   Edit `lib/teachingData.js`, tambahkan 1 item baru di array `featureCards`.

3. **Buat halaman /about** (10 poin):
   Buat file `app/about/page.js`:
   ```js
   export default function AboutPage() {
     return (
       <main>
         <section className="panel">
           <p className="eyebrow">Tentang</p>
           <h1>Halaman About</h1>
           <p className="lead">
             Halaman ini dibuat oleh [Nama Anda] - [NIM].
             Ini adalah contoh routing di Next.js App Router.
           </p>
         </section>
       </main>
     );
   }
   ```

4. **Buat API route /api/students** (10 poin):
   Buat file `app/api/students/route.js`:
   ```js
   import { NextResponse } from "next/server";

   export function GET() {
     return NextResponse.json({
       nama: "[Nama Anda]",
       nim: "[NIM Anda]",
       kelas: "Cloud Native Practicum",
       semester: 5
     });
   }
   ```
   Akses di browser: `http://localhost:3000/api/students`

### Tugas 4: Analisis 12-Factor pada Next.js App (25 poin)

Analisis project `nextjs-docker-app` berdasarkan 12-Factor App:

1. Buat tabel dengan kolom:
   - Nama factor
   - Status (Ya / Tidak / Sebagian)
   - Bukti / penjelasan
   - Rekomendasi improvement (jika ada)

2. Minimal analisis 6 factor berikut:
   - Factor 1 (Codebase)
   - Factor 2 (Dependencies)
   - Factor 3 (Config)
   - Factor 5 (Build, Release, Run)
   - Factor 7 (Port Binding)
   - Factor 11 (Logs)

3. Kesimpulan: Apakah aplikasi ini cloud-native ready? Jelaskan alasannya.

## 📤 Cara Mengumpulkan

1. **Tugas 1**: Screenshots + dokumentasi dalam PDF
2. **Tugas 2**: Screenshots + jawaban pertanyaan
3. **Tugas 3**: Source code yang sudah dimodifikasi + screenshot hasil
4. **Tugas 4**: Tabel analisis 12-Factor dalam PDF/Markdown
5. Compress: `NIM_Nama_Pertemuan01.zip`
6. Upload ke LMS

## ✅ Kriteria Penilaian

| Aspek | Bobot |
|-------|-------|
| Tugas 1: Environment Setup | 20% |
| Tugas 2: Eksplorasi Next.js | 25% |
| Tugas 3: Modifikasi App | 30% |
| Tugas 4: Analisis 12-Factor | 25% |

## 📚 Referensi

1. [The Twelve-Factor App](https://12factor.net/)
2. [Cloud Native Computing Foundation](https://www.cncf.io/)
3. [Next.js Documentation](https://nextjs.org/docs)
4. [React Documentation](https://react.dev/)
5. [Docker Documentation](https://docs.docker.com/)

## 💡 Tips

- Mulai dengan menjalankan app (`npm run dev`) dan eksplorasi di browser
- Baca kode dari `layout.js` → `page.js` → component → lib → API route
- Gunakan `console.log()` untuk debug
- Hot reload otomatis — edit file, browser langsung update
- Jangan takut mencoba mengubah kode, bisa selalu di-revert dengan Git

---

**Welcome to Cloud-Native! ☁️🚀**

Mulai dari pertemuan ini, kita akan membangun dan mengembangkan aplikasi Next.js ini step by step — dari kode lokal hingga berjalan di Kubernetes.

Jika ada pertanyaan, silakan diskusikan di forum kelas atau hubungi asisten praktikum.
