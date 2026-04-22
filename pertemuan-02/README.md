# 📦 Pertemuan 2: Docker Images & Dockerfile

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami perbedaan Image dan Container | ⬜ |
| 2 | Membuat Dockerfile sederhana | ⬜ |
| 3 | Build custom Docker image | ⬜ |

---

## 📚 Materi

### 🖼️ Docker Image vs Container

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   📄 IMAGE (Template)          📦 CONTAINER (Instance)       │
│   ─────────────────           ──────────────────────────     │
│   • Read-only                 • Bisa dimodifikasi            │
│   • Blueprint/resep           • Aplikasi berjalan            │
│   • Bisa dibagikan            • Dibuat dari image            │
│                                                              │
│   ┌─────────────┐             ┌─────────────┐                │
│   │   IMAGE     │ ──────────► │ CONTAINER 1 │                │
│   │  nginx:1.0  │    docker   ├─────────────┤                │
│   └─────────────┘     run     │ CONTAINER 2 │                │
│                               ├─────────────┤                │
│         1 Image       ──►     │ CONTAINER 3 │                │
│                               └─────────────┘                │
│                                 N Containers                 │
└──────────────────────────────────────────────────────────────┘
```

> 💡 **Analogi:** Image = Resep Kue 📝 | Container = Kue yang sudah jadi 🎂

---

### 📝 Dockerfile

Dockerfile adalah file teks berisi **instruksi langkah-langkah** untuk membuat Docker Image.

#### Instruksi Dasar:

| Instruksi | Fungsi | Contoh |
|-----------|--------|--------|
| `FROM` | Base image | `FROM python:3.11` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy file dari host | `COPY . /app` |
| `RUN` | Jalankan command saat build | `RUN pip install flask` |
| `CMD` | Command default saat run | `CMD ["python", "app.py"]` |
| `EXPOSE` | Dokumentasi port | `EXPOSE 5000` |

#### 📄 Contoh Dockerfile:

```dockerfile
# 🐍 Base image Python
FROM python:3.11-slim

# 📁 Set working directory
WORKDIR /app

# 📋 Copy file aplikasi
COPY app.py .

# 🚀 Command untuk menjalankan aplikasi
CMD ["python", "app.py"]
```

---

### ⌨️ Perintah Build & Run

```bash
# 🔨 Build image dari Dockerfile
docker build -t nama-image:tag .

# Penjelasan:
#   -t          = tag/nama untuk image
#   nama:tag    = format nama image
#   .           = lokasi Dockerfile (current dir)

# 🚀 Jalankan container dari image
docker run nama-image:tag

# 🗑️ Hapus image
docker rmi nama-image:tag
```

---

## 🧪 Praktikum

### Step 1: Buat Folder Project
```bash
mkdir docker-python
cd docker-python
```

### Step 2: Buat File `app.py`
```python
# app.py
print("=" * 40)
print("🐳 Hello from Docker!")
print("Nama  : [Ganti dengan nama Anda]")
print("NIM   : [Ganti dengan NIM Anda]")
print("=" * 40)
```

### Step 3: Buat File `Dockerfile`
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

### Step 4: Build & Run
```bash
# Build
docker build -t biodata-app:1.0 .

# Run
docker run biodata-app:1.0
```

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Aplikasi Biodata

| Kriteria | Poin |
|----------|------|
| Aplikasi menampilkan Nama, NIM, Kelas | 40 |
| Dockerfile benar | 30 |
| Build berhasil | 20 |
| Screenshot lengkap | 10 |
| **Total** | **100** |

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-02/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-struktur-folder.png
    ├── 02-docker-build.png
    ├── 03-docker-images.png
    └── 04-docker-run.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. **Paste kode** `app.py` dan `Dockerfile` di laporan

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- 🔗 [Best Practices Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---

<div align="center">

[⬅️ Pertemuan 1](../pertemuan-01/README.md) | **📅 Pertemuan 2 dari 8** | [➡️ Pertemuan 3](../pertemuan-03/README.md)

</div>
