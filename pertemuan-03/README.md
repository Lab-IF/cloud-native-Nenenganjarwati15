# Pertemuan 3: Dockerfile Best Practices — Optimasi Next.js

## 🎯 Tujuan Pembelajaran

1. Menulis Dockerfile yang efisien
2. Optimasi image size dengan multi-stage builds
3. Layer caching strategies
4. Security best practices (non-root user)
5. Menggunakan .dockerignore

## 📚 Best Practices

### 1. Gunakan Official Base Images

```dockerfile
# ✅ Good — alpine kecil dan official
FROM node:20-alpine

# ❌ Avoid — besar dan tidak spesifik
FROM ubuntu
```

### 2. Minimize Layers

```dockerfile
# ❌ Bad — setiap RUN membuat layer baru
RUN apt-get update
RUN apt-get install curl
RUN apt-get clean

# ✅ Good — gabung jadi satu layer
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
```

### 3. Manfaatkan Layer Cache

```dockerfile
# ✅ Copy dependency files dulu, baru source code
COPY package*.json ./
RUN npm ci
# Layer di atas di-cache jika package.json tidak berubah

COPY . .
# Hanya layer ini yang rebuild saat kode berubah
```

### 4. Gunakan .dockerignore

### 5. Non-root User

```dockerfile
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
USER nextjs
```

---

## 📝 Praktikum: Evolusi Dockerfile Next.js

### Tahap 1: Dockerfile Naive (dari Pertemuan 2)

```dockerfile
# Dockerfile.naive — single stage, semua dalam satu
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t nextjs-naive:v1 -f Dockerfile.naive .

# Cek ukuran
docker images nextjs-naive
# Hasil: ~1GB (semua node_modules, source, build artifacts)
```

### Tahap 2: Dockerfile Optimized (Multi-Stage)

Buka Dockerfile di `../examples/nextjs-docker-app/Dockerfile`:

```dockerfile
# syntax=docker/dockerfile:1

# Stage 1: Base — Alpine minimal
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Stage 2: Dependencies — Install & cache
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 3: Builder — Test & Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test && npm run build

# Stage 4: Runner — Production minimal
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

### Walkthrough Setiap Stage

#### Stage 1: `base`

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
```

| Aspek | Penjelasan |
|-------|------------|
| `node:20-alpine` | Base image paling kecil (~180MB vs ~1GB untuk `node:20`) |
| `AS base` | Memberi nama stage agar bisa di-reference |
| `NEXT_TELEMETRY_DISABLED` | Matikan telemetry Next.js saat build |

#### Stage 2: `deps`

```dockerfile
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci
```

| Aspek | Penjelasan |
|-------|------------|
| `FROM base` | Mulai dari stage base |
| `COPY package*.json` | Hanya copy file dependency |
| `npm ci` | Install exact versions dari lock file (repeatable) |
| **Cache benefit** | Kalau package.json tidak berubah, stage ini di-cache |

#### Stage 3: `builder`

```dockerfile
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test && npm run build
```

| Aspek | Penjelasan |
|-------|------------|
| `COPY --from=deps` | Ambil node_modules dari stage deps |
| `COPY . .` | Copy seluruh source code |
| `npm run test` | Jalankan test sebelum build |
| `npm run build` | Build Next.js (menghasilkan `.next/standalone`) |

#### Stage 4: `runner`

```dockerfile
FROM node:20-alpine AS runner
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
CMD ["node", "server.js"]
```

| Aspek | Penjelasan |
|-------|------------|
| Fresh `node:20-alpine` | Image baru — tidak ada node_modules atau source code |
| Copy standalone | Hanya output production minimal Next.js |
| Copy static | File CSS/JS yang sudah di-optimize |
| `USER nextjs` | Tidak jalan sebagai root (security) |
| `node server.js` | Langsung jalankan server, bukan `npm start` |

### Tahap 3: Perbandingan Ukuran

