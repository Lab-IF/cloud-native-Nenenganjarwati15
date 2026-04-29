# Pertemuan 8: UTS — Full Cloud-Native Next.js Project

## 🎯 Tujuan UTS

Evaluasi pemahaman mahasiswa terhadap seluruh materi Pertemuan 1-7 dengan men-deploy aplikasi Next.js secara end-to-end:

1. Docker containerization (Dockerfile optimized)
2. Docker Compose orchestration (multi-service)
3. Kubernetes deployment (production-grade)
4. CI/CD pipeline (automated build & push)
5. Documentation dan troubleshooting

## 📋 Project: Deploy Next.js Cloud-Native

Gunakan aplikasi Next.js yang sudah dikembangkan dari Pertemuan 1-7 (basis: `../examples/nextjs-docker-app`).

Mahasiswa harus menunjukkan bahwa aplikasi Next.js bisa:
- Di-build menjadi Docker image yang optimal
- Dijalankan bersama database dan cache via Compose
- Di-deploy ke Kubernetes dengan scaling dan health probes
- Di-automate build dan push via CI/CD

---

## 📝 Struktur Project

### Part 1: Dockerization (25 poin)

**Requirements:**
- Dockerfile multi-stage (minimal 3 stage: deps, builder, runner)
- Image size < 300MB
- Non-root user
- `.dockerignore` lengkap
- Test dijalankan di stage builder

**Yang harus ada:**

```
project/
├── Dockerfile              # Multi-stage, optimized
├── .dockerignore           # Exclude node_modules, .next, .git, dll
└── app/                    # Next.js application
```

**Contoh Dockerfile (referensi dari example app):**

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**Verifikasi:**
```bash
docker build -t nextjs-uts:1.0 .
docker images nextjs-uts     # Cek ukuran < 300MB
docker run --rm -p 3000:3000 nextjs-uts:1.0
curl http://localhost:3000/api/health
```

### Part 2: Docker Compose (25 poin)

**Requirements:**
- Next.js + PostgreSQL + Redis
- `depends_on` dengan `condition: service_healthy`
- Healthcheck untuk setiap service
- Named volumes untuk persistent data
- Environment variables (bukan hardcode)

**compose.yaml:**

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      APP_ENV: compose
      APP_VERSION: "1.0.0"
      NEXT_PUBLIC_APP_MESSAGE: "UTS Cloud Native - [Nama] [NIM]"
      DATABASE_URL: postgresql://user:pass@db:5432/practicum
      REDIS_URL: redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
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

**Verifikasi:**
```bash
docker compose up --build -d
docker compose ps              # Semua healthy
curl http://localhost:3000/api/health
docker compose exec db psql -U user -d practicum -c "SELECT 1;"
docker compose exec cache redis-cli ping
```

### Part 3: Kubernetes Deployment (30 poin)

**Requirements:**
- Namespace khusus
- Deployment dengan 3 replicas
- Liveness dan readiness probes menggunakan `/api/health`
- ConfigMap untuk environment variables
- Service (NodePort)
- Resource limits
- Rolling update strategy

**Struktur manifest:**

```
k8s/
├── namespace.yaml
├── configmap.yaml
├── deployment.yaml
└── service.yaml
```

**namespace.yaml:**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nextjs-uts
```

**configmap.yaml:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nextjs-config
  namespace: nextjs-uts
data:
  APP_ENV: "kubernetes"
  APP_VERSION: "1.0.0"
  NEXT_PUBLIC_APP_MESSAGE: "UTS Cloud Native - [Nama] [NIM]"
```

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
  namespace: nextjs-uts
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: nextjs-docker-app
  template:
    metadata:
      labels:
        app: nextjs-docker-app
        version: v1
    spec:
      containers:
      - name: nextjs
        image: nextjs-docker-app:1.0
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: nextjs-config
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
```

**service.yaml:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nextjs-service
  namespace: nextjs-uts
spec:
  type: NodePort
  selector:
    app: nextjs-docker-app
  ports:
  - port: 3000
    targetPort: 3000
    nodePort: 30030
```

