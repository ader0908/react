/* Settings Page JavaScript */
(() => {
  // DOM 요소들
  const settingsCards = document.querySelectorAll('.settings-card');
  const saveBtn = document.getElementById('saveSettings');
  const resetBtn = document.getElementById('resetSettings');
  const navToggle = document.querySelector('.nav-toggle');
  const globalNav = document.getElementById('global-nav');

  // 설정 상태 관리
  const defaultSettings = {
    language: 'ko',
    darkMode: true,
    itemsPerPage: '20',
    orderNotifications: true,
    stockNotifications: false,
    priceNotifications: true,
    weeklyReport: false,
    systemNotices: true,
    twoFactorAuth: true,
    sessionTimeout: '60',
    loginLogs: true,
    logRetention: '90',
    autoBackup: true,
    backupFrequency: 'daily',
    tempFileCleanup: '30',
    paymentApiKey: '',
    shippingApiKey: '',
    apiRateLimit: '1000',
    apiLogging: true
  };

  let currentSettings = { ...defaultSettings };

  // 설정 로드 (로컬 스토리지에서)
  function loadSettings() {
    const saved = localStorage.getItem('saveparts-settings');
    if (saved) {
      try {
        currentSettings = { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        console.warn('설정 로드 실패, 기본값 사용');
      }
    }
    applySettingsToUI();
  }

  // UI에 설정값 적용
  function applySettingsToUI() {
    // 기본 설정들
    document.querySelector('select[class="setting-control"]').value = currentSettings.language;
    
    const settingControls = document.querySelectorAll('.setting-control, input[type="checkbox"], input[type="number"], input[type="password"]');
    
    settingControls.forEach(control => {
      const settingKey = getSettingKey(control);
      if (settingKey && currentSettings.hasOwnProperty(settingKey)) {
        if (control.type === 'checkbox') {
          control.checked = currentSettings[settingKey];
        } else {
          control.value = currentSettings[settingKey];
        }
      }
    });
  }

  // 설정 키 매핑 (간단한 버전)
  function getSettingKey(element) {
    const parent = element.closest('.setting-item');
    if (!parent) return null;
    
    const label = parent.querySelector('.setting-label');
    if (!label) return null;
    
    const labelText = label.textContent.trim();
    
    // 라벨 텍스트를 기반으로 설정 키 매핑
    const keyMap = {
      '기본 언어': 'language',
      '다크 모드 사용': 'darkMode',
      '페이지당 항목 수': 'itemsPerPage',
      '새 주문 알림': 'orderNotifications',
      '재고 부족 알림': 'stockNotifications',
      '가격 변동 알림': 'priceNotifications',
      '주간 리포트': 'weeklyReport',
      '시스템 공지사항': 'systemNotices',
      '2단계 인증 사용': 'twoFactorAuth',
      '세션 만료 시간': 'sessionTimeout',
      '로그인 기록 저장': 'loginLogs',
      '로그 보관 기간': 'logRetention',
      '자동 백업 사용': 'autoBackup',
      '백업 주기': 'backupFrequency',
      '임시 파일 정리': 'tempFileCleanup',
      '결제 API 키': 'paymentApiKey',
      '배송 API 키': 'shippingApiKey',
      '시간당 요청 제한': 'apiRateLimit',
      'API 로깅 활성화': 'apiLogging'
    };
    
    return keyMap[labelText] || null;
  }

  // 현재 UI 상태를 설정 객체로 수집
  function collectSettingsFromUI() {
    const settings = { ...currentSettings };
    
    const settingControls = document.querySelectorAll('.setting-control, input[type="checkbox"], input[type="number"], input[type="password"]');
    
    settingControls.forEach(control => {
      const settingKey = getSettingKey(control);
      if (settingKey) {
        if (control.type === 'checkbox') {
          settings[settingKey] = control.checked;
        } else if (control.type === 'number') {
          settings[settingKey] = parseInt(control.value) || 0;
        } else {
          settings[settingKey] = control.value;
        }
      }
    });
    
    return settings;
  }

  // 설정 저장
  function saveSettings() {
    try {
      currentSettings = collectSettingsFromUI();
      localStorage.setItem('saveparts-settings', JSON.stringify(currentSettings));
      
      // 저장 완료 피드백
      showNotification('설정이 저장되었습니다.', 'success');
    } catch (e) {
      showNotification('설정 저장 중 오류가 발생했습니다.', 'error');
      console.error('설정 저장 실패:', e);
    }
  }

  // 설정 초기화
  function resetSettings() {
    if (confirm('모든 설정을 기본값으로 복원하시겠습니까?')) {
      currentSettings = { ...defaultSettings };
      localStorage.removeItem('saveparts-settings');
      applySettingsToUI();
      showNotification('설정이 기본값으로 복원되었습니다.', 'info');
    }
  }

  // 알림 표시
  function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existing = document.querySelector('.notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: var(--shadow-2);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // 3초 후 자동 제거
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 카드 토글 기능
  function setupCardToggles() {
    settingsCards.forEach(card => {
      const header = card.querySelector('.card-header');
      const toggle = card.querySelector('.card-toggle');
      
      function toggleCard() {
        const isCollapsed = card.classList.contains('collapsed');
        card.classList.toggle('collapsed');
        
        // 아이콘 변경
        toggle.innerHTML = isCollapsed ? '▲' : '▼';
        toggle.setAttribute('aria-expanded', String(isCollapsed));
        
        // ARIA 라벨 업데이트
        const title = card.querySelector('.card-title').textContent;
        toggle.setAttribute('aria-label', `${title} ${isCollapsed ? '접기' : '펼치기'}`);
      }

      // 헤더 클릭 이벤트
      header.addEventListener('click', (e) => {
        // 토글 버튼 자체 클릭은 제외
        if (e.target === toggle) return;
        toggleCard();
      });

      // 토글 버튼 클릭 이벤트
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCard();
      });

      // 키보드 접근성
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard();
        }
      });
    });
  }

  // 네비게이션 토글 (모바일)
  function setupNavToggle() {
    if (!navToggle || !globalNav) return;
    
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      globalNav.style.display = expanded ? 'none' : 'block';
    });
  }

  // 즉시 백업 실행
  function performBackup() {
    showNotification('백업을 시작합니다...', 'info');
    
    // 실제 백업 로직 시뮬레이션
    setTimeout(() => {
      showNotification('백업이 완료되었습니다.', 'success');
    }, 2000);
  }

  // 데이터 정리 실행
  function performCleanup() {
    if (confirm('임시 파일을 정리하시겠습니까?')) {
      showNotification('데이터 정리를 시작합니다...', 'info');
      
      // 실제 정리 로직 시뮬레이션
      setTimeout(() => {
        showNotification('데이터 정리가 완료되었습니다.', 'success');
      }, 1500);
    }
  }

  // 추가 버튼 이벤트 설정
  function setupActionButtons() {
    // 백업 실행 버튼
    const backupBtn = document.querySelector('.setting-actions .btn.primary');
    if (backupBtn && backupBtn.textContent.includes('백업')) {
      backupBtn.addEventListener('click', performBackup);
    }

    // 정리 버튼
    const cleanupBtn = document.querySelector('.setting-actions .btn.secondary');
    if (cleanupBtn && cleanupBtn.textContent.includes('정리')) {
      cleanupBtn.addEventListener('click', performCleanup);
    }
  }

  // 이벤트 리스너 설정
  function setupEventListeners() {
    // 저장 버튼
    if (saveBtn) {
      saveBtn.addEventListener('click', saveSettings);
    }

    // 초기화 버튼
    if (resetBtn) {
      resetBtn.addEventListener('click', resetSettings);
    }

    // 설정 변경 실시간 감지 (선택사항)
    document.addEventListener('change', (e) => {
      if (e.target.matches('.setting-control, input[type="checkbox"]')) {
        // 변경사항이 있음을 표시할 수 있음
        // 예: 저장 버튼 강조 등
      }
    });
  }

  // 초기화
  function init() {
    loadSettings();
    setupCardToggles();
    setupNavToggle();
    setupEventListeners();
    setupActionButtons();
    
    // 페이지 로드 완료 알림
    console.log('공통설정 페이지가 로드되었습니다.');
  }

  // DOM 로드 완료 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
