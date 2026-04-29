# Pertemuan 6: Kubernetes Architecture — Deploy Next.js

## 🎯 Tujuan Pembelajaran

1. Memahami Kubernetes architecture
2. Setup Kubernetes cluster (Minikube)
3. Memahami Kubernetes components (Master & Worker nodes)
4. Menguasai kubectl CLI basics
5. Deploy Next.js ke Kubernetes (Pod, Deployment, Service)

## 📚 Teori Singkat

### Kubernetes Architecture

```
┌─────────────────────────────────────┐
│         Master Node                 │
│  ┌──────────────────────────────┐  │
│  │  API Server                   │  │
│  │  Scheduler                    │  │
│  │  Controller Manager           │  │
│  │  etcd (Key-Value Store)       │  │
│  └──────────────────────────────┘  │
└─────────────────┬───────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼────┐   ┌───▼────┐   ┌───▼────┐
│ Worker │   │ Worker │   │ Worker │
│ Node 1 │   │ Node 2 │   │ Node 3 │
│┌──────┐│   │┌──────┐│   │┌──────┐│
││Kubelet││   ││Kubelet││   ││Kubelet││
││Kube  ││   ││Kube  ││   ││Kube  ││
││Proxy ││   ││Proxy ││   ││Proxy ││
│└──────┘│   │└──────┘│   │└──────┘│
└────────┘   └────────┘   └────────┘
```

### Core Components

**Control Plane (Master):**

| Component | Fungsi |
|-----------|--------|
| API Server | Pusat komunikasi, menerima semua request |
| Scheduler | Menentukan Pod jalan di Node mana |
| Controller Manager | Menjaga state cluster sesuai keinginan |
| etcd | Database key-value untuk konfigurasi cluster |

**Worker Nodes:**

| Component | Fungsi |
|-----------|--------|
| Kubelet | Agent di setiap node, menjalankan Pods |
| Kube-proxy | Network proxy, mengatur aturan routing |
| Container Runtime | Docker/containerd, menjalankan container |

### Key Concepts

| Konsep | Penjelasan |
|--------|------------|
| **Pod** | Unit terkecil yang bisa di-deploy (1+ container) |
| **Deployment** | Mengelola ReplicaSet dan rolling update |
| **Service** | Endpoint network untuk mengakses Pods |
| **Namespace** | Virtual cluster untuk isolasi |
| **ConfigMap** | Menyimpan konfigurasi non-sensitif |
| **Secret** | Menyimpan data sensitif (encoded) |

## 🛠️ Setup Minikube

```bash
# Install Minikube (Linux)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Windows (dengan Chocolatey)
choco install minikube

# Start cluster
minikube start --cpus=2 --memory=4096

# Verify
kubectl cluster-info
kubectl get nodes

# Dashboard (GUI)
minikube dashboard
```

## 📝 Praktikum

### Langkah 1: kubectl Basics

```bash
# Cluster info
kubectl cluster-info
kubectl get nodes
kubectl get namespaces

# Create namespace untuk praktikum
kubectl create namespace practicum

# Get resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get all

# Describe resource (detail)
kubectl describe pod <pod-name>
kubectl describe node <node-name>

# Logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow (real-time)

# Execute command di dalam Pod
kubectl exec -it <pod-name> -- /bin/sh
```

### Langkah 2: Load Image ke Minikube

Sebelum deploy, kita perlu membuat image Next.js tersedia di Minikube:

```bash
# Option 1: Build langsung di Minikube Docker
eval $(minikube docker-env)
cd cloud-native-practicum/examples/nextjs-docker-app
docker build -t nextjs-docker-app:1.0 .

# Option 2: Load image yang sudah ada
minikube image load nextjs-docker-app:1.0
```

### Langkah 3: First Pod — Next.js

```yaml
# nextjs-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nextjs-pod
  labels:
    app: nextjs-docker-app
spec:
  containers:
  - name: nextjs
    image: nextjs-docker-app:1.0
    ports:
    - containerPort: 3000
    env:
    - name: APP_ENV
      value: "kubernetes"
```

```bash
# Apply configuration
kubectl apply -f nextjs-pod.yaml

# Check status
kubectl get pods
kubectl describe pod nextjs-pod

# Lihat logs
kubectl logs nextjs-pod

# Port forward untuk akses di browser
kubectl port-forward nextjs-pod 3000:3000
# Buka: http://localhost:3000

# Akses API health
curl http://localhost:3000/api/health

# Delete pod
kubectl delete pod nextjs-pod
```

