# Pertemuan 4: Docker Compose — Next.js + Database

## 🎯 Tujuan Pembelajaran

1. Menguasai Docker Compose untuk orchestrate multiple services
2. Menghubungkan Next.js dengan database
3. Network dan volume management
4. Environment variables dan service dependencies
5. Healthcheck dan monitoring

## 📚 Teori Singkat

### Docker Compose

Docker Compose memungkinkan kita mendefinisikan dan menjalankan multi-container application dengan satu file konfigurasi `compose.yaml`.

### Commands Penting

```bash
# Start semua services
docker compose up -d

# Start dengan rebuild image
docker compose up --build

# View logs
docker compose logs -f
docker compose logs web    # Log service tertentu

# Stop services
docker compose down

# Stop dan hapus volumes
docker compose down -v

# Scale service
docker compose up -d --scale web=3

# Lihat status services
docker compose ps
```

## 📝 Praktikum

### Langkah 1: Compose yang Sudah Ada

Buka `../examples/nextjs-docker-app/compose.yaml`:

```yaml
services:
  app:
    build:
      context: .
    image: nextjs-docker-app:kelas
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      APP_ENV: compose
      APP_VERSION: "0.1.0"
      NEXT_PUBLIC_APP_MESSAGE: "Berjalan lewat Compose – env var berhasil masuk."
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 15s
```

Jalankan:

```powershell
cd "cloud-native-practicum\examples\nextjs-docker-app"
docker compose up --build
```

| Fitur Compose | Implementasi |
|---------------|--------------|
| `build.context` | Build image dari Dockerfile Next.js |
| `image` | Nama image yang dihasilkan |
| `ports` | Publish container port 3000 ke host |
| `environment` | Mengubah pesan UI dan metadata `/api/health` |
| `healthcheck` | Memastikan aplikasi responsif, bukan hanya proses hidup |

### Langkah 2: Next.js + PostgreSQL

Sekarang kita tambahkan database. Buat file `compose-fullstack.yaml`:

```yaml
services:
  web:
    build: ../examples/nextjs-docker-app
    ports:
      - "3000:3000"
    environment:
      APP_ENV: compose
      APP_VERSION: "0.2.0"
      NEXT_PUBLIC_APP_MESSAGE: "Next.js + PostgreSQL via Compose"
      DATABASE_URL: postgresql://user:pass@db:5432/practicum
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: practicum
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d practicum"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

### Penjelasan Detail

#### `depends_on` dengan `condition`

```yaml
depends_on:
  db:
    condition: service_healthy
```

Next.js **tidak akan start** sampai PostgreSQL health check berhasil. Ini mencegah error koneksi database saat startup.

#### Healthcheck

```yaml
# Next.js healthcheck — cek API endpoint
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 10s
  timeout: 5s
  retries: 3

# PostgreSQL healthcheck — cek database ready
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U user -d practicum"]
  interval: 5s
  timeout: 3s
  retries: 5
```

| Parameter | Fungsi |
|-----------|--------|
| `test` | Command yang dijalankan untuk cek kesehatan |
| `interval` | Jeda antar pengecekan |
| `timeout` | Batas waktu per pengecekan |
| `retries` | Berapa kali gagal sebelum dianggap unhealthy |
| `start_period` | Waktu tunggu awal sebelum mulai cek |

#### Volumes

```yaml
volumes:
  pgdata:
```

Named volume `pgdata` menyimpan data PostgreSQL. Data **tetap ada** meskipun container dihapus.

```bash
# Data tetap ada setelah restart
docker compose down
docker compose up -d
# Data PostgreSQL masih ada!

# Data dihapus hanya jika pakai flag -v
docker compose down -v
```

#### Networks

Docker Compose otomatis membuat network untuk semua services. Service bisa saling akses menggunakan nama service sebagai hostname:

```
web → db:5432  (PostgreSQL)
web → redis:6379  (Redis, jika ada)
```

### Langkah 3: Tambah Redis (Cache)

Extend compose dengan Redis:

```yaml
services:
  web:
    build: ../examples/nextjs-docker-app
    ports:
      - "3000:3000"
    environment:
      APP_ENV: compose
      DATABASE_URL: postgresql://user:pass@db:5432/practicum
      REDIS_URL: redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: practicum
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d practicum"]
      interval: 5s
      timeout: 3s
      retries: 5

  cache:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
  redis-data:
```

### Langkah 4: Compose Commands Lengkap

```bash
# Start semua services di background
docker compose -f compose-fullstack.yaml up -d

# Lihat status dan healthcheck
docker compose -f compose-fullstack.yaml ps

# Lihat logs Next.js saja
docker compose -f compose-fullstack.yaml logs web

# Masuk ke container PostgreSQL
docker compose -f compose-fullstack.yaml exec db psql -U user -d practicum

# Restart satu service
docker compose -f compose-fullstack.yaml restart web

# Stop semua
docker compose -f compose-fullstack.yaml down
```

## 💪 Tugas Praktikum

### Tugas 1: Jalankan Compose Next.js (20 poin)

1. Jalankan `compose.yaml` dari `../examples/nextjs-docker-app`
2. Screenshot:
   - Halaman utama di browser
   - Output `docker compose ps` (perhatikan status healthcheck)
   - Response `/api/health` — perhatikan `APP_ENV: compose`
3. Ubah `NEXT_PUBLIC_APP_MESSAGE` di compose, rebuild, screenshot perubahan

### Tugas 2: Next.js + PostgreSQL (35 poin)

1. Buat `compose-fullstack.yaml` dengan Next.js + PostgreSQL
2. Jalankan dan verifikasi:
   - Next.js bisa diakses di browser
   - PostgreSQL berjalan dan healthy
   - `depends_on` bekerja (Next.js menunggu DB siap)
3. Masuk ke container PostgreSQL dan buat tabel sederhana:
   ```sql
   CREATE TABLE students (
     id SERIAL PRIMARY KEY,
     nim VARCHAR(20),
     nama VARCHAR(100)
   );
   INSERT INTO students (nim, nama) VALUES ('12345', 'Nama Anda');
   ```
4. Stop dan restart compose — buktikan data masih ada (volume persistent)
5. Screenshot semua langkah

### Tugas 3: Extend dengan Redis (25 poin)

1. Tambahkan Redis ke compose dari Tugas 2
2. Verifikasi Redis berjalan:
   ```bash
   docker compose exec cache redis-cli ping
   ```
3. Set dan get value di Redis:
   ```bash
   docker compose exec cache redis-cli SET greeting "Hello from Redis"
   docker compose exec cache redis-cli GET greeting
   ```
4. Screenshot dan dokumentasikan

### Tugas 4: Monitoring dengan Compose (20 poin)

1. Tambahkan Adminer (database web UI) ke compose:
   ```yaml
   adminer:
     image: adminer
     ports:
       - "8080:8080"
     depends_on:
       - db
   ```
2. Akses Adminer di `http://localhost:8080`
3. Login ke PostgreSQL lewat Adminer
4. Screenshot dan dokumentasikan arsitektur lengkap

## 📚 Referensi

1. [Docker Compose Documentation](https://docs.docker.com/compose/)
2. [Compose File Reference](https://docs.docker.com/reference/compose-file/)
3. [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
4. [Redis Docker Image](https://hub.docker.com/_/redis)

---

**Compose It! 🎼**

Sekarang Next.js bisa berjalan bersama database dan cache dalam satu perintah. Di Pertemuan 5, kita akan push image ke Container Registry.
