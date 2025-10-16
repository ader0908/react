/**
 * KT_AMP - 기존 사용자 마이그레이션 가이드
 * 기존 시스템에서 새로운 KT_AMP로의 원활한 전환을 돕는 컴포넌트
 */

class MigrationGuide {
  constructor() {
    this.migrationSteps = [];
    this.userProfile = {};
    this.currentStep = 0;
    this.isFirstTimeUser = false;
    
    this.init();
  }

  init() {
    this.detectUserProfile();
    this.setupMigrationSteps();
    this.createMigrationInterface();
    this.bindEvents();
  }

  /**
   * 사용자 프로필 감지 - 기존 시스템 사용 경험 분석
   */
  detectUserProfile() {
    // 기존 시스템 사용 이력 확인
    const legacyData = this.checkLegacySystemData();
    const userPreferences = this.getUserPreferences();
    
    this.userProfile = {
      isLegacyUser: legacyData.hasHistory,
      experienceLevel: this.determineExperienceLevel(legacyData),
      preferredWorkflow: legacyData.commonTasks || [],
      lastLoginDate: legacyData.lastLogin,
      frequentFeatures: legacyData.frequentFeatures || [],
      customSettings: userPreferences
    };

    this.isFirstTimeUser = !this.userProfile.isLegacyUser;
    
    console.log('👤 사용자 프로필 감지:', this.userProfile);
  }

  checkLegacySystemData() {
    // 기존 시스템의 로컬 스토리지나 쿠키에서 사용 이력 확인
    const legacyKeys = [
      'legacy-amp-user',
      'amp-session',
      'user-preferences',
      'recent-activities'
    ];

    let hasHistory = false;
    let userData = {};

    legacyKeys.forEach(key => {
      const data = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (data) {
        hasHistory = true;
        try {
          userData[key] = JSON.parse(data);
        } catch (e) {
          userData[key] = data;
        }
      }
    });

    return {
      hasHistory,
      lastLogin: userData['amp-session']?.lastLogin,
      frequentFeatures: userData['recent-activities']?.frequent || [],
      commonTasks: userData['user-preferences']?.commonTasks || []
    };
  }

  determineExperienceLevel(legacyData) {
    if (!legacyData.hasHistory) return 'beginner';
    
    const loginCount = legacyData.loginCount || 0;
    const featureUsage = legacyData.frequentFeatures?.length || 0;
    
    if (loginCount > 50 && featureUsage > 10) return 'expert';
    if (loginCount > 10 && featureUsage > 5) return 'intermediate';
    return 'beginner';
  }

