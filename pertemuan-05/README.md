# Pertemuan 5: Container Registry — Push Next.js Image

## 🎯 Tujuan Pembelajaran

1. Push/pull images dari Docker Hub
2. Memahami GitHub Container Registry (ghcr.io)
3. Image tagging strategies
4. Registry security dan best practices
5. CI/CD integration dengan registry

## 📚 Teori Singkat

### Container Registry

Container Registry adalah tempat menyimpan dan mendistribusikan Docker images.

**Public Registries:**

| Registry | URL | Gratis? |
|----------|-----|---------|
| Docker Hub | hub.docker.com | 1 private repo gratis |
| GitHub Container Registry | ghcr.io | Gratis untuk public repo |
| Google Artifact Registry | gcr.io | Free tier tersedia |
| Amazon ECR | aws.amazon.com/ecr | Free tier tersedia |

**Private Registry:**
- Harbor (open-source, self-hosted)
- Nexus Repository
- Self-hosted Docker Registry

### Image Naming Convention

```
registry/username/image-name:tag

Contoh:
docker.io/library/node:20-alpine     # Docker Hub official
docker.io/username/nextjs-app:1.0    # Docker Hub user
ghcr.io/username/nextjs-app:latest   # GitHub Container Registry
```

## 📝 Praktikum

### Langkah 1: Build Next.js Image

```bash
# Build image dari example app
cd cloud-native-practicum/examples/nextjs-docker-app
docker build -t nextjs-docker-app:1.0 .

# Verify image
docker images nextjs-docker-app
```

### Langkah 2: Push ke Docker Hub

```bash
# Login ke Docker Hub
docker login

# Tag image untuk Docker Hub
# Ganti "username" dengan Docker Hub username Anda
docker tag nextjs-docker-app:1.0 username/nextjs-docker-app:1.0
docker tag nextjs-docker-app:1.0 username/nextjs-docker-app:latest

# Push ke Docker Hub
docker push username/nextjs-docker-app:1.0
docker push username/nextjs-docker-app:latest

# Verify — pull dari Docker Hub
docker rmi username/nextjs-docker-app:1.0
docker pull username/nextjs-docker-app:1.0
docker run --rm -p 3000:3000 username/nextjs-docker-app:1.0
```

### Langkah 3: Push ke GitHub Container Registry (ghcr.io)

GitHub Container Registry gratis untuk public repository dan terintegrasi dengan GitHub.

```bash
# Login ke ghcr.io menggunakan GitHub Personal Access Token
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u USERNAME --password-stdin

# Tag image untuk ghcr.io
docker tag nextjs-docker-app:1.0 ghcr.io/username/nextjs-docker-app:1.0
docker tag nextjs-docker-app:1.0 ghcr.io/username/nextjs-docker-app:latest

# Push
docker push ghcr.io/username/nextjs-docker-app:1.0
docker push ghcr.io/username/nextjs-docker-app:latest
```

> 💡 **Buat Personal Access Token** di GitHub: Settings → Developer settings → Personal access tokens → Tokens (classic) → Pilih scope `write:packages`

### Langkah 4: Image Tagging Strategy

```bash
# Semantic versioning
docker tag nextjs-docker-app:latest nextjs-docker-app:1.0.0
docker tag nextjs-docker-app:latest nextjs-docker-app:1.0
docker tag nextjs-docker-app:latest nextjs-docker-app:1

# Environment tags
docker tag nextjs-docker-app:latest nextjs-docker-app:dev
docker tag nextjs-docker-app:latest nextjs-docker-app:staging
docker tag nextjs-docker-app:latest nextjs-docker-app:prod

# Git commit hash
docker tag nextjs-docker-app:latest nextjs-docker-app:abc1234

# Combined (recommended untuk production)
docker tag nextjs-docker-app:latest nextjs-docker-app:1.0.0-abc1234
```

**Tagging Strategy untuk Next.js App:**

| Tag | Kapan dipakai | Contoh |
|-----|---------------|--------|
| `latest` | Development terbaru | `nextjs-docker-app:latest` |
| Semantic version | Release production | `nextjs-docker-app:1.0.0` |
| Git commit hash | Traceability | `nextjs-docker-app:a3f5b2c` |
| Environment | Deploy ke environment tertentu | `nextjs-docker-app:staging` |
| Combined | Production CI/CD | `nextjs-docker-app:1.0.0-a3f5b2c` |

> ⚠️ **Jangan** hanya pakai `latest` di production! Tag `latest` bisa berubah kapan saja. Selalu gunakan version tag yang spesifik.

### Langkah 5: Setup Private Registry (Lokal)

```yaml
# compose-registry.yaml
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - registry-data:/var/lib/registry
    environment:
      REGISTRY_STORAGE_DELETE_ENABLED: "true"

volumes:
  registry-data:
```

```bash
# Start registry
docker compose -f compose-registry.yaml up -d

# Tag dan push ke private registry
docker tag nextjs-docker-app:1.0 localhost:5000/nextjs-docker-app:1.0
docker push localhost:5000/nextjs-docker-app:1.0

# Pull dari private registry
docker pull localhost:5000/nextjs-docker-app:1.0

# List images di registry
curl http://localhost:5000/v2/_catalog
curl http://localhost:5000/v2/nextjs-docker-app/tags/list
```

### Langkah 6: GitHub Actions — Auto Push

Contoh workflow untuk otomatis build dan push saat ada push ke `main`:

```yaml
# .github/workflows/docker-publish.yml
name: Build and Push Next.js Image

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

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
```

## 💪 Tugas Praktikum

### Tugas 1: Push ke Docker Hub (25 poin)

1. Buat akun Docker Hub (jika belum ada)
2. Build image Next.js dari `../examples/nextjs-docker-app`
3. Push dengan 3 tag berbeda:
   - `username/nextjs-docker-app:1.0`
   - `username/nextjs-docker-app:latest`
   - `username/nextjs-docker-app:<git-commit-hash>`
4. Screenshot:
   - `docker images` dengan semua tag
   - Docker Hub repository page
   - Pull dan run dari Docker Hub

### Tugas 2: GitHub Container Registry (30 poin)

1. Buat GitHub Personal Access Token
2. Push image Next.js ke `ghcr.io`
3. Verifikasi image muncul di GitHub Packages
4. Pull dan run image dari ghcr.io
5. Screenshot semua langkah

### Tugas 3: Private Registry (25 poin)

1. Setup private registry lokal menggunakan compose
2. Push dan pull image Next.js
3. List images via API (`curl`)
4. Dokumentasikan langkah dan screenshot

### Tugas 4: CI/CD Pipeline (20 poin)

1. Buat GitHub Actions workflow (`.github/workflows/docker-publish.yml`)
2. Workflow harus:
   - Trigger pada push ke branch `main`
   - Build image Next.js
   - Push ke ghcr.io atau Docker Hub
3. Push ke repository dan verifikasi workflow berjalan
4. Screenshot Actions log dan registry

## 📚 Referensi

1. [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
2. [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
3. [Docker Registry](https://docs.docker.com/registry/)
4. [GitHub Actions - Docker](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images)

---

**Push Your Images! 📤**

Image Next.js kita sekarang tersimpan di registry dan bisa di-pull dari mana saja. Di Pertemuan 6, kita akan deploy image ini ke Kubernetes.
