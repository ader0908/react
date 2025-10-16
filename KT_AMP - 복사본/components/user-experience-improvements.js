/**
 * KT_AMP - 사용자 경험 개선 컴포넌트
 * 기존 서비스 사용성 문제점 해결 및 최신 UX 패턴 적용
 */

class UserExperienceImprovements {
  constructor() {
    this.tourSteps = [];
    this.shortcuts = new Map();
    this.feedbackCollector = null;
    this.contextualHelp = new Map();
    this.userPreferences = {};
    
    this.init();
  }

  init() {
    this.setupOnboarding();
    this.setupKeyboardShortcuts();
    this.setupContextualHelp();
    this.setupFeedbackSystem();
    this.setupUserPreferences();
    this.setupProgressIndicators();
    this.setupSmartDefaults();
    this.setupErrorRecovery();
  }

  /**
   * 🎯 온보딩 시스템 - 신규 사용자 가이드
   */
  setupOnboarding() {
    // 사용자 레벨별 투어 설정
    this.tourSteps = {
      beginner: [
        {
          target: '.navbar-brand',
          title: '👋 KT_AMP에 오신 것을 환영합니다!',
          content: 'AI 멀티미디어 플랫폼의 모든 기능을 쉽게 사용할 수 있습니다.',
          position: 'bottom'
        },
        {
          target: '.search-enhanced',
          title: '🔍 스마트 검색',
          content: '키보드 "/"를 누르거나 여기를 클릭해서 빠르게 검색하세요.',
          position: 'bottom'
        },
        {
          target: '.stats-grid',
          title: '📊 실시간 현황',
          content: '서비스 상태와 성능을 실시간으로 모니터링할 수 있습니다.',
          position: 'top'
        },
        {
          target: '.service-card:first-child',
          title: '🎤 STT 서비스',
          content: '음성을 텍스트로 변환하는 서비스입니다. 클릭해서 자세히 알아보세요.',
          position: 'top'
        }
      ],
      intermediate: [
        {
          target: '.filter-tabs',
          title: '⚡ 빠른 필터',
          content: '서비스별로 빠르게 필터링할 수 있습니다.',
          position: 'bottom'
        },
        {
          target: '.user-menu',
          title: '⚙️ 개인 설정',
          content: '알림, 테마, 언어 등을 개인화할 수 있습니다.',
          position: 'bottom-left'
        }
      ]
    };

    // 투어 진행 상태 확인
    const hasSeenTour = localStorage.getItem('ktamp-tour-completed');
    if (!hasSeenTour) {
      setTimeout(() => this.startOnboardingTour('beginner'), 2000);
    }
  }

  startOnboardingTour(level = 'beginner') {
    const steps = this.tourSteps[level];
    if (!steps || steps.length === 0) return;

    let currentStep = 0;
    const overlay = this.createTourOverlay();
    document.body.appendChild(overlay);

    const showStep = (stepIndex) => {
      if (stepIndex >= steps.length) {
        this.completeTour(overlay);
        return;
      }

      const step = steps[stepIndex];
      const target = document.querySelector(step.target);
      
      if (!target) {
        showStep(stepIndex + 1);
        return;
      }

      this.highlightElement(target);
      this.showTourTooltip(target, step, stepIndex, steps.length, () => {
        showStep(stepIndex + 1);
      });
    };

    showStep(0);
  }

  createTourOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'tour-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      pointer-events: none;
    `;
    return overlay;
  }

  highlightElement(element) {
    // 기존 하이라이트 제거
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    // 새 하이라이트 추가
    element.classList.add('tour-highlight');
    element.style.cssText += `
      position: relative;
      z-index: 10001;
      box-shadow: 0 0 0 4px rgba(227, 30, 36, 0.5), 0 0 20px rgba(227, 30, 36, 0.3);
      border-radius: 8px;
    `;
  }

  showTourTooltip(target, step, currentIndex, totalSteps, onNext) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    tooltip.innerHTML = `
      <div class="tour-content">
        <h3 class="tour-title">${step.title}</h3>
        <p class="tour-description">${step.content}</p>
        <div class="tour-footer">
          <div class="tour-progress">
            <span class="tour-step-indicator">${currentIndex + 1} / ${totalSteps}</span>
            <div class="tour-progress-bar">
              <div class="tour-progress-fill" style="width: ${((currentIndex + 1) / totalSteps) * 100}%"></div>
            </div>
          </div>
          <div class="tour-actions">
            <button class="btn btn-ghost tour-skip">건너뛰기</button>
            <button class="btn btn-primary tour-next">
              ${currentIndex === totalSteps - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    `;

    // 스타일 적용
    tooltip.style.cssText = `
      position: absolute;
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10002;
      max-width: 320px;
      pointer-events: auto;
    `;

    // 위치 계산
    this.positionTooltip(tooltip, target, step.position);
    document.body.appendChild(tooltip);

    // 이벤트 리스너
    tooltip.querySelector('.tour-next').addEventListener('click', () => {
      document.body.removeChild(tooltip);
      onNext();
    });

    tooltip.querySelector('.tour-skip').addEventListener('click', () => {
      this.completeTour(document.querySelector('.tour-overlay'));
    });
  }

  positionTooltip(tooltip, target, position = 'bottom') {
    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = rect.top - tooltipRect.height - 10;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - 10;
        break;
      case 'right':
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + 10;
        break;
      default:
        top = rect.bottom + 10;
        left = rect.left;
    }

    // 화면 경계 확인 및 조정
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = rect.top - tooltipRect.height - 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  completeTour(overlay) {
    // 하이라이트 제거
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
      el.style.position = '';
      el.style.zIndex = '';
      el.style.boxShadow = '';
    });

    // 오버레이 제거
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }

    // 툴팁 제거
    document.querySelectorAll('.tour-tooltip').forEach(tooltip => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    });

    // 완료 상태 저장
    localStorage.setItem('ktamp-tour-completed', 'true');
    
    // 축하 메시지
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        '🎉 온보딩 완료! 이제 KT_AMP의 모든 기능을 자유롭게 사용하세요.',
        'success',
        5000
      );
    }
  }

  /**
   * ⌨️ 키보드 단축키 시스템
   */
  setupKeyboardShortcuts() {
    this.shortcuts = new Map([
      ['/', () => this.focusSearch()],
      ['ctrl+k', () => this.openCommandPalette()],
      ['ctrl+h', () => this.toggleHelp()],
      ['esc', () => this.escapeAction()],
      ['ctrl+shift+?', () => this.showShortcutHelp()],
      ['alt+1', () => this.switchTab(0)],
      ['alt+2', () => this.switchTab(1)],
      ['alt+3', () => this.switchTab(2)],
      ['alt+4', () => this.switchTab(3)]
    ]);

    document.addEventListener('keydown', (e) => {
      const key = this.getKeyString(e);
      const action = this.shortcuts.get(key);
      
      if (action) {
        e.preventDefault();
        action();
      }
    });

    // 단축키 도움말 표시
    this.createShortcutHelpPanel();
  }

  getKeyString(event) {
    const parts = [];
    if (event.ctrlKey || event.metaKey) parts.push('ctrl');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');
    parts.push(event.key.toLowerCase());
    return parts.join('+');
  }

  createShortcutHelpPanel() {
    const panel = document.createElement('div');
    panel.id = 'shortcut-help-panel';
    panel.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      max-width: 400px;
      display: none;
    `;

    panel.innerHTML = `
      <div class="shortcut-help-header">
        <h3>⌨️ 키보드 단축키</h3>
        <button class="shortcut-help-close">×</button>
      </div>
      <div class="shortcut-list">
        <div class="shortcut-item">
          <kbd>/</kbd>
          <span>검색 포커스</span>
        </div>
        <div class="shortcut-item">
          <kbd>Ctrl</kbd> + <kbd>K</kbd>
          <span>명령 팔레트</span>
        </div>
        <div class="shortcut-item">
          <kbd>Ctrl</kbd> + <kbd>H</kbd>
          <span>도움말 토글</span>
        </div>
        <div class="shortcut-item">
          <kbd>Alt</kbd> + <kbd>1-4</kbd>
          <span>탭 전환</span>
        </div>
        <div class="shortcut-item">
          <kbd>Esc</kbd>
          <span>취소/닫기</span>
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    // 닫기 이벤트
    panel.querySelector('.shortcut-help-close').addEventListener('click', () => {
      this.hideShortcutHelp();
    });
  }

  showShortcutHelp() {
    const panel = document.getElementById('shortcut-help-panel');
    if (panel) {
      panel.style.display = 'block';
    }
  }

  hideShortcutHelp() {
    const panel = document.getElementById('shortcut-help-panel');
    if (panel) {
      panel.style.display = 'none';
    }
  }

  /**
   * 💡 상황별 도움말 시스템
   */
  setupContextualHelp() {
    this.contextualHelp.set('.search-enhanced', {
      title: '스마트 검색 사용법',
      content: '서비스명, 사용자명, 프로젝트명으로 검색할 수 있습니다. "/"키로 빠른 접근 가능합니다.',
      tips: ['정확한 검색을 위해 최소 2글자 이상 입력하세요', '필터와 함께 사용하면 더 정확한 결과를 얻을 수 있습니다']
    });

    this.contextualHelp.set('.service-card', {
      title: '서비스 카드 사용법',
      content: '각 AI 서비스의 상태와 성능을 한눈에 확인할 수 있습니다.',
      tips: ['카드를 클릭하면 상세 정보를 볼 수 있습니다', '상태 표시등으로 서비스 건강도를 확인하세요']
    });

    // 도움말 버튼 추가
    this.addHelpButtons();
  }

  addHelpButtons() {
    const helpableElements = document.querySelectorAll('.search-enhanced, .service-card');
    
    helpableElements.forEach(element => {
      const helpButton = document.createElement('button');
      helpButton.className = 'contextual-help-btn';
      helpButton.innerHTML = '?';
      helpButton.title = '도움말';
      
      helpButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary-500);
        color: white;
        border: none;
        font-size: 12px;
        cursor: pointer;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.2s ease;
      `;

      element.style.position = 'relative';
      element.appendChild(helpButton);

      // 호버 시 도움말 버튼 표시
      element.addEventListener('mouseenter', () => {
        helpButton.style.opacity = '1';
      });

      element.addEventListener('mouseleave', () => {
        helpButton.style.opacity = '0';
      });

      // 도움말 표시
      helpButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showContextualHelp(element);
      });
    });
  }

  showContextualHelp(element) {
    const helpData = this.contextualHelp.get(element.classList[0]);
    if (!helpData) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'contextual-help-tooltip';
    tooltip.innerHTML = `
      <div class="help-header">
        <h4>${helpData.title}</h4>
        <button class="help-close">×</button>
      </div>
      <div class="help-content">
        <p>${helpData.content}</p>
        ${helpData.tips ? `
          <div class="help-tips">
            <strong>💡 팁:</strong>
            <ul>
              ${helpData.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;

    tooltip.style.cssText = `
      position: absolute;
      background: white;
      border: 1px solid var(--border-primary);
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      max-width: 300px;
      top: 100%;
      left: 0;
      margin-top: 8px;
    `;

    element.appendChild(tooltip);

    // 닫기 이벤트
    tooltip.querySelector('.help-close').addEventListener('click', () => {
      element.removeChild(tooltip);
    });

    // 외부 클릭시 닫기
    setTimeout(() => {
      document.addEventListener('click', function closeHelp(e) {
        if (!tooltip.contains(e.target)) {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
          document.removeEventListener('click', closeHelp);
        }
      });
    }, 100);
  }

  /**
   * 📝 피드백 수집 시스템
   */
  setupFeedbackSystem() {
    this.createFeedbackWidget();
    this.trackUserInteractions();
  }

  createFeedbackWidget() {
    const widget = document.createElement('div');
    widget.id = 'feedback-widget';
    widget.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 1000;
    `;

    widget.innerHTML = `
      <button class="feedback-trigger" title="피드백 보내기">
        💬 피드백
      </button>
      <div class="feedback-panel" style="display: none;">
        <div class="feedback-header">
          <h4>사용 경험은 어떠셨나요?</h4>
          <button class="feedback-close">×</button>
        </div>
        <div class="feedback-content">
          <div class="feedback-rating">
            <span>평점: </span>
            <div class="rating-stars">
              <span class="star" data-rating="1">⭐</span>
              <span class="star" data-rating="2">⭐</span>
              <span class="star" data-rating="3">⭐</span>
              <span class="star" data-rating="4">⭐</span>
              <span class="star" data-rating="5">⭐</span>
            </div>
          </div>
          <textarea class="feedback-text" placeholder="개선사항이나 의견을 알려주세요..."></textarea>
          <div class="feedback-actions">
            <button class="btn btn-primary feedback-submit">전송</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    // 이벤트 리스너
    this.bindFeedbackEvents(widget);
  }

  bindFeedbackEvents(widget) {
    const trigger = widget.querySelector('.feedback-trigger');
    const panel = widget.querySelector('.feedback-panel');
    const close = widget.querySelector('.feedback-close');
    const stars = widget.querySelectorAll('.star');
    const submit = widget.querySelector('.feedback-submit');

    trigger.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    close.addEventListener('click', () => {
      panel.style.display = 'none';
    });

    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        this.setStarRating(stars, rating);
      });
    });

    submit.addEventListener('click', () => {
      this.submitFeedback(widget);
    });
  }

  setStarRating(stars, rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = '#ffd700';
        star.classList.add('active');
      } else {
        star.style.color = '#ccc';
        star.classList.remove('active');
      }
    });
  }

  submitFeedback(widget) {
    const rating = widget.querySelectorAll('.star.active').length;
    const text = widget.querySelector('.feedback-text').value;
    const page = window.location.pathname;

    const feedback = {
      rating,
      text,
      page,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // 피드백 저장 (실제로는 서버로 전송)
    console.log('📝 사용자 피드백:', feedback);
    
    // 로컬 스토리지에 임시 저장
    const feedbacks = JSON.parse(localStorage.getItem('ktamp-feedbacks') || '[]');
    feedbacks.push(feedback);
    localStorage.setItem('ktamp-feedbacks', JSON.stringify(feedbacks));

    // 성공 메시지
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        '소중한 피드백 감사합니다! 서비스 개선에 반영하겠습니다.',
        'success',
        4000
      );
    }

    // 패널 닫기
    widget.querySelector('.feedback-panel').style.display = 'none';
    
    // 폼 리셋
    widget.querySelector('.feedback-text').value = '';
    this.setStarRating(widget.querySelectorAll('.star'), 0);
  }

  /**
   * 👤 사용자 맞춤 설정
   */
  setupUserPreferences() {
    this.userPreferences = {
      theme: 'auto',
      language: 'ko',
      density: 'comfortable',
      animations: true,
      notifications: true,
      autoSave: true
    };

    // 저장된 설정 로드
    const saved = localStorage.getItem('ktamp-user-preferences');
    if (saved) {
      this.userPreferences = { ...this.userPreferences, ...JSON.parse(saved) };
    }

    this.applyUserPreferences();
  }

  applyUserPreferences() {
    // 테마 적용
    if (this.userPreferences.theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else if (this.userPreferences.theme === 'light') {
      document.documentElement.classList.remove('dark-theme');
    }

    // 밀도 적용
    if (this.userPreferences.density === 'compact') {
      document.documentElement.classList.add('compact-mode');
    }

    // 애니메이션 설정
    if (!this.userPreferences.animations) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  saveUserPreferences() {
    localStorage.setItem('ktamp-user-preferences', JSON.stringify(this.userPreferences));
  }

  /**
   * 📊 진행률 표시기
   */
  setupProgressIndicators() {
    // 페이지 로딩 프로그레스 바
    this.createLoadingProgressBar();
    
    // 작업 진행률 표시
    this.setupTaskProgress();
  }

  createLoadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'page-loading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--primary-500);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
      z-index: 10000;
    `;

    document.body.appendChild(progressBar);

    // 페이지 로드 진행률 시뮬레이션
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          progressBar.style.opacity = '0';
          setTimeout(() => {
            if (progressBar.parentNode) {
              progressBar.parentNode.removeChild(progressBar);
            }
          }, 300);
        }, 500);
      }
      progressBar.style.transform = `scaleX(${progress / 100})`;
    }, 200);
  }

  /**
   * 🔧 스마트 기본값 설정
   */
  setupSmartDefaults() {
    // 사용자 행동 패턴 학습
    this.trackUserPreferences();
    
    // 시간대별 추천 설정
    this.applyTimeBasedDefaults();
    
    // 컨텍스트 기반 추천
    this.setupContextBasedSuggestions();
  }

  trackUserPreferences() {
    // 사용자가 자주 사용하는 필터 추적
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-tab')) {
        const filter = e.target.textContent;
        this.incrementUsageCount('filter', filter);
      }
    });
  }

  incrementUsageCount(type, value) {
    const usage = JSON.parse(localStorage.getItem('ktamp-usage-patterns') || '{}');
    if (!usage[type]) usage[type] = {};
    usage[type][value] = (usage[type][value] || 0) + 1;
    localStorage.setItem('ktamp-usage-patterns', JSON.stringify(usage));
  }

  /**
   * 🚨 오류 복구 시스템
   */
  setupErrorRecovery() {
    // 자동 재시도 메커니즘
    this.setupAutoRetry();
    
    // 로컬 백업 시스템
    this.setupLocalBackup();
    
    // 오류 상황별 복구 가이드
    this.setupErrorGuides();
  }

  setupAutoRetry() {
    // API 호출 실패시 자동 재시도
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const response = await originalFetch(...args);
          if (response.ok) return response;
          throw new Error(`HTTP ${response.status}`);
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) throw error;
          
          // 지수 백오프로 재시도
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
        }
      }
    };
  }

  setupLocalBackup() {
    // 중요한 사용자 데이터 로컬 백업
    setInterval(() => {
      const backupData = {
        preferences: this.userPreferences,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('ktamp-backup', JSON.stringify(backupData));
    }, 60000); // 1분마다 백업
  }

  // 편의 메서드들
  focusSearch() {
    const searchInput = document.querySelector('.search-input-enhanced, .search input');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }

  openCommandPalette() {
    console.log('🎯 명령 팔레트 열기 (향후 구현 예정)');
  }

  toggleHelp() {
    const helpPanel = document.getElementById('shortcut-help-panel');
    if (helpPanel) {
      helpPanel.style.display = helpPanel.style.display === 'none' ? 'block' : 'none';
    }
  }

  escapeAction() {
    // 모달, 드롭다운, 도움말 등 닫기
    document.querySelectorAll('.modal.show, .dropdown.open, .tour-overlay').forEach(el => {
      if (el.classList.contains('modal')) {
        el.classList.remove('show');
      } else if (el.classList.contains('dropdown')) {
        el.classList.remove('open');
      } else if (el.classList.contains('tour-overlay')) {
        this.completeTour(el);
      }
    });
  }

  switchTab(index) {
    const tabs = document.querySelectorAll('.filter-tab');
    if (tabs[index]) {
      tabs[index].click();
    }
  }
}

// CSS 스타일 추가
const uxStyles = document.createElement('style');
uxStyles.textContent = `
  .tour-highlight {
    animation: tourPulse 2s infinite;
  }

  @keyframes tourPulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(227, 30, 36, 0.5), 0 0 20px rgba(227, 30, 36, 0.3); }
    50% { box-shadow: 0 0 0 8px rgba(227, 30, 36, 0.3), 0 0 30px rgba(227, 30, 36, 0.5); }
  }

  .tour-tooltip {
    animation: tourSlideIn 0.3s ease-out;
  }

  @keyframes tourSlideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .tour-progress-bar {
    width: 100%;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 8px;
  }

  .tour-progress-fill {
    height: 100%;
    background: var(--primary-500);
    transition: width 0.3s ease;
  }

  .contextual-help-tooltip {
    animation: helpFadeIn 0.2s ease-out;
  }

  @keyframes helpFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .feedback-trigger {
    background: var(--primary-500);
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(227, 30, 36, 0.3);
    transition: all 0.3s ease;
  }

  .feedback-trigger:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(227, 30, 36, 0.4);
  }

  .compact-mode .card,
  .compact-mode .service-card {
    padding: 12px !important;
  }

  .compact-mode .stat-card {
    padding: 16px !important;
  }

  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  kbd {
    background: #f1f3f4;
    border: 1px solid #dadce0;
    border-radius: 4px;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.875rem;
  }

  .shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .rating-stars .star {
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 2px;
    color: #ccc;
    transition: color 0.2s ease;
  }

  .rating-stars .star:hover,
  .rating-stars .star.active {
    color: #ffd700;
  }
`;

document.head.appendChild(uxStyles);

// 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.uxImprovements = new UserExperienceImprovements();
});

export default UserExperienceImprovements;






