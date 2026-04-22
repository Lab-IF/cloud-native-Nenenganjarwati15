# 📝 Pertemuan 8: UTS - Project Docker Compose

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![UTS](https://img.shields.io/badge/UTS-Final%20Project-red?style=for-the-badge)

---

## 🎯 Deskripsi Project

> Buat aplikasi **Todo List** full-stack menggunakan **Docker Compose**

```
┌────────────────────────────────────────────────────────────────────┐
│                      🎯 TODO LIST APP                              │
│                                                                    │
│   ┌──────────────────┐         ┌──────────────────┐               │
│   │                  │         │                  │               │
│   │   🌐 FLASK WEB   │◄───────►│   🐬 MySQL DB    │               │
│   │    (Frontend +   │   SQL   │    (Data Store)  │               │
│   │     Backend)     │         │                  │               │
│   │                  │         │                  │               │
│   └────────┬─────────┘         └────────┬─────────┘               │
│            │                            │                          │
│            │         Docker Compose     │                          │
│            └────────────────────────────┘                          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Ketentuan

| No | Requirement | Keterangan |
|----|-------------|------------|
| 1 | Backend | Flask (Python) |
| 2 | Database | MySQL 8.0 |
| 3 | Orchestration | Docker Compose |
| 4 | Persistence | Volume untuk database |

---

## ✨ Fitur Minimum

- [x] ➕ **Create** - Tambah todo baru
- [x] 📖 **Read** - Tampilkan semua todos
- [x] ✏️ **Update** - Tandai todo selesai/belum
- [x] 🗑️ **Delete** - Hapus todo

---

## 📁 Struktur Project

```
uts-[NIM]/
├── 📄 docker-compose.yml     # Orchestration
├── 📄 init.sql                # Database initialization
├── 📄 README.md               # Dokumentasi
└── 📁 app/
    ├── 📄 Dockerfile          # Build image Flask
    ├── 📄 requirements.txt    # Python dependencies
    ├── 📄 app.py              # Flask application
    └── 📁 templates/
        └── 📄 index.html      # Frontend HTML
```

---

## 📊 Rubrik Penilaian

| Kriteria | Poin | Penjelasan |
|----------|------|------------|
| 🐳 Docker Compose berjalan | **20** | `docker-compose up -d` berhasil |
| 🔗 Web & DB terhubung | **15** | Flask bisa CRUD ke MySQL |
| ➕ Create todo | **15** | Tambah todo berfungsi |
| 📖 Read todos | **10** | Tampilkan semua todos |
| ✏️ Update status | **10** | Toggle done/undone |
| 🗑️ Delete todo | **10** | Hapus todo berfungsi |
| 💾 Database persistent | **10** | Data tetap ada setelah restart |
| 📝 README dokumentasi | **5** | Ada screenshot & cara pakai |
| 🎨 UI rapi | **5** | Tampilan menarik |
| **Total** | **100** | |

> ⚠️ **Minimum Lulus: 60 Poin**

---

## 🚀 Cara Menjalankan

```bash
# Clone/extract project
cd uts-[NIM]

# Jalankan
docker-compose up -d --build

# Tunggu MySQL siap (30 detik)
docker-compose logs -f database

# Buka browser
# http://localhost:5000

# Stop
docker-compose down

# Stop + hapus data
docker-compose down -v
```

---

## 📤 Pengumpulan

### 📁 Struktur Folder Pengumpulan
```
pertemuan-08/
├── 📄 README.md          # Materi UTS (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN UTS DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-struktur-folder.png
    ├── 02-compose-up.png
    ├── 03-compose-ps.png
    ├── 04-tampilan-awal.png
    ├── 05-create-todo.png
    ├── 06-read-todos.png
    ├── 07-update-todo.png
    ├── 08-delete-todo.png
    ├── 09a-before-restart.png
    ├── 09b-restart.png
    ├── 09c-after-restart.png
    └── 10-docker-volume.png
```

### 📝 Cara Mengerjakan:
1. **Kode Project** → Buat di folder terpisah `uts-[NIM]/`
2. **Screenshot** → Simpan di folder `ss/`
3. **Laporan** → Edit file `LAPORAN.md`
4. **Paste semua kode** di laporan

> 📋 **Template Laporan UTS:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

### Checklist Sebelum Submit:
- [ ] `docker-compose up -d --build` berjalan tanpa error
- [ ] Semua fitur CRUD berfungsi
- [ ] Data tetap ada setelah `docker-compose down` lalu `up` lagi
- [ ] LAPORAN.md lengkap dengan screenshot
- [ ] Semua screenshot ada di folder `ss/`

---

## ⚠️ Catatan Penting

> 🚨 **PLAGIARISME = NILAI 0**

- Boleh diskusi, tapi kerjakan sendiri
- Setiap mahasiswa harus bisa menjelaskan kodenya
- Tulis nama & NIM di app dan README

---

## 📅 Deadline

```
┌─────────────────────────────────────────────┐
│                                             │
│    📅 Sesuai Jadwal UTS                     │
│                                             │
│    ⏰ Tidak ada perpanjangan waktu!         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📖 Referensi Template

> Lihat halaman web `pertemuan-08/index.html` untuk template kode lengkap!

---

## 🆘 Butuh Bantuan?

- 📧 Hubungi dosen/asisten
- 📚 Lihat materi pertemuan 1-7
- 🔗 Google & Stack Overflow

---

<div align="center">

[⬅️ Pertemuan 7](../pertemuan-07/README.md) | **📅 UTS - Pertemuan 8** | [🏠 Home](../README.md)

---

### 🍀 Good Luck!

</div>
