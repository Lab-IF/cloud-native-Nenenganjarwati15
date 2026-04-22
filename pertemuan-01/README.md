# 🐳 Pertemuan 1: Pengenalan Docker

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)
![Duration](https://img.shields.io/badge/Durasi-90%20menit-blue?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami apa itu Docker dan manfaatnya | ⬜ |
| 2 | Menginstall Docker di komputer | ⬜ |
| 3 | Menjalankan container pertama | ⬜ |

---

## 📚 Materi

### 🤔 Apa itu Docker?

> **Docker** adalah platform open-source untuk membuat, menjalankan, dan mengelola **container** - paket ringan yang berisi aplikasi beserta semua dependensinya.

```
┌─────────────────────────────────────────────┐
│            Tanpa Docker                     │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │
│  │App A│ │App B│ │App C│  ← Konflik!       │
│  └──┬──┘ └──┬──┘ └──┬──┘                   │
│     └───────┴───────┘                       │
│         OS (shared)                         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            Dengan Docker                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Container│ │Container│ │Container│       │
│  │  App A  │ │  App B  │ │  App C  │       │
│  │  +deps  │ │  +deps  │ │  +deps  │       │
│  └─────────┘ └─────────┘ └─────────┘       │
│              Docker Engine                  │
│                  OS                         │
└─────────────────────────────────────────────┘
```

#### 💡 Manfaat Docker:
- ✅ **Konsisten** - Berjalan sama di mana saja
- ✅ **Isolasi** - Aplikasi tidak saling mengganggu  
- ✅ **Portabel** - Mudah dipindahkan
- ✅ **Efisien** - Lebih ringan dari VM

---

### 🔧 Instalasi Docker

<details>
<summary>📦 <b>Ubuntu/Debian</b> (Klik untuk expand)</summary>

```bash
# Update package
sudo apt update

# Install Docker
sudo apt install docker.io -y

# Start & enable service
sudo systemctl start docker
sudo systemctl enable docker

# Tambahkan user ke group docker (agar tidak perlu sudo)
sudo usermod -aG docker $USER
```

</details>

<details>
<summary>🪟 <b>Windows</b> (Klik untuk expand)</summary>

1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Jalankan installer
3. Restart komputer
4. Buka Docker Desktop

</details>

---

### ⌨️ Perintah Dasar

| Perintah | Fungsi | Contoh |
|----------|--------|--------|
| `docker --version` | Cek versi Docker | `Docker version 24.0.5` |
| `docker run` | Jalankan container | `docker run hello-world` |
| `docker ps` | Lihat container aktif | - |
| `docker ps -a` | Lihat semua container | - |
| `docker images` | Lihat daftar images | - |

```bash
# 🚀 Cek instalasi berhasil
docker --version

# 🎉 Jalankan container pertama!
docker run hello-world

# 👀 Lihat container yang berjalan
docker ps

# 📋 Lihat semua container (termasuk yang sudah stop)
docker ps -a

# 🖼️ Lihat images yang sudah didownload
docker images
```

> ⚠️ **Catatan:** Jika muncul error "permission denied", jalankan dengan `sudo` atau logout lalu login kembali setelah menambahkan user ke group docker.

---

## ✏️ Tugas Praktikum

### 📝 Tugas 1: Instalasi & Hello World

**Instruksi:**
1. [ ] Install Docker di komputer masing-masing
2. [ ] Jalankan perintah `docker run hello-world`
3. [ ] Screenshot output yang muncul
4. [ ] Jalankan `docker images` dan screenshot hasilnya

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-01/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-docker-version.png
    ├── 02-hello-world.png
    ├── 03-docker-images.png
    └── 04-docker-ps.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. Isi semua bagian yang diminta

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Docker Official Documentation](https://docs.docker.com/)
- 🔗 [Docker Hub](https://hub.docker.com/)
- 🎥 [Docker in 100 Seconds](https://www.youtube.com/watch?v=Gjnup-PuquQ)

---

<div align="center">

**📅 Pertemuan 1 dari 8** | [➡️ Pertemuan 2: Docker Images](../pertemuan-02/README.md)

</div>
