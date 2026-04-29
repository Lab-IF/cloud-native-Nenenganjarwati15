// Content data untuk 8 pertemuan praktikum Cloud-Native

export const courseInfo = {
  title: 'Praktikum Cloud-Native Application Development',
  subtitle: 'Membangun Aplikasi Modern dengan Container dan Orchestration',
  institution: 'Laboratorium Informatika - Fakultas Teknik - Universitas Muhammadiyah Makassar',
  code: 'CW6552021552',
  semester: 'V (Lima)',
  sks: '3 SKS'
};

export const navigation = [
  { id: 'overview', title: 'Overview', icon: '🏠', badge: null },
  { id: 'pengenalan', title: 'Pengenalan Dasar', icon: '📖', badge: '00' },
  { id: 'pertemuan-1', title: 'Cloud-Native & 12-Factor', icon: '☁️', badge: '01' },
  { id: 'pertemuan-2', title: 'Docker Fundamentals', icon: '🐳', badge: '02' },
  { id: 'pertemuan-3', title: 'Dockerfile Best Practices', icon: '📦', badge: '03' },
  { id: 'pertemuan-4', title: 'Docker Compose', icon: '🔗', badge: '04' },
  { id: 'pertemuan-5', title: 'Container Registry', icon: '📤', badge: '05' },
  { id: 'pertemuan-6', title: 'Kubernetes Architecture', icon: '☸️', badge: '06' },
  { id: 'pertemuan-7', title: 'Pods, Deployments, Services', icon: '🚀', badge: '07' },
  { id: 'pertemuan-8', title: 'UTS - Final Project', icon: '🏆', badge: '08' }
];

export const overviewContent = {
  id: 'overview',
  title: 'Overview',
  icon: '🏠',
  description: 'Selamat datang di Praktikum Cloud-Native Application Development!',
  
  learningOutcomes: [
    { icon: '☁️', text: 'Memahami prinsip cloud-native architecture' },
    { icon: '🐳', text: 'Menguasai containerization dengan Docker' },
    { icon: '☸️', text: 'Mampu melakukan container orchestration dengan Kubernetes' },
    { icon: '🔧', text: 'Mengimplementasikan microservices pattern' },
    { icon: '✅', text: 'Menerapkan best practices cloud-native deployment' }
  ],
  
  techStack: [
    { name: 'Docker', icon: '🐳', desc: 'Container runtime & build' },
    { name: 'Docker Compose', icon: '🔗', desc: 'Multi-container orchestration' },
    { name: 'Kubernetes', icon: '☸️', desc: 'Container orchestration' },
    { name: 'Minikube', icon: '💻', desc: 'Local Kubernetes' },
    { name: 'kubectl', icon: '⌨️', desc: 'Kubernetes CLI' }
  ],
  
  roadmap: [
    { week: '01', title: 'Introduction', desc: 'Cloud-Native principles & 12-Factor App', status: 'completed' },
    { week: '02', title: 'Docker Basics', desc: 'Images, containers, dan CLI', status: 'completed' },
    { week: '03', title: 'Dockerfile', desc: 'Best practices & multi-stage builds', status: 'completed' },
    { week: '04', title: 'Compose', desc: 'Multi-container applications', status: 'completed' },
    { week: '05', title: 'Registry', desc: 'Docker Hub & private registry', status: 'completed' },
    { week: '06', title: 'K8s Intro', desc: 'Architecture & setup', status: 'completed' },
    { week: '07', title: 'K8s Deploy', desc: 'Pods, Deployments, Services', status: 'completed' },
    { week: '08', title: 'UTS', desc: 'Final project deployment', status: 'current' }
  ],
  
  grading: [
    { component: 'Kehadiran & Partisipasi', weight: '10%' },
    { component: 'Tugas Mingguan', weight: '30%' },
    { component: 'UTS (Mid-term Project)', weight: '25%' },
    { component: 'UAS (Final Project)', weight: '35%' }
  ]
};

