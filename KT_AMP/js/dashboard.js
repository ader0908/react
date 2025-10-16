/**
 * KT_AMP - Dashboard Functionality
 * 대시보드 데이터 관리 및 실시간 업데이트
 */

class KTAMPDashboard {
  constructor() {
    this.stats = {
      sttRequests: 1247,
      ttsConversions: 892,
      svAuthentications: 156,
      systemUptime: 99.2
    };
    
    this.activities = [];
    this.services = [];
    this.updateInterval = null;
    
    this.init();
  }

  init() {
    this.loadInitialData();
    this.bindEvents();
    this.startRealTimeUpdates();
    this.initializeCharts();
  }

  /**
   * 초기 데이터 로드
   */
  loadInitialData() {
    this.generateSampleActivities();
    this.generateSampleServices();
    this.updateStatsDisplay();
    this.updateActivitiesDisplay();
  }

  /**
   * 샘플 활동 데이터 생성
   */
  generateSampleActivities() {
    const activities = [
      {
        id: 1,
        type: 'stt',
        icon: '🎤',
        title: 'STT 서비스 정상 처리',
        description: '프로젝트 \'CPOD-2024\' - 음성 파일 변환 완료',
        time: '2분 전',
        status: 'success'
      },
      {
        id: 2,
        type: 'user',
        icon: '👥',
        title: '신규 사용자 등록',
        description: '사용자 \'kt_user_001\'이 시스템에 등록되었습니다',
        time: '15분 전',
        status: 'info'
      },
      {
        id: 3,
        type: 'system',
        icon: '⚙️',
        title: '시스템 설정 변경',
        description: 'TTS 음성 품질 설정이 업데이트되었습니다',
        time: '1시간 전',
        status: 'warning'
      },
      {
        id: 4,
        type: 'license',
        icon: '🔔',
        title: '라이선스 만료 알림',
        description: '프로젝트 \'Demo-Project\' 라이선스가 7일 후 만료됩니다',
        time: '2시간 전',
        status: 'error'
      }
    ];
    
    this.activities = activities;
  }

  /**
   * 샘플 서비스 데이터 생성
   */
  generateSampleServices() {
    this.services = [
      {
        id: 'stt',
        name: 'STT (Speech to Text)',
        description: '음성을 텍스트로 변환하는 고성능 STT 서비스',
        icon: '🎤',
        status: 'online',
        stats: {
          throughput: '1,247/시간',
          accuracy: '94.8%'
        }
      },
      {
        id: 'tts',
        name: 'TTS (Text to Speech)',
        description: '텍스트를 자연스러운 음성으로 변환하는 TTS 서비스',
        icon: '🔊',
        status: 'online',
        stats: {
          throughput: '892/시간',
          quality: '4.7/5'
        }
      },
      {
        id: 'sv',
        name: 'SV (Speaker Verification)',
        description: '화자 인증 및 검증을 통한 보안 인증 서비스',
        icon: '👤',
        status: 'warning',
        stats: {
          accuracy: '97.2%',
          responseTime: '1.2초'
        }
      }
    ];
  }

  /**
   * 통계 업데이트
   */
  updateStatsDisplay() {
    const statElements = document.querySelectorAll('.stat-number');
    const changes = document.querySelectorAll('.stat-change');
    
    if (statElements.length >= 4) {
      // 애니메이션과 함께 숫자 업데이트
      this.animateNumber(statElements[0], this.stats.sttRequests);
      this.animateNumber(statElements[1], this.stats.ttsConversions);
      this.animateNumber(statElements[2], this.stats.svAuthentications);
      this.animateNumber(statElements[3], this.stats.systemUptime, true);
    }

    // 변화율 업데이트
    if (changes.length >= 4) {
      const changeValues = ['+12.5%', '+8.3%', '-2.1%', '+0.8%'];
      const changeTypes = ['positive', 'positive', 'negative', 'positive'];
      
      changes.forEach((change, index) => {
        if (changeValues[index]) {
          change.className = `stat-change ${changeTypes[index]}`;
          change.innerHTML = `
            <span class="change-icon">${changeTypes[index] === 'positive' ? '↗' : '↘'}</span>
            ${changeValues[index]}
          `;
        }
      });
    }
  }

