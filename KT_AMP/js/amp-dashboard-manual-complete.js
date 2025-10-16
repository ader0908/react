// AMP Dashboard Manual Complete - JavaScript Logic
// 이전 복사본 디자인 + 매뉴얼 100% 준수 버전

// Global State Management
let currentStep = 'learning';
let currentTab = 'monitoring'; // 매뉴얼 요구사항: 모니터링이 첫 번째 탭

// 단계별 탭 구성 정의 (매뉴얼 기반)
const stepTabConfigs = {
    'learning': [
        { id: 'monitoring', label: '모니터링', active: true },
        { id: 'fine-tuning', label: 'Fine Tuning 데이터', active: false },
        { id: 'biasing-code', label: 'Biasing Code 데이터', active: false }
    ],
    'deployment': [
        { id: 'deployment-model', label: '배포 모델', active: true },
        { id: 'deployment-status', label: '배포 현황', active: false }
    ],
    'validation': [
        { id: 'validation-dataset', label: '검증데이터셋', active: true },
        { id: 'validation-request', label: '검증요청', active: false },
        { id: 'recognition-chart', label: '인식률차트', active: false }
    ],
    'testing': [
        { id: 'testing', label: '단건 테스트', active: true }
    ]
};

// Auto-refresh for monitoring
let autoRefreshInterval = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AMP Manual Complete Dashboard 초기화');
    
    setTimeout(() => {
        initializeApp();
        setupEventHandlers();
        loadInitialData();
        
        // Initialize tabs for current step
        updateTabsForStep(currentStep);
        
        // Start monitoring auto-refresh (매뉴얼 요구사항: 30초마다)
        startAutoRefresh();
        
        console.log('✅ 모든 초기화 완료');
    }, 100);
});

function initializeApp() {
    console.log('⚙️ 앱 초기화 중...');
    
    // Load saved state
    loadSavedState();
    
    // Initialize workflow progress
    updateProgressLine();
}

function setupEventHandlers() {
    // Setup global event handlers
    console.log('🔧 이벤트 핸들러 설정');
}

function loadInitialData() {
    console.log('📊 초기 데이터 로드');
    // Load initial dashboard data
}

function loadSavedState() {
    // Load any saved user preferences
    console.log('💾 저장된 상태 로드');
}

// Step Management Functions
function switchStep(step) {
    console.log('🔄 단계 전환:', step);
    
    currentStep = step;
    
    // Update step content
    updateStepContent(step);
    
    // Update progress steps
    updateProgressSteps(step);
    
    // Update progress line
    updateProgressLine();
    
    // Update sidebar active state
    updateSidebarActiveState(step);
}

function updateStepContent(step) {
    const contentConfigs = {
        'learning': {
            title: '🧠 학습 관리',
            subtitle: '모니터링, Fine Tuning 데이터와 Biasing Code를 관리하고 학습을 진행하세요'
        },
        'deployment': {
            title: '🚀 배포 관리',
            subtitle: '학습된 모델을 서비스 환경에 배포하고 관리하세요'
        },
        'validation': {
            title: '✅ 검증 관리',
            subtitle: '배포된 모델의 성능을 검증하고 분석하세요'
        },
        'testing': {
            title: '🧪 단건테스트',
            subtitle: '개별 음성 파일로 모델 성능을 실시간 테스트하세요'
        }
    };
    
    const config = contentConfigs[step];
    if (config) {
        document.getElementById('contentTitle').textContent = config.title;
        document.getElementById('contentSubtitle').textContent = config.subtitle;
    }
    
    // Reset to appropriate tab when switching steps
    if (step === 'learning') {
        switchTab('monitoring');
    } else {
        const firstTab = stepTabConfigs[step] && stepTabConfigs[step][0];
        if (firstTab) {
            switchTab(firstTab.id);
        }
    }
}

