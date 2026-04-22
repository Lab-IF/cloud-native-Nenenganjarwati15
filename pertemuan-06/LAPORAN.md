# 📝 Laporan Praktikum - Pertemuan 6

## ⚙️ Pengenalan Kubernetes

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
| 1 | Install Minikube | ⬜ Belum / ✅ Sudah |
| 2 | Start Minikube cluster | ⬜ Belum / ✅ Sudah |
| 3 | Jalankan pod nginx | ⬜ Belum / ✅ Sudah |
| 4 | Jalankan pod httpd | ⬜ Belum / ✅ Sudah |
| 5 | Jalankan pod redis | ⬜ Belum / ✅ Sudah |
| 6 | Buka Kubernetes Dashboard | ⬜ Belum / ✅ Sudah |
| 7 | Screenshot semua hasil | ⬜ Belum / ✅ Sudah |

---

## 💻 Perintah yang Dijalankan

### 🚀 Start Minikube
```bash
# Paste perintah start minikube


```

### 📦 Menjalankan Pods
```bash
# Paste perintah kubectl run untuk 3 pods


```

---

## 🖼️ Screenshot Hasil

> **📁 Simpan screenshot di folder:** `pertemuan-06/ss/`

### 1️⃣ Screenshot Minikube Version
![Minikube Version](ss/01-minikube-version.png)

**Output:**
```
[Paste output minikube version]
```

---

### 2️⃣ Screenshot Minikube Start
![Minikube Start](ss/02-minikube-start.png)

**Penjelasan:**
```
[Tulis penjelasan - apakah start berhasil?]
```

---

### 3️⃣ Screenshot Minikube Status
![Minikube Status](ss/03-minikube-status.png)

**Output:**
```
[Paste output minikube status]
```

---

### 4️⃣ Screenshot kubectl get nodes
![Get Nodes](ss/04-get-nodes.png)

**Output:**
```
[Paste output kubectl get nodes]
```

---

### 5️⃣ Screenshot kubectl run (3 pods)
![Run Pods](ss/05-run-pods.png)

**Perintah yang dijalankan:**
```bash
kubectl run nginx-pod --image=nginx
kubectl run httpd-pod --image=httpd
kubectl run redis-pod --image=redis
```

---

### 6️⃣ Screenshot kubectl get pods
![Get Pods](ss/06-get-pods.png)

**Output:**
```
NAME        READY   STATUS    RESTARTS   AGE
[Paste output]
```

---

### 7️⃣ Screenshot kubectl get pods -o wide
![Get Pods Wide](ss/07-get-pods-wide.png)

**Penjelasan:**
```
[Tulis penjelasan - informasi apa saja yang ditampilkan?]
```

---

### 8️⃣ Screenshot Kubernetes Dashboard
![Dashboard](ss/08-dashboard.png)

**Perintah:**
```bash
minikube dashboard
```

**Penjelasan:**
```
[Tulis penjelasan - apa saja yang terlihat di dashboard?]
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
- Kubernetes adalah container orchestration platform
- Pod adalah unit terkecil di Kubernetes
- Minikube digunakan untuk menjalankan K8s di lokal
- dll
```

---

## 📊 Penilaian

> *Diisi oleh Dosen/Asisten*

| Kriteria | Nilai |
|----------|-------|
| Minikube berhasil start | /30 |
| 3 pods berhasil jalan | /30 |
| Screenshot Dashboard | /20 |
| Screenshot lengkap | /10 |
| Kesimpulan | /10 |
| **Total** | **/100** |

**Catatan Penilai:**
```

```

---

<div align="center">

📅 **Pertemuan 6** | [🏠 Kembali ke README](README.md)

</div>
