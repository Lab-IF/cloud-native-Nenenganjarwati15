# Pertemuan 7: Pods, Deployments, Services — Scale Next.js

## 🎯 Tujuan Pembelajaran

1. Deep dive ke Pod lifecycle dan health probes
2. Deployment strategies (Rolling Update, Recreate, Blue-Green, Canary)
3. Service types dan networking
4. ConfigMap untuk konfigurasi Next.js
5. Rolling updates dan rollbacks

## 📚 Teori Singkat

### Pod Lifecycle

```
Pending → Running → Succeeded/Failed
```

| State | Penjelasan |
|-------|------------|
| Pending | Pod diterima cluster, menunggu scheduling/image pull |
| Running | Minimal 1 container berjalan |
| Succeeded | Semua container selesai sukses |
| Failed | Minimal 1 container gagal |

### Deployment Strategies

| Strategy | Cara kerja | Downtime? | Rollback |
|----------|-----------|-----------|----------|
| **Rolling Update** | Ganti pod satu per satu | Tidak | Otomatis |
| **Recreate** | Hapus semua lama, buat semua baru | Ya | Manual |
| **Blue-Green** | 2 environment, switch traffic | Tidak | Instant |
| **Canary** | Kirim sebagian traffic ke versi baru | Tidak | Mudah |

### Service Types

| Type | Akses | Use case |
|------|-------|----------|
| **ClusterIP** | Internal cluster saja | Komunikasi antar service |
| **NodePort** | Port di setiap node | Development, testing |
| **LoadBalancer** | External load balancer | Production di cloud |
| **ExternalName** | DNS CNAME record | Akses service external |

## 📝 Praktikum

### Langkah 1: Deployment Next.js dengan Health Probes

```yaml
# nextjs-app-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: nextjs-docker-app
  template:
    metadata:
      labels:
        app: nextjs-docker-app
        version: v1
    spec:
      containers:
      - name: nextjs
        image: nextjs-docker-app:1.0
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        env:
        - name: APP_ENV
          value: "kubernetes"
```

**Penjelasan probes:**

| Probe | Fungsi | Jika gagal |
|-------|--------|-----------|
| `livenessProbe` | Cek apakah app masih hidup | Container di-restart |
| `readinessProbe` | Cek apakah app siap terima traffic | Dihapus dari Service endpoint |

> 💡 Next.js app kita sudah punya `/api/health` — endpoint ini sangat berguna untuk health probes di Kubernetes!

**Penjelasan resources:**

| Field | Penjelasan |
|-------|------------|
| `requests.cpu: 100m` | Minimal CPU yang dijamin (100 millicore = 0.1 core) |
| `requests.memory: 128Mi` | Minimal memory yang dijamin |
| `limits.cpu: 500m` | Maksimal CPU yang boleh dipakai |
| `limits.memory: 512Mi` | Maksimal memory (melebihi = OOM killed) |

**Penjelasan rolling update:**

| Field | Penjelasan |
|-------|------------|
| `maxSurge: 1` | Boleh tambah 1 pod di atas replicas saat update |
| `maxUnavailable: 0` | Tidak boleh ada pod yang mati saat update |

### Langkah 2: ConfigMap untuk Next.js

Gunakan ConfigMap untuk menyimpan konfigurasi tanpa hardcode di Deployment:

```yaml
# nextjs-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nextjs-config
data:
  APP_ENV: "kubernetes"
  NEXT_PUBLIC_APP_MESSAGE: "Running on Kubernetes!"
  APP_VERSION: "1.0.0"
```

Update Deployment untuk menggunakan ConfigMap:

```yaml
# nextjs-app-with-config.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-app
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
        envFrom:
        - configMapRef:
            name: nextjs-config
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 15
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
```

```bash
# Apply ConfigMap dan Deployment
kubectl apply -f nextjs-configmap.yaml
kubectl apply -f nextjs-app-with-config.yaml

# Verify env variable masuk
kubectl exec -it <pod-name> -- env | grep APP
kubectl exec -it <pod-name> -- env | grep NEXT_PUBLIC

# Cek lewat API
curl $(minikube service nextjs-service --url)/api/health
```

### Langkah 3: Service Types

```yaml
# ClusterIP (Internal — default)
apiVersion: v1
kind: Service
metadata:
  name: nextjs-internal
spec:
  type: ClusterIP
  selector:
    app: nextjs-docker-app
  ports:
  - port: 3000
    targetPort: 3000

---

# NodePort (External Access — untuk development)
apiVersion: v1
kind: Service
metadata:
  name: nextjs-nodeport
spec:
  type: NodePort
  selector:
    app: nextjs-docker-app
  ports:
  - port: 3000
    targetPort: 3000
    nodePort: 30030

---

# LoadBalancer (Cloud — production)
apiVersion: v1
kind: Service
metadata:
  name: nextjs-lb
spec:
  type: LoadBalancer
  selector:
    app: nextjs-docker-app
  ports:
  - port: 80
    targetPort: 3000
```

