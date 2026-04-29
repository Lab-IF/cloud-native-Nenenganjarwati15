# Pertemuan 2: Docker Fundamentals — Containerize Next.js

## 🎯 Tujuan Pembelajaran

1. Memahami perbedaan Docker images vs containers
2. Menguasai Docker CLI commands
3. Membuat Dockerfile untuk Next.js
4. Managing containers lifecycle
5. Port mapping dan volume management

## 📚 Teori Singkat

### Docker Architecture

```
┌──────────────────────────────────┐
│       Docker Client (CLI)        │
└────────────┬─────────────────────┘
             │
┌────────────▼─────────────────────┐
│       Docker Daemon              │
│  ┌──────────────────────────┐   │
│  │   Container Runtime      │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
             │
┌────────────▼─────────────────────┐
│       Host OS Kernel             │
└──────────────────────────────────┘
```

### Images vs Containers

**Image:**
- Read-only template
- Contains application code + dependencies
- Layered filesystem
- Stored in registry

**Container:**
- Running instance of image
- Writable layer on top
- Isolated process
- Ephemeral (bisa dihapus dan dibuat ulang)

### Docker Lifecycle

```
docker pull  → docker create → docker start → docker stop → docker rm
                                    ↓
                              docker run (create + start)
```

## 📝 Praktikum

### Langkah 1: Basic Docker Commands

```bash
# Pull image
docker pull node:20-alpine
docker pull nginx:latest

# List images
docker images

# Run container
docker run node:20-alpine node -e "console.log('Hello Docker')"
docker run -it node:20-alpine sh    # Interactive
docker run -d nginx                 # Detached

# List containers
docker ps       # Running only
docker ps -a    # All

# Container management
docker stop <container-id>
docker start <container-id>
docker restart <container-id>
docker rm <container-id>

# Image management
docker rmi <image-id>
docker image prune  # Remove unused
```

### Langkah 2: Dockerfile Sederhana untuk Next.js

Di Pertemuan 1, kita menjalankan Next.js secara lokal. Sekarang kita akan memasukkannya ke dalam container Docker.

Buat Dockerfile sederhana (versi dasar, belum dioptimasi):

```dockerfile
# Dockerfile.simple
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Penjelasan setiap instruksi:**

| Instruksi | Fungsi |
|-----------|--------|
| `FROM node:20-alpine` | Base image — Node.js versi 20 di atas Alpine Linux |
| `WORKDIR /app` | Set working directory di dalam container |
| `COPY package*.json ./` | Copy file dependency terlebih dahulu |
| `RUN npm ci` | Install dependency (repeatable, exact versions) |
| `COPY . .` | Copy seluruh source code |
| `RUN npm run build` | Build Next.js untuk production |
| `EXPOSE 3000` | Dokumentasi port yang dipakai |
| `CMD ["npm", "start"]` | Command default saat container dijalankan |

### Langkah 3: Build dan Run Next.js Container

```bash
# Masuk ke folder project
cd cloud-native-practicum/examples/nextjs-docker-app

# Build image
docker build -t nextjs-app:v1 .

# Cek image yang dibuat
docker images | grep nextjs

# Run container
docker run -d -p 3000:3000 --name nextjs-dev nextjs-app:v1

# Cek container berjalan
docker ps

# Buka browser: http://localhost:3000
```

### Langkah 4: Inspect Container

```bash
# View logs
docker logs nextjs-dev
docker logs -f nextjs-dev  # Follow (real-time)

# Execute command di dalam container
docker exec -it nextjs-dev sh

# Di dalam container, coba:
ls -la
cat package.json
node -v
exit

# Inspect container details
docker inspect nextjs-dev

# Lihat resource usage
docker stats nextjs-dev --no-stream
```

### Langkah 5: Environment Variable di Docker

```bash
# Run dengan environment variable
docker run -d -p 3000:3000 \
  -e APP_ENV=docker \
  -e NEXT_PUBLIC_APP_MESSAGE="Halo dari Docker container!" \
  --name nextjs-env nextjs-app:v1

# Cek env variable lewat API health
curl http://localhost:3000/api/health
```

Perhatikan bahwa `APP_ENV` dan `NEXT_PUBLIC_APP_MESSAGE` berubah di response API dan UI.

### Langkah 6: Port Mapping & Volumes

```bash
# Port mapping — host:container
docker run -d -p 8080:3000 nextjs-app:v1    # Akses di port 8080
docker run -d -p 3001:3000 nextjs-app:v1    # Akses di port 3001

# Volume mounting (untuk development)
docker run -v $(pwd)/public:/app/public nginx

# Named volumes
docker volume create app-data
docker volume ls
docker volume inspect app-data
```

### Langkah 7: Perhatikan Ukuran Image

```bash
# Cek ukuran image yang kita buat
docker images nextjs-app

# Bandingkan dengan base image
docker images node:20-alpine
```

> 💡 **Catatan:** Image dari Dockerfile sederhana ini akan berukuran **~1GB** karena menyertakan seluruh `node_modules`, source code, dan build artifacts. Di **Pertemuan 3**, kita akan mengoptimasi ini menggunakan multi-stage build menjadi **~200MB**.

### Langkah 8: Cleanup

```bash
# Stop dan remove container
docker stop nextjs-dev nextjs-env
docker rm nextjs-dev nextjs-env

# Remove image (opsional)
docker rmi nextjs-app:v1

# Bersihkan semua yang tidak dipakai
docker system prune
```

## 💪 Tugas Praktikum

### Tugas 1: Docker Commands Mastery (20 poin)

1. Praktikkan semua basic commands dari langkah 1
2. Buat cheatsheet Docker commands (minimal 15 commands)
3. Screenshot setiap langkah

### Tugas 2: Containerize Next.js App (30 poin)

1. Build image Next.js dari `../examples/nextjs-docker-app`
2. Jalankan container dan akses di browser
3. Screenshot halaman utama dan `/api/health` dari container
4. Jalankan container dengan environment variable berbeda:
   - `APP_ENV=production`
   - `NEXT_PUBLIC_APP_MESSAGE="[Nama Anda] - [NIM]"`
5. Screenshot perubahan di UI dan API response

### Tugas 3: Persistent Data dengan Volume (25 poin)

1. Jalankan PostgreSQL container dengan named volume:
   ```bash
   docker run -d --name postgres-lab \
     -e POSTGRES_PASSWORD=secret \
     -v pgdata:/var/lib/postgresql/data \
     -p 5432:5432 \
     postgres:16-alpine
   ```
2. Buat database dan tabel sederhana
3. Stop dan remove container, lalu buat ulang dengan volume yang sama
4. Buktikan data masih ada (screenshot)

### Tugas 4: Container Networking (25 poin)

1. Buat Docker network:
   ```bash
   docker network create lab-network
   ```
2. Jalankan Next.js container dan PostgreSQL di network yang sama
3. Buktikan container bisa saling berkomunikasi
4. Dokumentasikan langkah-langkah yang dilakukan

## 📚 Referensi

1. [Docker Get Started](https://docs.docker.com/get-started/)
2. [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
3. [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Master Docker! 🐳**

Sekarang aplikasi Next.js dari Pertemuan 1 sudah bisa berjalan di dalam container. Di Pertemuan 3, kita akan mengoptimasi Dockerfile agar image lebih kecil dan aman.