  /**
   * 숫자 애니메이션
   */
  animateNumber(element, target, isPercentage = false) {
    const start = parseInt(element.textContent.replace(/[^0-9.]/g, '')) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;
      
      if (isPercentage) {
        element.textContent = current.toFixed(1) + '%';
      } else {
        element.textContent = Math.floor(current).toLocaleString('ko-KR');
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  /**
   * 활동 목록 업데이트
   */
  updateActivitiesDisplay() {
    const container = document.querySelector('.activity-list');
    if (!container) return;

    container.innerHTML = '';
    
    this.activities.forEach(activity => {
      const activityElement = this.createActivityElement(activity);
      container.appendChild(activityElement);
    });
  }

  /**
   * 활동 요소 생성
   */
  createActivityElement(activity) {
    const element = document.createElement('div');
    element.className = 'activity-item';
    element.innerHTML = `
      <div class="activity-icon">${activity.icon}</div>
      <div class="activity-content">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-description">${activity.description}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
      <div class="activity-status ${activity.status}">
        ${this.getStatusText(activity.status)}
      </div>
    `;
    
    return element;
  }

  /**
   * 상태 텍스트 반환
   */
  getStatusText(status) {
    const statusMap = {
      success: '성공',
      info: '알림',
      warning: '주의',
      error: '경고'
    };
    return statusMap[status] || '알림';
  }

  /**
   * 실시간 업데이트 시작
   */
  startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.simulateDataUpdates();
      this.updateStatsDisplay();
      
      // 새 활동 추가 (15% 확률)
      if (Math.random() < 0.15) {
        this.addNewActivity();
      }
    }, 5000);
  }

  /**
   * 데이터 업데이트 시뮬레이션
   */
  simulateDataUpdates() {
    // 통계 값 랜덤 업데이트 (작은 변화)
    this.stats.sttRequests += Math.floor(Math.random() * 10) - 2;
    this.stats.ttsConversions += Math.floor(Math.random() * 8) - 1;
    this.stats.svAuthentications += Math.floor(Math.random() * 3) - 1;
    this.stats.systemUptime += (Math.random() * 0.2) - 0.1;
    
    // 음수 방지
    Object.keys(this.stats).forEach(key => {
      if (this.stats[key] < 0) this.stats[key] = 0;
    });
    
    // 시스템 가동률 상한선
    if (this.stats.systemUptime > 100) {
      this.stats.systemUptime = 100;
    }
  }

  /**
   * 새 활동 추가
   */
  addNewActivity() {
    const newActivities = [
      {
        type: 'stt',
        icon: '🎤',
        title: 'STT 변환 완료',
        description: '새로운 음성 파일이 성공적으로 변환되었습니다',
        status: 'success'
      },
      {
        type: 'tts',
        icon: '🔊',
        title: 'TTS 생성 완료',
        description: '텍스트가 음성으로 변환되었습니다',
        status: 'success'
      },
      {
        type: 'system',
        icon: '⚡',
        title: '시스템 성능 최적화',
        description: '자동 성능 튜닝이 적용되었습니다',
        status: 'info'
      },
      {
        type: 'error',
        icon: '⚠️',
        title: '일시적 지연 발생',
        description: '네트워크 지연으로 인한 일시적 성능 저하',
        status: 'warning'
      }
    ];
    
    const newActivity = {
      ...newActivities[Math.floor(Math.random() * newActivities.length)],
      id: Date.now(),
      time: '방금 전'
    };
    
    // 최신 활동을 맨 앞에 추가
    this.activities.unshift(newActivity);
    
    // 최대 10개 활동만 유지
    if (this.activities.length > 10) {
      this.activities = this.activities.slice(0, 10);
    }
    
    this.updateActivitiesDisplay();
    
    // 알림 표시
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        newActivity.description,
        newActivity.status,
        3000
      );
    }
  }

  /**
   * 차트 초기화
   */
  initializeCharts() {
    // 미니 차트 애니메이션
    const miniChart = document.querySelector('.mini-chart');
    if (miniChart) {
      this.animateMiniChart(miniChart);
    }
  }

  /**
   * 미니 차트 애니메이션
   */
  animateMiniChart(chart) {
    const lines = chart.querySelectorAll('::before, ::after');
    
    // 차트 데이터 업데이트 애니메이션
    setInterval(() => {
      chart.style.background = `linear-gradient(
        135deg,
        var(--primary-50) 0%,
        var(--primary-100) ${Math.random() * 30 + 20}%,
        var(--primary-200) ${Math.random() * 30 + 50}%,
        var(--primary-300) 100%
      )`;
    }, 3000);
  }

  /**
   * 이벤트 바인딩
   */
  bindEvents() {
    // 서비스 카드 클릭 이벤트
    document.addEventListener('click', (e) => {
      if (e.target.closest('.service-card')) {
        this.handleServiceCardClick(e);
      }
      
      if (e.target.closest('[data-action="refresh"]')) {
        this.refreshDashboard();
      }
      
      if (e.target.closest('[data-action="export"]')) {
        this.exportData();
      }
    });

    // 통계 카드 호버 이벤트
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.highlightRelatedData(card);
      });
    });

    // 키보드 단축키
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'r':
            e.preventDefault();
            this.refreshDashboard();
            break;
          case 'e':
            e.preventDefault();
            this.exportData();
            break;
        }
      }
    });
  }

  /**
   * 서비스 카드 클릭 처리
   */
  handleServiceCardClick(e) {
    const card = e.target.closest('.service-card');
    const serviceId = card.dataset.serviceId;
    
    // 서비스 상세 정보 표시
    this.showServiceDetails(serviceId);
  }

  /**
   * 서비스 상세 정보 표시
   */
  showServiceDetails(serviceId) {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) return;

    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        `${service.name} 상세 정보를 로드하고 있습니다...`,
        'info',
        2000
      );
    }

    // 실제 구현에서는 상세 페이지로 이동하거나 모달을 표시
    console.log('서비스 상세 정보:', service);
  }

  /**
   * 관련 데이터 하이라이트
   */
  highlightRelatedData(statCard) {
    // 통계 카드와 관련된 서비스나 활동 하이라이트
    const cardIndex = Array.from(document.querySelectorAll('.stat-card')).indexOf(statCard);
    
    // 관련 서비스 카드 하이라이트
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards[cardIndex]) {
      serviceCards[cardIndex].style.transform = 'scale(1.02)';
      serviceCards[cardIndex].style.transition = 'transform 0.2s ease';
      
      setTimeout(() => {
        serviceCards[cardIndex].style.transform = '';
      }, 2000);
    }
  }

  /**
   * 대시보드 새로고침
   */
  refreshDashboard() {
    if (window.ktampComponents) {
      const refreshBtn = document.querySelector('[data-action="refresh"]');
      const loading = window.ktampComponents.showLoading(
        refreshBtn?.parentElement || document.body,
        '대시보드를 새로고침하고 있습니다...'
      );

      // 데이터 새로고침 시뮬레이션
      setTimeout(() => {
        this.simulateDataUpdates();
        this.updateStatsDisplay();
        this.generateSampleActivities();
        this.updateActivitiesDisplay();
        
        window.ktampComponents.hideLoading(refreshBtn?.parentElement || document.body);
        window.ktampComponents.showNotification(
          '대시보드가 성공적으로 새로고침되었습니다.',
          'success',
          3000
        );
      }, 1500);
    }
  }

  /**
   * 데이터 내보내기
   */
  exportData() {
    const data = {
      stats: this.stats,
      activities: this.activities,
      services: this.services,
      exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ktamp-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        '대시보드 데이터가 성공적으로 내보내졌습니다.',
        'success',
        3000
      );
    }
  }

  /**
   * 실시간 업데이트 중지
   */
  stopRealTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * 대시보드 정리
   */
  destroy() {
    this.stopRealTimeUpdates();
  }
}

// 대시보드 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.ktampDashboard = new KTAMPDashboard();
});

// 페이지 언로드시 정리
window.addEventListener('beforeunload', () => {
  if (window.ktampDashboard) {
    window.ktampDashboard.destroy();
  }
});

// 전역으로 노출
window.KTAMPDashboard = KTAMPDashboard;






