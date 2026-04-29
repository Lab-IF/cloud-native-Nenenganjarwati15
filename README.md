[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/LLvi-T55)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22402426&assignment_repo_type=AssignmentRepo)
<div align="center">

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

# ☁️ Praktikum Cloud-Native Application Development

**Kode:** `CW6552021552` · **Semester V** · **3 SKS**

Laboratorium Informatika — Fakultas Teknik  
Universitas Muhammadiyah Makassar

</div>

---

## 📖 Daftar Isi

- [Deskripsi](#-deskripsi)
- [Peta Pembelajaran](#-peta-pembelajaran)
- [Getting Started](#-getting-started)
- [Struktur Project](#-struktur-project)
- [Sistem Penilaian](#-sistem-penilaian)
- [Panduan Pengumpulan](#-panduan-pengumpulan)
- [Resources](#-resources)

---

## 📘 Deskripsi

Mata kuliah ini memperkenalkan prinsip-prinsip inti **arsitektur cloud-native**. Mahasiswa akan belajar cara mengemas aplikasi menggunakan **kontainerisasi (Docker)**, mengelola kontainer dalam skala besar dengan **orkestrasi (Kubernetes)**, dan memahami konsep **immutable infrastructure**.

Pendekatan praktikum menggunakan metode *learning by doing* — dimulai dari fondasi fullstack development dengan Next.js, kemudian bertahap menuju containerization dan orchestration. Setiap pertemuan dirancang agar mahasiswa langsung mempraktikkan konsep yang dipelajari.

**Capaian Pembelajaran:**

1. Memahami prinsip cloud-native architecture & 12-Factor App
2. Menguasai containerization dengan Docker (build, compose, registry)
3. Mampu melakukan container orchestration dengan Kubernetes
4. Mengimplementasikan microservices pattern
5. Menerapkan best practices cloud-native deployment

> [!TIP]
> 🚀 **[Mulai dari sini →](./pertemuan-00/index.html)** — Panduan interaktif Pertemuan 00  
> 📊 **[Dashboard Mahasiswa →](./index.html)** — Tracking progress praktikum  
> 🎓 **[Dashboard Koordinator →](./koordinator.html)** — Panel koordinator

---

## 🗺️ Peta Pembelajaran

| # | Pertemuan | Topik Utama | Status |
|:-:|-----------|-------------|:------:|
| 00 | [Fullstack Next.js Fundamentals](./pertemuan-00) | Next.js, React, CSS, API Routes | ✅ |
| 01 | [Cloud-Native Principles](./pertemuan-01) | 12-Factor App, Microservices | ✅ |
| 02 | [Docker Fundamentals](./pertemuan-02) | Docker CLI, Images, Containers | ✅ |
| 03 | [Dockerfile Best Practices](./pertemuan-03) | Multi-stage builds, Optimization | ✅ |
| 04 | [Docker Compose](./pertemuan-04) | docker-compose.yml, Networking | ✅ |
| 05 | [Container Registry](./pertemuan-05) | Docker Hub, Private Registry | ✅ |
| 06 | [Kubernetes Basics](./pertemuan-06) | Minikube, kubectl, Pods | ✅ |
| 07 | [Scaling & Load Balancing](./pertemuan-07) | Deployments, Services, Scaling | ✅ |
| 08 | [UTS — Ujian Tengah Semester](./pertemuan-08) | Full-stack deployment project | 🎯 |

---

## 🚀 Getting Started

### Prasyarat

| Software | Kegunaan |
|----------|----------|
| [Docker Desktop](https://www.docker.com/products/docker-desktop) | Container runtime & compose |
| [kubectl](https://kubernetes.io/docs/tasks/tools/) | Kubernetes CLI |
| [Minikube](https://minikube.sigs.k8s.io/docs/start/) | Local Kubernetes cluster |
| [Node.js 18+](https://nodejs.org/) | Runtime untuk Next.js |
| [Git](https://git-scm.com/) | Version control |
| [VS Code](https://code.visualstudio.com/) | Code editor (recommended) |

**Spesifikasi minimum:** CPU 4 cores · RAM 8 GB · Disk 50 GB · Windows 10/11 (WSL2), macOS, atau Linux

### Verifikasi Instalasi

```bash
docker --version && docker compose version
kubectl version --client
minikube version
node --version
```

### Quick Start — Contoh Next.js + Docker

```bash
cd examples/nextjs-docker-app
npm install && npm run build
docker build -t nextjs-docker-app:kelas .
docker compose up --build
```

> Contoh ini berisi aplikasi Next.js lengkap dengan UI, API routes (`/api/health`, `/api/deployments`), environment variables, tests, Dockerfile multi-stage, dan Docker Compose — sehingga mahasiswa langsung melihat aplikasi nyata yang dikontainerisasi.

---

## 📂 Struktur Project

```
cloud-native-practicum/
├── index.html              # Dashboard mahasiswa
├── koordinator.html        # Dashboard koordinator
├── README.md
├── examples/
│   └── nextjs-docker-app/  # Contoh app Next.js + Docker
├── pertemuan-00/            # Fullstack Next.js Fundamentals
├── pertemuan-01/            # Cloud-Native Principles
├── pertemuan-02/            # Docker Fundamentals
├── pertemuan-03/            # Dockerfile Best Practices
├── pertemuan-04/            # Docker Compose
├── pertemuan-05/            # Container Registry
├── pertemuan-06/            # Kubernetes Basics
├── pertemuan-07/            # Scaling & Load Balancing
├── pertemuan-08/            # UTS
└── website/                 # Aset website praktikum
```

---

## 📊 Sistem Penilaian

| Komponen | Bobot | Keterangan |
|----------|:-----:|------------|
| Kehadiran & Partisipasi | 10% | Minimal kehadiran 75% |
| Tugas Mingguan | 30% | Lab exercises setiap pertemuan |
| UTS | 25% | Mid-term project |
| UAS | 35% | Final project & presentasi |

**Kriteria kelulusan:** Nilai akhir ≥ 60 · Kehadiran ≥ 75% · Mengumpulkan ≥ 75% tugas · Mengikuti UTS dan UAS

---

## 📝 Panduan Pengumpulan

Format penamaan folder: `NIM_Nama_PertemuanXX`

```
NIM_Nama_PertemuanXX/
├── docker/           # Dockerfile, docker-compose.yml
├── kubernetes/       # deployment.yaml, service.yaml
├── src/              # Source code aplikasi
├── docs/             # Dokumentasi (README.md)
└── screenshots/      # Bukti screenshot
```

**Checklist sebelum submit:**
- [ ] Code berjalan tanpa error
- [ ] Dockerfile sudah dioptimasi
- [ ] Dokumentasi lengkap
- [ ] Screenshots disertakan
- [ ] Best practices diterapkan
- [ ] Health checks diimplementasi

---

## 📚 Resources

<details>
<summary><strong>📖 Dokumentasi Resmi</strong></summary>

| Teknologi | Link |
|-----------|------|
| Docker | [docs.docker.com](https://docs.docker.com/) |
| Docker Compose | [docs.docker.com/compose](https://docs.docker.com/compose/) |
| Kubernetes | [kubernetes.io/docs](https://kubernetes.io/docs/) |
| Next.js | [nextjs.org/docs](https://nextjs.org/docs) |

</details>

<details>
<summary><strong>🎓 Tutorial & Pembelajaran</strong></summary>

- [Docker Getting Started](https://docs.docker.com/get-started/)
- [Kubernetes Basics Tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
- [Play with Docker](https://labs.play-with-docker.com/)
- [Next.js Learn](https://nextjs.org/learn)

</details>

<details>
<summary><strong>📚 Buku Referensi</strong></summary>

- *"Docker Deep Dive"* — Nigel Poulton
- *"Kubernetes Up & Running"* — Kelsey Hightower
- *"Cloud Native DevOps with Kubernetes"* — John Arundel

</details>

<details>
<summary><strong>🔧 Troubleshooting</strong></summary>

**Docker daemon not running:**
```bash
sudo systemctl start docker    # Linux
# Windows/Mac → buka Docker Desktop
```

**Permission denied (Linux):**
```bash
sudo usermod -aG docker $USER  # lalu logout & login
```

**Minikube gagal start:**
```bash
minikube delete && minikube start --cpus=2 --memory=4096
```

**Pod stuck di Pending / ImagePullBackOff:**
```bash
kubectl describe pod <pod-name>
```

</details>

---

> [!WARNING]
> **Docker Desktop** memerlukan lisensi untuk perusahaan besar · **Minikube** hanya untuk development · Jangan commit secrets ke git · Selalu test di lokal sebelum deploy

---

<div align="center">

**Laboratorium Informatika — Fakultas Teknik**  
**Universitas Muhammadiyah Makassar**

[![GitHub](https://img.shields.io/badge/GitHub-devnolife-181717?style=flat-square&logo=github)](https://github.com/devnolife)
[![Email](https://img.shields.io/badge/Email-devnolife@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:devnolife@gmail.com)

Made with ❤️ by [@devnolife](https://github.com/devnolife)

</div>
