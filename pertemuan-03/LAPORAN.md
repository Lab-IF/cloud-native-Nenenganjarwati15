# 📝 Laporan Praktikum - Pertemuan 3

## 💾 Docker Volume & Port Mapping

---

## 👤 Identitas Mahasiswa

| Field | Isi |
|-------|-----|
| **Nama** | `[Tulis nama lengkap]` |
| **NIM** | `[Tulis NIM]` |
| **Kelas** | `[Tulis kelas]` |
| **Tanggal Praktikum** | `[DD/MM/YYYY]` |

---

## 📋 Hasil Praktikum

### ✅ Checklist Tugas

| No | Tugas | Status |
|----|-------|--------|
| 1 | Jalankan MySQL dengan volume | ⬜ Belum / ✅ Sudah |
| 2 | Buat tabel mahasiswa | ⬜ Belum / ✅ Sudah |
| 3 | Insert minimal 3 data | ⬜ Belum / ✅ Sudah |
| 4 | Test persistensi data | ⬜ Belum / ✅ Sudah |
| 5 | Screenshot semua hasil | ⬜ Belum / ✅ Sudah |

---

## 💻 Perintah yang Dijalankan

### 🐬 Menjalankan MySQL Container
```bash
# Paste perintah docker run MySQL Anda di sini


```

### 📝 SQL Commands
```sql
-- Paste SQL commands yang dijalankan


```

---

## 🖼️ Screenshot Hasil

> **📁 Simpan screenshot di folder:** `pertemuan-03/ss/`

### 1️⃣ Screenshot Docker Volume List
![Volume List](ss/01-volume-list.png)

**Perintah:**
```bash
docker volume ls
```

**Penjelasan:**
```
[Tulis penjelasan - volume apa saja yang ada?]
```

---

### 2️⃣ Screenshot MySQL Container Running
![MySQL Running](ss/02-mysql-running.png)

**Penjelasan:**
```
[Tulis penjelasan]
```

---

### 3️⃣ Screenshot Create Table
![Create Table](ss/03-create-table.png)

**SQL yang dijalankan:**
```sql
[Paste SQL CREATE TABLE]
```

---

### 4️⃣ Screenshot Insert Data
![Insert Data](ss/04-insert-data.png)

**SQL yang dijalankan:**
```sql
[Paste SQL INSERT]
```

---

### 5️⃣ Screenshot Select Data (Sebelum Restart)
![Select Before](ss/05-select-before.png)

**Hasil:**
```
[Paste hasil SELECT]
```

---

### 6️⃣ Screenshot Stop & Remove Container
![Stop Remove](ss/06-stop-remove.png)

**Perintah:**
```bash
docker stop mysql-db
docker rm mysql-db
```

---

### 7️⃣ Screenshot Jalankan Ulang Container
![Restart Container](ss/07-restart-container.png)

**Perintah:**
```bash
[Paste perintah docker run]
```

---

### 8️⃣ Screenshot Select Data (Setelah Restart) - BUKTI PERSISTENSI
![Select After](ss/08-select-after.png)

**Hasil:**
```
[Paste hasil SELECT - data harus masih ada!]
```

---

## 📝 Catatan & Kendala

### Kendala yang Dihadapi:
```
[Tulis kendala yang dialami selama praktikum]
```

### Solusi:
```
[Tulis solusi dari kendala tersebut]
```

---

## 💡 Kesimpulan

```
[Tulis kesimpulan yang didapat dari praktikum ini]
Contoh:
- Volume Docker menyimpan data di luar container
- Data tetap ada meskipun container dihapus
- dll
```

---

## 📊 Penilaian

> *Diisi oleh Dosen/Asisten*

| Kriteria | Nilai |
|----------|-------|
| MySQL berjalan dengan volume | /30 |
| Tabel & data berhasil dibuat | /25 |
| Bukti data persist | /25 |
| Screenshot lengkap | /10 |
| Kesimpulan | /10 |
| **Total** | **/100** |

**Catatan Penilai:**
```

```

---

<div align="center">

📅 **Pertemuan 3** | [🏠 Kembali ke README](README.md)

</div>