### Langkah 4: Rolling Update Next.js

Simulasikan update versi aplikasi:

```bash
# Build versi baru (misalnya setelah edit page.js)
docker build -t nextjs-docker-app:2.0 .

# Load ke Minikube
minikube image load nextjs-docker-app:2.0

# Rolling update
kubectl set image deployment/nextjs-app nextjs=nextjs-docker-app:2.0

# Monitor rollout
kubectl rollout status deployment/nextjs-app

# Lihat history
kubectl rollout history deployment/nextjs-app

# Rollback jika ada masalah!
kubectl rollout undo deployment/nextjs-app

# Rollback ke revisi tertentu
kubectl rollout undo deployment/nextjs-app --to-revision=1
```

**Amati saat rolling update:**

```bash
# Di terminal 1 — watch pods
kubectl get pods -w

# Di terminal 2 — terus hit endpoint
while true; do curl -s $(minikube service nextjs-nodeport --url)/api/health | jq .environment; sleep 1; done
```

> 💡 Dengan `maxUnavailable: 0`, seharusnya tidak ada downtime selama rolling update!

### Langkah 5: Labels dan Selectors

```bash
# Lihat labels di pods
kubectl get pods --show-labels

# Filter by label
kubectl get pods -l app=nextjs-docker-app
kubectl get pods -l version=v1
kubectl get pods -l 'app=nextjs-docker-app,version=v1'

# Add label
kubectl label pod <pod-name> team=devops

# Filter by label
kubectl get pods -l team=devops

# Remove label
kubectl label pod <pod-name> team-
```

### Langkah 6: Horizontal Pod Autoscaler (Bonus)

```bash
# Enable metrics server di Minikube
minikube addons enable metrics-server

# Buat HPA
kubectl autoscale deployment nextjs-app --cpu-percent=50 --min=2 --max=10

# Lihat status HPA
kubectl get hpa
```

## 💪 Tugas Praktikum

### Tugas 1: Next.js dengan Full K8s Setup (35 poin)

1. Buat dan apply semua manifest:
   - ConfigMap (`nextjs-configmap.yaml`)
   - Deployment dengan probes dan resources (`nextjs-app-deployment.yaml`)
   - Service NodePort (`nextjs-service.yaml`)
2. Verify:
   - Semua 3 pods running dan ready
   - Service bisa diakses dari browser
   - `/api/health` menunjukkan `APP_ENV: kubernetes`
   - Probes bekerja (lihat events di `kubectl describe pod`)
3. Screenshot semua langkah

### Tugas 2: Rolling Update Exercise (25 poin)

1. Modifikasi app (ubah hero text di `page.js`)
2. Build image versi 2.0
3. Lakukan rolling update
4. Monitor dengan `kubectl rollout status` dan `kubectl get pods -w`
5. Lakukan rollback ke versi 1.0
6. Screenshot rollout status dan rollback
7. Dokumentasikan: apakah ada downtime?

### Tugas 3: Blue-Green Deployment (25 poin)

Implement blue-green deployment:

1. Deploy versi 1 (blue) dengan label `version: blue`:
   ```yaml
   metadata:
     labels:
       app: nextjs-docker-app
       version: blue
   ```
2. Deploy versi 2 (green) dengan label `version: green`
3. Service selector awalnya mengarah ke `version: blue`
4. Switch traffic ke green:
   ```bash
   kubectl patch service nextjs-service -p '{"spec":{"selector":{"version":"green"}}}'
   ```
5. Verifikasi traffic sudah pindah
6. Rollback ke blue jika ada masalah
7. Screenshot dan dokumentasikan prosesnya

### Tugas 4: ConfigMap Management (15 poin)

1. Buat ConfigMap dengan konfigurasi Next.js
2. Update ConfigMap (ubah `NEXT_PUBLIC_APP_MESSAGE`)
3. Restart pods agar mengambil konfigurasi baru:
   ```bash
   kubectl rollout restart deployment/nextjs-app
   ```
4. Verifikasi perubahan di UI dan `/api/health`
5. Screenshot sebelum dan sesudah

## 📚 Referensi

1. [Kubernetes Workloads](https://kubernetes.io/docs/concepts/workloads/)
2. [Configure Liveness, Readiness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
3. [Rolling Update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/)
4. [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)

---

**Deploy with Confidence! 🚀**

Semua teknik Kubernetes yang dipelajari dari Pertemuan 6-7 akan dipakai di UTS (Pertemuan 8). Pastikan setiap langkah sudah dipahami!