### Langkah 4: First Deployment — Next.js

Pod langsung tidak ideal karena tidak ada auto-restart atau scaling. Gunakan Deployment:

```yaml
# nextjs-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nextjs-docker-app
  template:
    metadata:
      labels:
        app: nextjs-docker-app
    spec:
      containers:
      - name: nextjs
        image: nextjs-docker-app:1.0
        ports:
        - containerPort: 3000
        env:
        - name: APP_ENV
          value: "kubernetes"
        - name: NEXT_PUBLIC_APP_MESSAGE
          value: "Berjalan di Kubernetes!"
```

```bash
# Create deployment
kubectl apply -f nextjs-deployment.yaml

# Check deployment dan pods
kubectl get deployments
kubectl get pods
# Perhatikan: ada 3 pods (replicas: 3)

# Scale deployment
kubectl scale deployment nextjs-deployment --replicas=5
kubectl get pods  # Sekarang ada 5 pods

# Scale down
kubectl scale deployment nextjs-deployment --replicas=2
```

### Langkah 5: First Service — Expose Next.js

Service membuat pods bisa diakses dari luar cluster:

```yaml
# nextjs-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nextjs-service
spec:
  type: NodePort
  selector:
    app: nextjs-docker-app
  ports:
  - port: 3000
    targetPort: 3000
    nodePort: 30030
```

```bash
# Create service
kubectl apply -f nextjs-service.yaml

# Akses service
minikube service nextjs-service

# Atau dapatkan URL
minikube service nextjs-service --url
# Output: http://192.168.49.2:30030

# Cek service
kubectl get services
kubectl describe service nextjs-service
```

**Penjelasan ports:**

| Port | Fungsi |
|------|--------|
| `port: 3000` | Port service di dalam cluster |
| `targetPort: 3000` | Port container Next.js |
| `nodePort: 30030` | Port yang bisa diakses dari luar cluster |

### Langkah 6: Verify Semua Berjalan

```bash
# Lihat semua resources
kubectl get all

# Test endpoint dari service
curl $(minikube service nextjs-service --url)/api/health

# Lihat pods yang menjalankan service
kubectl get pods -l app=nextjs-docker-app

# Hapus satu pod — Deployment akan membuat pod baru!
kubectl delete pod <pod-name>
kubectl get pods  # Pod baru otomatis dibuat
```

> 💡 **Self-healing!** Kubernetes secara otomatis membuat pod baru jika ada yang mati. Ini salah satu keunggulan Deployment.

## 💪 Tugas Praktikum

### Tugas 1: Minikube Setup (20 poin)

1. Install dan start Minikube
2. Verify dengan `kubectl cluster-info` dan `kubectl get nodes`
3. Buka Minikube dashboard (`minikube dashboard`)
4. Screenshot semua langkah

### Tugas 2: kubectl Mastery (25 poin)

1. Praktikkan semua kubectl commands dari Langkah 1
2. Buat cheatsheet kubectl commands (minimal 15 commands)
3. Buat namespace `practicum` dan deploy pod di namespace tersebut
4. Screenshot dan dokumentasikan

### Tugas 3: Deploy Next.js ke Kubernetes (30 poin)

1. Build image Next.js dan load ke Minikube
2. Buat dan apply:
   - `nextjs-pod.yaml` — Pod tunggal
   - `nextjs-deployment.yaml` — Deployment dengan 3 replicas
   - `nextjs-service.yaml` — Service NodePort
3. Akses Next.js dari browser via service
4. Scale deployment ke 5 replicas, lalu kembali ke 3
5. Hapus satu pod dan buktikan auto-recovery
6. Screenshot semua langkah

### Tugas 4: Troubleshooting (25 poin)

1. Buat pod dengan image yang salah dan debug:
   ```yaml
   # broken-pod.yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: broken-pod
   spec:
     containers:
     - name: app
       image: nextjs-docker-app:wrong-tag
   ```
2. Gunakan `kubectl describe pod` dan `kubectl logs` untuk analisis error
3. Perbaiki dan deploy ulang
4. Dokumentasikan proses troubleshooting

## 📚 Referensi

1. [Kubernetes Documentation](https://kubernetes.io/docs/)
2. [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
3. [Minikube Documentation](https://minikube.sigs.k8s.io/docs/)

---

**Welcome to Kubernetes! ☸️**

Next.js kita sekarang berjalan di Kubernetes cluster. Di Pertemuan 7, kita akan menambahkan health probes, rolling update, dan ConfigMap.