function updateProgressSteps(activeStep) {
    const steps = ['learning', 'deployment', 'validation', 'testing'];
    
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepName = steps[index];
        step.classList.toggle('active', stepName === activeStep);
        
        const statusElement = step.querySelector('.step-status');
        if (stepName === activeStep) {
            statusElement.textContent = '진행중';
            statusElement.className = 'step-status active';
        } else {
            statusElement.textContent = '대기중';
            statusElement.className = 'step-status pending';
        }
    });
}

function updateProgressLine() {
    const progressLine = document.getElementById('progressLine');
    if (!progressLine) return;
    
    const steps = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = steps.indexOf(currentStep);
    
    // Calculate progress percentage (only goes to validation)
    const progressPercent = (currentIndex / (steps.length - 1)) * 66.66;
    
    progressLine.style.width = `${Math.min(progressPercent, 66.66)}%`;
}

// Tab Management Functions
function updateTabsForStep(step) {
    const tabNavigation = document.getElementById('tabNavigation');
    if (!tabNavigation) {
        console.error('❌ tabNavigation 요소를 찾을 수 없음');
        return;
    }
    
    console.log('🔧 updateTabsForStep 호출됨:', step);
    
    const tabs = stepTabConfigs[step] || stepTabConfigs['learning'];
    
    // 단건테스트의 경우 탭 네비게이션과 헤더 숨김
    if (step === 'testing') {
        tabNavigation.style.display = 'none';
        
        const contentHeader = document.querySelector('.content-header');
        if (contentHeader) {
            contentHeader.style.display = 'none';
        }
        
        const workflowContent = document.querySelector('.workflow-content');
        if (workflowContent) {
            workflowContent.style.padding = '0';
            workflowContent.style.background = 'transparent';
            workflowContent.style.boxShadow = 'none';
        }
        
        // 직접 testing-panel 표시
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        const testingPanel = document.getElementById('testing-panel');
        if (testingPanel) {
            testingPanel.style.display = 'block';
        }
        return;
    } else {
        tabNavigation.style.display = 'flex';
        
        const contentHeader = document.querySelector('.content-header');
        if (contentHeader) {
            contentHeader.style.display = 'flex';
        }
        
        const workflowContent = document.querySelector('.workflow-content');
        if (workflowContent) {
            workflowContent.style.padding = 'var(--space-3xl)';
            workflowContent.style.background = 'white';
            workflowContent.style.boxShadow = 'var(--shadow-md)';
        }
    }
    
    // 탭 네비게이션 HTML 생성
    console.log('📝 탭 생성 중:', tabs);
    tabNavigation.innerHTML = tabs.map(tab => `
        <button class="tab-btn ${tab.active ? 'active' : ''}" 
                data-tab="${tab.id}" 
                onclick="switchTab('${tab.id}')">
            ${tab.label}
        </button>
    `).join('');
    
    console.log('✅ 탭 HTML 생성 완료');
    
    // 활성 탭 표시
    const activeTab = tabs.find(tab => tab.active);
    if (activeTab) {
        switchTab(activeTab.id);
    }
}

function switchTab(tabId) {
    console.log('📋 탭 전환:', tabId);
    
    currentTab = tabId;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    const activePanel = document.getElementById(`${tabId}-panel`);
    if (activePanel) {
        activePanel.style.display = 'block';
        console.log(`✅ ${tabId}-panel 표시됨`);
    } else {
        console.error(`❌ ${tabId}-panel을 찾을 수 없음`);
    }
    
    // Load tab-specific content
    loadTabContent(tabId);
}

