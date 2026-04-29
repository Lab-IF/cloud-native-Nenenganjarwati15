// Diagram Components

// ====================================
// ANIMATED DIAGRAMS - For Pengenalan & Pertemuan 1-3
// ====================================

// Evolution Animation: Physical Server → VM → Container
export function createEvolutionAnimation() {
  return `
    <div class="evolution-animation">
      <div class="diagram-title">Evolusi Infrastruktur: Dari Server Fisik ke Container</div>
      <div class="evolution-stages stage-1" id="evolutionStages">
        <div class="evolution-progress-bar"></div>
        
        <!-- Physical Server -->
        <div class="evolution-stage active" data-stage="1">
          <div class="evolution-icon">
            <div class="server-visual">
              <div class="server-rack"></div>
              <div class="server-rack"></div>
              <div class="server-rack"></div>
            </div>
          </div>
          <div class="evolution-label">Physical Server</div>
          <div class="evolution-year">1990 - 2000an</div>
          <div class="evolution-desc">1 server = 1 aplikasi<br>Resource banyak terbuang</div>
        </div>
        
        <!-- Virtual Machine -->
        <div class="evolution-stage" data-stage="2">
          <div class="evolution-icon">
            <div class="vm-visual">
              <div class="vm-box">VM</div>
              <div class="vm-box">VM</div>
              <div class="vm-box">VM</div>
              <div class="vm-box">VM</div>
            </div>
          </div>
          <div class="evolution-label">Virtual Machine</div>
          <div class="evolution-year">2000 - 2010an</div>
          <div class="evolution-desc">1 server = beberapa VM<br>Tapi tiap VM butuh OS sendiri</div>
        </div>
        
        <!-- Container -->
        <div class="evolution-stage" data-stage="3">
          <div class="evolution-icon">
            <div class="container-visual">
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
              <div class="container-box"></div>
            </div>
          </div>
          <div class="evolution-label">Container</div>
          <div class="evolution-year">2013 - Sekarang</div>
          <div class="evolution-desc">1 server = ribuan container<br>Ringan, cepat, portable</div>
        </div>
      </div>
      
      <div class="evolution-controls">
        <button class="evolution-btn active" onclick="setEvolutionStage(1)">🏢 Physical</button>
        <button class="evolution-btn" onclick="setEvolutionStage(2)">🏬 Virtual</button>
        <button class="evolution-btn" onclick="setEvolutionStage(3)">📦 Container</button>
      </div>
    </div>
  `;
}

// Docker Workflow Animation: Build → Ship → Run
export function createDockerWorkflowAnimation() {
  return `
    <div class="docker-workflow">
      <div class="workflow-title">🐳 Docker Workflow: Build, Ship, Run</div>
      <div class="workflow-stages">
        <!-- Build Stage -->
        <div class="workflow-stage active" data-step="build">
          <div class="workflow-animation-box">
            <div class="build-animation">
              <div class="build-gear">⚙️</div>
              <div class="build-layers">
                <div class="build-layer"></div>
                <div class="build-layer"></div>
                <div class="build-layer"></div>
                <div class="build-layer"></div>
              </div>
            </div>
          </div>
          <div class="workflow-label">📦 Build</div>
          <div class="workflow-desc">Buat Docker Image dari Dockerfile</div>
        </div>
        
        <div class="workflow-arrow">→</div>
        
        <!-- Ship Stage -->
        <div class="workflow-stage" data-step="ship">
          <div class="workflow-animation-box">
            <div class="ship-animation">
              <div class="ship-arrow">
                <span>◀</span>
                <span>▶</span>
              </div>
              <div class="ship-container"></div>
            </div>
          </div>
          <div class="workflow-label">🚢 Ship</div>
          <div class="workflow-desc">Push ke Registry (Docker Hub)</div>
        </div>
        
        <div class="workflow-arrow">→</div>
        
        <!-- Run Stage -->
        <div class="workflow-stage" data-step="run">
          <div class="workflow-animation-box">
            <div class="run-animation">
              <div class="run-containers">
                <div class="run-container">🐳</div>
                <div class="run-container">🐳</div>
                <div class="run-container">🐳</div>
                <div class="run-container">🐳</div>
                <div class="run-container">🐳</div>
                <div class="run-container">🐳</div>
              </div>
            </div>
          </div>
          <div class="workflow-label">🚀 Run</div>
          <div class="workflow-desc">Jalankan Container di mana saja</div>
        </div>
      </div>
      
      <div class="evolution-controls" style="margin-top: var(--spacing-xl);">
        <button class="evolution-btn active" onclick="setWorkflowStep('build')">📦 Build</button>
        <button class="evolution-btn" onclick="setWorkflowStep('ship')">🚢 Ship</button>
        <button class="evolution-btn" onclick="setWorkflowStep('run')">🚀 Run</button>
        <button class="evolution-btn" onclick="setWorkflowStep('all')" style="background: var(--color-primary); color: white;">▶ Play All</button>
      </div>
    </div>
  `;
}

