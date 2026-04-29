// Sections Renderer

import { createCodeBlock } from './codeblock.js';
import { 
  createComparisonDiagram, 
  createArchitectureDiagram,
  createFlowDiagram,
  createK8sClusterDiagram,
  createServiceTypesDiagram,
  createDockerLayersDiagram,
  createFactorGrid,
  createTimeline,
  createServiceArchitecture,
  // New animated diagrams
  createEvolutionAnimation,
  createDockerWorkflowAnimation,
  createContainerVsVMAnimation,
  createImageContainerDemo,
  createMultiStageBuildAnimation
} from './diagrams.js';

// Overview Section
export function renderOverview(data, courseInfo) {
  return `
    <section class="section" id="overview">
      <div class="section-header">
        <span class="section-badge">👋 Selamat Datang</span>
        <h1 class="section-title">
          <span class="section-title-icon">☁️</span>
          Praktikum Cloud-Native
        </h1>
        <p class="section-subtitle">${courseInfo.subtitle}</p>
      </div>
      
      <div class="card mb-lg">
        <div class="card-header">
          <div class="card-icon">🏛️</div>
          <div>
            <div class="card-title">${courseInfo.institution}</div>
            <div class="card-subtitle">Kode: ${courseInfo.code} | ${courseInfo.semester} | ${courseInfo.sks}</div>
          </div>
        </div>
      </div>
      
      <!-- Learning Outcomes -->
      <h2 class="mt-xl mb-md">🎯 Capaian Pembelajaran</h2>
      <div class="card-grid">
        ${data.learningOutcomes.map(item => `
          <div class="card">
            <div style="display: flex; align-items: flex-start; gap: var(--spacing-md);">
              <span style="font-size: var(--text-2xl);">${item.icon}</span>
              <span>${item.text}</span>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Tech Stack -->
      <h2 class="mt-xl mb-md">💻 Tech Stack</h2>
      <div class="card-grid">
        ${data.techStack.map(tech => `
          <div class="card feature-card">
            <div class="card-icon">${tech.icon}</div>
            <div class="card-title">${tech.name}</div>
            <div class="card-content">${tech.desc}</div>
          </div>
        `).join('')}
      </div>
      
      <!-- Roadmap -->
      <h2 class="mt-xl mb-md">🗺️ Roadmap Pembelajaran</h2>
      ${createTimeline(data.roadmap)}
      
      <!-- Grading -->
      <h2 class="mt-xl mb-md">📊 Sistem Penilaian</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Komponen</th>
              <th>Bobot</th>
            </tr>
          </thead>
          <tbody>
            ${data.grading.map(g => `
              <tr>
                <td>${g.component}</td>
                <td><span class="badge badge-primary">${g.weight}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// Pengenalan Dasar Section - Untuk Pemula
export function renderPengenalan(data) {
  return `
    <section class="section" id="${data.id}">
      <!-- Hero Section dengan Visual yang Menarik -->
      <div class="pengenalan-hero">
        <div class="hero-content">
          <span class="section-badge">Pertemuan 00 - Persiapan</span>
          <h1 class="hero-title">
            <span class="hero-icon">${data.icon}</span>
            ${data.title}
          </h1>
          <p class="hero-subtitle">${data.subtitle}</p>
          
          <!-- Quick Stats -->
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-icon">⏱️</span>
              <span class="hero-stat-value">~15 menit</span>
              <span class="hero-stat-label">Waktu Baca</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-icon">📚</span>
              <span class="hero-stat-value">6 Topik</span>
              <span class="hero-stat-label">Materi</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-icon">🎯</span>
              <span class="hero-stat-value">Pemula</span>
              <span class="hero-stat-label">Level</span>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="hero-illustration">
            <div class="hero-cloud">☁️</div>
            <div class="hero-container">📦</div>
            <div class="hero-docker">🐳</div>
            <div class="hero-kubernetes">☸️</div>
          </div>
        </div>
      </div>
      
      <!-- Learning Path / Progress Tracker -->
      <div class="learning-path">
        <div class="learning-path-header">
          <h3>🗺️ Perjalanan Belajar</h3>
          <p>Ikuti langkah-langkah berikut untuk memahami konsep dasar</p>
        </div>
        <div class="learning-path-steps">
          <div class="path-step active" data-step="1">
            <div class="path-step-marker">1</div>
            <div class="path-step-content">
              <div class="path-step-title">Konsep Dasar</div>
              <div class="path-step-desc">Aplikasi, Server, Cloud</div>
            </div>
          </div>
          <div class="path-connector"></div>
          <div class="path-step" data-step="2">
            <div class="path-step-marker">2</div>
            <div class="path-step-content">
              <div class="path-step-title">Evolusi Infrastruktur</div>
              <div class="path-step-desc">Physical → VM → Container</div>
            </div>
          </div>
          <div class="path-connector"></div>
          <div class="path-step" data-step="3">
            <div class="path-step-marker">3</div>
            <div class="path-step-content">
              <div class="path-step-title">Kenapa Container?</div>
              <div class="path-step-desc">Masalah & Solusi</div>
            </div>
          </div>
          <div class="path-connector"></div>
          <div class="path-step" data-step="4">
            <div class="path-step-marker">4</div>
            <div class="path-step-content">
              <div class="path-step-title">Kubernetes</div>
              <div class="path-step-desc">Orchestration</div>
            </div>
          </div>
          <div class="path-connector"></div>
          <div class="path-step" data-step="5">
            <div class="path-step-marker">5</div>
            <div class="path-step-content">
              <div class="path-step-title">Glosarium</div>
              <div class="path-step-desc">Istilah Penting</div>
            </div>
          </div>
          <div class="path-connector"></div>
          <div class="path-step" data-step="6">
            <div class="path-step-marker">✓</div>
            <div class="path-step-content">
              <div class="path-step-title">Siap Lanjut!</div>
              <div class="path-step-desc">Ke Pertemuan 1</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Intro Card - Welcome Message -->
      <div class="welcome-card">
        <div class="welcome-icon">☕</div>
        <div class="welcome-content">
          <h3 class="welcome-title">${data.intro.title}</h3>
          <p class="welcome-text">${data.intro.content}</p>
        </div>
        <button class="welcome-start-btn" onclick="document.getElementById('konsep-dasar').scrollIntoView({behavior: 'smooth'})">
          Mulai Belajar →
        </button>
      </div>
      
      <!-- Basic Concepts Section -->
      <div id="konsep-dasar" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">🧠</span>
          <h2 class="section-divider-title">Konsep Dasar</h2>
          <p class="section-divider-subtitle">Pahami fondasi sebelum masuk ke teknis</p>
        </div>
        
        <div class="concept-cards">
          ${data.basicConcepts.map((concept, index) => `
            <div class="concept-card" id="${concept.id}">
              <div class="concept-card-number">${index + 1}</div>
              <div class="concept-card-header">
                <div class="concept-card-icon">${concept.icon}</div>
                <h3 class="concept-card-title">${concept.title}</h3>
              </div>
              <div class="concept-card-body">
                <p class="concept-explanation">${concept.explanation}</p>
                
                <!-- Analogy Box - Improved -->
                <div class="analogy-box">
                  <div class="analogy-header">
                    <span class="analogy-icon">${concept.analogy.icon}</span>
                    <span class="analogy-title">${concept.analogy.title}</span>
                  </div>
                  <div class="analogy-content">
                    <p style="white-space: pre-line;">${concept.analogy.content}</p>
                    ${concept.analogy.visual ? `
                      <div class="analogy-visual">
                        ${concept.analogy.visual.map((step, i) => `
                          ${step === '→' || step === 'vs' ? `<span class="visual-connector">${step}</span>` : `
                            <div class="visual-step">
                              <span>${step}</span>
                            </div>
                          `}
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
                
                <!-- Real World Example -->
                ${concept.realWorldExample ? `
                  <div class="real-world-box">
                    <div class="real-world-header">
                      <span class="real-world-icon">🌍</span>
                      <span class="real-world-title">${concept.realWorldExample.title}</span>
                    </div>
                    <div class="real-world-content">
                      <p style="white-space: pre-line;">${concept.realWorldExample.content}</p>
                    </div>
                  </div>
                ` : ''}
                
                <!-- Key Takeaways -->
                ${concept.keyTakeaways ? `
                  <div class="takeaways-box">
                    <div class="takeaways-header">
                      <span>📌</span>
                      <span>Poin Penting</span>
                    </div>
                    <ul class="takeaways-list">
                      ${concept.keyTakeaways.map(point => `
                        <li>${point}</li>
                      `).join('')}
                    </ul>
                  </div>
                ` : ''}
                
                <!-- Fun Fact / Tip -->
                ${concept.funFact ? `
                  <div class="fun-fact-box">
                    <span class="fun-fact-icon">💡</span>
                    <p>${concept.funFact}</p>
                  </div>
                ` : ''}
                
                ${concept.tip ? `
                  <div class="tip-box">
                    <span class="tip-icon">💡</span>
                    <p>${concept.tip}</p>
                  </div>
                ` : ''}
                
                <!-- Cloud Providers (for cloud concept) -->
                ${concept.providers ? `
                  <div class="providers-grid">
                    <h4>☁️ Cloud Providers Populer:</h4>
                    <div class="providers-list">
                      ${concept.providers.map(provider => `
                        <div class="provider-item">
                          <span class="provider-icon">${provider.icon}</span>
                          <div class="provider-info">
                            <strong>${provider.name}</strong>
                            <span>${provider.desc}</span>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Section Summary with Quiz -->
        ${data.basicConceptsSummary ? `
          <div class="section-summary">
            <h3>${data.basicConceptsSummary.title}</h3>
            <div class="summary-points">
              ${data.basicConceptsSummary.points.map(point => `
                <div class="summary-point">
                  <span class="summary-icon">${point.icon}</span>
                  <span>${point.text}</span>
                </div>
              `).join('')}
            </div>
            
            ${data.basicConceptsSummary.quiz ? `
              <div class="quick-quiz">
                <div class="quiz-header">
                  <span>🎯</span>
                  <span>Quick Quiz</span>
                </div>
                <div class="quiz-question">${data.basicConceptsSummary.quiz.question}</div>
                <div class="quiz-options">
                  ${data.basicConceptsSummary.quiz.options.map((option, i) => `
                    <button class="quiz-option" data-correct="${i === data.basicConceptsSummary.quiz.correctIndex}" onclick="checkQuizAnswer(this, ${i === data.basicConceptsSummary.quiz.correctIndex})">
                      ${String.fromCharCode(65 + i)}. ${option}
                    </button>
                  `).join('')}
                </div>
                <div class="quiz-explanation" style="display: none;">
                  <span>✅</span> ${data.basicConceptsSummary.quiz.explanation}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}
        
        <!-- Navigation Button -->
        <div class="section-nav-buttons">
          <button class="nav-btn nav-btn-next" onclick="document.getElementById('evolusi-section').scrollIntoView({behavior: 'smooth'})">
            Lanjut: Evolusi Infrastruktur <span>→</span>
          </button>
        </div>
      </div>
      
      <!-- Evolution Story Section -->
      <div id="evolusi-section" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">📜</span>
          <h2 class="section-divider-title">${data.evolutionStory.title}</h2>
          <p class="section-divider-subtitle">${data.evolutionStory.subtitle}</p>
        </div>
        
        ${data.evolutionStory.intro ? `
          <div class="intro-text">
            <p>${data.evolutionStory.intro}</p>
          </div>
        ` : ''}
        
        <!-- Interactive Evolution Animation -->
        ${createEvolutionAnimation()}
        
        <div class="evolution-timeline-enhanced mt-xl">
          ${data.evolutionStory.stages.map((stage, index) => `
            <div class="evolution-card" data-era="${index + 1}">
              <div class="evolution-card-era">
                <span class="era-badge">${stage.era}</span>
                <span class="era-year">${stage.year}</span>
              </div>
              <div class="evolution-card-main">
                <div class="evolution-card-icon">${stage.icon}</div>
                <h3 class="evolution-card-title">${stage.title}</h3>
              </div>
              <div class="evolution-card-analogy">
                <span>💡</span> ${stage.analogy}
              </div>
              <div class="evolution-card-characteristics">
                <h4>Karakteristik:</h4>
                <ul>
                  ${stage.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
              </div>
              ${stage.realExample ? `
                <div class="real-example-box">
                  <span class="real-example-icon">🌍</span>
                  <p>${stage.realExample}</p>
                </div>
              ` : ''}
              ${stage.problem ? `
                <div class="evolution-card-alert warning">
                  <span class="alert-icon">⚠️</span>
                  <div>
                    <strong>Masalah:</strong>
                    <p>${stage.problem}</p>
                  </div>
                </div>
              ` : ''}
              ${stage.solution ? `
                <div class="evolution-card-alert success">
                  <span class="alert-icon">✅</span>
                  <div>
                    <strong>Solusi:</strong>
                    <p>${stage.solution}</p>
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <!-- Comparison Summary Table -->
        ${data.evolutionStory.summary ? `
          <div class="comparison-summary-table">
            <h3>${data.evolutionStory.summary.title}</h3>
            <div class="comparison-table-wrapper">
              <table class="evolution-comparison-table">
                <thead>
                  <tr>
                    <th>Aspek</th>
                    <th>🏢 Physical</th>
                    <th>🏬 VM</th>
                    <th>📦 Container</th>
                  </tr>
                </thead>
                <tbody>
                  ${data.evolutionStory.summary.comparison.map(row => `
                    <tr>
                      <td><strong>${row.aspect}</strong></td>
                      <td class="highlight-bad">${row.physical}</td>
                      <td class="highlight-medium">${row.vm}</td>
                      <td class="highlight-good">${row.container}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
        
        <!-- Quiz -->
        ${data.evolutionStory.quiz ? `
          <div class="quick-quiz">
            <div class="quiz-header">
              <span>🎯</span>
              <span>Quick Quiz</span>
            </div>
            <div class="quiz-question">${data.evolutionStory.quiz.question}</div>
            <div class="quiz-options">
              ${data.evolutionStory.quiz.options.map((option, i) => `
                <button class="quiz-option" data-correct="${i === data.evolutionStory.quiz.correctIndex}" onclick="checkQuizAnswer(this, ${i === data.evolutionStory.quiz.correctIndex})">
                  ${String.fromCharCode(65 + i)}. ${option}
                </button>
              `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;">
              <span>✅</span> ${data.evolutionStory.quiz.explanation}
            </div>
          </div>
        ` : ''}
        
        <!-- Navigation Buttons -->
        <div class="section-nav-buttons">
          <button class="nav-btn nav-btn-prev" onclick="document.getElementById('konsep-dasar').scrollIntoView({behavior: 'smooth'})">
            <span>←</span> Konsep Dasar
          </button>
          <button class="nav-btn nav-btn-next" onclick="document.getElementById('why-containers-section').scrollIntoView({behavior: 'smooth'})">
            Kenapa Container? <span>→</span>
          </button>
        </div>
      </div>
      
      <!-- Why Containers Section -->
      <div id="why-containers-section" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">🐳</span>
          <h2 class="section-divider-title">${data.whyContainers.title}</h2>
          <p class="section-divider-subtitle">${data.whyContainers.subtitle}</p>
        </div>
        
        ${data.whyContainers.intro ? `
          <div class="intro-text">
            <p>${data.whyContainers.intro}</p>
          </div>
        ` : ''}
        
        <div class="problems-grid">
          ${data.whyContainers.problems.map((item, index) => `
            <div class="problem-card" style="animation-delay: ${index * 0.1}s">
              <div class="problem-card-icon">${item.icon}</div>
              <h4 class="problem-card-title">${item.problem}</h4>
              <div class="problem-card-scenario">
                <span class="scenario-label">Skenario:</span>
                <p>${item.scenario}</p>
              </div>
              <div class="problem-card-solution">
                <span class="solution-icon">${item.emoji}</span>
                <p>${item.solution}</p>
              </div>
              ${item.deepDive ? `
                <div class="problem-card-deepdive">
                  <span class="deepdive-icon">💡</span>
                  <p>${item.deepDive}</p>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <!-- Benefits Grid -->
        ${data.whyContainers.benefits ? `
          <div class="benefits-section">
            <h3 class="benefits-title">${data.whyContainers.benefits.title}</h3>
            <div class="benefits-grid">
              ${data.whyContainers.benefits.items.map(benefit => `
                <div class="benefit-card">
                  <span class="benefit-icon">${benefit.icon}</span>
                  <h4 class="benefit-title">${benefit.title}</h4>
                  <p class="benefit-desc">${benefit.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Quiz -->
        ${data.whyContainers.quiz ? `
          <div class="quick-quiz">
            <div class="quiz-header">
              <span>🎯</span>
              <span>Quick Quiz</span>
            </div>
            <div class="quiz-question">${data.whyContainers.quiz.question}</div>
            <div class="quiz-options">
              ${data.whyContainers.quiz.options.map((option, i) => `
                <button class="quiz-option" data-correct="${i === data.whyContainers.quiz.correctIndex}" onclick="checkQuizAnswer(this, ${i === data.whyContainers.quiz.correctIndex})">
                  ${String.fromCharCode(65 + i)}. ${option}
                </button>
              `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;">
              <span>✅</span> ${data.whyContainers.quiz.explanation}
            </div>
          </div>
        ` : ''}
        
        <!-- Navigation Buttons -->
        <div class="section-nav-buttons">
          <button class="nav-btn nav-btn-prev" onclick="document.getElementById('evolusi-section').scrollIntoView({behavior: 'smooth'})">
            <span>←</span> Evolusi
          </button>
          <button class="nav-btn nav-btn-next" onclick="document.getElementById('why-k8s-section').scrollIntoView({behavior: 'smooth'})">
            Kenapa Kubernetes? <span>→</span>
          </button>
        </div>
      </div>
      
      <!-- Why Kubernetes Section -->
      <div id="why-k8s-section" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">☸️</span>
          <h2 class="section-divider-title">${data.whyKubernetes.title}</h2>
          <p class="section-divider-subtitle">${data.whyKubernetes.subtitle}</p>
        </div>
        
        ${data.whyKubernetes.intro ? `
          <div class="intro-text">
            <p>${data.whyKubernetes.intro}</p>
          </div>
        ` : ''}
        
        <div class="k8s-story-card">
          <div class="story-content">
            <p style="white-space: pre-line;">${data.whyKubernetes.story}</p>
          </div>
        </div>
        
        <div class="k8s-comparison-card">
          <div class="comparison-header">
            <div class="comparison-icon">${data.whyKubernetes.analogy.icon}</div>
            <h3>${data.whyKubernetes.analogy.title}</h3>
          </div>
          <div class="comparison-table">
            <div class="comparison-row header">
              <div class="comparison-cell manual-header">❌ Manual (Tanpa K8s)</div>
              <div class="comparison-cell auto-header">✅ Otomatis (Dengan K8s)</div>
            </div>
            ${data.whyKubernetes.analogy.comparison.map(row => `
              <div class="comparison-row">
                <div class="comparison-cell manual">${row.manual}</div>
                <div class="comparison-cell auto">${row.auto}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Kubernetes Capabilities -->
        ${data.whyKubernetes.capabilities ? `
          <div class="capabilities-section">
            <h3 class="capabilities-title">${data.whyKubernetes.capabilities.title}</h3>
            <div class="capabilities-grid">
              ${data.whyKubernetes.capabilities.items.map(cap => `
                <div class="capability-card">
                  <span class="capability-icon">${cap.icon}</span>
                  <h4 class="capability-title">${cap.title}</h4>
                  <p class="capability-desc">${cap.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Real World Usage -->
        ${data.whyKubernetes.realWorldUsage ? `
          <div class="real-world-usage">
            <h3 class="real-world-usage-title">${data.whyKubernetes.realWorldUsage.title}</h3>
            <div class="companies-grid">
              ${data.whyKubernetes.realWorldUsage.companies.map(company => `
                <div class="company-card">
                  <h4 class="company-name">${company.name}</h4>
                  <p class="company-scale">${company.scale}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Quiz -->
        ${data.whyKubernetes.quiz ? `
          <div class="quick-quiz">
            <div class="quiz-header">
              <span>🎯</span>
              <span>Quick Quiz</span>
            </div>
            <div class="quiz-question">${data.whyKubernetes.quiz.question}</div>
            <div class="quiz-options">
              ${data.whyKubernetes.quiz.options.map((option, i) => `
                <button class="quiz-option" data-correct="${i === data.whyKubernetes.quiz.correctIndex}" onclick="checkQuizAnswer(this, ${i === data.whyKubernetes.quiz.correctIndex})">
                  ${String.fromCharCode(65 + i)}. ${option}
                </button>
              `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;">
              <span>✅</span> ${data.whyKubernetes.quiz.explanation}
            </div>
          </div>
        ` : ''}
        
        <!-- Navigation Buttons -->
        <div class="section-nav-buttons">
          <button class="nav-btn nav-btn-prev" onclick="document.getElementById('why-containers-section').scrollIntoView({behavior: 'smooth'})">
            <span>←</span> Kenapa Container?
          </button>
          <button class="nav-btn nav-btn-next" onclick="document.getElementById('glossary-section').scrollIntoView({behavior: 'smooth'})">
            Glosarium <span>→</span>
          </button>
        </div>
      </div>
      
      <!-- Glossary Section -->
      <div id="glossary-section" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">📚</span>
          <h2 class="section-divider-title">${data.glossary.title}</h2>
          <p class="section-divider-subtitle">${data.glossary.subtitle}</p>
        </div>
        
        <div class="glossary-grid">
          ${data.glossary.terms.map((item, index) => `
            <div class="glossary-card" style="animation-delay: ${index * 0.05}s">
              <div class="glossary-icon">${item.icon}</div>
              <div class="glossary-content">
                <strong class="glossary-term">${item.term}</strong>
                <p class="glossary-definition">${item.definition}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Navigation Buttons -->
        <div class="section-nav-buttons">
          <button class="nav-btn nav-btn-prev" onclick="document.getElementById('why-k8s-section').scrollIntoView({behavior: 'smooth'})">
            <span>←</span> Kubernetes
          </button>
          <button class="nav-btn nav-btn-next" onclick="document.getElementById('ready-check-section').scrollIntoView({behavior: 'smooth'})">
            Cek Kesiapan <span>→</span>
          </button>
        </div>
      </div>
      
      <!-- Ready Check Section -->
      <div id="ready-check-section" class="content-section">
        <div class="section-divider">
          <span class="section-divider-icon">✅</span>
          <h2 class="section-divider-title">${data.readyCheck.title}</h2>
          <p class="section-divider-subtitle">${data.readyCheck.subtitle}</p>
        </div>
        
        <div class="ready-check-card">
          <div class="checklist-visual">
            ${data.readyCheck.checklist.map((item, index) => `
              <label class="checklist-item-enhanced">
                <input type="checkbox" class="checklist-input" data-index="${index}">
                <span class="checklist-checkbox-visual"></span>
                <span class="checklist-text-visual">${item}</span>
              </label>
            `).join('')}
          </div>
          
          <div class="checklist-progress">
            <div class="progress-bar-visual">
              <div class="progress-fill" id="checklistProgress" style="width: 0%"></div>
            </div>
            <span class="progress-text"><span id="checkedCount">0</span>/${data.readyCheck.checklist.length} selesai</span>
          </div>
        </div>
        
        <div class="encouragement-card">
          <span class="encouragement-icon">💪</span>
          <p class="encouragement-text">${data.readyCheck.encouragement}</p>
        </div>
        
        <!-- Final Navigation - Go to Pertemuan 1 -->
        <div class="final-navigation">
          <div class="final-nav-content">
            <h3>🎉 Siap untuk memulai?</h3>
            <p>Kamu sudah memahami konsep dasar. Sekarang saatnya masuk ke materi Cloud-Native!</p>
          </div>
          <div class="final-nav-buttons">
            <button class="nav-btn nav-btn-prev" onclick="document.getElementById('glossary-section').scrollIntoView({behavior: 'smooth'})">
              <span>←</span> Kembali
            </button>
            <button class="nav-btn nav-btn-primary" onclick="window.navigateToSection && window.navigateToSection('pertemuan-1')">
              🚀 Mulai Pertemuan 1: Cloud-Native
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Pertemuan 1: Cloud-Native & 12-Factor
export function renderPertemuan1(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Concepts -->
      ${data.concepts.map(concept => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${concept.icon}</div>
            <div class="card-title">${concept.title}</div>
          </div>
          <div class="card-content">
            <p>${concept.content}</p>
            ${concept.analogy ? `
              <div class="callout callout-info mt-md">
                <span class="callout-icon">💡</span>
                <div class="callout-content">
                  <div class="callout-title">Analogi</div>
                  <div class="callout-text">${concept.analogy}</div>
                </div>
              </div>
            ` : ''}
            ${concept.items ? `
              <ul class="list mt-md">
                ${concept.items.map(item => `
                  <li class="list-item">
                    <span class="list-item-icon">•</span>
                    <span class="list-item-content"><strong>${item.term}:</strong> ${item.desc}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- Comparison -->
      <h2 class="mt-xl mb-md">⚖️ Traditional vs Cloud-Native</h2>
      ${createComparisonDiagram(data.comparison)}
      
      <!-- 12 Factor -->
      <h2 class="mt-xl mb-md">📜 12-Factor App Principles</h2>
      <p class="mb-md" style="color: var(--text-secondary);">
        12-Factor adalah metodologi untuk membangun aplikasi SaaS modern yang portabel, scalable, dan maintainable.
      </p>
      ${createFactorGrid(data.twelveFactors)}
      
      <!-- Code Example -->
      <h2 class="mt-xl mb-md">💻 Contoh Kode</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 2: Docker Fundamentals
export function renderPertemuan2(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Concepts -->
      ${data.concepts.map(concept => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${concept.icon}</div>
            <div class="card-title">${concept.title}</div>
          </div>
          <div class="card-content">
            <p>${concept.content}</p>
            ${concept.details ? `
              <div class="card-grid mt-md">
                ${concept.details.map(d => `
                  <div class="card">
                    <strong>${d.term}</strong>
                    <p style="margin-top: var(--spacing-xs); color: var(--text-secondary);">${d.desc}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${concept.flow ? `
              <div class="flow mt-md">
                ${concept.flow.map((step, i) => `
                  ${i > 0 ? '<span class="flow-arrow">→</span>' : ''}
                  <div class="flow-step">
                    <span class="flow-step-text">${step}</span>
                  </div>
                `).join('')}
              </div>
              <p class="mt-sm" style="text-align: center; color: var(--text-secondary);">
                💡 ${concept.shortcut}
              </p>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- Interactive: Image vs Container Demo -->
      ${createImageContainerDemo()}
      
      <!-- Docker Workflow Animation -->
      ${createDockerWorkflowAnimation()}
      
      <!-- Container vs VM Comparison -->
      ${createContainerVsVMAnimation()}
      
      <!-- Architecture -->
      ${createArchitectureDiagram(data.architecture)}
      
      <!-- Docker Layers -->
      ${createDockerLayersDiagram()}
      
      <!-- Commands -->
      <h2 class="mt-xl mb-md">⌨️ Docker Commands</h2>
      <div class="accordion">
        ${data.commands.map(cat => `
          <div class="accordion-item">
            <button class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
              <span>${cat.category}</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-content">
              <div class="accordion-body">
                ${cat.commands.map(cmd => `
                  <div style="margin-bottom: var(--spacing-md);">
                    <code style="display: block; margin-bottom: var(--spacing-xs);">${cmd.cmd}</code>
                    <span style="color: var(--text-secondary); font-size: var(--text-sm);">${cmd.desc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Code Example -->
      <h2 class="mt-xl mb-md">💻 Contoh Kode</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 3: Dockerfile Best Practices
export function renderPertemuan3(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Best Practices -->
      <h2 class="mt-xl mb-md">✨ Best Practices</h2>
      ${data.bestPractices.map(bp => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${bp.icon}</div>
            <div class="card-title">${bp.title}</div>
          </div>
          <div class="card-content">
            ${bp.content ? `<p class="mb-md">${bp.content}</p>` : ''}
            ${bp.reason ? `<p class="mb-md" style="color: var(--text-secondary);"><em>💡 ${bp.reason}</em></p>` : ''}
            ${bp.good ? `
              <div class="mb-sm">
                <span class="badge badge-success">✅ Good</span>
                ${createCodeBlock(bp.good, 'dockerfile')}
              </div>
            ` : ''}
            ${bp.bad ? `
              <div class="mb-sm">
                <span class="badge badge-error">❌ Avoid</span>
                ${createCodeBlock(bp.bad, 'dockerfile')}
              </div>
            ` : ''}
            ${bp.example ? `
              ${createCodeBlock(bp.example.join('\\n'), 'text')}
            ` : ''}
            ${bp.order ? `
              <div class="numbered-list">
                ${bp.order.map(step => `
                  <div class="list-item">
                    <span class="list-item-content"><code>${step}</code></span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- Multi-Stage Build -->
      <h2 class="mt-xl mb-md">🏗️ Multi-Stage Build</h2>
      <div class="card">
        <div class="card-header">
          <div class="card-icon">🚀</div>
          <div class="card-title">${data.multiStageBuild.title}</div>
        </div>
        <div class="card-content">
          <p>${data.multiStageBuild.description}</p>
          <div class="callout callout-info mt-md">
            <span class="callout-icon">💡</span>
            <div class="callout-content">
              <div class="callout-title">Analogi</div>
              <div class="callout-text">${data.multiStageBuild.analogy}</div>
            </div>
          </div>
          <h4 class="mt-lg mb-sm">Keuntungan:</h4>
          <ul class="list">
            ${data.multiStageBuild.benefits.map(b => `
              <li class="list-item">
                <span class="list-item-icon">✓</span>
                <span class="list-item-content">${b}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <!-- Interactive Multi-Stage Build Animation -->
      ${createMultiStageBuildAnimation()}
      
      <!-- Size Comparison -->
      <h2 class="mt-xl mb-md">📉 Perbandingan Ukuran Image</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Tipe</th>
              <th>Ukuran</th>
            </tr>
          </thead>
          <tbody>
            ${data.sizeComparison.items.map(item => `
              <tr>
                <td>${item.type}</td>
                <td><span class="badge badge-${item.color}">${item.size}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Code Examples -->
      <h2 class="mt-xl mb-md">💻 Contoh Multi-Stage Build</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 4: Docker Compose
export function renderPertemuan4(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Concepts -->
      ${data.concepts.map(concept => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${concept.icon}</div>
            <div class="card-title">${concept.title}</div>
          </div>
          <div class="card-content">
            <p>${concept.content}</p>
            ${concept.benefits ? `
              <ul class="list mt-md">
                ${concept.benefits.map(b => `
                  <li class="list-item">
                    <span class="list-item-icon">✓</span>
                    <span class="list-item-content">${b}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- Service Architecture -->
      ${createServiceArchitecture(data.serviceArchitecture.services)}
      
      <!-- Commands -->
      <h2 class="mt-xl mb-md">⌨️ Docker Compose Commands</h2>
      <div class="card-grid">
        ${data.commands.map(cmd => `
          <div class="card">
            <code style="display: block; margin-bottom: var(--spacing-sm);">${cmd.cmd}</code>
            <span style="color: var(--text-secondary); font-size: var(--text-sm);">${cmd.desc}</span>
          </div>
        `).join('')}
      </div>
      
      <!-- Code Example -->
      <h2 class="mt-xl mb-md">💻 Contoh docker-compose.yml</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 5: Container Registry
export function renderPertemuan5(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Concepts -->
      ${data.concepts.map(concept => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${concept.icon}</div>
            <div class="card-title">${concept.title}</div>
          </div>
          <div class="card-content">
            <p class="mb-md">${concept.content}</p>
            ${concept.types ? `
              <div class="card-grid">
                ${concept.types.map(t => `
                  <div class="card">
                    <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                      <span style="font-size: var(--text-xl);">${t.icon}</span>
                      <div>
                        <strong>${t.name}</strong>
                        <p style="margin: 0; color: var(--text-secondary); font-size: var(--text-sm);">${t.desc}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- Registry Flow -->
      ${createFlowDiagram(data.flow)}
      
      <!-- Tagging Strategy -->
      <h2 class="mt-xl mb-md">🏷️ Image Tagging Strategy</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Examples</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            ${data.taggingStrategy.strategies.map(s => `
              <tr>
                <td><strong>${s.type}</strong></td>
                <td>${s.examples.map(e => `<code>${e}</code>`).join(', ')}</td>
                <td style="color: var(--text-secondary);">${s.desc}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Commands -->
      <h2 class="mt-xl mb-md">⌨️ Registry Commands</h2>
      <div class="card-grid">
        ${data.commands.map(cmd => `
          <div class="card">
            <code style="display: block; margin-bottom: var(--spacing-sm);">${cmd.cmd}</code>
            <span style="color: var(--text-secondary); font-size: var(--text-sm);">${cmd.desc}</span>
          </div>
        `).join('')}
      </div>
      
      <!-- Code Example -->
      <h2 class="mt-xl mb-md">💻 Setup Private Registry</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 6: Kubernetes Architecture
export function renderPertemuan6(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Concepts -->
      ${data.concepts.map(concept => `
        <div class="card mt-lg">
          <div class="card-header">
            <div class="card-icon">${concept.icon}</div>
            <div class="card-title">${concept.title}</div>
          </div>
          <div class="card-content">
            <p>${concept.content}</p>
            ${concept.analogy ? `
              <div class="callout callout-info mt-md">
                <span class="callout-icon">💡</span>
                <div class="callout-content">
                  <div class="callout-text">${concept.analogy}</div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
      
      <!-- K8s Architecture -->
      ${createK8sClusterDiagram(data.architecture)}
      
      <!-- Key Objects -->
      <h2 class="mt-xl mb-md">🔑 Kubernetes Objects</h2>
      <div class="card-grid">
        ${data.keyObjects.map(obj => `
          <div class="card">
            <div style="display: flex; align-items: flex-start; gap: var(--spacing-md);">
              <span style="font-size: var(--text-2xl);">${obj.icon}</span>
              <div>
                <strong>${obj.name}</strong>
                <p style="margin: var(--spacing-xs) 0 0; color: var(--text-secondary); font-size: var(--text-sm);">${obj.desc}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Commands -->
      <h2 class="mt-xl mb-md">⌨️ kubectl Commands</h2>
      <div class="accordion">
        <div class="accordion-item open">
          <button class="accordion-header" onclick="this.parentElement.classList.toggle('open')">
            <span>Essential Commands</span>
            <span class="accordion-icon">▼</span>
          </button>
          <div class="accordion-content">
            <div class="accordion-body">
              ${data.commands.map(cmd => `
                <div style="margin-bottom: var(--spacing-md);">
                  <code style="display: block; margin-bottom: var(--spacing-xs);">${cmd.cmd}</code>
                  <span style="color: var(--text-secondary); font-size: var(--text-sm);">${cmd.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Code Examples -->
      <h2 class="mt-xl mb-md">💻 Contoh Manifests</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 7: Pods, Deployments, Services
export function renderPertemuan7(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Tujuan Pembelajaran</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Pod Lifecycle -->
      <h2 class="mt-xl mb-md">🔄 Pod Lifecycle</h2>
      <div class="card">
        <div class="flow">
          ${data.podLifecycle.stages.map((stage, i) => `
            ${i > 0 ? '<span class="flow-arrow">→</span>' : ''}
            <div class="flow-step">
              <span class="flow-step-text">${stage}</span>
            </div>
          `).join('')}
        </div>
        <p class="mt-md" style="text-align: center; color: var(--text-secondary);">
          ${data.podLifecycle.description}
        </p>
      </div>
      
      <!-- Deployment Strategies -->
      <h2 class="mt-xl mb-md">🚀 Deployment Strategies</h2>
      <div class="card-grid">
        ${data.deploymentStrategies.map(strategy => `
          <div class="card ${strategy.recommended ? 'highlight' : ''}" style="${strategy.recommended ? 'border-color: var(--color-primary);' : ''}">
            <div style="display: flex; align-items: flex-start; gap: var(--spacing-md);">
              <span style="font-size: var(--text-2xl);">${strategy.icon}</span>
              <div>
                <strong>${strategy.name}</strong>
                ${strategy.recommended ? '<span class="badge badge-primary ml-sm">Recommended</span>' : ''}
                <p style="margin: var(--spacing-xs) 0 0; color: var(--text-secondary); font-size: var(--text-sm);">${strategy.desc}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Service Types -->
      <h2 class="mt-xl mb-md">🔗 Service Types</h2>
      ${createServiceTypesDiagram(data.serviceTypes)}
      
      <!-- Commands -->
      <h2 class="mt-xl mb-md">⌨️ Rollout Commands</h2>
      <div class="card-grid">
        ${data.commands.map(cmd => `
          <div class="card">
            <code style="display: block; margin-bottom: var(--spacing-sm);">${cmd.cmd}</code>
            <span style="color: var(--text-secondary); font-size: var(--text-sm);">${cmd.desc}</span>
          </div>
        `).join('')}
      </div>
      
      <!-- Code Examples -->
      <h2 class="mt-xl mb-md">💻 Contoh Manifests</h2>
      ${data.codeExamples.map(ex => `
        <h3 class="mb-sm">${ex.title}</h3>
        ${createCodeBlock(ex.code, ex.lang, ex.title)}
      `).join('')}
    </section>
  `;
}

// Pertemuan 8: UTS
export function renderPertemuan8(data) {
  return `
    <section class="section" id="${data.id}">
      <div class="section-header">
        <span class="section-badge">${data.badge}</span>
        <h1 class="section-title">
          <span class="section-title-icon">${data.icon}</span>
          ${data.title}
        </h1>
        <p class="section-subtitle">${data.subtitle}</p>
      </div>
      
      <!-- Objectives -->
      <h2 class="mt-xl mb-md">🎯 Yang Dievaluasi</h2>
      <ul class="list">
        ${data.objectives.map(obj => `
          <li class="list-item">
            <span class="list-item-icon">✓</span>
            <span class="list-item-content">${obj}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Project Options -->
      <h2 class="mt-xl mb-md">📋 Pilihan Project</h2>
      <div class="card-grid">
        ${data.projectOptions.map(opt => `
          <div class="card">
            <div class="card-header">
              <div class="card-icon">${opt.icon}</div>
              <div class="card-title">${opt.title}</div>
            </div>
            <div class="card-content">
              <ul class="list">
                ${opt.components.map(c => `
                  <li class="list-item">
                    <span class="list-item-icon">•</span>
                    <span class="list-item-content">${c}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Grading Rubric -->
      <h2 class="mt-xl mb-md">📊 Rubrik Penilaian</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Komponen</th>
              <th>Points</th>
              <th>Kriteria</th>
            </tr>
          </thead>
          <tbody>
            ${data.gradingRubric.map(g => `
              <tr>
                <td><strong>${g.component}</strong></td>
                <td><span class="badge badge-primary">${g.points}</span></td>
                <td style="color: var(--text-secondary);">${g.criteria}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Checklist -->
      <h2 class="mt-xl mb-md">✅ Checklist Sebelum Submit</h2>
      <ul class="checklist">
        ${data.checklist.map(item => `
          <li class="checklist-item">
            <div class="checklist-checkbox">☐</div>
            <span class="checklist-text">${item.item}</span>
          </li>
        `).join('')}
      </ul>
      
      <!-- Common Mistakes -->
      <h2 class="mt-xl mb-md">⚠️ Kesalahan Umum (Hindari!)</h2>
      <div class="callout callout-warning">
        <span class="callout-icon">⚠️</span>
        <div class="callout-content">
          <ul class="list">
            ${data.commonMistakes.map(m => `
              <li class="list-item">
                <span class="list-item-icon">${m.icon}</span>
                <span class="list-item-content">${m.text}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <!-- Timeline -->
      <h2 class="mt-xl mb-md">📅 Rekomendasi Timeline</h2>
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Minggu</th>
              <th>Task</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            ${data.timeline.map(t => `
              <tr>
                <td><strong>${t.week}</strong></td>
                <td>${t.task}</td>
                <td style="color: var(--text-secondary);">${t.desc}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Tips -->
      <div class="callout callout-success mt-xl">
        <span class="callout-icon">💡</span>
        <div class="callout-content">
          <div class="callout-title">Tips Sukses</div>
          <div class="callout-text">
            <ul class="list">
              <li class="list-item"><span class="list-item-icon">✓</span><span class="list-item-content">Test Docker Compose dulu, baru Kubernetes</span></li>
              <li class="list-item"><span class="list-item-icon">✓</span><span class="list-item-content">Gunakan version control dari awal</span></li>
              <li class="list-item"><span class="list-item-icon">✓</span><span class="list-item-content">Dokumentasikan setiap langkah</span></li>
              <li class="list-item"><span class="list-item-icon">✓</span><span class="list-item-content">Screenshot error dan solusinya</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Export all renderers
export const sectionRenderers = {
  'overview': renderOverview,
  'pengenalan': renderPengenalan,
  'pertemuan-1': renderPertemuan1,
  'pertemuan-2': renderPertemuan2,
  'pertemuan-3': renderPertemuan3,
  'pertemuan-4': renderPertemuan4,
  'pertemuan-5': renderPertemuan5,
  'pertemuan-6': renderPertemuan6,
  'pertemuan-7': renderPertemuan7,
  'pertemuan-8': renderPertemuan8
};
