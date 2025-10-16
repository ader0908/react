/**
 * KT_AMP - UI Components and Interactions
 * 재사용 가능한 UI 컴포넌트들과 기본 인터랙션 처리
 */

class KTAMPComponents {
  constructor() {
    this.init();
  }

  init() {
    this.initializeDropdowns();
    this.initializeModals();
    this.initializeTooltips();
    this.initializeNavigation();
    this.initializeNotifications();
    this.bindEvents();
  }

  /**
   * 드롭다운 메뉴 초기화
   */
  initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle, .user-toggle');
      const menu = dropdown.querySelector('.dropdown-menu, .user-dropdown');
      
      if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleDropdown(dropdown);
        });
      }
    });

    // 외부 클릭시 드롭다운 닫기
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });

    // ESC 키로 드롭다운 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });
  }

  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('open');
    
    // 다른 드롭다운들 모두 닫기
    this.closeAllDropdowns();
    
    if (!isOpen) {
      dropdown.classList.add('open');
      const toggle = dropdown.querySelector('.dropdown-toggle, .user-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
      }
      
      // 첫 번째 메뉴 아이템에 포커스
      const firstItem = dropdown.querySelector('.dropdown-item');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 100);
      }
    }
  }

  closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll('.dropdown.open');
    openDropdowns.forEach(dropdown => {
      dropdown.classList.remove('open');
      const toggle = dropdown.querySelector('.dropdown-toggle, .user-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * 모달 초기화
   */
  initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        this.openModal(targetId);
      });
    });

    modals.forEach(modal => {
      const closeButtons = modal.querySelectorAll('.modal-close, [data-modal-close]');
      const backdrop = modal.querySelector('.modal-backdrop');
      
      closeButtons.forEach(btn => {
        btn.addEventListener('click', () => this.closeModal(modal.id));
      });
      
      if (backdrop) {
        backdrop.addEventListener('click', () => this.closeModal(modal.id));
      }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          this.closeModal(openModal.id);
        }
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (modal) {
      document.body.style.overflow = 'hidden';
      
      if (backdrop) {
        backdrop.classList.add('show');
      }
      
      setTimeout(() => {
        modal.classList.add('show');
        
        // 첫 번째 포커스 가능한 요소에 포커스
        const focusableElement = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
          focusableElement.focus();
        }
      }, 10);
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (modal) {
      modal.classList.remove('show');
      
      if (backdrop) {
        backdrop.classList.remove('show');
      }
      
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 300);
    }
  }

  /**
   * 툴팁 초기화
   */
  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', this.showTooltip.bind(this));
      element.addEventListener('mouseleave', this.hideTooltip.bind(this));
      element.addEventListener('focus', this.showTooltip.bind(this));
      element.addEventListener('blur', this.hideTooltip.bind(this));
    });
  }

  showTooltip(e) {
    const element = e.target;
    const tooltipText = element.getAttribute('data-tooltip');
    
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
      position: absolute;
      background-color: var(--neutral-800);
      color: white;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      white-space: nowrap;
      z-index: var(--z-tooltip);
      opacity: 0;
      transition: opacity var(--transition-fast);
      pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
    
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
    
    element._tooltip = tooltip;
  }

  hideTooltip(e) {
    const element = e.target;
    if (element._tooltip) {
      element._tooltip.remove();
      delete element._tooltip;
    }
  }

  /**
   * 네비게이션 초기화
   */
  initializeNavigation() {
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
          navMenu.style.display = 'flex';
          setTimeout(() => {
            navMenu.classList.add('show');
          }, 10);
        } else {
          navMenu.classList.remove('show');
          setTimeout(() => {
            navMenu.style.display = 'none';
          }, 300);
        }
      });
    }

    // 네비게이션 링크 활성화
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // 현재 활성 링크 제거
        document.querySelector('.nav-link.active')?.classList.remove('active');
        
        // 클릭된 링크 활성화
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
    });
  }

  /**
   * 알림 시스템 초기화
   */
  initializeNotifications() {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.className = 'notification-container';
    document.body.appendChild(this.notificationContainer);
  }

  /**
   * 알림 표시
   */
  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <span style="font-size: var(--text-lg);">${icons[type] || icons.info}</span>
        <div>
          <div style="font-weight: var(--font-medium); margin-bottom: var(--space-1);">
            ${type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          <div style="font-size: var(--text-sm); color: var(--text-secondary);">
            ${message}
          </div>
        </div>
        <button class="notification-close" style="margin-left: auto; background: none; border: none; font-size: var(--text-lg); cursor: pointer; opacity: 0.7;">
          ×
        </button>
      </div>
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      this.removeNotification(notification);
    });
    
    this.notificationContainer.appendChild(notification);
    
    // 자동 제거
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification);
      }, duration);
    }
    
    return notification;
  }

  removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  /**
   * 로딩 상태 관리
   */
  showLoading(element, text = '로딩 중...') {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div style="display: flex; align-items: center; gap: var(--space-3);">
        <div class="spinner"></div>
        <span>${text}</span>
      </div>
    `;
    
    element.style.position = 'relative';
    element.appendChild(overlay);
    
    return overlay;
  }

  hideLoading(element) {
    const overlay = element.querySelector('.loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * 이벤트 바인딩
   */
  bindEvents() {
    // 클릭 효과
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        this.createRippleEffect(e);
      }
    });

    // 키보드 네비게이션
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // 포커스 관리
    document.addEventListener('focusin', (e) => {
      this.manageFocus(e);
    });
  }

  /**
   * 물결 효과 생성
   */
  createRippleEffect(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  /**
   * 키보드 네비게이션 처리
   */
  handleKeyboardNavigation(e) {
    const { key, target } = e;
    
    // Tab 키 처리
    if (key === 'Tab') {
      this.handleTabNavigation(e);
    }
    
    // 드롭다운 메뉴에서 화살표 키 처리
    if (target.closest('.dropdown-menu')) {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault();
        this.navigateDropdownItems(target, key === 'ArrowDown');
      }
    }
    
    // Enter와 Space 키로 버튼 활성화
    if ((key === 'Enter' || key === ' ') && target.classList.contains('btn')) {
      e.preventDefault();
      target.click();
    }
  }

  navigateDropdownItems(currentItem, down = true) {
    const dropdown = currentItem.closest('.dropdown-menu');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const currentIndex = Array.from(items).indexOf(currentItem);
    
    let nextIndex;
    if (down) {
      nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }
    
    items[nextIndex].focus();
  }

  /**
   * 포커스 관리
   */
  manageFocus(e) {
    const focusedElement = e.target;
    
    // 포커스 링 표시
    if (focusedElement.matches(':focus-visible')) {
      focusedElement.classList.add('focused');
    }
    
    // 모달 포커스 트랩
    if (focusedElement.closest('.modal')) {
      this.trapFocus(focusedElement);
    }
  }

  trapFocus(element) {
    const modal = element.closest('.modal');
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .focused {
    outline: 2px solid var(--primary-500) !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

// 컴포넌트 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.ktampComponents = new KTAMPComponents();
});

// 전역으로 노출
window.KTAMPComponents = KTAMPComponents;