```bash
# Build kedua versi
docker build -t nextjs-naive:v1 -f Dockerfile.naive ../examples/nextjs-docker-app
docker build -t nextjs-optimized:v1 ../examples/nextjs-docker-app

# Bandingkan
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}" | grep nextjs
```

| Image | Ukuran Perkiraan | Isi |
|-------|-----------------|-----|
| `nextjs-naive:v1` | ~1 GB | node_modules + source + build artifacts |
| `nextjs-optimized:v1` | ~200 MB | Hanya standalone server + static files |

> 💡 **Pengurangan ~80%!** Multi-stage build hanya menyertakan yang benar-benar dibutuhkan untuk production.

### .dockerignore

Buka `../examples/nextjs-docker-app/.dockerignore`:

```
.next
node_modules
coverage
.git
.gitignore
Dockerfile
compose.yaml
README.md
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.env*.local
```

| Entry | Alasan |
|-------|--------|
| `.next` | Build output — akan di-generate ulang di dalam Docker |
| `node_modules` | Dependencies — di-install ulang dengan `npm ci` |
| `.git` | History tidak diperlukan di image |
| `Dockerfile` | File build sendiri tidak perlu masuk context |
| `compose.yaml` | Orchestration file, bukan bagian dari app |
| `.env*.local` | Secrets lokal — JANGAN masuk image! |

**Kenapa penting?** Tanpa `.dockerignore`:
- Build context membesar (ratusan MB)
- `node_modules` lokal bisa menimpa yang di-install di container
- Secrets bisa bocor ke image

### Security: Non-Root User

```dockerfile
# Buat group dan user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Gunakan user tersebut
USER nextjs
```

**Kenapa penting?**
- Jika container di-exploit, attacker hanya punya hak `nextjs` (bukan root)
- Best practice di production dan requirement di banyak platform (K8s, Cloud Run)

Verifikasi:

```bash
# Cek user di dalam container
docker exec nextjs-container whoami
# Output: nextjs

docker exec nextjs-container id
# Output: uid=1001(nextjs) gid=1001(nodejs) groups=1001(nodejs)
```

## 💪 Tugas Praktikum

### Tugas 1: Optimization Challenge (30 poin)

1. Build image Next.js dengan Dockerfile naive (single-stage)
2. Build image Next.js dengan Dockerfile optimized (multi-stage dari example app)
3. Bandingkan:
   - Ukuran image (screenshot `docker images`)
   - Waktu build
   - File yang ada di dalam container (gunakan `docker exec ... ls -la`)
4. Buat tabel perbandingan dan analisis

### Tugas 2: Multi-Stage Build (35 poin)

1. Tulis Dockerfile multi-stage sendiri (bukan copy-paste) untuk Next.js app yang sudah dimodifikasi di Pertemuan 1
2. Pastikan ada minimal 3 stage: deps, builder, runner
3. Jalankan test di stage builder (`npm run test`)
4. Pastikan runner menggunakan non-root user
5. Build, run, dan screenshot hasilnya

### Tugas 3: Security Audit (20 poin)

1. Verifikasi container berjalan sebagai non-root:
   - `docker exec <container> whoami`
   - `docker exec <container> id`
2. Cek tidak ada secrets di image:
   - `docker history <image>`
   - `docker exec <container> env`
3. Cek package yang terinstall minimal:
   - `docker exec <container> apk list --installed`
4. Dokumentasikan temuan

### Tugas 4: Dockerfile Linting (15 poin)

1. Install hadolint:
   ```bash
   docker run --rm -i hadolint/hadolint < Dockerfile
   ```
2. Jalankan linting pada Dockerfile naive dan optimized
3. Perbaiki semua warning yang muncul
4. Screenshot hasil sebelum dan sesudah perbaikan

## �� Referensi

1. [Dockerfile Best Practices](https://docs.docker.com/build/building/best-practices/)
2. [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
3. [Hadolint](https://github.com/hadolint/hadolint)

---

**Optimize! 📦**

Image Next.js kita sekarang kecil (~200MB) dan aman (non-root). Di Pertemuan 4, kita akan menggabungkannya dengan database menggunakan Docker Compose.