// Pengenalan Dasar - Section untuk pemula
export const pengenalanContent = {
  id: 'pengenalan',
  title: 'Pengenalan Dasar',
  icon: '📖',
  subtitle: 'Memahami konsep-konsep fundamental sebelum masuk ke materi Cloud-Native',
  
  intro: {
    title: 'Sebelum Kita Mulai...',
    content: `Sebelum masuk ke dunia Docker dan Kubernetes yang mungkin terdengar rumit, 
    mari kita pahami dulu konsep-konsep dasar dengan cara yang sederhana. 
    Bayangkan kita sedang ngobrol santai di warung kopi! ☕`
  },
  
  basicConcepts: [
    {
      id: 'aplikasi',
      title: 'Apa itu Aplikasi?',
      icon: '📱',
      analogy: {
        title: 'Analogi: Resep Masakan',
        icon: '👨‍🍳',
        content: `Bayangkan **aplikasi** seperti **resep masakan**:
        
• **Source Code** = Resep tertulis (instruksi cara membuat)
• **Aplikasi yang berjalan** = Masakan jadi yang siap dimakan
• **Developer** = Koki yang menulis dan menyempurnakan resep
• **User** = Orang yang menikmati masakannya`,
        visual: ['📝 Resep', '→', '👨‍🍳 Koki', '→', '🍲 Masakan', '→', '😋 Dinikmati']
      },
      explanation: `Aplikasi adalah program komputer yang dibuat untuk menyelesaikan tugas tertentu. 
      Contohnya: WhatsApp untuk chat, Gojek untuk ojol, atau Tokopedia untuk belanja online.
      
      Setiap aplikasi membutuhkan "tempat tinggal" untuk berjalan - inilah yang disebut **server**.`,
      keyTakeaways: [
        'Aplikasi = program untuk menyelesaikan tugas tertentu',
        'Source code adalah "resep" yang ditulis developer',
        'Aplikasi butuh server untuk bisa berjalan dan diakses'
      ],
      realWorldExample: {
        title: 'Contoh Nyata: WhatsApp',
        content: `Ketika kamu kirim pesan di WhatsApp:
1. Kamu ketik pesan di HP (client)
2. Pesan dikirim ke server WhatsApp
3. Server meneruskan ke HP temanmu
4. Temanmu baca pesannya

Semua ini terjadi dalam hitungan detik berkat aplikasi yang berjalan di server!`
      },
      funFact: 'Tahukah kamu? Instagram memproses lebih dari 500 juta Stories setiap hari di server mereka!'
    },
    {
      id: 'server',
      title: 'Apa itu Server?',
      icon: '🖥️',
      analogy: {
        title: 'Analogi: Dapur Restoran',
        icon: '🏪',
        content: `Bayangkan **server** seperti **dapur restoran**:
        
• **Server** = Dapur tempat masakan dibuat
• **CPU** = Koki yang mengerjakan pesanan
• **RAM** = Meja kerja koki (makin luas, makin banyak yang bisa dikerjakan bersamaan)
• **Storage** = Kulkas dan gudang bahan
• **Network** = Jendela pesanan dari pelanggan`,
        visual: ['🧑‍🍳 Koki (CPU)', '🪑 Meja (RAM)', '🧊 Kulkas (Storage)', '🪟 Jendela (Network)']
      },
      explanation: `Server adalah komputer khusus yang tugasnya melayani permintaan dari banyak pengguna.
      Ketika kamu buka Instagram, HP-mu mengirim permintaan ke server Instagram, 
      lalu server mengirim balik foto dan video yang kamu lihat.`,
      keyTakeaways: [
        'Server = komputer yang melayani banyak pengguna sekaligus',
        'CPU menentukan seberapa cepat proses berjalan',
        'RAM menentukan berapa banyak yang bisa diproses bersamaan',
        'Storage menyimpan data secara permanen'
      ],
      realWorldExample: {
        title: 'Contoh Nyata: YouTube',
        content: `Ketika kamu nonton video YouTube:
1. HP-mu request video ke server YouTube
2. Server mencari video di storage
3. CPU memproses dan compress video
4. Network mengirim video ke HP-mu
5. Kamu nonton dengan lancar!

YouTube punya jutaan server di seluruh dunia agar video bisa diakses cepat dari mana saja.`
      },
      tip: 'Server modern bisa melayani ribuan hingga jutaan request per detik!'
    },
    {
      id: 'cloud',
      title: 'Apa itu "The Cloud"?',
      icon: '☁️',
      analogy: {
        title: 'Analogi: Kos-kosan vs Punya Rumah',
        icon: '🏠',
        content: `Bayangkan perbedaan **punya server sendiri** vs **cloud**:
        
**Punya Server Sendiri (On-Premise):**
• 🏠 Seperti beli rumah sendiri
• 💰 Bayar di awal sangat mahal
• 🔧 Harus urus sendiri kalau rusak
• 📏 Kalau kurang besar, susah expand

**Pakai Cloud:**
• 🏨 Seperti ngekos atau sewa apartemen
• 💳 Bayar bulanan sesuai pemakaian
• 🛠️ Ada tukang yang urus kalau rusak
• 📐 Mau pindah ke kamar lebih besar? Gampang!`,
        visual: ['🏠 Rumah Sendiri', 'vs', '🏨 Kos/Apartemen']
      },
      explanation: `"Cloud" adalah kumpulan server milik perusahaan besar (Google, Amazon, Microsoft) 
      yang bisa kita sewa. Kita tidak perlu beli dan rawat server sendiri - 
      cukup bayar sesuai yang dipakai, seperti bayar listrik!`,
      keyTakeaways: [
        'Cloud = sewa infrastruktur dari provider besar',
        'Bayar sesuai pemakaian (pay-as-you-go)',
        'Tidak perlu pusing maintenance hardware',
        'Mudah scale up/down sesuai kebutuhan'
      ],
      realWorldExample: {
        title: 'Contoh Nyata: Netflix',
        content: `Netflix menggunakan Amazon Web Services (AWS) untuk streaming:
• Saat malam hari (banyak yang nonton): Netflix "sewa" lebih banyak server
• Saat siang hari (sepi): Netflix kurangi server, hemat biaya
• Kalau ada film baru yang viral: Otomatis scale up!

Tanpa cloud, Netflix harus beli server untuk handle peak tertinggi, tapi server itu nganggur di waktu sepi. Boros!`
      },
      providers: [
        { name: 'AWS (Amazon)', icon: '🟠', desc: 'Terbesar, paling lengkap' },
        { name: 'Google Cloud', icon: '🔵', desc: 'Kuat di AI/ML dan data' },
        { name: 'Microsoft Azure', icon: '🟢', desc: 'Integrasi bagus dengan Microsoft' },
        { name: 'DigitalOcean', icon: '💧', desc: 'Simpel, cocok untuk pemula' }
      ]
    }
  ],
  
  // Ringkasan konsep dasar
  basicConceptsSummary: {
    title: '📝 Ringkasan: Konsep Dasar',
    points: [
      { icon: '📱', text: 'Aplikasi = Program yang menyelesaikan tugas' },
      { icon: '🖥️', text: 'Server = Komputer yang melayani pengguna' },
      { icon: '☁️', text: 'Cloud = Sewa server, bayar sesuai pakai' }
    ],
    quiz: {
      question: 'Quick Check: Apa perbedaan utama cloud dengan punya server sendiri?',
      options: [
        'Cloud lebih lambat',
        'Cloud bayar sesuai pemakaian, tidak perlu beli server',
        'Cloud tidak bisa scale',
        'Tidak ada perbedaan'
      ],
      correctIndex: 1,
      explanation: 'Betul! Cloud memungkinkan kita bayar sesuai pemakaian tanpa harus investasi besar di awal untuk beli dan maintain server sendiri.'
    }
  },
  
  evolutionStory: {
    title: 'Evolusi: Dari Server Fisik ke Container',
    subtitle: 'Perjalanan teknologi infrastruktur dalam 3 babak',
    intro: `Sebelum ada container, industri IT sudah mengalami beberapa revolusi besar dalam cara menjalankan aplikasi. Mari kita lihat perjalanannya!`,
    stages: [
      {
        era: 'Era 1: Physical Servers',
        year: '1990an - 2000an',
        icon: '🏢',
        title: 'Punya Gedung Sendiri',
        analogy: 'Seperti punya gedung perkantoran sendiri',
        characteristics: [
          '1 server fisik = 1 aplikasi',
          'Butuh ruangan khusus (data center)',
          'Mahal untuk beli dan maintenance',
          'Kalau rusak, downtime lama',
          'Banyak resource terbuang (server idle)'
        ],
        problem: 'Bayangkan beli gedung 10 lantai, tapi cuma pakai 2 lantai. Sisanya nganggur tapi tetap bayar listrik dan kebersihan!',
        visual: {
          icon: '🏢',
          label: '1 Server = 1 App',
          waste: '80% idle'
        },
        realExample: 'Dulu, bank harus punya ruangan khusus penuh AC untuk server mereka. Kalau mau tambah kapasitas, harus beli server baru yang prosesnya bisa berbulan-bulan!'
      },
      {
        era: 'Era 2: Virtual Machines',
        year: '2000an - 2010an',
        icon: '🏬',
        title: 'Sewa Lantai di Gedung',
        analogy: 'Seperti gedung yang dibagi jadi beberapa kantor',
        characteristics: [
          '1 server fisik bisa jalan beberapa VM',
          'Setiap VM punya OS sendiri',
          'Lebih hemat resource',
          'Isolasi antar aplikasi',
          'Tapi masih "berat" karena tiap VM butuh OS lengkap'
        ],
        problem: 'Lebih baik, tapi setiap kantor masih harus punya dapur, toilet, dan resepsionis sendiri. Banyak duplikasi!',
        visual: {
          icon: '🏬',
          label: '1 Server = Many VMs',
          items: ['VM1 + OS', 'VM2 + OS', 'VM3 + OS']
        },
        realExample: 'VMware dan VirtualBox mulai populer. Satu server bisa jalan 5-10 VM sekaligus. Tapi tiap VM butuh RAM minimal 1-2GB karena harus jalan OS lengkap.'
      },
      {
        era: 'Era 3: Containers',
        year: '2013 - Sekarang',
        icon: '📦',
        title: 'Kontainer yang Fleksibel',
        analogy: 'Seperti food court - shared kitchen, masing-masing stall fokus ke masakannya',
        characteristics: [
          'Berbagi OS kernel (tidak perlu OS per container)',
          'Sangat ringan dan cepat start',
          'Portable - jalan di mana saja',
          'Konsisten: "Works on my machine" problem solved!',
          'Efisien - ribuan container dalam 1 server'
        ],
        solution: 'Container seperti food court: fasilitas umum (listrik, air, toilet) disharing, tapi setiap tenant tetap punya ruang dan peralatan sendiri!',
        visual: {
          icon: '📦',
          label: '1 Server = 1000s Containers',
          items: ['Container 1', 'Container 2', '...', 'Container N']
        },
        realExample: 'Google menjalankan MILIARAN container setiap minggunya! Spotify, Netflix, Uber - semua pakai container. Docker dirilis 2013 dan langsung mengubah cara industri bekerja.'
      }
    ],
    summary: {
      title: '📊 Perbandingan Cepat',
      comparison: [
        { aspect: 'Startup Time', physical: '~menit', vm: '~30 detik', container: '~milidetik' },
        { aspect: 'Resource', physical: 'Boros', vm: 'Sedang', container: 'Efisien' },
        { aspect: 'Isolasi', physical: '100%', vm: '100%', container: '~95%' },
        { aspect: 'Portabilitas', physical: 'Rendah', vm: 'Sedang', container: 'Tinggi' }
      ]
    },
    quiz: {
      question: 'Apa keunggulan utama container dibanding VM?',
      options: [
        'Container lebih aman',
        'Container lebih ringan dan cepat karena berbagi OS kernel',
        'Container lebih murah untuk dibeli',
        'Container tidak butuh server'
      ],
      correctIndex: 1,
      explanation: 'Container berbagi OS kernel dengan host, sehingga tidak perlu boot OS sendiri. Ini membuat container sangat ringan dan bisa start dalam milidetik!'
    }
  },
  
  whyContainers: {
    title: 'Kenapa Container?',
    subtitle: 'Masalah yang dipecahkan oleh Docker',
    intro: 'Container bukan sekadar teknologi baru yang keren. Container lahir untuk memecahkan masalah nyata yang dihadapi developer setiap hari.',
    problems: [
      {
        icon: '😱',
        problem: '"Works on my machine!"',
        scenario: 'Developer A: "Di laptop gue jalan kok".\nTester B: "Tapi di server error!"',
        solution: 'Container memastikan environment SAMA di mana-mana',
        emoji: '✅',
        deepDive: 'Masalah ini terjadi karena perbedaan versi OS, library, atau konfigurasi. Container membungkus semua dependency, jadi environment dijamin identik di mana pun dijalankan.'
      },
      {
        icon: '📦',
        problem: 'Dependency Hell',
        scenario: 'App A butuh Python 2.7, App B butuh Python 3.9. Gimana dong?',
        solution: 'Setiap container punya dependencies sendiri, tidak konflik',
        emoji: '✅',
        deepDive: 'Tanpa container, kamu harus install Python 2.7 DAN 3.9 di server yang sama dan pastikan keduanya tidak konflik. Dengan container, masing-masing app punya "ruang" sendiri.'
      },
      {
        icon: '⏰',
        problem: 'Deployment Lama',
        scenario: 'Setup server baru butuh berhari-hari install dan konfigurasi',
        solution: 'Container bisa jalan dalam hitungan detik',
        emoji: '✅',
        deepDive: 'Dulu: Install OS → Update → Install dependencies → Configure → Test → Deploy (berhari-hari). Sekarang: docker run myapp (detik)!'
      },
      {
        icon: '📈',
        problem: 'Sulit Scale',
        scenario: 'Mendadak user naik 10x lipat pas promo. Server kewalahan!',
        solution: 'Tinggal tambah container, otomatis dengan orchestrator',
        emoji: '✅',
        deepDive: 'Dengan Kubernetes, kamu bisa set: "Kalau CPU usage > 80%, tambah container baru otomatis". Scaling jadi semudah mengubah angka di config!'
      }
    ],
    benefits: {
      title: '🎯 Manfaat Container',
      items: [
        { icon: '🚀', title: 'Cepat', desc: 'Start dalam milidetik, tidak perlu boot OS' },
        { icon: '📦', title: 'Konsisten', desc: 'Sama di laptop, staging, dan production' },
        { icon: '🔒', title: 'Terisolasi', desc: 'Setiap container terpisah, tidak saling ganggu' },
        { icon: '💾', title: 'Efisien', desc: 'Lebih hemat resource dibanding VM' },
        { icon: '🌍', title: 'Portable', desc: 'Jalan di mana saja yang ada Docker' },
        { icon: '📐', title: 'Scalable', desc: 'Mudah tambah/kurangi instance' }
      ]
    },
    quiz: {
      question: 'Masalah "Works on my machine" terjadi karena...',
      options: [
        'Developer malas',
        'Perbedaan environment (OS, library, config)',
        'Server terlalu lambat',
        'Kode program yang buruk'
      ],
      correctIndex: 1,
      explanation: 'Masalah ini terjadi karena environment di laptop developer berbeda dengan server. Container memastikan environment IDENTIK di semua tempat.'
    }
  },
  
  whyKubernetes: {
    title: 'Kenapa Kubernetes?',
    subtitle: 'Ketika container makin banyak, siapa yang ngatur?',
    intro: 'Docker menyelesaikan masalah packaging dan running container. Tapi bagaimana kalau kamu punya ratusan atau ribuan container?',
    story: `Bayangkan kamu punya 1 container. Gampang diatur sendiri.
    
Sekarang bayangkan punya **100 containers** yang harus:
• Selalu menyala 24/7
• Restart otomatis kalau crash
• Dibagi rata ke beberapa server
• Diupdate tanpa downtime
• Scale naik/turun sesuai traffic

**Kubernetes** adalah "manager" yang mengurus semua itu secara otomatis!`,
    analogy: {
      title: 'Analogi: Manajer Mal',
      icon: '🏬',
      comparison: [
        { manual: 'Kamu sendiri jaga 100 toko', auto: 'Ada manajer mal yang atur semuanya' },
        { manual: 'Toko tutup? Kamu harus cek satu-satu', auto: 'Manajer otomatis tahu & kirim pengganti' },
        { manual: 'Mau renovasi? Tutup semua toko', auto: 'Renovasi bertahap, mal tetap buka' },
        { manual: 'Weekend rame? Panik nyari karyawan', auto: 'Otomatis tambah staff saat rame' }
      ]
    },
    capabilities: {
      title: '💪 Apa yang Bisa Dilakukan Kubernetes?',
      items: [
        { icon: '🔄', title: 'Self-healing', desc: 'Container crash? K8s restart otomatis' },
        { icon: '⚖️', title: 'Load Balancing', desc: 'Distribusi traffic ke semua container' },
        { icon: '📈', title: 'Auto Scaling', desc: 'Tambah/kurangi container sesuai beban' },
        { icon: '🔄', title: 'Rolling Updates', desc: 'Update tanpa downtime' },
        { icon: '🔐', title: 'Secret Management', desc: 'Simpan password dan API key dengan aman' },
        { icon: '📊', title: 'Resource Management', desc: 'Alokasi CPU dan memory per container' }
      ]
    },
    realWorldUsage: {
      title: '🌍 Siapa yang Pakai Kubernetes?',
      companies: [
        { name: 'Google', scale: '2 miliar+ container/minggu' },
        { name: 'Spotify', scale: '150+ microservices' },
        { name: 'Airbnb', scale: '1000+ services' },
        { name: 'Pinterest', scale: '1000+ nodes' }
      ]
    },
    quiz: {
      question: 'Kubernetes berguna untuk...',
      options: [
        'Membuat container',
        'Mendesain UI aplikasi',
        'Mengatur dan mengelola banyak container secara otomatis',
        'Menulis kode program'
      ],
      correctIndex: 2,
      explanation: 'Kubernetes adalah orchestrator - dia mengatur, memantau, dan mengelola banyak container agar tetap berjalan sesuai yang kita inginkan.'
    }
  },
  
  glossary: {
    title: 'Glosarium Istilah',
    subtitle: 'Istilah-istilah yang akan sering kamu dengar',
    terms: [
      { term: 'Container', definition: 'Paket berisi aplikasi + semua yang dibutuhkan untuk jalan', icon: '📦' },
      { term: 'Image', definition: 'Template/cetakan untuk membuat container (seperti resep)', icon: '📋' },
      { term: 'Docker', definition: 'Tools paling populer untuk membuat dan menjalankan container', icon: '🐳' },
      { term: 'Kubernetes (K8s)', definition: 'Platform untuk mengatur (orchestrate) banyak container', icon: '☸️' },
      { term: 'Microservices', definition: 'Arsitektur di mana aplikasi dipecah jadi layanan-layanan kecil', icon: '🧩' },
      { term: 'Deployment', definition: 'Proses memasang aplikasi ke server agar bisa diakses user', icon: '🚀' },
      { term: 'Scaling', definition: 'Menambah/mengurangi kapasitas sesuai kebutuhan', icon: '📈' },
      { term: 'CI/CD', definition: 'Otomatisasi build, test, dan deploy aplikasi', icon: '🔄' },
      { term: 'Registry', definition: 'Tempat menyimpan Docker images (seperti Google Drive untuk images)', icon: '📤' },
      { term: 'Pod', definition: 'Unit terkecil di Kubernetes, berisi 1 atau lebih container', icon: '🫛' },
      { term: 'Cluster', definition: 'Kumpulan server yang bekerja sama menjalankan Kubernetes', icon: '🖥️' },
      { term: 'Node', definition: 'Satu server/komputer dalam cluster Kubernetes', icon: '💻' }
    ]
  },
  
  readyCheck: {
    title: 'Siap Melanjutkan?',
    subtitle: 'Pastikan kamu sudah paham konsep-konsep ini:',
    checklist: [
      'Aplikasi membutuhkan "tempat tinggal" (server) untuk berjalan',
      'Cloud = menyewa infrastruktur, tidak perlu beli/rawat sendiri',
      'Container = cara modern untuk mengemas dan menjalankan aplikasi',
      'Container lebih ringan dari Virtual Machine',
      'Docker = tools untuk membuat container',
      'Kubernetes = tools untuk mengatur banyak container'
    ],
    encouragement: 'Jangan khawatir kalau belum 100% paham! Konsep-konsep ini akan makin jelas seiring praktik di pertemuan-pertemuan berikutnya. 💪'
  }
};

