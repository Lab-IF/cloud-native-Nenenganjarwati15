# 📝 Laporan Praktikum - Pertemuan 7

## 🚀 Kubernetes Deployment & Service

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
| 1 | Buat file `deployment.yaml` | ⬜ Belum / ✅ Sudah |
| 2 | Buat file `service.yaml` | ⬜ Belum / ✅ Sudah |
| 3 | Apply deployment (3 replicas) | ⬜ Belum / ✅ Sudah |
| 4 | Apply service NodePort | ⬜ Belum / ✅ Sudah |
| 5 | Test self-healing | ⬜ Belum / ✅ Sudah |
| 6 | Test scaling (5 → 2) | ⬜ Belum / ✅ Sudah |
| 7 | Screenshot semua hasil | ⬜ Belum / ✅ Sudah |

---

## 💻 Kode YAML

### 📄 deployment.yaml
```yaml
# Paste deployment.yaml Anda di sini


```

### 📄 service.yaml
```yaml
# Paste service.yaml Anda di sini


```

---

## 🖼️ Screenshot Hasil

> **📁 Simpan screenshot di folder:** `pertemuan-07/ss/`

### 1️⃣ Screenshot File YAML
![YAML Files](ss/01-yaml-files.png)

---

### 2️⃣ Screenshot kubectl apply deployment
![Apply Deployment](ss/02-apply-deployment.png)

**Perintah:**
```bash
kubectl apply -f deployment.yaml
```

---

### 3️⃣ Screenshot kubectl get deployments
![Get Deployments](ss/03-get-deployments.png)

**Output:**
```
[Paste output]
```

---

### 4️⃣ Screenshot kubectl get pods (3 replicas)
![Get Pods](ss/04-get-pods.png)

**Output:**
```
[Paste output - harus ada 3 pods]
```

---

### 5️⃣ Screenshot kubectl apply service
![Apply Service](ss/05-apply-service.png)

**Perintah:**
```bash
kubectl apply -f service.yaml
```

---

### 6️⃣ Screenshot kubectl get services
![Get Services](ss/06-get-services.png)

**Output:**
```
[Paste output]
```

---

### 7️⃣ Screenshot Akses Aplikasi via Browser
![Browser Access](ss/07-browser-access.png)

**URL:** `http://[minikube-ip]:[nodeport]`

---

### 8️⃣ Screenshot Self-Healing Test

#### 8a. Sebelum delete pod
![Before Delete](ss/08a-before-delete.png)

#### 8b. Delete pod
![Delete Pod](ss/08b-delete-pod.png)

**Perintah:**
```bash
kubectl delete pod [nama-pod]
```

#### 8c. Setelah delete (pod baru otomatis dibuat)
![After Delete](ss/08c-after-delete.png)

**Penjelasan:**
```
[Jelaskan bahwa pod baru otomatis dibuat!]
```

---

### 9️⃣ Screenshot Scaling Test

#### 9a. Scale up ke 5 replicas
![Scale Up](ss/09a-scale-up.png)

**Perintah:**
```bash
kubectl scale deployment [nama] --replicas=5
```

**Output kubectl get pods:**
```
[Paste output - harus ada 5 pods]
```

#### 9b. Scale down ke 2 replicas
![Scale Down](ss/09b-scale-down.png)

**Perintah:**
```bash
kubectl scale deployment [nama] --replicas=2
```

**Output kubectl get pods:**
```
[Paste output - harus ada 2 pods]
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
- Deployment memudahkan mengelola replicas
- Service expose aplikasi ke luar cluster
- Kubernetes otomatis membuat pod baru jika ada yang crash
- dll
```

---

## 📊 Penilaian

> *Diisi oleh Dosen/Asisten*

| Kriteria | Nilai |
|----------|-------|
| Deployment dengan 3 replicas | /30 |
| Service NodePort benar | /25 |
| Bukti self-healing | /25 |
| Bukti scaling | /10 |
| Kesimpulan | /10 |
| **Total** | **/100** |

**Catatan Penilai:**
```

```

---

<div align="center">

📅 **Pertemuan 7** | [🏠 Kembali ke README](README.md)

</div>