**Verifikasi:**
```bash
kubectl apply -f k8s/
kubectl get all -n nextjs-uts
kubectl describe deployment nextjs-app -n nextjs-uts
minikube service nextjs-service -n nextjs-uts
curl $(minikube service nextjs-service -n nextjs-uts --url)/api/health
```

### Part 4: CI/CD Pipeline (10 poin)

**Requirements:**
- GitHub Actions workflow
- Automated build dan push ke registry
- Triggered on push ke `main`

```yaml
# .github/workflows/ci.yml
name: CI/CD Next.js

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install and Test
        run: |
          npm ci
          npm test

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

### Part 5: Documentation (10 poin)

**Requirements:**
- Architecture diagram (text ASCII atau gambar)
- README.md yang lengkap
- Troubleshooting guide

**Minimal isi README.md:**

```markdown
# [Nama Project] - UTS Cloud Native

## Architecture
[Diagram arsitektur: Next.js → PostgreSQL, Redis]

## Prerequisites
- Node.js 20+
- Docker Desktop
- Minikube + kubectl

## Quick Start

### Local Development
npm install && npm run dev

### Docker Compose
docker compose up --build

### Kubernetes
kubectl apply -f k8s/

## API Endpoints
- GET /api/health — status aplikasi
- GET /api/deployments — data deployment

## Environment Variables
| Variable | Default | Keterangan |
|----------|---------|------------|
| APP_ENV | development | Environment saat ini |
| NEXT_PUBLIC_APP_MESSAGE | ... | Pesan di UI |