  /**
   * 경험 수준별 마이그레이션 단계 설정
   */
  setupMigrationSteps() {
    const baseSteps = {
      beginner: [
        {
          id: 'welcome',
          title: '🎉 새로운 KT_AMP에 오신 것을 환영합니다!',
          description: '더 나은 사용자 경험을 위해 시스템이 완전히 새롭게 태어났습니다.',
          content: this.createWelcomeContent(),
          estimatedTime: '2분',
          required: true
        },
        {
          id: 'interface-tour',
          title: '🗺️ 새로운 인터페이스 둘러보기',
          description: '직관적으로 개선된 메뉴와 기능들을 살펴보세요.',
          content: this.createInterfaceTourContent(),
          estimatedTime: '5분',
          required: true
        },
        {
          id: 'basic-features',
          title: '⭐ 핵심 기능 사용법',
          description: 'STT, TTS, SV 서비스의 개선된 사용법을 알아보세요.',
          content: this.createBasicFeaturesContent(),
          estimatedTime: '8분',
          required: true
        }
      ],
      
      intermediate: [
        {
          id: 'whats-new',
          title: '🆕 새로워진 기능들',
          description: '기존 기능의 개선사항과 새로 추가된 기능들을 확인하세요.',
          content: this.createWhatsNewContent(),
          estimatedTime: '3분',
          required: true
        },
        {
          id: 'workflow-migration',
          title: '🔄 기존 작업흐름 적용하기',
          description: '기존 작업 방식을 새로운 시스템에 맞게 조정해보세요.',
          content: this.createWorkflowMigrationContent(),
          estimatedTime: '6분',
          required: false
        },
        {
          id: 'advanced-features',
          title: '🚀 고급 기능 활용하기',
          description: '생산성을 높여줄 새로운 고급 기능들을 살펴보세요.',
          content: this.createAdvancedFeaturesContent(),
          estimatedTime: '10분',
          required: false
        }
      ],
      
      expert: [
        {
          id: 'migration-summary',
          title: '📊 마이그레이션 요약',
          description: '주요 변경사항과 새로운 기능들을 빠르게 확인하세요.',
          content: this.createMigrationSummaryContent(),
          estimatedTime: '2분',
          required: true
        },
        {
          id: 'api-changes',
          title: '🔧 API 및 기술적 변경사항',
          description: '개발자 및 고급 사용자를 위한 기술적 변경사항입니다.',
          content: this.createApiChangesContent(),
          estimatedTime: '5분',
          required: false
        },
        {
          id: 'customization',
          title: '⚙️ 고급 사용자 정의',
          description: '새로운 시스템을 기존 워크플로우에 맞게 조정하세요.',
          content: this.createCustomizationContent(),
          estimatedTime: '8분',
          required: false
        }
      ]
    };

    this.migrationSteps = baseSteps[this.userProfile.experienceLevel] || baseSteps.beginner;
    
    // 기존 사용자 데이터 기반 개인화
    if (this.userProfile.isLegacyUser) {
      this.personalizeMigrationSteps();
    }
  }

  personalizeMigrationSteps() {
    // 기존 사용자의 사용 패턴에 따라 마이그레이션 단계 개인화
    const frequentFeatures = this.userProfile.frequentFeatures;
    
    if (frequentFeatures.includes('stt')) {
      this.migrationSteps.push({
        id: 'stt-improvements',
        title: '🎤 STT 서비스 개선사항',
        description: '자주 사용하시던 STT 서비스가 어떻게 개선되었는지 확인하세요.',
        content: this.createSTTImprovementsContent(),
        estimatedTime: '4분',
        required: false,
        personalized: true
      });
    }

    if (frequentFeatures.includes('tts')) {
      this.migrationSteps.push({
        id: 'tts-improvements',
        title: '🔊 TTS 서비스 개선사항',
        description: '향상된 TTS 기능과 새로운 음성 옵션들을 살펴보세요.',
        content: this.createTTSImprovementsContent(),
        estimatedTime: '4분',
        required: false,
        personalized: true
      });
    }

    if (frequentFeatures.includes('admin')) {
      this.migrationSteps.push({
        id: 'admin-changes',
        title: '👨‍💼 관리자 기능 변경사항',
        description: '관리자 도구와 권한 관리의 개선사항을 확인하세요.',
        content: this.createAdminChangesContent(),
        estimatedTime: '6분',
        required: false,
        personalized: true
      });
    }
  }

  /**
   * 마이그레이션 인터페이스 생성
   */
  createMigrationInterface() {
    // 마이그레이션 모달이 이미 존재하는지 확인
    let modal = document.getElementById('migration-modal');
    if (modal) return;

    modal = document.createElement('div');
    modal.id = 'migration-modal';
    modal.className = 'migration-modal';
    modal.innerHTML = `
      <div class="migration-backdrop"></div>
      <div class="migration-container">
        <div class="migration-header">
          <div class="migration-progress">
            <div class="progress-bar">
              <div class="progress-fill" id="migration-progress-fill"></div>
            </div>
            <span class="progress-text" id="migration-progress-text">1 / ${this.migrationSteps.length}</span>
          </div>
          <button class="migration-close" id="migration-close" aria-label="마이그레이션 가이드 닫기">×</button>
        </div>
        
        <div class="migration-content" id="migration-content">
          <!-- 동적으로 생성될 콘텐츠 -->
        </div>
        
        <div class="migration-footer">
          <button class="btn btn-ghost" id="migration-skip">건너뛰기</button>
          <div class="migration-nav">
            <button class="btn btn-outline" id="migration-prev" disabled>이전</button>
            <button class="btn btn-primary" id="migration-next">다음</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.addMigrationStyles();
  }

  addMigrationStyles() {
    if (document.getElementById('migration-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'migration-styles';
    styles.textContent = `
      .migration-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .migration-modal.show {
        opacity: 1;
        visibility: visible;
      }

      .migration-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }

