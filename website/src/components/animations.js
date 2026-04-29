// Interactive Animation Controllers

// ====================================
// Evolution Animation Controller
// ====================================

let evolutionAutoPlayInterval = null;

export function initEvolutionAnimation() {
  // Initialize with stage 1
  setEvolutionStage(1);
  
  // Auto-play through stages
  startEvolutionAutoPlay();
}

export function setEvolutionStage(stage) {
  const stagesContainer = document.getElementById('evolutionStages');
  if (!stagesContainer) return;
  
  // Update stages container class
  stagesContainer.className = `evolution-stages stage-${stage}`;
  
  // Update stage elements
  const stages = stagesContainer.querySelectorAll('.evolution-stage');
  stages.forEach((el, index) => {
    if (index + 1 <= stage) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
  
  // Update buttons
  const buttons = document.querySelectorAll('.evolution-controls .evolution-btn');
  buttons.forEach((btn, index) => {
    if (index + 1 === stage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function startEvolutionAutoPlay() {
  let currentStage = 1;
  
  evolutionAutoPlayInterval = setInterval(() => {
    currentStage++;
    if (currentStage > 3) currentStage = 1;
    setEvolutionStage(currentStage);
  }, 3000);
}

export function stopEvolutionAutoPlay() {
  if (evolutionAutoPlayInterval) {
    clearInterval(evolutionAutoPlayInterval);
    evolutionAutoPlayInterval = null;
  }
}

// ====================================
// Docker Workflow Animation Controller
// ====================================

let workflowAutoPlayInterval = null;

export function initDockerWorkflowAnimation() {
  // Initialize with build step
  setWorkflowStep('build');
}

export function setWorkflowStep(step) {
  const stages = document.querySelectorAll('.workflow-stage');
  const buttons = document.querySelectorAll('.docker-workflow .evolution-btn');
  
  // Stop auto-play if manually clicking
  if (workflowAutoPlayInterval) {
    clearInterval(workflowAutoPlayInterval);
    workflowAutoPlayInterval = null;
  }
  
  if (step === 'all') {
    // Play all steps in sequence
    playWorkflowSequence();
    return;
  }
  
  stages.forEach(stage => {
    if (stage.dataset.step === step) {
      stage.classList.add('active');
    } else {
      stage.classList.remove('active');
    }
  });
  
  buttons.forEach(btn => {
    const btnStep = btn.textContent.toLowerCase();
    if (btnStep.includes(step)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function playWorkflowSequence() {
  const steps = ['build', 'ship', 'run'];
  let currentIndex = 0;
  
  // Activate all buttons for "Play All"
  const buttons = document.querySelectorAll('.docker-workflow .evolution-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  buttons[buttons.length - 1].classList.add('active'); // Play All button
  
  setWorkflowStep(steps[currentIndex]);
  
  workflowAutoPlayInterval = setInterval(() => {
    currentIndex++;
    if (currentIndex >= steps.length) {
      currentIndex = 0;
    }
    setWorkflowStep(steps[currentIndex]);
  }, 2000);
}

// ====================================
// Image Container Demo Controller
// ====================================

let containerCount = 0;

export function spawnContainer() {
  const area = document.getElementById('containersArea');
  if (!area) return;
  
  if (containerCount >= 8) {
    // Show max message
    const existingMsg = area.querySelector('.max-message');
    if (!existingMsg) {
      const msg = document.createElement('div');
      msg.className = 'max-message';
      msg.style.cssText = 'padding: 10px; background: var(--color-warning); color: white; border-radius: 8px; font-size: 12px; text-align: center;';
      msg.textContent = '⚠️ Max 8 containers untuk demo ini!';
      area.appendChild(msg);
      setTimeout(() => msg.remove(), 2000);
    }
    return;
  }
  
  containerCount++;
  
  const container = document.createElement('div');
  container.className = 'spawned-container';
  container.innerHTML = `
    <div class="container-status"></div>
    <span style="margin-top: 4px;">Container ${containerCount}</span>
  `;
  
  area.appendChild(container);
}

export function clearContainers() {
  const area = document.getElementById('containersArea');
  if (!area) return;
  
  area.innerHTML = '';
  containerCount = 0;
}

// ====================================
// Scroll Animation Observer
// ====================================

export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger specific animations
        if (entry.target.classList.contains('evolution-animation')) {
          initEvolutionAnimation();
        }
        if (entry.target.classList.contains('docker-workflow')) {
          initDockerWorkflowAnimation();
        }
      }
    });
  }, observerOptions);
  
  // Observe animated elements
  document.querySelectorAll('.animate-on-scroll, .stagger-children, .evolution-animation, .docker-workflow, .size-bar-container').forEach(el => {
    observer.observe(el);
  });
}

// ====================================
// Initialize All Animations
// ====================================

export function initAllAnimations() {
  // Make functions globally available for onclick handlers
  window.setEvolutionStage = setEvolutionStage;
  window.setWorkflowStep = setWorkflowStep;
  window.spawnContainer = spawnContainer;
  window.clearContainers = clearContainers;
  
  // Initialize scroll-based animations
  initScrollAnimations();
  
  // Add click handlers to stop auto-play on manual interaction
  document.addEventListener('click', (e) => {
    if (e.target.closest('.evolution-controls')) {
      stopEvolutionAutoPlay();
    }
  });
}
