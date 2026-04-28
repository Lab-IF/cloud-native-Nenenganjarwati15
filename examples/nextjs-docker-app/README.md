# Next.js Docker App

Contoh ini dipakai sebagai bahan ajar untuk menjawab pertanyaan: "Apa yang sebenarnya dimasukkan ke Docker?" Isinya bukan halaman kosong, tetapi aplikasi Next.js kecil yang punya UI, API route, environment variable, health check, test, dan build production.

## Mulai dari materi Next.js dulu

Kalau besok ingin mengajar Next.js sebelum Docker, mulai dari:

```text
docs\nextjs-basics.md
```

Materi itu menjelaskan cara menjalankan project, struktur App Router, `layout.js`, `page.js`, CSS global, component, folder `lib`, API route, environment variable, public assets, dan latihan mahasiswa. Setelah mahasiswa paham isi aplikasinya, lanjutkan ke bagian Docker di README ini.

## Yang dipelajari

| Bagian | Fungsi |
|--------|--------|
| `app\page.js` | UI utama untuk demo browser |
| `app\globals.css` | CSS global untuk layout, warna, responsive grid, dan component style |
| `components\*.js` | Component React yang dipakai ulang oleh halaman |
| `lib\*.js` | Data dan helper agar halaman tidak penuh logic |
| `app\api\health\route.js` | Health endpoint untuk Docker/Compose/CI |
| `app\api\deployments\route.js` | Data JSON untuk menjelaskan alur deployment |
| `Dockerfile` | Multi-stage build Next.js production |
| `compose.yaml` | Menjalankan app dengan environment variable dan health check |
| `tests\health.test.mjs` | Test sederhana untuk pipeline CI |

## Jalankan lokal

```powershell
cd "cloud-native-practicum\examples\nextjs-docker-app"
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Test dan build

```powershell
npm test
npm run build
```

## Build Docker image

```powershell
docker build -t nextjs-docker-app:kelas .
```

Dockerfile memakai 3 tahap:

| Stage | Isi |
|-------|-----|
| `deps` | Install dependency dengan `npm ci` |
| `builder` | Menjalankan test dan `next build` |
| `runner` | Menjalankan output standalone sebagai user non-root |

## Run container

```powershell
docker run --rm -p 3000:3000 `
  -e APP_ENV=docker `
  -e APP_VERSION=0.1.0 `
  -e NEXT_PUBLIC_APP_MESSAGE="Halo dari Docker" `
  nextjs-docker-app:kelas
```

Cek hasilnya:

```powershell
curl http://localhost:3000
curl http://localhost:3000/api/health
```

## Run dengan Docker Compose

```powershell
docker compose up --build
```

Compose akan:

1. Build image dari `Dockerfile`.
2. Menjalankan container pada port `3000`.
3. Mengirim environment variable ke runtime Next.js.
4. Mengecek `/api/health` sebagai health check.

Untuk menghentikan:

```powershell
docker compose down
```

## Alur demo mengajar

1. Tunjukkan `app\page.js` dan endpoint API agar mahasiswa melihat isi aplikasinya.
2. Jalankan `npm test` dan `npm run build` untuk membuktikan kode siap.
3. Baca `Dockerfile` dari atas ke bawah: dependency, build, runtime.
4. Build image dengan `docker build`.
5. Run container dan buka browser.
6. Ubah `NEXT_PUBLIC_APP_MESSAGE` di `compose.yaml`, jalankan ulang, lalu lihat UI berubah.
7. Tunjukkan endpoint `/api/health` sebagai bahan smoke test di pipeline CI/CD.

## Hubungan dengan DevOps/CI-CD

Contoh pipeline untuk app ini ada di:

```text
devops-cicd-practicum\examples\nextjs-docker-pipeline
```
