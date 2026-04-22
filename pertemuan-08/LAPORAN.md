# 📝 Laporan UTS - Pertemuan 8

## 📋 Project Todo List dengan Docker Compose

---

## 👤 Identitas Mahasiswa

| Field | Isi |
|-------|-----|
| **Nama** | `[Tulis nama lengkap]` |
| **NIM** | `[Tulis NIM]` |
| **Kelas** | `[Tulis kelas]` |
| **Tanggal Pengumpulan** | `[DD/MM/YYYY]` |

---

## 📋 Checklist Fitur

### ✅ Fitur yang Diimplementasikan

| No | Fitur | Status | Keterangan |
|----|-------|--------|------------|
| 1 | Docker Compose berjalan | ⬜ Belum / ✅ Sudah | |
| 2 | Flask + MySQL terhubung | ⬜ Belum / ✅ Sudah | |
| 3 | **Create** - Tambah todo | ⬜ Belum / ✅ Sudah | |
| 4 | **Read** - Lihat semua todos | ⬜ Belum / ✅ Sudah | |
| 5 | **Update** - Toggle status | ⬜ Belum / ✅ Sudah | |
| 6 | **Delete** - Hapus todo | ⬜ Belum / ✅ Sudah | |
| 7 | Data persistent (volume) | ⬜ Belum / ✅ Sudah | |

---

## 📁 Struktur Project

```
[Tulis struktur folder project Anda]
uts-[NIM]/
├── docker-compose.yml
├── init.sql
├── README.md
└── app/
    ├── Dockerfile
    ├── requirements.txt
    ├── app.py
    └── templates/
        └── index.html
```

---

## 💻 Kode Program

### 📄 docker-compose.yml
```yaml
# Paste docker-compose.yml Anda di sini


```

### 🐳 app/Dockerfile
```dockerfile
# Paste Dockerfile Anda di sini


```

### 📋 app/requirements.txt
```
# Paste requirements.txt Anda di sini


```

### 🐍 app/app.py
```python
# Paste app.py Anda di sini


```

### 🌐 app/templates/index.html
```html
<!-- Paste index.html Anda di sini -->


```

### 🗃️ init.sql
```sql
-- Paste init.sql Anda di sini


```

---

## 🖼️ Screenshot Hasil

> **📁 Simpan screenshot di folder:** `pertemuan-08/ss/`

### 1️⃣ Screenshot Struktur Folder Project
![Struktur Folder](ss/01-struktur-folder.png)

---

### 2️⃣ Screenshot Docker Compose Up
![Compose Up](ss/02-compose-up.png)

**Perintah:**
```bash
docker-compose up -d --build
```

**Output:**
```
[Paste output]
```

---

### 3️⃣ Screenshot Docker Compose PS
![Compose PS](ss/03-compose-ps.png)

**Output:**
```
[Paste output docker-compose ps]
```

---

### 4️⃣ Screenshot Tampilan Awal Aplikasi
![Tampilan Awal](ss/04-tampilan-awal.png)

**URL:** `http://localhost:5000`

---

### 5️⃣ Screenshot Fitur CREATE (Tambah Todo)
![Create Todo](ss/05-create-todo.png)

**Penjelasan:**
```
[Tulis penjelasan cara menambah todo]
```

---

### 6️⃣ Screenshot Fitur READ (Lihat Semua Todos)
![Read Todos](ss/06-read-todos.png)

**Penjelasan:**
```
[Tulis penjelasan - berapa todo yang ditampilkan?]
```

---

### 7️⃣ Screenshot Fitur UPDATE (Toggle Status)
![Update Todo](ss/07-update-todo.png)

**Penjelasan:**
```
[Tulis penjelasan cara mengubah status todo]
```

---

### 8️⃣ Screenshot Fitur DELETE (Hapus Todo)
![Delete Todo](ss/08-delete-todo.png)

**Penjelasan:**
```
[Tulis penjelasan cara menghapus todo]
```

---

### 9️⃣ Screenshot Bukti Data Persistent

#### 9a. Data sebelum restart
![Before Restart](ss/09a-before-restart.png)

#### 9b. Docker Compose Down & Up
![Restart](ss/09b-restart.png)

**Perintah:**
```bash
docker-compose down
docker-compose up -d
```

#### 9c. Data setelah restart (masih ada!)
![After Restart](ss/09c-after-restart.png)

**Penjelasan:**
```
[Jelaskan bahwa data masih ada setelah restart karena menggunakan volume]
```

---

### 🔟 Screenshot Docker Volume
![Docker Volume](ss/10-docker-volume.png)

**Perintah:**
```bash
docker volume ls
```

---

## 📝 Cara Menjalankan Aplikasi

```bash
# 1. Extract file zip
unzip uts-[NIM].zip
cd uts-[NIM]

# 2. Jalankan Docker Compose
docker-compose up -d --build

# 3. Tunggu hingga siap (30 detik)
docker-compose logs -f

# 4. Buka browser
# http://localhost:5000

# 5. Untuk menghentikan
docker-compose down
```

---

## 📝 Catatan & Kendala

### Kendala yang Dihadapi:
```
[Tulis kendala yang dialami selama mengerjakan UTS]
```

### Solusi:
```
[Tulis solusi dari kendala tersebut]
```

---

## 💡 Kesimpulan

```
[Tulis kesimpulan dari UTS ini]
Contoh:
- Docker Compose memudahkan deployment multi-container app
- Volume memastikan data persist meskipun container dihapus
- Flask + MySQL bisa terhubung melalui Docker network
- dll
```

---

## 🎯 Self Assessment

| Kriteria | Poin Maksimal | Poin Saya |
|----------|---------------|-----------|
| Docker Compose berjalan | 20 | |
| Web & DB terhubung | 15 | |
| Create todo | 15 | |
| Read todos | 10 | |
| Update status | 10 | |
| Delete todo | 10 | |
| Database persistent | 10 | |
| README dokumentasi | 5 | |
| UI rapi | 5 | |
| **Total** | **100** | |

---

## 📊 Penilaian Dosen

> *Diisi oleh Dosen/Asisten*

| Kriteria | Nilai |
|----------|-------|
| Docker Compose berjalan | /20 |
| Web & DB terhubung | /15 |
| Create todo | /15 |
| Read todos | /10 |
| Update status | /10 |
| Delete todo | /10 |
| Database persistent | /10 |
| README dokumentasi | /5 |
| UI rapi | /5 |
| **Total** | **/100** |

**Catatan Penilai:**
```

```

**Nilai Akhir UTS:** _______

---

<div align="center">

📅 **UTS - Pertemuan 8** | [🏠 Kembali ke README](README.md)

---

### ✨ Terima Kasih!

</div>
