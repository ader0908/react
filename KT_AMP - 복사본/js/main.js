/**
 * KT_AMP - Main Application Controller
 * 메인 애플리케이션 로직 및 전역 이벤트 관리
 */

class KTAMPApplication {
  constructor() {
    this.version = '1.0.0';
    this.initialized = false;
    this.modules = {};
    this.config = {
      apiBaseUrl: '/api/v1',
      updateInterval: 30000, // 30초
      notifications: true,
      darkMode: false,
      language: 'ko'
    };
    
    this.init();
  }

  /**
   * 애플리케이션 초기화
   */
  async init() {
    try {
      console.log(`🚀 KT_AMP v${this.version} 초기화 중...`);
      
      // 사용자 설정 로드
      await this.loadUserPreferences();
      
      // 테마 초기화
      this.initializeTheme();
      
      // 전역 이벤트 리스너 등록
      this.registerGlobalEvents();
      
      // 성능 모니터링
      this.initializePerformanceMonitoring();
      
      // 서비스 워커 등록 (PWA)
      this.registerServiceWorker();
      
      // 애플리케이션 상태 확인
      await this.checkApplicationHealth();
      
      this.initialized = true;
      console.log('✅ KT_AMP 초기화 완료');
      
      // 초기화 완료 이벤트 발생
      this.dispatchEvent('app:initialized');
      
    } catch (error) {
      console.error('❌ KT_AMP 초기화 실패:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * 사용자 설정 로드
   */
  async loadUserPreferences() {
    try {
      const saved = localStorage.getItem('ktamp-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        this.config = { ...this.config, ...preferences };
      }
    } catch (error) {
      console.warn('사용자 설정 로드 실패:', error);
    }
  }

  /**
   * 사용자 설정 저장
   */
  saveUserPreferences() {
    try {
      localStorage.setItem('ktamp-preferences', JSON.stringify(this.config));
    } catch (error) {
      console.warn('사용자 설정 저장 실패:', error);
    }
  }

  /**
   * 테마 초기화
   */
  initializeTheme() {
    // 다크모드 감지
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = this.config.darkMode;
    
    if (savedTheme || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark-theme');
      this.config.darkMode = true;
    }

    // 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('ktamp-theme-manual')) {
        this.toggleTheme(e.matches);
      }
    });
  }

