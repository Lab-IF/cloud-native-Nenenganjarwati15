# 🚀 Pertemuan 7: Kubernetes Deployment & Service

![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Level](https://img.shields.io/badge/Level-Intermediate-yellow?style=for-the-badge)

---

## 🎯 Tujuan Pembelajaran

| No | Tujuan | Status |
|----|--------|--------|
| 1 | Memahami Kubernetes Deployment | ⬜ |
| 2 | Menulis file YAML manifest | ⬜ |
| 3 | Membuat Service untuk expose app | ⬜ |
| 4 | Melakukan scaling aplikasi | ⬜ |

---

## 📚 Materi

### 🔄 Apa itu Deployment?

> **Deployment** = Cara mengelola Pod dengan fitur canggih!

```
┌────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT                                 │
│                 (nginx-deployment)                             │
│                                                                │
│   replicas: 3  ──────────────────────────────────────────►    │
│                                                                │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐                  │
│   │  Pod 1   │   │  Pod 2   │   │  Pod 3   │                  │
│   │  nginx   │   │  nginx   │   │  nginx   │                  │
│   └──────────┘   └──────────┘   └──────────┘                  │
│                                                                │
│   ✅ Pod crash?     → Auto-recreate!                          │
│   ✅ Update image?  → Rolling update (zero downtime)          │
│   ✅ Scale up/down? → Easy dengan 1 command                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### 💪 Fitur Deployment:
| Fitur | Penjelasan |
|-------|------------|
| **Replicas** | Menjalankan N copies dari Pod |
| **Self-healing** | Otomatis recreate Pod yang crash |
| **Rolling Update** | Update tanpa downtime |
| **Rollback** | Kembali ke versi sebelumnya |

---

### 🌐 Apa itu Service?

> **Service** = Cara expose aplikasi agar bisa diakses

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│      User/Browser                                              │
│           │                                                    │
│           ▼                                                    │
│   ┌───────────────────────────────────────────┐               │
│   │           SERVICE (NodePort)              │               │
│   │          Port: 30080 → 80                 │               │
│   └─────────────────────┬─────────────────────┘               │
│                         │                                      │
│          ┌──────────────┼──────────────┐                       │
│          │              │              │                       │
│          ▼              ▼              ▼                       │
│     ┌────────┐    ┌────────┐    ┌────────┐                    │
│     │ Pod 1  │    │ Pod 2  │    │ Pod 3  │                    │
│     │ :80    │    │ :80    │    │ :80    │                    │
│     └────────┘    └────────┘    └────────┘                    │
│                                                                │
│     Load Balancing otomatis! ⚖️                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Tipe Service:
| Tipe | Akses | Use Case |
|------|-------|----------|
| `ClusterIP` | Internal only | Antar service |
| `NodePort` | External via Node:Port | Development |
| `LoadBalancer` | External via LB | Production (cloud) |

---

## 🧪 Praktikum

### 📁 Struktur:
```
k8s-praktik/
├── deployment.yaml
└── service.yaml
```

### 📄 deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3                    # Jumlah Pod
  selector:
    matchLabels:
      app: nginx                 # Label selector
  template:
    metadata:
      labels:
        app: nginx               # Label Pod
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

### 📄 service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx                   # Match dengan Pod label
  ports:
  - port: 80                     # Port di cluster
    targetPort: 80               # Port container
    nodePort: 30080              # Port akses external
```

### ⌨️ Commands:
```bash
# 🚀 Apply Deployment
kubectl apply -f deployment.yaml

# 🌐 Apply Service
kubectl apply -f service.yaml

# 👀 Lihat resources
kubectl get deployments
kubectl get pods
kubectl get services

# 🔗 Akses via Minikube
minikube service nginx-service
```

### 🧪 Test Self-Healing:
```bash
# Lihat pods
kubectl get pods

# Hapus salah satu pod
kubectl delete pod [nama-pod]

# Lihat lagi - Pod baru otomatis dibuat!
kubectl get pods
```

### 📈 Test Scaling:
```bash
# Scale up ke 5
kubectl scale deployment nginx-deployment --replicas=5
kubectl get pods

# Scale down ke 2
kubectl scale deployment nginx-deployment --replicas=2
kubectl get pods
```

### 🔄 Rolling Update:
```bash
# Update image
kubectl set image deployment/nginx-deployment nginx=nginx:alpine

# Lihat proses
kubectl rollout status deployment/nginx-deployment

# Rollback jika bermasalah
kubectl rollout undo deployment/nginx-deployment
```

---

## ✏️ Tugas Praktikum

### 📝 Tugas: Deploy Aplikasi Flask

| Kriteria | Poin |
|----------|------|
| Deployment dengan 3 replicas | 30 |
| Service NodePort benar | 25 |
| Screenshot self-healing (delete pod → auto recreate) | 25 |
| Screenshot scaling (5 → 2 replicas) | 20 |
| **Total** | **100** |

**Gunakan image dari Docker Hub (pertemuan 5):**
```yaml
image: [username]/flask-app:1.0
```

---

## 📤 Pengumpulan Tugas

### 📁 Struktur Folder
```
pertemuan-07/
├── 📄 README.md          # Materi (file ini)
├── 📄 LAPORAN.md         # ⬅️ ISI LAPORAN DI SINI!
└── 📁 ss/                # ⬅️ SIMPAN SCREENSHOT DI SINI!
    ├── 01-yaml-files.png
    ├── 02-apply-deployment.png
    ├── 03-get-deployments.png
    ├── 04-get-pods.png
    ├── 05-apply-service.png
    ├── 06-get-services.png
    ├── 07-browser-access.png
    ├── 08a-before-delete.png
    ├── 08b-delete-pod.png
    ├── 08c-after-delete.png
    ├── 09a-scale-up.png
    └── 09b-scale-down.png
```

### 📝 Cara Mengerjakan:
1. **Screenshot** → Simpan di folder `ss/`
2. **Laporan** → Edit file `LAPORAN.md`
3. **Paste** file `deployment.yaml` dan `service.yaml`

> 📋 **Template Laporan:** [Klik di sini untuk mengisi LAPORAN.md](LAPORAN.md)

---

## 📖 Referensi

- 🔗 [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- 🔗 [Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

---

<div align="center">

[⬅️ Pertemuan 6](../pertemuan-06/README.md) | **📅 Pertemuan 7 dari 8** | [➡️ Pertemuan 8](../pertemuan-08/README.md)

</div>