function loadTabContent(tab) {
    console.log('📄 탭 컨텐츠 로드:', tab);
    
    switch(tab) {
        case 'monitoring':
            updateMonitoringData();
            break;
        case 'fine-tuning':
            initializeFineTuningData();
            break;
        case 'biasing-code':
            initializeBiasingCodeData();
            break;
        case 'deployment-model':
            displayDeployModelData();
            break;
        case 'deployment-status':
            displayDeploymentStatusData();
            break;
        case 'validation-dataset':
            displayValidationDatasetData();
            break;
        case 'validation-request':
            displayValidationRequestData();
            break;
        case 'recognition-chart':
            displayRecognitionChartData();
            break;
        case 'testing':
            loadTestingData();
            break;
        default:
            console.log('기본 컨텐츠 로드');
    }
}

// Monitoring Tab Functions (매뉴얼 요구사항 완전 구현)
function updateMonitoringData() {
    console.log('📈 모니터링 데이터 업데이트');
    
    // Update real-time stats
    updateRealTimeStats();
    
    // Update resource monitoring
    updateResourceMonitoring();
    
    // Update performance chart
    updatePerformanceChart();
    
    // Update recent activities
    updateRecentActivities();
}

function updateRealTimeStats() {
    // Simulate real-time data updates
    const stats = {
        activeJobs: Math.floor(Math.random() * 5) + 1,
        completedJobs: Math.floor(Math.random() * 10) + 45,
        avgAccuracy: (Math.random() * 5 + 92).toFixed(1),
        avgTime: (Math.random() * 1 + 2).toFixed(1)
    };
    
    // Update DOM elements
    const elements = {
        'activeJobs': stats.activeJobs,
        'completedJobs': stats.completedJobs,
        'avgAccuracy': stats.avgAccuracy + '%',
        'avgTime': stats.avgTime + 'h'
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function updateResourceMonitoring() {
    // Simulate resource usage updates
    const resources = {
        cpu: Math.min(100, 65 + (Math.random() - 0.5) * 20),
        gpu: Math.min(100, 80 + (Math.random() - 0.5) * 15),
        memory: Math.min(100, 60 + (Math.random() - 0.5) * 25)
    };
    
    Object.entries(resources).forEach(([type, value]) => {
        const usageElement = document.getElementById(`${type}Usage`);
        const barElement = document.querySelector(`#${type}Usage`).parentElement.nextElementSibling.querySelector('.progress-bar-fill');
        
        if (usageElement) {
            usageElement.textContent = Math.floor(value) + '%';
        }
        if (barElement) {
            barElement.style.width = Math.floor(value) + '%';
        }
    });
}

function updatePerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw simple performance trend
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const data = [88, 90, 92, 89, 94, 93, 95, 94, 96, 94];
    const stepX = canvas.width / (data.length - 1);
    
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = canvas.height - (value / 100) * canvas.height * 0.8 - 20;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add title
    ctx.fillStyle = '#374151';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('모델 정확도 추이 (%)', canvas.width / 2, 20);
}

function updateRecentActivities() {
    // Update current time
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        currentTimeElement.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                                      now.getMinutes().toString().padStart(2, '0');
    }
}

// Auto-refresh for monitoring (매뉴얼 요구사항: 30초마다)
function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        if (currentStep === 'learning' && currentTab === 'monitoring') {
            updateMonitoringData();
            console.log('🔄 모니터링 자동 새로고침 (30초)');
        }
    }, 30000); // 30 seconds as per manual requirement
    
    console.log('⏰ 모니터링 자동 새로고침 시작 (30초 간격)');
}

// Data Loading Functions for Other Tabs
function initializeFineTuningData() {
    console.log('📁 Fine Tuning 데이터 초기화');
    // Implementation for Fine Tuning data initialization
}

function initializeBiasingCodeData() {
    console.log('🔧 Biasing Code 데이터 초기화');
    // Implementation for Biasing Code data initialization
}

function displayDeployModelData() {
    console.log('📦 배포 모델 데이터 표시');
    // Implementation for Deployment Model data display
}

function displayDeploymentStatusData() {
    console.log('📊 배포 현황 데이터 표시');
    // Implementation for Deployment Status data display
}