export const pertemuanContent = [
  // Pertemuan 1
  {
    id: 'pertemuan-1',
    badge: 'Pertemuan 01',
    title: 'Pengenalan Cloud-Native & 12-Factor App',
    icon: '☁️',
    subtitle: 'Memahami konsep dasar arsitektur cloud-native dan prinsip-prinsip pengembangan aplikasi modern',
    
    objectives: [
      'Memahami konsep Cloud-Native architecture',
      'Mengenal 12-Factor App principles',
      'Memahami perbedaan traditional vs cloud-native applications',
      'Setup development environment',
      'Mengenal microservices architecture pattern'
    ],
    
    concepts: [
      {
        title: 'Apa itu Cloud-Native?',
        icon: '☁️',
        content: `Cloud-Native adalah pendekatan modern untuk membangun dan menjalankan aplikasi yang memanfaatkan keuntungan penuh dari cloud computing. Bayangkan seperti membangun rumah yang dirancang khusus untuk lingkungan tertentu - bukan hanya memindahkan rumah lama ke tempat baru.`,
        analogy: 'Seperti membangun kapal yang memang dirancang untuk laut, bukan perahu kertas yang dipaksa berlayar.'
      },
      {
        title: 'Karakteristik Cloud-Native',
        icon: '✨',
        items: [
          { term: 'Containerized', desc: 'Aplikasi dikemas dalam container - seperti barang dalam kardus standar yang mudah dipindahkan' },
          { term: 'Dynamically Orchestrated', desc: 'Container dikelola otomatis - seperti manajer gudang yang mengatur posisi kardus' },
          { term: 'Microservices-oriented', desc: 'Dipecah menjadi layanan kecil - seperti tim spesialis, bukan satu orang yang mengerjakan semua' },
          { term: 'API-driven', desc: 'Komunikasi via API - seperti memo standar antar departemen' }
        ]
      }
    ],
    
    twelveFactors: [
      { num: 1, title: 'Codebase', desc: 'Satu codebase di version control, banyak deploy' },
      { num: 2, title: 'Dependencies', desc: 'Deklarasikan semua dependencies secara eksplisit' },
      { num: 3, title: 'Config', desc: 'Simpan konfigurasi di environment variables' },
      { num: 4, title: 'Backing Services', desc: 'Perlakukan backing services sebagai attached resources' },
      { num: 5, title: 'Build, Release, Run', desc: 'Pisahkan tahap build, release, dan run' },
      { num: 6, title: 'Processes', desc: 'Jalankan aplikasi sebagai stateless processes' },
      { num: 7, title: 'Port Binding', desc: 'Export services melalui port binding' },
      { num: 8, title: 'Concurrency', desc: 'Scale out via process model' },
      { num: 9, title: 'Disposability', desc: 'Fast startup dan graceful shutdown' },
      { num: 10, title: 'Dev/Prod Parity', desc: 'Jaga development dan production serupa' },
      { num: 11, title: 'Logs', desc: 'Perlakukan logs sebagai event streams' },
      { num: 12, title: 'Admin Processes', desc: 'Jalankan admin tasks sebagai one-off processes' }
    ],
    
    comparison: {
      traditional: {
        title: 'Traditional',
        icon: '🏢',
        items: [
          'Monolithic architecture',
          'Manual deployment',
          'Vertical scaling (server lebih besar)',
          'Physical servers / VMs',
          'Stateful',
          'Config dalam files',
          'Downtime saat update'
        ]
      },
      cloudNative: {
        title: 'Cloud-Native',
        icon: '☁️',
        items: [
          'Microservices architecture',
          'Automated CI/CD',
          'Horizontal scaling (lebih banyak instance)',
          'Containers',
          'Stateless',
          'Environment variables',
          'Rolling updates (zero downtime)'
        ]
      }
    },
    
    codeExamples: [
      {
        title: 'Simple Cloud-Native App (Python)',
        lang: 'python',
        code: `from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return f"""
    <h1>Hello from Cloud-Native App!</h1>
    <p>Hostname: {os.getenv('HOSTNAME', 'unknown')}</p>
    <p>Version: 1.0</p>
    """

@app.route('/health')
def health():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)`
      }
    ]
  },
  
  // Pertemuan 2
  {
    id: 'pertemuan-2',
    badge: 'Pertemuan 02',
    title: 'Docker Fundamentals: Images & Containers',
    icon: '🐳',
    subtitle: 'Menguasai dasar-dasar Docker, memahami perbedaan images dan containers, serta Docker CLI',
    
    objectives: [
      'Memahami perbedaan Docker images vs containers',
      'Menguasai Docker CLI commands',
      'Building custom Docker images',
      'Managing containers lifecycle',
      'Docker networking basics'
    ],
    
    concepts: [
      {
        title: 'Docker Image vs Container',
        icon: '📦',
        content: `Bayangkan Docker Image seperti resep kue atau cetakan - dia adalah template yang berisi semua instruksi dan bahan. Sedangkan Container adalah kue jadi yang dibuat dari resep tersebut. Dari satu resep, kita bisa buat banyak kue!`,
        details: [
          { term: 'Image', desc: 'Template read-only, berisi code + dependencies, disimpan di registry' },
          { term: 'Container', desc: 'Instance running dari image, punya writable layer, bersifat ephemeral (sementara)' }
        ]
      },
      {
        title: 'Docker Lifecycle',
        icon: '🔄',
        flow: ['docker pull', 'docker create', 'docker start', 'docker stop', 'docker rm'],
        shortcut: 'docker run = create + start'
      }
    ],
    
    architecture: {
      title: 'Docker Architecture',
      layers: [
        { name: 'Docker Client (CLI)', icon: '⌨️', desc: 'Tempat kita mengetik perintah', type: 'client' },
        { name: 'Docker Daemon', icon: '⚙️', desc: 'Engine yang menjalankan container', type: 'daemon' },
        { name: 'Container Runtime', icon: '📦', desc: 'containerd / runc', type: 'runtime' },
        { name: 'Host OS Kernel', icon: '🖥️', desc: 'Linux kernel (shared)', type: 'kernel' }
      ]
    },
    
    commands: [
      { category: 'Images', commands: [
        { cmd: 'docker pull ubuntu:22.04', desc: 'Download image dari registry' },
        { cmd: 'docker images', desc: 'List semua images' },
        { cmd: 'docker rmi <image>', desc: 'Hapus image' },
        { cmd: 'docker build -t myapp:1.0 .', desc: 'Build image dari Dockerfile' }
      ]},
      { category: 'Containers', commands: [
        { cmd: 'docker run -d -p 8080:80 nginx', desc: 'Jalankan container' },
        { cmd: 'docker ps', desc: 'List running containers' },
        { cmd: 'docker ps -a', desc: 'List semua containers' },
        { cmd: 'docker stop <container>', desc: 'Stop container' },
        { cmd: 'docker rm <container>', desc: 'Hapus container' },
        { cmd: 'docker logs <container>', desc: 'Lihat logs' },
        { cmd: 'docker exec -it <container> bash', desc: 'Masuk ke container' }
      ]},
      { category: 'Volumes & Networks', commands: [
        { cmd: 'docker volume create mydata', desc: 'Buat volume' },
        { cmd: 'docker run -v mydata:/app/data ...', desc: 'Mount volume' },
        { cmd: 'docker network create mynet', desc: 'Buat network' }
      ]}
    ],
    
    codeExamples: [
      {
        title: 'Dockerfile Dasar',
        lang: 'dockerfile',
        code: `# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (untuk layer caching)
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy aplikasi
COPY . .

# Expose port
EXPOSE 5000

# Command untuk run
CMD ["python", "app.py"]`
      }
    ]
  },
  
  // Pertemuan 3
  {
    id: 'pertemuan-3',
    badge: 'Pertemuan 03',
    title: 'Dockerfile Best Practices',
    icon: '📦',
    subtitle: 'Menulis Dockerfile yang efisien, aman, dan optimal dengan teknik multi-stage build',
    
    objectives: [
      'Menulis efficient Dockerfiles',
      'Optimasi image size',
      'Multi-stage builds',
      'Layer caching strategies',
      'Security best practices'
    ],
    
    bestPractices: [
      {
        title: '1. Gunakan Official Base Images',
        icon: '✅',
        good: 'FROM python:3.11-slim',
        bad: 'FROM ubuntu (lalu install python manual)',
        reason: 'Official images sudah dioptimasi dan lebih aman'
      },
      {
        title: '2. Minimize Layers',
        icon: '📉',
        good: 'RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*',
        bad: 'RUN apt-get update\\nRUN apt-get install curl',
        reason: 'Setiap RUN = 1 layer baru. Gabungkan untuk image lebih kecil'
      },
      {
        title: '3. Gunakan .dockerignore',
        icon: '🚫',
        content: 'File .dockerignore mencegah file tidak perlu masuk ke build context',
        example: ['node_modules', '.git', '*.md', '.env', '*.log']
      },
      {
        title: '4. Non-Root User',
        icon: '🔒',
        good: 'RUN useradd -m appuser\\nUSER appuser',
        reason: 'Jangan jalankan container sebagai root untuk keamanan'
      },
      {
        title: '5. Manfaatkan Layer Caching',
        icon: '⚡',
        content: 'Copy dependencies dulu, baru source code. Kalau code berubah, dependencies tidak perlu di-install ulang.',
        order: ['COPY package.json .', 'RUN npm install', 'COPY . .']
      }
    ],
    
    multiStageBuild: {
      title: 'Multi-Stage Build',
      description: 'Teknik untuk menghasilkan image production yang sangat kecil dengan memisahkan tahap build dan runtime.',
      analogy: 'Seperti membangun rumah: kita butuh banyak alat dan material saat konstruksi, tapi setelah jadi, kita tidak perlu menyimpan crane dan semen di dalam rumah.',
      benefits: [
        'Image size jauh lebih kecil',
        'Tidak ada build tools di production',
        'Lebih aman (attack surface lebih kecil)',
        'Build dependencies terpisah dari runtime'
      ]
    },
    
    codeExamples: [
      {
        title: 'Multi-Stage Build - Node.js',
        lang: 'dockerfile',
        code: `# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        title: 'Multi-Stage Build - Go',
        lang: 'dockerfile',
        code: `# Stage 1: Build
FROM golang:1.21 AS builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main .

# Stage 2: Production (super minimal!)
FROM scratch
COPY --from=builder /app/main /main
ENTRYPOINT ["/main"]`
      }
    ],
    
    sizeComparison: {
      title: 'Perbandingan Ukuran Image',
      items: [
        { type: 'Node.js (tanpa multi-stage)', size: '~1.2 GB', color: 'error' },
        { type: 'Node.js (dengan multi-stage)', size: '~50 MB', color: 'success' },
        { type: 'Go (normal build)', size: '~800 MB', color: 'error' },
        { type: 'Go (multi-stage + scratch)', size: '~10 MB', color: 'success' }
      ]
    }
  },
  
  // Pertemuan 4
  {
    id: 'pertemuan-4',
    badge: 'Pertemuan 04',
    title: 'Docker Compose untuk Multi-Container Apps',
    icon: '🔗',
    subtitle: 'Mengelola aplikasi multi-container dengan Docker Compose, networking, dan volume management',
    
    objectives: [
      'Menguasai Docker Compose',
      'Orchestrate multiple services',
      'Network dan volume management',
      'Environment variables',
      'Service dependencies'
    ],
    
    concepts: [
      {
        title: 'Apa itu Docker Compose?',
        icon: '🔗',
        content: `Docker Compose adalah tool untuk mendefinisikan dan menjalankan aplikasi multi-container. Bayangkan seperti resep lengkap untuk sebuah restoran - bukan hanya satu masakan, tapi semua menu beserta cara penyajiannya.`,
        benefits: [
          'Definisi infrastruktur dalam satu file YAML',
          'Satu perintah untuk menjalankan semua services',
          'Networking otomatis antar services',
          'Volume management terintegrasi',
          'Environment variables management'
        ]
      }
    ],
    
    commands: [
      { cmd: 'docker-compose up -d', desc: 'Jalankan semua services (background)' },
      { cmd: 'docker-compose down', desc: 'Stop dan hapus semua' },
      { cmd: 'docker-compose logs -f', desc: 'Lihat logs semua services' },
      { cmd: 'docker-compose ps', desc: 'Status services' },
      { cmd: 'docker-compose up -d --scale web=3', desc: 'Scale service web jadi 3 instance' },
      { cmd: 'docker-compose exec web bash', desc: 'Masuk ke container web' }
    ],
    
    codeExamples: [
      {
        title: 'docker-compose.yml - Full Stack App',
        lang: 'yaml',
        code: `version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:5000
    networks:
      - app-network

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - database
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@database:5432/mydb
      - REDIS_URL=redis://redis:6379
    networks:
      - app-network

  database:
    image: postgres:15
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge`
      }
    ],
    
    serviceArchitecture: {
      title: 'Arsitektur Multi-Service',
      services: [
        { name: 'Frontend', icon: '🖥️', tech: 'React/Vue', port: '3000' },
        { name: 'Backend', icon: '⚙️', tech: 'Node/Python', port: '5000' },
        { name: 'Database', icon: '🗄️', tech: 'PostgreSQL', port: '5432' },
        { name: 'Cache', icon: '⚡', tech: 'Redis', port: '6379' }
      ]
    }
  },
  
  // Pertemuan 5
  {
    id: 'pertemuan-5',
    badge: 'Pertemuan 05',
    title: 'Container Registry',
    icon: '📤',
    subtitle: 'Menyimpan dan mendistribusikan Docker images melalui registry',
    
    objectives: [
      'Push/pull images dari Docker Hub',
      'Setup private Docker registry',
      'Image tagging strategies',
      'Registry security',
      'CI/CD integration'
    ],
    
    concepts: [
      {
        title: 'Apa itu Container Registry?',
        icon: '📦',
        content: `Container Registry adalah tempat penyimpanan dan distribusi Docker images. Seperti perpustakaan atau gudang untuk images. Dari sini, images bisa di-download (pull) untuk deployment.`,
        types: [
          { name: 'Docker Hub', desc: 'Registry public terbesar', icon: '🐳' },
          { name: 'GitHub Container Registry', desc: 'Terintegrasi dengan GitHub', icon: '🐙' },
          { name: 'Amazon ECR', desc: 'AWS managed registry', icon: '☁️' },
          { name: 'Google GCR', desc: 'Google Cloud registry', icon: '🔷' },
          { name: 'Harbor', desc: 'Self-hosted registry dengan security features', icon: '🏠' }
        ]
      }
    ],
    
    flow: {
      title: 'Registry Workflow',
      steps: [
        { icon: '👨‍💻', text: 'Developer', desc: 'Write code' },
        { icon: '🔨', text: 'Build', desc: 'docker build' },
        { icon: '🏷️', text: 'Tag', desc: 'docker tag' },
        { icon: '📤', text: 'Push', desc: 'docker push' },
        { icon: '📦', text: 'Registry', desc: 'Store image' },
        { icon: '📥', text: 'Pull', desc: 'docker pull' },
        { icon: '🚀', text: 'Deploy', desc: 'Run container' }
      ]
    },
    
    taggingStrategy: {
      title: 'Image Tagging Strategy',
      strategies: [
        { type: 'Semantic Version', examples: ['myapp:1.0.0', 'myapp:1.0', 'myapp:1'], desc: 'Untuk release versions' },
        { type: 'Environment', examples: ['myapp:dev', 'myapp:staging', 'myapp:prod'], desc: 'Untuk environment specific' },
        { type: 'Git Commit', examples: ['myapp:abc1234', 'myapp:1.0.0-abc1234'], desc: 'Untuk traceability' },
        { type: 'Latest', examples: ['myapp:latest'], desc: 'Selalu image terbaru (hati-hati!)' }
      ]
    },
    
    commands: [
      { cmd: 'docker login', desc: 'Login ke Docker Hub' },
      { cmd: 'docker tag myapp:latest username/myapp:1.0', desc: 'Tag image untuk push' },
      { cmd: 'docker push username/myapp:1.0', desc: 'Push ke registry' },
      { cmd: 'docker pull username/myapp:1.0', desc: 'Pull dari registry' }
    ],
    
    codeExamples: [
      {
        title: 'Setup Private Registry',
        lang: 'yaml',
        code: `version: '3.8'

services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - registry-data:/var/lib/registry
    environment:
      REGISTRY_STORAGE_DELETE_ENABLED: "true"

volumes:
  registry-data:`
      }
    ]
  },
  
  // Pertemuan 6
  {
    id: 'pertemuan-6',
    badge: 'Pertemuan 06',
    title: 'Kubernetes Architecture & Concepts',
    icon: '☸️',
    subtitle: 'Memahami arsitektur Kubernetes dan konsep-konsep dasarnya',
    
    objectives: [
      'Memahami Kubernetes architecture',
      'Setup Kubernetes cluster (Minikube)',
      'Kubernetes components (Master & Worker nodes)',
      'kubectl CLI basics',
      'Kubernetes objects (Pods, Deployments, Services)'
    ],
    
    concepts: [
      {
        title: 'Apa itu Kubernetes?',
        icon: '☸️',
        content: `Kubernetes (K8s) adalah platform orchestration untuk container. Bayangkan Kubernetes sebagai "manajer pabrik" yang mengatur ribuan container - memastikan semuanya berjalan, mengganti yang rusak, dan scale sesuai kebutuhan.`,
        analogy: 'Docker = membuat container. Kubernetes = mengelola ribuan container.'
      }
    ],
    
    architecture: {
      title: 'Kubernetes Architecture',
      controlPlane: {
        title: 'Control Plane (Master)',
        components: [
          { name: 'API Server', icon: '🌐', desc: 'Gateway untuk semua operasi. Semua komunikasi lewat sini.' },
          { name: 'Scheduler', icon: '📋', desc: 'Memilih node mana yang akan menjalankan Pod baru.' },
          { name: 'Controller Manager', icon: '🎮', desc: 'Menjaga state cluster sesuai yang diinginkan.' },
          { name: 'etcd', icon: '💾', desc: 'Database key-value untuk semua data cluster.' }
        ]
      },
      workerNodes: {
        title: 'Worker Nodes',
        components: [
          { name: 'Kubelet', icon: '🤖', desc: 'Agent di setiap node, menjalankan Pod.' },
          { name: 'Kube-proxy', icon: '🔀', desc: 'Network proxy untuk komunikasi.' },
          { name: 'Container Runtime', icon: '📦', desc: 'Docker/containerd untuk menjalankan container.' }
        ]
      }
    },
    
    keyObjects: [
      { name: 'Pod', icon: '🫛', desc: 'Unit terkecil di K8s. Berisi 1 atau lebih container.' },
      { name: 'Deployment', icon: '🚀', desc: 'Mengelola ReplicaSet dan rollout updates.' },
      { name: 'Service', icon: '🔗', desc: 'Endpoint network untuk mengakses Pods.' },
      { name: 'Namespace', icon: '📁', desc: 'Virtual cluster untuk isolasi resources.' },
      { name: 'ConfigMap', icon: '⚙️', desc: 'Menyimpan konfigurasi non-sensitive.' },
      { name: 'Secret', icon: '🔐', desc: 'Menyimpan data sensitive (password, token).' }
    ],
    
    commands: [
      { cmd: 'minikube start', desc: 'Start local Kubernetes cluster' },
      { cmd: 'kubectl cluster-info', desc: 'Info cluster' },
      { cmd: 'kubectl get nodes', desc: 'List semua nodes' },
      { cmd: 'kubectl get pods', desc: 'List semua pods' },
      { cmd: 'kubectl get deployments', desc: 'List deployments' },
      { cmd: 'kubectl get services', desc: 'List services' },
      { cmd: 'kubectl apply -f manifest.yaml', desc: 'Apply configuration' },
      { cmd: 'kubectl describe pod <name>', desc: 'Detail pod' },
      { cmd: 'kubectl logs <pod>', desc: 'Lihat logs' },
      { cmd: 'kubectl exec -it <pod> -- bash', desc: 'Masuk ke pod' }
    ],
    
    codeExamples: [
      {
        title: 'Pod Manifest',
        lang: 'yaml',
        code: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80`
      },
      {
        title: 'Deployment Manifest',
        lang: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80`
      }
    ]
  },
  
  // Pertemuan 7
  {
    id: 'pertemuan-7',
    badge: 'Pertemuan 07',
    title: 'Pods, Deployments, dan Services',
    icon: '🚀',
    subtitle: 'Deep dive ke workloads Kubernetes: Pod lifecycle, Deployment strategies, dan Service types',
    
    objectives: [
      'Deep dive into Pods',
      'Managing Deployments',
      'Service types dan networking',
      'Labels dan Selectors',
      'Rolling updates dan Rollbacks'
    ],
    
    podLifecycle: {
      title: 'Pod Lifecycle',
      stages: ['Pending', 'Running', 'Succeeded/Failed'],
      description: 'Pod dimulai dari Pending (menunggu scheduling), Running (berjalan), lalu Succeeded (selesai) atau Failed (gagal).'
    },
    
    deploymentStrategies: [
      { name: 'Rolling Update', icon: '🔄', desc: 'Update bertahap, zero downtime. Default strategy.', recommended: true },
      { name: 'Recreate', icon: '🔁', desc: 'Stop semua lama, start semua baru. Ada downtime.' },
      { name: 'Blue-Green', icon: '🔵🟢', desc: 'Dua environment identik, switch traffic instant.' },
      { name: 'Canary', icon: '🐤', desc: 'Release ke sebagian kecil user dulu, lalu gradual.' }
    ],
    
    serviceTypes: [
      { 
        name: 'ClusterIP', 
        icon: '🔒', 
        desc: 'Internal only. Hanya bisa diakses dari dalam cluster.',
        useCase: 'Backend service, database',
        default: true
      },
      { 
        name: 'NodePort', 
        icon: '🚪', 
        desc: 'Expose di port tertentu di setiap node (30000-32767).',
        useCase: 'Development, testing'
      },
      { 
        name: 'LoadBalancer', 
        icon: '⚖️', 
        desc: 'Cloud load balancer. External IP otomatis.',
        useCase: 'Production di cloud'
      },
      { 
        name: 'ExternalName', 
        icon: '🔗', 
        desc: 'DNS CNAME ke external service.',
        useCase: 'Pointing ke service eksternal'
      }
    ],
    
    commands: [
      { cmd: 'kubectl set image deployment/web web=myapp:2.0', desc: 'Update image' },
      { cmd: 'kubectl rollout status deployment/web', desc: 'Cek status rollout' },
      { cmd: 'kubectl rollout history deployment/web', desc: 'Lihat history' },
      { cmd: 'kubectl rollout undo deployment/web', desc: 'Rollback ke versi sebelumnya' },
      { cmd: 'kubectl scale deployment/web --replicas=5', desc: 'Scale manual' }
    ],
    
    codeExamples: [
      {
        title: 'Deployment dengan Probes',
        lang: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:1.0
        ports:
        - containerPort: 8080
        
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi`
      },
      {
        title: 'Service Types',
        lang: 'yaml',
        code: `# ClusterIP (Internal)
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - port: 8080
    targetPort: 8080

---
# NodePort (External via Node)
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080

---
# LoadBalancer (Cloud)
apiVersion: v1
kind: Service
metadata:
  name: public-service
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 8080`
      }
    ]
  },
  
  // Pertemuan 8
  {
    id: 'pertemuan-8',
    badge: 'Pertemuan 08',
    title: 'UTS - Containerized Application Deployment',
    icon: '🏆',
    subtitle: 'Evaluasi komprehensif: Deploy aplikasi lengkap dengan Docker dan Kubernetes',
    
    objectives: [
      'Docker containerization',
      'Docker Compose orchestration',
      'Kubernetes deployment',
      'Cloud-native best practices',
      'Documentation dan troubleshooting'
    ],
    
    projectOptions: [
      {
        title: 'Multi-Tier Web Application',
        icon: '🌐',
        components: ['Frontend (React/Vue)', 'Backend API (Node/Python)', 'Database (PostgreSQL)', 'Cache (Redis)']
      },
      {
        title: 'Microservices E-commerce',
        icon: '🛒',
        components: ['Product Service', 'User Service', 'Order Service', 'Payment Service', 'API Gateway']
      },
      {
        title: 'Content Management System',
        icon: '📝',
        components: ['CMS App (WordPress/Strapi)', 'Database', 'Object Storage', 'Reverse Proxy']
      }
    ],
    
    gradingRubric: [
      { component: 'Dockerization', points: 25, criteria: 'Multi-stage, optimized, secure' },
      { component: 'Docker Compose', points: 25, criteria: 'All services working, proper networking' },
      { component: 'Kubernetes', points: 30, criteria: 'Deployments, services, scaling' },
      { component: 'CI/CD', points: 10, criteria: 'Automated pipeline working' },
      { component: 'Documentation', points: 10, criteria: 'Clear, complete, professional' }
    ],
    
    checklist: [
      { item: 'All images < 500MB', checked: false },
      { item: 'Non-root users in containers', checked: false },
      { item: 'Health checks configured', checked: false },
      { item: 'Resource limits set', checked: false },
      { item: 'Secrets not in code', checked: false },
      { item: 'Services properly networked', checked: false },
      { item: 'Documentation complete', checked: false },
      { item: 'CI/CD pipeline working', checked: false },
      { item: 'Can deploy from scratch', checked: false },
      { item: 'Logs accessible', checked: false }
    ],
    
    commonMistakes: [
      { icon: '❌', text: 'Hardcoded configurations' },
      { icon: '❌', text: 'No health checks' },
      { icon: '❌', text: 'Missing resource limits' },
      { icon: '❌', text: 'Root user in containers' },
      { icon: '❌', text: 'Large image sizes' },
      { icon: '❌', text: 'No documentation' },
      { icon: '❌', text: 'Services tidak bisa komunikasi' },
      { icon: '❌', text: 'No error handling' }
    ],
    
    timeline: [
      { week: 'Week 1', task: 'Dockerization', desc: 'Build semua Dockerfiles' },
      { week: 'Week 2', task: 'Kubernetes', desc: 'Deploy ke Minikube' },
      { week: 'Week 3', task: 'CI/CD & Docs', desc: 'Pipeline & documentation' },
      { week: 'Week 4', task: 'Testing', desc: 'Test & demo preparation' }
    ]
  }
];

export default {
  courseInfo,
  navigation,
  overviewContent,
  pengenalanContent,
  pertemuanContent
};
