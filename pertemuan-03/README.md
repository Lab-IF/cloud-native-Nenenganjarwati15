# 💾 Pertemuan 3: Docker Volume & Port Mapping

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Level](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami masalah data hilang di container | ⬜ |
| 2 | Menggunakan Docker Volume | ⬜ |
| 3 | Melakukan port mapping | ⬜ |
| 4 | Menjalankan database dengan persistent data | ⬜ |

---

## 📚 Materi

### ⚠️ Masalah: Data Hilang!

```
┌────────────────────────────────────────────────────┐
│              TANPA VOLUME                          │
│                                                    │
│  Container     Container      Data = 💀           │
│   Created  ───► Deleted  ───► HILANG!             │
│     📦           🗑️            😱                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

> 🚨 **Semua data di dalam container bersifat SEMENTARA!**

---

### 💾 Solusi: Docker Volume

```
┌────────────────────────────────────────────────────┐
│              DENGAN VOLUME                         │
│                                                    │
│        ┌─────────────────────┐                    │
│        │   Docker Volume     │  ← Data aman       │
│        │  (di luar container)│    di sini!        │
│        └──────────┬──────────┘                    │
│                   │ mount                          │
│        ┌──────────▼──────────┐                    │
│        │     Container       │                    │
│        │   /app/data ←───────│── Volume           │
│        └─────────────────────┘                    │
│                                                    │
│  ✅ Container dihapus? Data tetap ada!            │
└────────────────────────────────────────────────────┘
```

#### Jenis Volume:

| Jenis | Penggunaan | Contoh |
|-------|------------|--------|
| **Named Volume** | Data dikelola Docker | `-v mydata:/app/data` |
| **Bind Mount** | Mount folder dari host | `-v /home/user/data:/app/data` |

---

### 🔌 Port Mapping

```
┌─────────────────────────────────────────────┐
│                                             │
│  Browser → localhost:8080                   │
│                 │                           │
│                 ▼                           │
│  ┌─────────────────────────────────┐       │
│  │  -p 8080:80                     │       │
│  │      ↑    ↑                     │       │
│  │      │    └── Port Container    │       │
│  │      └─────── Port Host         │       │
│  └─────────────────────────────────┘       │
│                 │                           │
│                 ▼                           │
│           Container:80                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

### ⌨️ Perintah Volume

```bash
# 📁 Buat named volume
docker volume create data-saya

# 📋 Lihat semua volume
docker volume ls

# 🔍 Detail volume
docker volume inspect data-saya

# 🗑️ Hapus volume
docker volume rm data-saya

# 🧹 Hapus semua volume tidak terpakai
docker volume prune
```

---

## 🧪 Praktikum

### 🐬 MySQL dengan Volume

```bash
# Jalankan MySQL
docker run -d \
  --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=rahasia123 \
  -e MYSQL_DATABASE=praktikum \
  -v mysql-data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0

# Tunggu MySQL siap (30 detik)
docker logs mysql-db

# Masuk ke MySQL
docker exec -it mysql-db mysql -u root -prahasia123
```

### 📝 SQL Commands:
```sql
-- Gunakan database
USE praktikum;

-- Buat tabel
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    nim VARCHAR(20)
);

-- Insert data
INSERT INTO mahasiswa (nama, nim) VALUES ('Budi', '12345');
INSERT INTO mahasiswa (nama, nim) VALUES ('Ani', '12346');

-- Lihat data
SELECT * FROM mahasiswa;

-- Keluar
EXIT;
```

### 🧪 Test Persistensi:
```bash
# Stop container
docker stop mysql-db

# Hapus container
docker rm mysql-db

# Jalankan ulang dengan volume yang sama
docker run -d \
  --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=rahasia123 \
  -v mysql-data:/var/lib/mysql \
  -p 3306:3306 \
  mysql:8.0

# Cek - DATA MASIH ADA! ✅
docker exec -it mysql-db mysql -u root -prahasia123 -e "SELECT * FROM praktikum.mahasiswa;"
```

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Database Biodata

| Kriteria | Poin |
|----------|------|
| MySQL berjalan dengan volume | 30 |
| Tabel mahasiswa dibuat dengan benar | 25 |
| Data berhasil diinsert (min 3 data) | 25 |
| Bukti data persist setelah restart | 20 |
| **Total** | **100** |

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-03/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-volume-list.png
    ├── 02-mysql-running.png
    ├── 03-create-table.png
    ├── 04-insert-data.png
    ├── 05-select-before.png
    ├── 06-stop-remove.png
    ├── 07-restart-container.png
    └── 08-select-after.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. Isi SQL commands yang dijalankan

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Docker Volumes](https://docs.docker.com/storage/volumes/)
- 🔗 [MySQL Docker Hub](https://hub.docker.com/_/mysql)

---

<div align="center">

[⬅️ Pertemuan 2](../pertemuan-02/README.md) | **📅 Pertemuan 3 dari 8** | [➡️ Pertemuan 4](../pertemuan-04/README.md)

</div>