      .migration-container {
        position: relative;
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .migration-header {
        padding: 24px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .migration-progress {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .progress-bar {
        flex: 1;
        height: 8px;
        background: #e2e8f0;
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #e31e24, #ff4757);
        width: 0%;
        transition: width 0.3s ease;
      }

      .progress-text {
        font-size: 14px;
        font-weight: 600;
        color: #4a5568;
        min-width: 60px;
        text-align: center;
      }

      .migration-close {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        font-size: 24px;
        color: #718096;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .migration-close:hover {
        background: #f7fafc;
        color: #2d3748;
      }

      .migration-content {
        flex: 1;
        padding: 24px;
        overflow-y: auto;
      }

      .migration-footer {
        padding: 24px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .migration-nav {
        display: flex;
        gap: 12px;
      }

      .step-content {
        animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .step-title {
        font-size: 24px;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 8px;
      }

      .step-description {
        color: #4a5568;
        margin-bottom: 16px;
        font-size: 16px;
        line-height: 1.6;
      }

      .step-meta {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        font-size: 14px;
        color: #718096;
      }

      .time-estimate {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin: 20px 0;
      }

      .feature-card {
        background: #f7fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        transition: all 0.2s ease;
      }

      .feature-card:hover {
        background: #edf2f7;
        border-color: #cbd5e0;
      }

      .feature-icon {
        font-size: 24px;
        margin-bottom: 8px;
      }

      .feature-title {
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 4px;
      }

      .feature-description {
        font-size: 14px;
        color: #4a5568;
        line-height: 1.4;
      }

      .comparison-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }

      .comparison-table th,
      .comparison-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      .comparison-table th {
        background: #f7fafc;
        font-weight: 600;
        color: #2d3748;
      }

      .improvement-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: #c6f6d5;
        color: #2f855a;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      .warning-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: #fed7d7;
        color: #c53030;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }

      /* 반응형 */
      @media (max-width: 768px) {
        .migration-container {
          width: 95%;
          margin: 20px;
        }

        .migration-header,
        .migration-content,
        .migration-footer {
          padding: 16px;
        }

        .step-title {
          font-size: 20px;
        }

        .feature-grid {
          grid-template-columns: 1fr;
        }

        .migration-nav {
          flex-direction: column;
          width: 100%;
        }

        .migration-footer {
          flex-direction: column;
          gap: 16px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  /**
   * 콘텐츠 생성 메서드들
   */
  createWelcomeContent() {
    return `
      <div class="step-content">
        <h2 class="step-title">🎉 새로운 KT_AMP에 오신 것을 환영합니다!</h2>
        <p class="step-description">
          더 나은 사용자 경험을 위해 KT_AMP가 완전히 새롭게 태어났습니다. 
          현대적인 디자인과 향상된 기능으로 더욱 효율적인 작업이 가능합니다.
        </p>
        
        <div class="step-meta">
          <div class="time-estimate">
            <span>⏱️</span>
            <span>예상 소요시간: 2분</span>
          </div>
        </div>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <div class="feature-title">현대적인 디자인</div>
            <div class="feature-description">깔끔하고 직관적인 인터페이스로 더 쉽게 사용하세요</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <div class="feature-title">향상된 성능</div>
            <div class="feature-description">빠른 로딩과 부드러운 인터랙션을 경험하세요</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <div class="feature-title">모바일 최적화</div>
            <div class="feature-description">어떤 기기에서든 완벽한 사용 경험을 제공합니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <div class="feature-title">강화된 보안</div>
            <div class="feature-description">더욱 안전하고 신뢰할 수 있는 시스템입니다</div>
          </div>
        </div>
      </div>
    `;
  }

  createInterfaceTourContent() {
    return `
      <div class="step-content">
        <h2 class="step-title">🗺️ 새로운 인터페이스 둘러보기</h2>
        <p class="step-description">
          새롭게 설계된 인터페이스의 주요 영역과 기능들을 알아보세요.
        </p>
        
        <div class="step-meta">
          <div class="time-estimate">
            <span>⏱️</span>
            <span>예상 소요시간: 5분</span>
          </div>
        </div>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <div class="feature-title">스마트 검색</div>
            <div class="feature-description">"/" 키를 눌러 언제든 빠르게 검색할 수 있습니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <div class="feature-title">실시간 대시보드</div>
            <div class="feature-description">서비스 상태와 통계를 한눈에 확인하세요</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚙️</div>
            <div class="feature-title">개인화 설정</div>
            <div class="feature-description">테마, 언어, 알림 등을 개인 취향에 맞게 조정하세요</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔔</div>
            <div class="feature-title">스마트 알림</div>
            <div class="feature-description">중요한 정보를 놓치지 않도록 알려드립니다</div>
          </div>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: #ebf8ff; border-radius: 8px; border: 1px solid #bee3f8;">
          <div style="font-weight: 600; color: #2b6cb0; margin-bottom: 8px;">💡 팁</div>
          <div style="color: #2c5282; font-size: 14px;">
            상단 우측의 사용자 메뉴에서 언제든 이 가이드를 다시 볼 수 있습니다.
          </div>
        </div>
      </div>
    `;
  }

  createBasicFeaturesContent() {
    return `
      <div class="step-content">
        <h2 class="step-title">⭐ 핵심 기능 사용법</h2>
        <p class="step-description">
          STT, TTS, SV 서비스의 개선된 사용법을 알아보고 더 효율적으로 작업해보세요.
        </p>
        
        <div class="step-meta">
          <div class="time-estimate">
            <span>⏱️</span>
            <span>예상 소요시간: 8분</span>
          </div>
        </div>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>기능</th>
              <th>기존 방식</th>
              <th>새로운 방식</th>
              <th>개선사항</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>파일 업로드</strong></td>
              <td>파일 선택 버튼만 지원</td>
              <td>드래그 앤 드롭 + 다중 선택</td>
              <td><span class="improvement-badge">⚡ 3배 빠름</span></td>
            </tr>
            <tr>
              <td><strong>진행률 확인</strong></td>
              <td>처리 완료 후에만 확인</td>
              <td>실시간 진행률 표시</td>
              <td><span class="improvement-badge">📊 실시간</span></td>
            </tr>
            <tr>
              <td><strong>결과 편집</strong></td>
              <td>별도 프로그램 필요</td>
              <td>브라우저에서 바로 편집</td>
              <td><span class="improvement-badge">✨ 즉시 편집</span></td>
            </tr>
            <tr>
              <td><strong>배치 처리</strong></td>
              <td>파일 하나씩 처리</td>
              <td>여러 파일 동시 처리</td>
              <td><span class="improvement-badge">🚀 일괄 처리</span></td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #f0fff4; border-radius: 8px; border: 1px solid #9ae6b4;">
          <div style="font-weight: 600; color: #2f855a; margin-bottom: 8px;">🎯 권장사항</div>
          <div style="color: #276749; font-size: 14px;">
            새로운 기능들을 차례대로 사용해보시면서 익숙해지시기 바랍니다. 
            언제든 도움이 필요하시면 "?" 버튼을 클릭해 도움말을 확인하세요.
          </div>
        </div>
      </div>
    `;
  }

  createWhatsNewContent() {
    return `
      <div class="step-content">
        <h2 class="step-title">🆕 새로워진 기능들</h2>
        <p class="step-description">
          기존 기능의 개선사항과 완전히 새로 추가된 기능들을 확인해보세요.
        </p>
        
        <div class="step-meta">
          <div class="time-estimate">
            <span>⏱️</span>
            <span>예상 소요시간: 3분</span>
          </div>
        </div>

        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <div class="feature-title">자동 재시도</div>
            <div class="feature-description">네트워크 오류 시 자동으로 재시도하여 작업 중단을 방지합니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💾</div>
            <div class="feature-title">자동 저장</div>
            <div class="feature-description">작업 중인 내용이 자동으로 저장되어 데이터 손실을 방지합니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <div class="feature-title">작업 히스토리</div>
            <div class="feature-description">최근 작업 내역을 확인하고 이전 결과를 쉽게 찾을 수 있습니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <div class="feature-title">테마 커스터마이징</div>
            <div class="feature-description">라이트/다크 모드 지원으로 편안한 작업 환경을 만드세요</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⌨️</div>
            <div class="feature-title">키보드 단축키</div>
            <div class="feature-description">자주 사용하는 기능을 키보드로 빠르게 실행할 수 있습니다</div>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <div class="feature-title">모바일 지원</div>
            <div class="feature-description">스마트폰과 태블릿에서도 완벽하게 작동합니다</div>
          </div>
        </div>
      </div>
    `;
  }

  createWorkflowMigrationContent() {
    const userWorkflow = this.userProfile.preferredWorkflow;
    
    return `
      <div class="step-content">
        <h2 class="step-title">🔄 기존 작업흐름 적용하기</h2>
        <p class="step-description">
          기존에 사용하시던 작업 방식을 새로운 시스템에 맞게 조정해보세요.
        </p>
        
        <div class="step-meta">
          <div class="time-estimate">
            <span>⏱️</span>
            <span>예상 소요시간: 6분</span>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #2d3748;">
            📊 분석된 작업 패턴
          </h3>
          <div style="background: #f7fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="font-size: 14px; color: #4a5568;">
              ${userWorkflow.length > 0 
                ? `자주 사용하신 기능: ${userWorkflow.join(', ')}`
                : '새로운 사용자로 분석된 패턴이 없습니다.'
              }
            </div>
          </div>
        </div>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>작업 단계</th>
              <th>기존 방식</th>
              <th>개선된 방식</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. 로그인</strong></td>
              <td>복잡한 인증 절차</td>
              <td>간편한 로그인 + 자동 로그인 유지</td>
            </tr>
            <tr>
              <td><strong>2. 파일 선택</strong></td>
              <td>파일 탐색기에서 개별 선택</td>
              <td>드래그 앤 드롭으로 여러 파일 동시 선택</td>
            </tr>
            <tr>
              <td><strong>3. 설정 조정</strong></td>
              <td>매번 수동으로 설정</td>
              <td>이전 설정 자동 적용 + 프리셋 저장</td>
            </tr>
            <tr>
              <td><strong>4. 처리 대기</strong></td>
              <td>완료까지 기다림</td>
              <td>다른 작업 병행 가능 + 알림으로 완료 확인</td>
            </tr>
            <tr>
              <td><strong>5. 결과 확인</strong></td>
              <td>별도 페이지에서 확인</td>
              <td>실시간 미리보기 + 즉시 편집</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * 이벤트 바인딩
   */
  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'migration-close' || e.target.id === 'migration-skip') {
        this.closeMigration();
      } else if (e.target.id === 'migration-next') {
        this.nextStep();
      } else if (e.target.id === 'migration-prev') {
        this.prevStep();
      }
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMigration();
      }
    });
  }

  /**
   * 마이그레이션 시작
   */
  startMigration() {
    // 첫 방문자이거나 마이그레이션을 완료하지 않은 경우에만 표시
    const hasCompletedMigration = localStorage.getItem('ktamp-migration-completed');
    
    if (!hasCompletedMigration) {
      this.showMigration();
    }
  }

  showMigration() {
    const modal = document.getElementById('migration-modal');
    if (modal) {
      modal.classList.add('show');
      this.renderCurrentStep();
      document.body.style.overflow = 'hidden';
    }
  }

  closeMigration() {
    const modal = document.getElementById('migration-modal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      
      // 마이그레이션 완료 상태 저장
      localStorage.setItem('ktamp-migration-completed', 'true');
      localStorage.setItem('ktamp-migration-date', new Date().toISOString());
    }
  }

  nextStep() {
    if (this.currentStep < this.migrationSteps.length - 1) {
      this.currentStep++;
      this.renderCurrentStep();
    } else {
      this.completeMigration();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderCurrentStep();
    }
  }

  renderCurrentStep() {
    const step = this.migrationSteps[this.currentStep];
    if (!step) return;

    // 진행률 업데이트
    const progressFill = document.getElementById('migration-progress-fill');
    const progressText = document.getElementById('migration-progress-text');
    
    if (progressFill && progressText) {
      const progress = ((this.currentStep + 1) / this.migrationSteps.length) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${this.currentStep + 1} / ${this.migrationSteps.length}`;
    }

    // 콘텐츠 업데이트
    const content = document.getElementById('migration-content');
    if (content) {
      content.innerHTML = step.content;
    }

    // 버튼 상태 업데이트
    const prevBtn = document.getElementById('migration-prev');
    const nextBtn = document.getElementById('migration-next');
    
    if (prevBtn) {
      prevBtn.disabled = this.currentStep === 0;
    }
    
    if (nextBtn) {
      nextBtn.textContent = this.currentStep === this.migrationSteps.length - 1 ? '완료' : '다음';
    }
  }

  completeMigration() {
    // 완료 메시지 표시
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(
        '🎉 마이그레이션이 완료되었습니다! 새로운 KT_AMP를 즐겨보세요.',
        'success',
        5000
      );
    }

    this.closeMigration();
    
    // 완료 통계 저장
    const completionData = {
      completedAt: new Date().toISOString(),
      stepsCompleted: this.currentStep + 1,
      totalSteps: this.migrationSteps.length,
      userProfile: this.userProfile
    };
    
    localStorage.setItem('ktamp-migration-stats', JSON.stringify(completionData));
  }

  // 추가 콘텐츠 생성 메서드들 (간략화)
  createMigrationSummaryContent() {
    return `<div class="step-content">
      <h2 class="step-title">📊 마이그레이션 요약</h2>
      <p class="step-description">주요 변경사항을 빠르게 확인하세요.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createAdvancedFeaturesContent() {
    return `<div class="step-content">
      <h2 class="step-title">🚀 고급 기능 활용하기</h2>
      <p class="step-description">생산성을 높여줄 새로운 고급 기능들입니다.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createApiChangesContent() {
    return `<div class="step-content">
      <h2 class="step-title">🔧 API 및 기술적 변경사항</h2>
      <p class="step-description">개발자를 위한 기술적 변경사항입니다.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createCustomizationContent() {
    return `<div class="step-content">
      <h2 class="step-title">⚙️ 고급 사용자 정의</h2>
      <p class="step-description">시스템을 개인 워크플로우에 맞게 조정하세요.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createSTTImprovementsContent() {
    return `<div class="step-content">
      <h2 class="step-title">🎤 STT 서비스 개선사항</h2>
      <p class="step-description">자주 사용하시던 STT 서비스의 개선점들입니다.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createTTSImprovementsContent() {
    return `<div class="step-content">
      <h2 class="step-title">🔊 TTS 서비스 개선사항</h2>
      <p class="step-description">향상된 TTS 기능들을 확인해보세요.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  createAdminChangesContent() {
    return `<div class="step-content">
      <h2 class="step-title">👨‍💼 관리자 기능 변경사항</h2>
      <p class="step-description">관리자 도구의 개선사항들입니다.</p>
      <!-- 상세 내용 -->
    </div>`;
  }

  getUserPreferences() {
    try {
      return JSON.parse(localStorage.getItem('user-preferences') || '{}');
    } catch {
      return {};
    }
  }
}

// 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.migrationGuide = new MigrationGuide();
  
  // 3초 후 마이그레이션 시작 (필요한 경우)
  setTimeout(() => {
    window.migrationGuide.startMigration();
  }, 3000);
});

export default MigrationGuide;