  /**
   * 테마 토글
   */
  toggleTheme(force = null) {
    const isDark = force !== null ? force : !this.config.darkMode;
    
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    
    this.config.darkMode = isDark;
    this.saveUserPreferences();
    
    // 수동 설정 표시
    localStorage.setItem('ktamp-theme-manual', 'true');
    
    this.dispatchEvent('theme:changed', { isDark });
    
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        `${isDark ? '다크' : '라이트'} 모드로 변경되었습니다.`,
        'info',
        2000
      );
    }
  }

  /**
   * 전역 이벤트 등록
   */
  registerGlobalEvents() {
    // 언로드 이벤트
    window.addEventListener('beforeunload', (e) => {
      this.handleBeforeUnload(e);
    });

    // 온라인/오프라인 상태 변경
    window.addEventListener('online', () => {
      this.handleConnectionChange(true);
    });

    window.addEventListener('offline', () => {
      this.handleConnectionChange(false);
    });

    // 에러 처리
    window.addEventListener('error', (e) => {
      this.handleGlobalError(e);
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.handleUnhandledRejection(e);
    });

    // 리사이즈 이벤트
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // 키보드 단축키
    document.addEventListener('keydown', (e) => {
      this.handleGlobalKeydown(e);
    });

    // 가시성 변경 (탭 전환)
    document.addEventListener('visibilitychange', () => {
      this.handleVisibilityChange();
    });
  }

  /**
   * 성능 모니터링 초기화
   */
  initializePerformanceMonitoring() {
    // Web Vitals 측정
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        console.log('📊 LCP:', lcp.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('📊 FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        let cls = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        console.log('📊 CLS:', cls);
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // 메모리 사용량 모니터링
    if (performance.memory) {
      setInterval(() => {
        const memory = performance.memory;
        console.log('💾 Memory Usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          total: Math.round(memory.totalJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576)
        });
      }, 60000); // 1분마다
    }
  }

  /**
   * 서비스 워커 등록
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('🔧 Service Worker 등록 완료:', registration);
        
        // 업데이트 감지
        registration.addEventListener('updatefound', () => {
          console.log('🔄 Service Worker 업데이트 감지');
          
          if (window.ktampComponents) {
            window.ktampComponents.showNotification(
              '새로운 버전이 사용 가능합니다. 페이지를 새로고침해주세요.',
              'info',
              0 // 자동 닫기 안함
            );
          }
        });
        
      } catch (error) {
        console.warn('Service Worker 등록 실패:', error);
      }
    }
  }

  /**
   * 애플리케이션 상태 확인
   */
  async checkApplicationHealth() {
    try {
      // API 상태 확인
      const healthCheck = await this.performHealthCheck();
      
      if (!healthCheck.ok) {
        throw new Error('서버 연결 실패');
      }
      
      console.log('✅ 시스템 상태 정상');
      
    } catch (error) {
      console.warn('⚠️ 시스템 상태 확인 실패:', error);
      
      if (window.ktampComponents) {
        window.ktampComponents.showNotification(
          '서버 연결에 문제가 있습니다. 일부 기능이 제한될 수 있습니다.',
          'warning',
          5000
        );
      }
    }
  }

  /**
   * 헬스 체크 수행
   */
  async performHealthCheck() {
    // 실제 구현에서는 서버 API 호출
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: Math.random() > 0.1 }); // 90% 성공률
      }, 1000);
    });
  }

  /**
   * 연결 상태 변경 처리
   */
  handleConnectionChange(isOnline) {
    if (isOnline) {
      console.log('🌐 온라인 상태로 변경');
      
      if (window.ktampComponents) {
        window.ktampComponents.showNotification(
          '인터넷 연결이 복구되었습니다.',
          'success',
          3000
        );
      }
      
      // 오프라인 중 누적된 데이터 동기화
      this.syncOfflineData();
      
    } else {
      console.log('📵 오프라인 상태로 변경');
      
      if (window.ktampComponents) {
        window.ktampComponents.showNotification(
          '인터넷 연결이 끊어졌습니다. 일부 기능이 제한됩니다.',
          'warning',
          5000
        );
      }
    }
    
    this.dispatchEvent('connection:changed', { isOnline });
  }

  /**
   * 오프라인 데이터 동기화
   */
  async syncOfflineData() {
    try {
      const offlineData = localStorage.getItem('ktamp-offline-data');
      if (offlineData) {
        const data = JSON.parse(offlineData);
        console.log('🔄 오프라인 데이터 동기화 중...', data);
        
        // 실제 구현에서는 서버로 데이터 전송
        await this.sendDataToServer(data);
        
        localStorage.removeItem('ktamp-offline-data');
        console.log('✅ 오프라인 데이터 동기화 완료');
      }
    } catch (error) {
      console.error('❌ 오프라인 데이터 동기화 실패:', error);
    }
  }

  /**
   * 전역 에러 처리
   */
  handleGlobalError(event) {
    console.error('❌ 전역 에러:', event.error);
    
    // 에러 로깅 (실제 구현에서는 서버로 전송)
    this.logError({
      type: 'javascript-error',
      message: event.error?.message,
      stack: event.error?.stack,
      filename: event.filename,
      line: event.lineno,
      column: event.colno,
      timestamp: new Date().toISOString()
    });
    
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        '예상치 못한 오류가 발생했습니다. 페이지를 새로고침해보세요.',
        'error',
        8000
      );
    }
  }

  /**
   * 처리되지 않은 Promise 거부 처리
   */
  handleUnhandledRejection(event) {
    console.error('❌ 처리되지 않은 Promise 거부:', event.reason);
    
    this.logError({
      type: 'promise-rejection',
      reason: event.reason,
      timestamp: new Date().toISOString()
    });
    
    // 브라우저의 기본 처리 방지
    event.preventDefault();
  }

  /**
   * 리사이즈 처리
   */
  handleResize() {
    this.dispatchEvent('app:resize', {
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  /**
   * 전역 키보드 단축키 처리
   */
  handleGlobalKeydown(event) {
    const { key, ctrlKey, metaKey, altKey, shiftKey } = event;
    const modifier = ctrlKey || metaKey;
    
    // 단축키 맵
    const shortcuts = {
      // Ctrl/Cmd + K: 검색
      'k': () => modifier && this.openSearch(),
      // Ctrl/Cmd + /: 도움말
      '/': () => modifier && this.openHelp(),
      // Ctrl/Cmd + ,: 설정
      ',': () => modifier && this.openSettings(),
      // Alt + T: 테마 토글
      't': () => altKey && this.toggleTheme(),
      // F1: 도움말
      'F1': () => this.openHelp()
    };
    
    const action = shortcuts[key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  /**
   * 가시성 변경 처리 (탭 전환)
   */
  handleVisibilityChange() {
    if (document.hidden) {
      console.log('📱 앱이 백그라운드로 전환됨');
      // 백그라운드에서는 업데이트 빈도 감소
      if (window.ktampDashboard) {
        window.ktampDashboard.stopRealTimeUpdates();
      }
    } else {
      console.log('📱 앱이 포그라운드로 전환됨');
      // 포그라운드에서는 업데이트 재시작
      if (window.ktampDashboard) {
        window.ktampDashboard.startRealTimeUpdates();
      }
    }
  }

  /**
   * 페이지 언로드 전 처리
   */
  handleBeforeUnload(event) {
    // 저장되지 않은 변경사항이 있는지 확인
    const hasUnsavedChanges = this.checkUnsavedChanges();
    
    if (hasUnsavedChanges) {
      event.preventDefault();
      event.returnValue = '저장되지 않은 변경사항이 있습니다. 정말 나가시겠습니까?';
      return event.returnValue;
    }
    
    // 사용자 설정 저장
    this.saveUserPreferences();
    
    // 실시간 업데이트 중지
    if (window.ktampDashboard) {
      window.ktampDashboard.destroy();
    }
  }

  /**
   * 저장되지 않은 변경사항 확인
   */
  checkUnsavedChanges() {
    // 실제 구현에서는 폼 데이터나 편집 상태 확인
    return false;
  }

  /**
   * 검색 열기
   */
  openSearch() {
    console.log('🔍 검색 창 열기');
    // 실제 구현에서는 검색 모달이나 페이지 표시
  }

  /**
   * 도움말 열기
   */
  openHelp() {
    console.log('❓ 도움말 열기');
    // 실제 구현에서는 도움말 모달이나 페이지 표시
  }

  /**
   * 설정 열기
   */
  openSettings() {
    console.log('⚙️ 설정 창 열기');
    // 실제 구현에서는 설정 모달이나 페이지 표시
  }

  /**
   * 에러 로깅
   */
  logError(errorData) {
    // 로컬 스토리지에 에러 로그 저장
    try {
      const errorLogs = JSON.parse(localStorage.getItem('ktamp-error-logs') || '[]');
      errorLogs.push(errorData);
      
      // 최대 50개의 로그만 유지
      if (errorLogs.length > 50) {
        errorLogs.splice(0, errorLogs.length - 50);
      }
      
      localStorage.setItem('ktamp-error-logs', JSON.stringify(errorLogs));
      
    } catch (error) {
      console.warn('에러 로그 저장 실패:', error);
    }
  }

  /**
   * 서버로 데이터 전송
   */
  async sendDataToServer(data) {
    // 실제 구현에서는 fetch API 사용
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  /**
   * 커스텀 이벤트 발생
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }

  /**
   * 초기화 에러 처리
   */
  handleInitializationError(error) {
    // 기본 에러 메시지 표시
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #ef4444;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    errorDiv.textContent = '애플리케이션 초기화에 실패했습니다. 페이지를 새로고침해주세요.';
    
    document.body.appendChild(errorDiv);
    
    // 5초 후 자동 제거
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }

  /**
   * 애플리케이션 정보 반환
   */
  getInfo() {
    return {
      version: this.version,
      initialized: this.initialized,
      config: { ...this.config },
      modules: Object.keys(this.modules),
      performance: {
        memory: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576)
        } : null,
        timing: performance.timing
      }
    };
  }
}

// 애플리케이션 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.ktampApp = new KTAMPApplication();
});

// 개발자 도구에서 앱 정보 확인 가능
window.addEventListener('load', () => {
  console.log('%c🚀 KT_AMP 시스템', 'color: #e31e24; font-size: 16px; font-weight: bold;');
  console.log('앱 정보 확인: ktampApp.getInfo()');
  console.log('테마 변경: ktampApp.toggleTheme()');
  console.log('설정 확인: ktampApp.config');
});

// 전역으로 노출
window.KTAMPApplication = KTAMPApplication;