## Troubleshooting
[Solusi untuk error umum]
```

---

## ✅ Rubrik Penilaian

| Komponen | Poin | Kriteria |
|----------|------|----------|
| **Part 1: Dockerization** | 25 | Multi-stage, < 300MB, non-root, test di builder |
| **Part 2: Docker Compose** | 25 | 3 services, healthcheck, depends_on, volumes |
| **Part 3: Kubernetes** | 30 | Deployment, Service, ConfigMap, probes, resources |
| **Part 4: CI/CD** | 10 | GitHub Actions workflow yang berjalan |
| **Part 5: Documentation** | 10 | README lengkap, architecture diagram |
| **TOTAL** | **100** | |

## 💡 Grading Criteria

### Excellent (90-100)
- Semua service berjalan sempurna
- Kubernetes deployment production-ready
- CI/CD fully automated
- Dokumentasi comprehensive
- Bonus: HPA, Ingress, monitoring

### Good (80-89)
- Semua service berjalan
- Kubernetes deployment working
- Basic CI/CD
- Dokumentasi lengkap

### Satisfactory (70-79)
- Dockerfile dan Compose berjalan
- Kubernetes partially working
- Dokumentasi dasar

### Needs Improvement (<70)
- Containerization tidak lengkap
- Kubernetes tidak berjalan
- Dokumentasi minim

## 🚫 Common Mistakes to Avoid

1. ❌ Hardcode password di Dockerfile atau manifest
2. ❌ Tidak ada health checks
3. ❌ Missing resource limits di Kubernetes
4. ❌ Root user di container
5. ❌ Image terlalu besar (> 500MB)
6. ❌ Tidak ada `.dockerignore`
7. ❌ Service tidak bisa komunikasi di Compose/K8s
8. ❌ Tidak ada dokumentasi

## ✅ Best Practices Checklist

Sebelum submit, pastikan:

- [ ] Docker image < 300MB
- [ ] Container berjalan sebagai non-root user
- [ ] Health checks di Compose dan Kubernetes
- [ ] Resource limits di Kubernetes
- [ ] Secrets tidak di-hardcode di kode
- [ ] Services bisa berkomunikasi
- [ ] Dokumentasi lengkap dengan architecture diagram
- [ ] CI/CD pipeline berjalan
- [ ] Bisa deploy dari scratch (fresh environment)
- [ ] Logs bisa diakses (`docker compose logs`, `kubectl logs`)
- [ ] Rolling update tanpa downtime
- [ ] `/api/health` mengembalikan status yang benar

## 📤 Submission

### Deliverables

```
NIM_Nama_UTS/
├── app/                    # Next.js application
├── components/
├── lib/
├── tests/
├── Dockerfile              # Multi-stage optimized
├── .dockerignore
├── compose.yaml            # Next.js + PostgreSQL + Redis
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── deployment.yaml
│   └── service.yaml
├── .github/workflows/
│   └── ci.yml
├── package.json
├── next.config.mjs
└── README.md               # Documentation
```

### Format Pengumpulan
- **GitHub repository URL** (recommended)
- Atau `NIM_Nama_UTS_CloudNative.zip`

### Upload ke LMS

### Late Submission
- 1 hari: -10 poin
- 2 hari: -20 poin
- 3+ hari: -50 poin

## ❓ FAQ

**Q: Boleh modifikasi Next.js app dari example?**
A: Ya, justru diharapkan. Tambahkan halaman, API route, atau fitur baru yang sudah dipelajari dari Pertemuan 1.

**Q: Harus deploy ke cloud?**
A: Tidak wajib. Minikube sudah cukup. Deploy ke cloud adalah bonus.

**Q: Boleh pakai database selain PostgreSQL?**
A: Boleh (MySQL, MongoDB), tapi pastikan ada healthcheck dan volume.

**Q: CI/CD harus push ke registry mana?**
A: Bebas — Docker Hub atau ghcr.io. Yang penting workflow berjalan.

**Q: Bagaimana jika Minikube tidak bisa jalan di laptop?**
A: Gunakan Play with Kubernetes (labs.play-with-k8s.com) atau minta bantuan asisten.

## 🎯 Tips Sukses

### Urutan Pengerjaan
1. **Minggu 1**: Pastikan Dockerfile dan Compose berjalan
2. **Minggu 2**: Kubernetes manifests
3. **Minggu 3**: CI/CD pipeline + documentation
4. **Minggu 4**: Testing, polishing, demo preparation

### Technical Tips
1. Test Docker Compose dulu sebelum Kubernetes
2. Gunakan `kubectl describe` dan `kubectl logs` untuk debug
3. Commit sering ke Git — jangan kerja tanpa version control
4. Cek `/api/health` setelah setiap deploy

### Documentation Tips
1. Mulai dokumentasi dari awal, jangan di akhir
2. Screenshot setiap langkah penting
3. Dokumentasikan error dan solusinya
4. Sertakan architecture diagram

## 📚 Referensi

- [Docker Compose](https://docs.docker.com/compose/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [12-Factor App](https://12factor.net/)

---

## 📋 Final Checklist

Sebelum submit, cek semua ini:

- [ ] `docker build` berhasil tanpa error
- [ ] `docker compose up --build` — semua services healthy
- [ ] `kubectl apply -f k8s/` — semua resources created
- [ ] Pods running dan ready (3/3)
- [ ] `/api/health` bisa diakses dari Compose dan K8s
- [ ] Services bisa berkomunikasi
- [ ] CI/CD pipeline berjalan di GitHub Actions
- [ ] README.md lengkap dan informatif
- [ ] Code clean dan terorganisir
- [ ] Repository terstruktur rapi

---

**Build Something Amazing! 🚀☁️**

Ini adalah ujian dari perjalanan Pertemuan 1-7. Tunjukkan bahwa Anda menguasai alur lengkap cloud-native: dari kode Next.js → Docker → Compose → Kubernetes → CI/CD.

**Questions?** Hubungi asisten praktikum atau diskusikan di forum kelas.