function displayValidationDatasetData() {
    console.log('📋 검증데이터셋 데이터 표시');
    // Implementation for Validation Dataset data display
}

function displayValidationRequestData() {
    console.log('📝 검증요청 데이터 표시');
    // Implementation for Validation Request data display
}

function displayRecognitionChartData() {
    console.log('📈 인식률차트 데이터 표시');
    
    const canvas = document.getElementById('recognitionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw recognition accuracy chart
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const data = [91, 93, 94, 95, 94, 96, 97, 96, 98, 97, 98, 99];
    const stepX = canvas.width / (data.length - 1);
    
    data.forEach((value, index) => {
        const x = index * stepX;
        const y = canvas.height - (value / 100) * canvas.height * 0.8 - 30;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add title
    ctx.fillStyle = '#374151';
    ctx.font = '16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('시간별 인식률 변화 (CER/TER)', canvas.width / 2, 25);
}

function loadTestingData() {
    console.log('🧪 단건 테스트 데이터 로드');
    // Implementation for Testing data loading
}

// Sidebar Navigation Functions
function navigateToStep(step) {
    console.log('🧭 사이드바에서 단계 이동:', step);
    switchStep(step);
}

function updateSidebarActiveState(activeStep) {
    // Update sidebar active states based on current step
    document.querySelectorAll('.nav-submenu .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const stepMapping = {
        'learning': '학습 관리',
        'deployment': '배포관리',
        'validation': '검증 관리',
        'testing': '단건테스트'
    };
    
    const targetText = stepMapping[activeStep];
    if (targetText) {
        document.querySelectorAll('.nav-submenu .nav-item').forEach(item => {
            if (item.textContent.trim().includes(targetText)) {
                item.classList.add('active');
            }
        });
    }
}

function toggleNavSection(button) {
    const isExpanded = button.classList.contains('expanded');
    
    if (isExpanded) {
        button.classList.remove('expanded');
        const submenu = button.parentElement.querySelector('.nav-submenu');
        if (submenu) {
            submenu.style.display = 'none';
        }
    } else {
        // Close other sections first
        document.querySelectorAll('.nav-item.expandable.expanded').forEach(item => {
            if (item !== button) {
                item.classList.remove('expanded');
                const submenu = item.parentElement.querySelector('.nav-submenu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            }
        });
        
        button.classList.add('expanded');
        const submenu = button.parentElement.querySelector('.nav-submenu');
        if (submenu) {
            submenu.style.display = 'block';
        }
    }
}

// Refresh Functions
function refreshCurrentStep() {
    console.log('🔄 현재 단계 새로고침:', currentStep);
    
    // Reload current tab content
    if (currentTab) {
        loadTabContent(currentTab);
    }
    
    // Show refresh notification
    showNotification('데이터가 새로고침되었습니다.', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fine Tuning Functions
function searchFineTuningData() {
    console.log('🔍 Fine Tuning 데이터 검색');
    showNotification('Fine Tuning 데이터를 검색하고 있습니다.', 'info');
}

function resetFineTuningFilters() {
    console.log('🔄 Fine Tuning 필터 초기화');
    document.getElementById('fineTuningModelType').value = '';
    document.getElementById('fineTuningServiceModel').value = '';
    document.getElementById('fineTuningModelName').value = '';
    document.getElementById('fineTuningStatus').value = '';
    document.getElementById('fineTuningAuthor').value = '';
    showNotification('필터가 초기화되었습니다.', 'success');
}

function registerFineTuningData() {
    console.log('➕ Fine Tuning 데이터 등록');
    showNotification('Fine Tuning 데이터 등록 화면으로 이동합니다.', 'info');
}

function deleteSelectedFineTuning() {
    console.log('🗑️ 선택된 Fine Tuning 데이터 삭제');
    showNotification('선택된 항목이 삭제되었습니다.', 'success');
}

function toggleSelectAllFineTuning(checkbox) {
    const checkboxes = document.querySelectorAll('#fineTuningTableBody .row-select');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

function editFineTuning(id) {
    console.log('✏️ Fine Tuning 편집:', id);
    showNotification(`Fine Tuning 항목 ${id}를 편집합니다.`, 'info');
}

function deployFineTuning(id) {
    console.log('🚀 Fine Tuning 배포:', id);
    showNotification(`Fine Tuning 항목 ${id}를 배포합니다.`, 'success');
}

function startTraining(id) {
    console.log('▶️ 학습 시작:', id);
    showNotification(`모델 ${id}의 학습을 시작합니다.`, 'info');
}

function stopTraining(id) {
    console.log('⏹️ 학습 중지:', id);
    showNotification(`모델 ${id}의 학습을 중지합니다.`, 'warning');
}

// Biasing Code Functions
function searchBiasingData() {
    console.log('🔍 Biasing Code 데이터 검색');
    showNotification('Biasing Code 데이터를 검색하고 있습니다.', 'info');
}

function resetBiasingFilters() {
    console.log('🔄 Biasing Code 필터 초기화');
    document.getElementById('biasingDomain').value = '';
    document.getElementById('biasingCodeName').value = '';
    document.getElementById('biasingAppliedModel').value = '';
    document.getElementById('biasingStatus').value = '';
    showNotification('필터가 초기화되었습니다.', 'success');
}

function registerBiasingCode() {
    console.log('➕ Biasing Code 등록');
    showNotification('Biasing Code 등록 화면으로 이동합니다.', 'info');
}

function deleteSelectedBiasing() {
    console.log('🗑️ 선택된 Biasing Code 삭제');
    showNotification('선택된 항목이 삭제되었습니다.', 'success');
}

function toggleSelectAllBiasing(checkbox) {
    const checkboxes = document.querySelectorAll('#biasingTableBody .row-select');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

function editBiasing(id) {
    console.log('✏️ Biasing Code 편집:', id);
    showNotification(`Biasing Code 항목 ${id}를 편집합니다.`, 'info');
}

function activateBiasing(id) {
    console.log('✅ Biasing Code 활성화:', id);
    showNotification(`Biasing Code 항목 ${id}를 활성화합니다.`, 'success');
}

function deactivateBiasing(id) {
    console.log('❌ Biasing Code 비활성화:', id);
    showNotification(`Biasing Code 항목 ${id}를 비활성화합니다.`, 'warning');
}

function approveBiasing(id) {
    console.log('✅ Biasing Code 승인:', id);
    showNotification(`Biasing Code 항목 ${id}를 승인합니다.`, 'success');
}

// Utility Functions
function logActivity(activity) {
    console.log('📝 활동 로그:', activity);
}

// Export functions for global access
window.switchStep = switchStep;
window.switchTab = switchTab;
window.navigateToStep = navigateToStep;
window.toggleNavSection = toggleNavSection;
window.refreshCurrentStep = refreshCurrentStep;
window.searchFineTuningData = searchFineTuningData;
window.resetFineTuningFilters = resetFineTuningFilters;
window.registerFineTuningData = registerFineTuningData;
window.deleteSelectedFineTuning = deleteSelectedFineTuning;
window.toggleSelectAllFineTuning = toggleSelectAllFineTuning;
window.editFineTuning = editFineTuning;
window.deployFineTuning = deployFineTuning;
window.startTraining = startTraining;
window.stopTraining = stopTraining;
window.searchBiasingData = searchBiasingData;
window.resetBiasingFilters = resetBiasingFilters;
window.registerBiasingCode = registerBiasingCode;
window.deleteSelectedBiasing = deleteSelectedBiasing;
window.toggleSelectAllBiasing = toggleSelectAllBiasing;
window.editBiasing = editBiasing;
window.activateBiasing = activateBiasing;
window.deactivateBiasing = deactivateBiasing;
window.approveBiasing = approveBiasing;

