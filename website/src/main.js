// Main entry point
import './style.css';

// Import data
import { courseInfo, navigation, overviewContent, pengenalanContent, pertemuanContent } from './data/content.js';

// Import components
import { renderSidebar, initSidebarToggle, initScrollSpy } from './components/sidebar.js';
import { initTheme, initThemeToggle } from './components/theme.js';
import { sectionRenderers } from './components/sections.js';
import { initAllAnimations } from './components/animations.js';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // Initialize theme
  initTheme();
  initThemeToggle();
  
  // Initialize sidebar
  renderSidebar(navigation, 'overview');
  initSidebarToggle();
  
  // Render content
  renderAllSections();
  
  // Initialize scroll spy
  initScrollSpy(navigation);
  
  // Initialize animations
  initAllAnimations();
  
  // Add mobile header
  addMobileHeader();
  
  // Initialize pengenalan interactive features
  initPengenalanFeatures();
  
  // Expose navigation function globally for button clicks
  window.navigateToSection = navigateToSection;
  
  // Expose quiz function globally
  window.checkQuizAnswer = checkQuizAnswer;
}

// Navigate to a specific section
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Update sidebar active state
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${sectionId}`) {
        item.classList.add('active');
      }
    });
    
    // Close mobile sidebar if open
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('active');
  }
}

// Initialize pengenalan section interactive features
function initPengenalanFeatures() {
  // Interactive checklist
  initChecklistProgress();
  
  // Learning path step clicks
  initLearningPath();
}

// Checklist progress tracking
function initChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist-input');
  const progressFill = document.getElementById('checklistProgress');
  const checkedCount = document.getElementById('checkedCount');
  
  if (!checkboxes.length || !progressFill || !checkedCount) return;
  
  const total = checkboxes.length;
  
  function updateProgress() {
    const checked = document.querySelectorAll('.checklist-input:checked').length;
    const percentage = (checked / total) * 100;
    
    progressFill.style.width = `${percentage}%`;
    checkedCount.textContent = checked;
    
    // Save to localStorage
    const checkedStates = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('pengenalan-checklist', JSON.stringify(checkedStates));
  }
  
  // Load saved state
  try {
    const saved = JSON.parse(localStorage.getItem('pengenalan-checklist') || '[]');
    checkboxes.forEach((cb, i) => {
      if (saved[i]) cb.checked = true;
    });
    updateProgress();
  } catch (e) {
    // Ignore errors
  }
  
  // Add change listeners
  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateProgress);
  });
}

// Learning path step interactions
function initLearningPath() {
  const steps = document.querySelectorAll('.path-step');
  
  steps.forEach(step => {
    step.addEventListener('click', () => {
      const stepNum = step.getAttribute('data-step');
      const targetMap = {
        '1': 'konsep-dasar',
        '2': 'evolusi-section',
        '3': 'why-containers-section',
        '4': 'why-k8s-section',
        '5': 'glossary-section',
        '6': 'ready-check-section'
      };
      
      const targetId = targetMap[stepNum];
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          
          // Update active step
          steps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');
        }
      }
    });
  });
  
  // Update active step on scroll
  const sections = ['konsep-dasar', 'evolusi-section', 'why-containers-section', 'why-k8s-section', 'glossary-section', 'ready-check-section'];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const stepIndex = sections.indexOf(sectionId);
        
        if (stepIndex !== -1) {
          steps.forEach((step, i) => {
            if (i === stepIndex) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
        }
      }
    });
  }, { threshold: 0.3 });
  
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

function renderAllSections() {
  const contentWrapper = document.getElementById('contentWrapper');
  if (!contentWrapper) return;
  
  let html = '';
  
  // Render overview
  html += sectionRenderers['overview'](overviewContent, courseInfo);
  
  // Render pengenalan (introduction for beginners)
  html += sectionRenderers['pengenalan'](pengenalanContent);
  
  // Render all pertemuan
  pertemuanContent.forEach(pertemuan => {
    const renderer = sectionRenderers[pertemuan.id];
    if (renderer) {
      html += renderer(pertemuan);
    }
  });
  
  // Add footer
  html += renderFooter();
  
  contentWrapper.innerHTML = html;
}

function renderFooter() {
  return `
    <footer class="section" style="text-align: center; border-bottom: none; padding-top: var(--spacing-xl);">
      <div style="margin-bottom: var(--spacing-lg);">
        <span style="font-size: 3rem;">☁️🐳☸️</span>
      </div>
      <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-sm);">
        Happy Learning Cloud-Native!
      </h3>
      <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
        Build, Ship, and Run Anywhere
      </p>
      <div style="display: flex; justify-content: center; gap: var(--spacing-md); flex-wrap: wrap; margin-bottom: var(--spacing-xl);">
        <a href="https://github.com/devnolife" target="_blank" style="display: inline-flex; align-items: center; gap: var(--spacing-xs); padding: var(--spacing-sm) var(--spacing-md); background: var(--bg-tertiary); border-radius: var(--radius-md); color: var(--text-primary); text-decoration: none; font-size: var(--text-sm);">
          <span>👨‍💻</span>
          <span>@devnolife</span>
        </a>
      </div>
      <div style="font-size: var(--text-sm); color: var(--text-tertiary);">
        <p>Laboratorium Informatika - Fakultas Teknik</p>
        <p>Universitas Muhammadiyah Makassar</p>
        <p style="margin-top: var(--spacing-md);">Made with ❤️ | ${new Date().getFullYear()}</p>
      </div>
    </footer>
  `;
}

function addMobileHeader() {
  const app = document.getElementById('app');
  const mobileHeader = document.createElement('div');
  mobileHeader.className = 'mobile-header';
  mobileHeader.innerHTML = `
    <div class="logo">
      <span class="logo-icon">☁️</span>
      <span class="logo-text">Cloud-Native</span>
    </div>
    <button class="sidebar-toggle" id="mobileToggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;
  app.insertBefore(mobileHeader, app.firstChild);
  
  // Add event listener
  document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
  });
}

// Quiz answer checking function
function checkQuizAnswer(button, isCorrect) {
  // Get the quiz container
  const quizContainer = button.closest('.quick-quiz');
  if (!quizContainer) return;
  
  // Get all options in this quiz
  const options = quizContainer.querySelectorAll('.quiz-option');
  const explanation = quizContainer.querySelector('.quiz-explanation');
  
  // Disable all options
  options.forEach(opt => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
  });
  
  // Mark the clicked button
  if (isCorrect) {
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
    // Also highlight the correct answer
    options.forEach(opt => {
      if (opt.getAttribute('data-correct') === 'true') {
        opt.classList.add('correct');
      }
    });
  }
  
  // Show explanation
  if (explanation) {
    explanation.style.display = 'flex';
  }
  
  // Add celebration effect for correct answer
  if (isCorrect) {
    // Create confetti effect
    createConfetti(button);
  }
}

// Simple confetti effect for correct answers
function createConfetti(element) {
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  const rect = element.getBoundingClientRect();
  
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: confetti-fall 1s ease-out forwards;
    `;
    
    // Random horizontal offset
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = Math.random() * -100 - 50;
    confetti.style.setProperty('--confetti-x', `${randomX}px`);
    confetti.style.setProperty('--confetti-y', `${randomY}px`);
    
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => confetti.remove(), 1000);
  }
}

// Add confetti animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(var(--confetti-x, 0), var(--confetti-y, -100px)) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
