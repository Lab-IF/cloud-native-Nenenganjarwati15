export const teachingMetrics = [
  {
    value: "UI",
    label: "Halaman utama untuk demo di browser"
  },
  {
    value: "API",
    label: "Endpoint health dan deployment"
  },
  {
    value: "Docker",
    label: "Multi-stage build production"
  }
];

export const featureCards = [
  {
    icon: "UI",
    title: "Routing App Router",
    description: "Halaman utama memakai App Router agar mahasiswa melihat struktur Next.js modern."
  },
  {
    icon: "API",
    title: "API Route",
    description: "Endpoint /api/health dan /api/deployments membuktikan container menjalankan server Node."
  },
  {
    icon: "ENV",
    title: "Environment Variable",
    description: "APP_ENV, APP_VERSION, dan NEXT_PUBLIC_APP_MESSAGE bisa diubah dari Docker run atau Compose."
  },
  {
    icon: "IMG",
    title: "Standalone Output",
    description: "Build Next.js menghasilkan server production minimal untuk runtime image yang lebih kecil."
  }
];

export const runtimeChecks = [
  "Browser membuka halaman Next.js dari container pada port 3000.",
  "Endpoint /api/health mengembalikan status ok dan environment runtime.",
  "Pesan halaman berubah saat environment variable di Compose diganti.",
  "Health check Compose memastikan container bukan hanya hidup, tetapi responsif."
];

export const deploymentSteps = [
  {
    number: "1",
    title: "Install & test",
    description: "Pastikan kode aplikasi valid sebelum masuk image.",
    command: "npm ci && npm test"
  },
  {
    number: "2",
    title: "Build Next.js",
    description: "Next.js menghasilkan folder .next dan standalone server.",
    command: "npm run build"
  },
  {
    number: "3",
    title: "Build image",
    description: "Dockerfile multi-stage memisahkan dependency, build, dan runtime.",
    command: "docker build -t nextjs-docker-app:kelas ."
  },
  {
    number: "4",
    title: "Run container",
    description: "Container menjalankan server production dan expose port 3000.",
    command: "docker compose up --build"
  }
];
