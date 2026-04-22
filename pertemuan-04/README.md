# 🎼 Pertemuan 4: Docker Compose

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Level](https://img.shields.io/badge/Level-Intermediate-yellow?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami kegunaan Docker Compose | ⬜ |
| 2 | Menulis file docker-compose.yml | ⬜ |
| 3 | Menjalankan multi-container apps | ⬜ |
| 4 | Menghubungkan antar container | ⬜ |

---

## 📚 Materi

### 🤔 Kenapa Docker Compose?

```
┌────────────────────────────────────────────────────────────┐
│           😓 TANPA DOCKER COMPOSE                          │
│                                                            │
│  $ docker run -d --name db mysql...                       │
│  $ docker run -d --name backend --link db...              │
│  $ docker run -d --name frontend -p 80:80...              │
│  $ docker run ... (dan seterusnya 😵)                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
                        VS
┌────────────────────────────────────────────────────────────┐
│           🎉 DENGAN DOCKER COMPOSE                         │
│                                                            │
│  $ docker-compose up -d                                   │
│                                                            │
│  ✨ Selesai! Semua container jalan!                       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

> 💡 **Docker Compose** = Satu file untuk mengatur semua container!

---

### 📄 Struktur docker-compose.yml

```yaml
version: '3.8'              # Versi format file

services:                   # Daftar container/services
  web:                      # Nama service
    image: nginx            # Image yang digunakan
    ports:
      - "8080:80"           # Port mapping
  
  database:
    image: mysql:8.0
    environment:            # Environment variables
      MYSQL_ROOT_PASSWORD: secret
    volumes:                # Volume untuk data
      - db-data:/var/lib/mysql

volumes:                    # Deklarasi volumes
  db-data:
```

#### 🔑 Keywords Penting:

| Keyword | Fungsi |
|---------|--------|
| `image` | Image Docker yang digunakan |
| `build` | Build dari Dockerfile |
| `ports` | Port mapping |
| `environment` | Environment variables |
| `volumes` | Mount volumes |
| `depends_on` | Dependency antar service |

---

### ⌨️ Perintah Docker Compose

| Perintah | Fungsi |
|----------|--------|
| `docker-compose up` | Jalankan semua services |
| `docker-compose up -d` | Jalankan di background |
| `docker-compose up --build` | Build ulang lalu jalankan |
| `docker-compose down` | Stop & hapus containers |
| `docker-compose down -v` | Stop & hapus + volumes |
| `docker-compose ps` | Lihat status services |
| `docker-compose logs` | Lihat logs |
| `docker-compose logs -f` | Follow logs realtime |

---

## 🧪 Praktikum

### 📁 Struktur Folder:
```
flask-mysql/
├── docker-compose.yml
├── init.sql
└── app/
    ├── Dockerfile
    ├── requirements.txt
    └── app.py
```

### 📄 docker-compose.yml
```yaml
version: '3.8'

services:
  database:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rahasia
      MYSQL_DATABASE: myapp
    volumes:
      - db-data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  web:
    build: ./app
    ports:
      - "5000:5000"
    environment:
      DB_HOST: database
      DB_USER: root
      DB_PASSWORD: rahasia
      DB_NAME: myapp
    depends_on:
      - database

volumes:
  db-data:
```

### 🚀 Menjalankan:
```bash
# Build dan jalankan
docker-compose up -d --build

# Cek status
docker-compose ps

# Lihat logs
docker-compose logs -f web

# Stop semua
docker-compose down
```

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Aplikasi Todo List

| Kriteria | Poin |
|----------|------|
| docker-compose.yml benar | 30 |
| Flask + MySQL terhubung | 30 |
| Bisa Create & Read todo | 25 |
| Volume untuk database | 15 |
| **Total** | **100** |

**Fitur Minimum:**
- Tampilkan semua todos (`/`)
- Tambah todo (`/add`)
- Hapus todo (`/delete/<id>`)

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-04/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-struktur-folder.png
    ├── 02-compose-up.png
    ├── 03-compose-ps.png
    ├── 04-browser.png
    ├── 05-compose-logs.png
    └── 06-fitur-crud.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. **Paste kode** `docker-compose.yml`, `app.py`, dll

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Docker Compose Documentation](https://docs.docker.com/compose/)
- 🔗 [Compose File Reference](https://docs.docker.com/compose/compose-file/)

---

<div align="center">

[⬅️ Pertemuan 3](../pertemuan-03/README.md) | **📅 Pertemuan 4 dari 8** | [➡️ Pertemuan 5](../pertemuan-05/README.md)

</div>