// Container vs VM Comparison Animation
export function createContainerVsVMAnimation() {
  return `
    <div class="container-vm-comparison">
      <div class="diagram-title">Container vs Virtual Machine</div>
      <div class="comparison-visual">
        <!-- VM Side -->
        <div class="comparison-box">
          <div class="comparison-box-header">
            <div class="comparison-box-title">🏬 Virtual Machine</div>
            <div class="comparison-box-subtitle">Setiap VM punya OS sendiri</div>
          </div>
          <div class="vm-stack">
            <div class="vm-group">
              <div class="vm-instance">
                <div class="vm-stack-layer app">App A</div>
                <div class="vm-stack-layer bins">Bins/Libs</div>
                <div class="vm-stack-layer guest-os">Guest OS</div>
              </div>
              <div class="vm-instance">
                <div class="vm-stack-layer app">App B</div>
                <div class="vm-stack-layer bins">Bins/Libs</div>
                <div class="vm-stack-layer guest-os">Guest OS</div>
              </div>
            </div>
            <div class="vm-stack-layer hypervisor">Hypervisor (VMware/VirtualBox)</div>
            <div class="vm-stack-layer hardware">Hardware / Host OS</div>
          </div>
          <div class="boot-time vm-boot">
            <div class="boot-time-icon">⏱️</div>
            <div class="boot-time-bar">
              <div class="boot-time-fill"></div>
            </div>
            <div class="boot-time-label">~menit</div>
          </div>
        </div>
        
        <!-- Container Side -->
        <div class="comparison-box">
          <div class="comparison-box-header">
            <div class="comparison-box-title">📦 Container</div>
            <div class="comparison-box-subtitle">Berbagi OS kernel</div>
          </div>
          <div class="container-stack">
            <div class="container-group">
              <div class="container-instance">
                <div class="vm-stack-layer app" style="font-size: 10px;">A</div>
                <div class="vm-stack-layer bins" style="font-size: 10px;">Lib</div>
              </div>
              <div class="container-instance">
                <div class="vm-stack-layer app" style="font-size: 10px;">B</div>
                <div class="vm-stack-layer bins" style="font-size: 10px;">Lib</div>
              </div>
              <div class="container-instance">
                <div class="vm-stack-layer app" style="font-size: 10px;">C</div>
                <div class="vm-stack-layer bins" style="font-size: 10px;">Lib</div>
              </div>
              <div class="container-instance">
                <div class="vm-stack-layer app" style="font-size: 10px;">D</div>
                <div class="vm-stack-layer bins" style="font-size: 10px;">Lib</div>
              </div>
            </div>
            <div class="vm-stack-layer container-stack-layer docker">Docker Engine</div>
            <div class="vm-stack-layer container-stack-layer host-os">Host OS (Linux Kernel)</div>
            <div class="vm-stack-layer hardware">Hardware</div>
          </div>
          <div class="boot-time container-boot">
            <div class="boot-time-icon">⚡</div>
            <div class="boot-time-bar">
              <div class="boot-time-fill"></div>
            </div>
            <div class="boot-time-label">~detik</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Image vs Container Demo
export function createImageContainerDemo() {
  return `
    <div class="image-container-demo">
      <div class="diagram-title">Docker Image vs Container</div>
      <p style="text-align: center; color: var(--text-secondary); margin-bottom: var(--spacing-xl);">
        Image = Resep/Cetakan (Read-only) → Container = Hasil Jadi (Running Instance)
      </p>
      <div class="demo-area">
        <div class="image-source">
          <div class="image-visual"></div>
          <div style="font-weight: 600; color: var(--text-primary);">Docker Image</div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">Template (Read-Only)</div>
        </div>
        
        <div class="spawn-arrow">
          <div class="spawn-arrow-line">→→→</div>
          <button class="spawn-btn" onclick="spawnContainer()">+ Run Container</button>
          <button class="spawn-btn" onclick="clearContainers()" style="background: var(--color-error);">✕ Clear All</button>
        </div>
        
        <div class="containers-area" id="containersArea">
          <!-- Containers will be spawned here -->
        </div>
      </div>
      <p style="text-align: center; color: var(--text-tertiary); margin-top: var(--spacing-lg); font-size: var(--text-sm);">
        💡 Klik "Run Container" untuk membuat container baru dari image yang sama
      </p>
    </div>
  `;
}

// Multi-Stage Build Animation
export function createMultiStageBuildAnimation() {
  return `
    <div class="multistage-animation">
      <div class="diagram-title">Multi-Stage Build: Dari 1.2GB → 50MB</div>
      <div class="multistage-container">
        <!-- Build Stage -->
        <div class="stage-box build-stage">
          <div class="stage-header">
            <div class="stage-icon">🔨</div>
            <div>
              <div class="stage-title">Stage 1: Build</div>
              <div class="stage-subtitle">Semua tools untuk compile</div>
            </div>
          </div>
          <div class="stage-content">
            <div class="stage-items" id="buildStageItems">
              <div class="stage-item visible discarded">
                <span class="stage-item-icon">📦</span>
                <span>Node.js Runtime (~150MB)</span>
              </div>
              <div class="stage-item visible discarded">
                <span class="stage-item-icon">🔧</span>
                <span>npm & Build Tools (~200MB)</span>
              </div>
              <div class="stage-item visible discarded">
                <span class="stage-item-icon">📚</span>
                <span>node_modules (~800MB)</span>
              </div>
              <div class="stage-item visible discarded">
                <span class="stage-item-icon">📝</span>
                <span>Source Code (~10MB)</span>
              </div>
              <div class="stage-item visible kept">
                <span class="stage-item-icon">✨</span>
                <span>Built Assets (dist/) (~40MB)</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Transfer Arrow -->
        <div class="transfer-arrow animating">
          <div class="transfer-line">
            <div class="transfer-package">📦</div>
          </div>
          <div class="transfer-label">COPY --from=builder<br>Hanya yang dibutuhkan</div>
        </div>
        
        <!-- Production Stage -->
        <div class="stage-box production-stage">
          <div class="stage-header">
            <div class="stage-icon">🚀</div>
            <div>
              <div class="stage-title">Stage 2: Production</div>
              <div class="stage-subtitle">Image akhir yang ringan</div>
            </div>
          </div>
          <div class="stage-content">
            <div class="stage-items" id="prodStageItems">
              <div class="stage-item visible kept">
                <span class="stage-item-icon">🌐</span>
                <span>nginx:alpine (~8MB)</span>
              </div>
              <div class="stage-item visible kept">
                <span class="stage-item-icon">✨</span>
                <span>Built Assets (~40MB)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Size Comparison -->
      <div class="size-comparison">
        <div class="size-bar-container visible">
          <div class="size-bar-label">
            <span>❌ Tanpa Multi-Stage</span>
            <span style="color: var(--color-error); font-weight: 600;">~1.2 GB</span>
          </div>
          <div class="size-bar">
            <div class="size-bar-fill large">1.2 GB</div>
          </div>
        </div>
        <div class="size-bar-container visible">
          <div class="size-bar-label">
            <span>✅ Dengan Multi-Stage</span>
            <span style="color: var(--color-success); font-weight: 600;">~50 MB</span>
          </div>
          <div class="size-bar">
            <div class="size-bar-fill small">50MB</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ====================================
// ORIGINAL DIAGRAMS (Preserved)
// ====================================

// Comparison Diagram (Traditional vs Cloud-Native)
export function createComparisonDiagram(data) {
  return `
    <div class="diagram">
      <div class="diagram-title">${data.title || 'Perbandingan'}</div>
      <div class="comparison">
        <div class="comparison-column">
          <div class="comparison-header">
            <div class="comparison-icon">${data.traditional.icon}</div>
            <div class="comparison-title">${data.traditional.title}</div>
          </div>
          <ul class="comparison-list">
            ${data.traditional.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="comparison-column highlight">
          <div class="comparison-header">
            <div class="comparison-icon">${data.cloudNative.icon}</div>
            <div class="comparison-title">${data.cloudNative.title}</div>
          </div>
          <ul class="comparison-list">
            ${data.cloudNative.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// Architecture Diagram
export function createArchitectureDiagram(data) {
  return `
    <div class="diagram">
      <div class="diagram-title">${data.title}</div>
      <div class="architecture">
        ${data.layers.map((layer, index) => `
          ${index > 0 ? '<div class="arch-arrow"></div>' : ''}
          <div class="arch-box ${layer.type || ''}">
            <div class="arch-box-icon">${layer.icon}</div>
            <div class="arch-box-title">${layer.name}</div>
            <div class="arch-box-subtitle">${layer.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Flow Diagram
export function createFlowDiagram(data) {
  return `
    <div class="diagram">
      <div class="diagram-title">${data.title}</div>
      <div class="flow">
        ${data.steps.map((step, index) => `
          ${index > 0 ? '<span class="flow-arrow">→</span>' : ''}
          <div class="flow-step">
            <span class="flow-step-icon">${step.icon}</span>
            <span class="flow-step-text">${step.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Kubernetes Cluster Diagram
export function createK8sClusterDiagram(data) {
  const { controlPlane, workerNodes } = data;
  
  return `
    <div class="diagram">
      <div class="diagram-title">Kubernetes Architecture</div>
      <div class="k8s-cluster">
        <!-- Control Plane -->
        <div class="k8s-master">
          <div class="k8s-section-title">
            <span>☸️</span>
            <span>${controlPlane.title}</span>
          </div>
          <div class="k8s-components">
            ${controlPlane.components.map(comp => `
              <div class="k8s-component">
                <div class="k8s-component-icon">${comp.icon}</div>
                <div class="k8s-component-name">${comp.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Arrow -->
        <div style="text-align: center; font-size: 24px; color: var(--border-medium);">↓</div>
        
        <!-- Worker Nodes -->
        <div class="k8s-workers">
          ${[1, 2, 3].map(n => `
            <div class="k8s-worker">
              <div class="k8s-worker-title">
                <span>🖥️</span>
                <span>Worker Node ${n}</span>
              </div>
              <div class="k8s-components" style="grid-template-columns: repeat(2, 1fr);">
                ${workerNodes.components.map(comp => `
                  <div class="k8s-component">
                    <div class="k8s-component-icon">${comp.icon}</div>
                    <div class="k8s-component-name">${comp.name}</div>
                  </div>
                `).join('')}
              </div>
              <div class="k8s-pods">
                <span class="k8s-pod">🫛 Pod 1</span>
                <span class="k8s-pod">🫛 Pod 2</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Service Types Diagram
export function createServiceTypesDiagram(services) {
  return `
    <div class="diagram">
      <div class="diagram-title">Kubernetes Service Types</div>
      <div class="service-types">
        ${services.map(svc => `
          <div class="service-type">
            <div class="service-type-icon">${svc.icon}</div>
            <div class="service-type-name">${svc.name}</div>
            <div class="service-type-desc">${svc.desc}</div>
            <div class="service-type-detail">${svc.useCase}</div>
            ${svc.default ? '<span class="badge badge-primary mt-sm">Default</span>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Docker Layers Diagram
export function createDockerLayersDiagram() {
  const layers = [
    { name: 'Writable Container Layer', type: 'rw', label: 'Read/Write' },
    { name: 'App Code', type: 'ro', label: 'Read Only' },
    { name: 'Dependencies', type: 'ro', label: 'Read Only' },
    { name: 'Base Image (python:3.11)', type: 'ro', label: 'Read Only' },
    { name: 'Alpine Linux', type: 'ro', label: 'Read Only' }
  ];
  
  return `
    <div class="diagram">
      <div class="diagram-title">Docker Image Layers</div>
      <div class="docker-layers">
        ${layers.map(layer => `
          <div class="docker-layer ${layer.type}">
            <div>${layer.name}</div>
            <div class="docker-layer-label">${layer.label}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 12 Factor Grid
export function createFactorGrid(factors) {
  return `
    <div class="factor-grid">
      ${factors.map(f => `
        <div class="factor-item">
          <div class="factor-number">${f.num}</div>
          <div class="factor-content">
            <div class="factor-title">${f.title}</div>
            <div class="factor-desc">${f.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Timeline/Roadmap
export function createTimeline(items) {
  return `
    <div class="timeline">
      ${items.map(item => `
        <div class="timeline-item ${item.status}">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-title">${item.week} - ${item.title}</div>
            <div class="timeline-desc">${item.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Multi-Service Architecture
export function createServiceArchitecture(services) {
  return `
    <div class="diagram">
      <div class="diagram-title">Arsitektur Multi-Service</div>
      <div class="arch-group">
        ${services.map(svc => `
          <div class="arch-box">
            <div class="arch-box-icon">${svc.icon}</div>
            <div class="arch-box-title">${svc.name}</div>
            <div class="arch-box-subtitle">${svc.tech} :${svc.port}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
