// Sidebar Component

export function renderSidebar(navigation, activeId = 'overview') {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;
  
  let html = `
    <div class="nav-section">
      <div class="nav-section-title">Menu</div>
  `;
  
  navigation.forEach(item => {
    const isActive = item.id === activeId ? 'active' : '';
    const badge = item.badge ? `<span class="nav-item-badge">${item.badge}</span>` : '';
    
    html += `
      <div class="nav-item ${isActive}" data-section="${item.id}">
        <span class="nav-item-icon">${item.icon}</span>
        <span class="nav-item-text">${item.title}</span>
        ${badge}
      </div>
    `;
  });
  
  html += '</div>';
  nav.innerHTML = html;
  
  // Add click handlers
  nav.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = item.dataset.section;
      scrollToSection(sectionId);
      setActiveNavItem(sectionId);
      closeSidebarOnMobile();
    });
  });
}

export function setActiveNavItem(sectionId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
    }
  });
}

export function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 20;
    const top = section.offsetTop - offset;
    document.getElementById('mainContent').scrollTo({
      top: top,
      behavior: 'smooth'
    });
  }
}

export function initSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeSidebarOnMobile();
    });
  }
}

function closeSidebarOnMobile() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (window.innerWidth <= 1024) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// Scroll spy to update active nav item
export function initScrollSpy(navigation) {
  const mainContent = document.getElementById('mainContent');
  
  if (mainContent) {
    mainContent.addEventListener('scroll', () => {
      const scrollPos = mainContent.scrollTop + 100;
      
      for (let i = navigation.length - 1; i >= 0; i--) {
        const section = document.getElementById(navigation[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveNavItem(navigation[i].id);
          updateProgressBar(mainContent);
          break;
        }
      }
    });
  }
}

function updateProgressBar(container) {
  const progressBar = document.getElementById('progressBar');
  if (progressBar && container) {
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrolled = (container.scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${Math.min(100, scrolled)}%`;
  }
}
