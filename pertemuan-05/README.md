# ☁️ Pertemuan 5: Docker Hub

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Hub](https://img.shields.io/badge/Docker%20Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami fungsi Docker Hub | ⬜ |
| 2 | Membuat akun Docker Hub | ⬜ |
| 3 | Push image ke Docker Hub | ⬜ |
| 4 | Pull image dari Docker Hub | ⬜ |

---

## 📚 Materi

### 🌐 Apa itu Docker Hub?

```
┌────────────────────────────────────────────────────────────────┐
│                    ☁️ DOCKER HUB                               │
│                  (hub.docker.com)                              │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Official Images                             │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │  │
│  │  │ nginx  │ │ mysql  │ │ python │ │ redis  │            │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Your Repositories                           │  │
│  │  ┌────────────────┐ ┌────────────────┐                  │  │
│  │  │ username/      │ │ username/      │                  │  │
│  │  │ my-flask:1.0   │ │ my-web:v2      │                  │  │
│  │  └────────────────┘ └────────────────┘                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↑↓                                    │
│                      push / pull                               │
│                          ↑↓                                    │
│                  ┌──────────────┐                              │
│                  │  💻 Komputer │                              │
│                  │     Lokal    │                              │
│                  └──────────────┘                              │
└────────────────────────────────────────────────────────────────┘
```

> 💡 Docker Hub = **GitHub** untuk Docker Images!

---

### 🏷️ Naming Convention

```
┌──────────────────────────────────────────────┐
│        [username]/[image-name]:[tag]         │
│                                              │
│  Contoh:                                     │
│  ├── budiman/flask-app:1.0                   │
│  ├── budiman/flask-app:2.0                   │
│  └── budiman/flask-app:latest                │
└──────────────────────────────────────────────┘
```

---

### ⌨️ Perintah Docker Hub

| Perintah | Fungsi |
|----------|--------|
| `docker login` | Login ke Docker Hub |
| `docker logout` | Logout dari Docker Hub |
| `docker tag` | Beri nama/tag baru ke image |
| `docker push` | Upload image ke Docker Hub |
| `docker pull` | Download image dari Docker Hub |

---

## 🧪 Praktikum

### Step 1: Buat Akun Docker Hub
1. Buka https://hub.docker.com
2. Klik **Sign Up**
3. Isi username, email, password
4. Verifikasi email

### Step 2: Login dari Terminal
```bash
docker login

# Masukkan username dan password
# Username: [username docker hub]
# Password: [password]
```

### Step 3: Siapkan Image
```bash
# Buat aplikasi sederhana (atau gunakan dari pertemuan 2)
docker build -t flask-app:1.0 .
```

### Step 4: Tag Image
```bash
# Format: docker tag [local-image] [username]/[nama]:[tag]
docker tag flask-app:1.0 username/flask-app:1.0

# Contoh:
docker tag flask-app:1.0 budiman/flask-app:1.0
```

### Step 5: Push ke Docker Hub
```bash
docker push username/flask-app:1.0

# Output:
# The push refers to repository [docker.io/username/flask-app]
# abc123: Pushed
# def456: Pushed
# 1.0: digest: sha256:xxx size: 1234
```

### Step 6: Verifikasi
- Buka https://hub.docker.com
- Cek repository Anda
- Image seharusnya sudah muncul! 🎉

### Step 7: Test Pull (di komputer lain/setelah hapus lokal)
```bash
# Hapus image lokal
docker rmi username/flask-app:1.0

# Pull dari Docker Hub
docker pull username/flask-app:1.0

# Run!
docker run username/flask-app:1.0
```

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Publish ke Docker Hub

| Kriteria | Poin |
|----------|------|
| Akun Docker Hub dibuat | 20 |
| Image berhasil di-push | 40 |
| Naming convention benar (`[username]/[app]-[nim]:1.0`) | 20 |
| Screenshot repository di Docker Hub | 20 |
| **Total** | **100** |

**Format nama image:** `[username]/biodata-[nim]:1.0`

**Contoh:** `budiman/biodata-12345678:1.0`

> ⚠️ **Penting:** Jangan lupa `docker logout` setelah selesai jika menggunakan komputer lab!

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-05/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-docker-login.png
    ├── 02-images-before.png
    ├── 03-docker-tag.png
    ├── 04-images-after.png
    ├── 05-docker-push.png
    ├── 06-dockerhub-repo.png
    └── 07-docker-pull.png (opsional)
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. Isi link repository Docker Hub

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Docker Hub](https://hub.docker.com/)
- 🔗 [Docker Hub Quickstart](https://docs.docker.com/docker-hub/)

---

<div align="center">

[⬅️ Pertemuan 4](../pertemuan-04/README.md) | **📅 Pertemuan 5 dari 8** | [➡️ Pertemuan 6](../pertemuan-06/README.md)

</div>
