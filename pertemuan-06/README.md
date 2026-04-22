# ⚙️ Pertemuan 6: Pengenalan Kubernetes

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Minikube](https://img.shields.io/badge/Minikube-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Level](https://img.shields.io/badge/Level-Intermediate-yellow?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami apa itu Kubernetes | ⬜ |
| 2 | Memahami komponen dasar K8s | ⬜ |
| 3 | Menginstall Minikube | ⬜ |
| 4 | Menjalankan Pod pertama | ⬜ |

---

## 📚 Materi

### 🤔 Apa itu Kubernetes?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🐳 Docker           vs        ⚙️ Kubernetes                   │
│   ────────                      ────────────                    │
│                                                                 │
│   "Membuat &                    "Mengelola BANYAK               │
│    menjalankan                   container secara               │
│    container"                    OTOMATIS"                      │
│                                                                 │
│   Seperti:                      Seperti:                        │
│   Membuat kapal 🚢              Mengatur pelabuhan ⚓            │
│                                 dengan banyak kapal             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

> 💡 **Kubernetes (K8s)** = Platform untuk **orchestration** container dalam skala besar

---

### 🧩 Komponen Utama

```
┌───────────────────────────────────────────────────────────────────┐
│                    ⚙️ KUBERNETES CLUSTER                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    Control Plane                            │  │
│  │              (Otak yang mengatur semua)                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                             │                                     │
│              ┌──────────────┼──────────────┐                      │
│              │              │              │                      │
│              ▼              ▼              ▼                      │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐           │
│  │    NODE 1     │ │    NODE 2     │ │    NODE 3     │           │
│  │  ┌─────────┐  │ │  ┌─────────┐  │ │  ┌─────────┐  │           │
│  │  │  Pod 1  │  │ │  │  Pod 3  │  │ │  │  Pod 5  │  │           │
│  │  │ [nginx] │  │ │  │ [mysql] │  │ │  │ [redis] │  │           │
│  │  └─────────┘  │ │  └─────────┘  │ │  └─────────┘  │           │
│  │  ┌─────────┐  │ │  ┌─────────┐  │ │               │           │
│  │  │  Pod 2  │  │ │  │  Pod 4  │  │ │               │           │
│  │  │ [flask] │  │ │  │ [flask] │  │ │               │           │
│  │  └─────────┘  │ │  └─────────┘  │ │               │           │
│  └───────────────┘ └───────────────┘ └───────────────┘           │
└───────────────────────────────────────────────────────────────────┘
```

| Komponen | Penjelasan | Analogi |
|----------|------------|---------|
| **Pod** | Unit terkecil, berisi 1+ container | 📦 Kotak berisi aplikasi |
| **Node** | Mesin/server yang menjalankan Pod | 🖥️ Komputer/server |
| **Cluster** | Kumpulan Nodes | 🏢 Data center |
| **kubectl** | CLI untuk berinteraksi dengan K8s | 🎮 Remote control |

---

### 🔄 Docker Compose vs Kubernetes

| Aspek | Docker Compose | Kubernetes |
|-------|----------------|------------|
| Tujuan | Development | Production |
| Skala | Single host | Multi-host cluster |
| Auto-scaling | ❌ | ✅ |
| Self-healing | ❌ | ✅ |
| Load balancing | Basic | Advanced |
| Kompleksitas | Simple | Complex |

---

## 🧪 Praktikum

### Step 1: Install Minikube

<details>
<summary>🐧 <b>Linux</b></summary>

```bash
# Download
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Install
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verifikasi
minikube version
```
</details>

<details>
<summary>🍎 <b>macOS</b></summary>

```bash
brew install minikube
```
</details>

### Step 2: Start Cluster
```bash
# Start Minikube
minikube start

# Cek status
minikube status

# Hasil yang diharapkan:
# minikube
# type: Control Plane
# host: Running
# kubelet: Running
# apiserver: Running
```

### Step 3: Perintah kubectl Dasar
```bash
# 📋 Lihat semua nodes
kubectl get nodes

# 🚀 Jalankan Pod pertama
kubectl run nginx-pod --image=nginx

# 👀 Lihat pods
kubectl get pods

# 🔍 Detail pod
kubectl describe pod nginx-pod

# 📜 Lihat logs
kubectl logs nginx-pod

# 🗑️ Hapus pod
kubectl delete pod nginx-pod
```

### Step 4: Kubernetes Dashboard
```bash
# Buka dashboard (GUI)
minikube dashboard

# Browser akan terbuka otomatis!
```

---

## ⌨️ Cheatsheet kubectl

| Perintah | Fungsi |
|----------|--------|
| `kubectl get pods` | Lihat semua pods |
| `kubectl get pods -o wide` | Lihat pods dengan detail |
| `kubectl get nodes` | Lihat nodes |
| `kubectl get all` | Lihat semua resources |
| `kubectl describe pod [nama]` | Detail spesifik pod |
| `kubectl logs [nama]` | Lihat logs |
| `kubectl exec -it [nama] -- bash` | Masuk ke pod |
| `kubectl delete pod [nama]` | Hapus pod |

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Eksplorasi Kubernetes

| Kriteria | Poin |
|----------|------|
| Minikube berhasil diinstall & start | 30 |
| Jalankan 3 pod berbeda (nginx, httpd, redis) | 30 |
| Screenshot `kubectl get pods` | 20 |
| Screenshot Kubernetes Dashboard | 20 |
| **Total** | **100** |

**Pods yang harus dijalankan:**
```bash
kubectl run nginx-pod --image=nginx
kubectl run httpd-pod --image=httpd
kubectl run redis-pod --image=redis
```

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-06/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-minikube-version.png
    ├── 02-minikube-start.png
    ├── 03-minikube-status.png
    ├── 04-get-nodes.png
    ├── 05-run-pods.png
    ├── 06-get-pods.png
    ├── 07-get-pods-wide.png
    └── 08-dashboard.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. Isi output dari setiap perintah

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Kubernetes Documentation](https://kubernetes.io/docs/)
- 🔗 [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)
- 🔗 [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

---

<div align="center">

[⬅️ Pertemuan 5](../pertemuan-05/README.md) | **📅 Pertemuan 6 dari 8** | [➡️ Pertemuan 7](../pertemuan-07/README.md)

</div>
