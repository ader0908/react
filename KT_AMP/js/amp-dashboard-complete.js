// AMP Complete Dashboard - JavaScript Logic
// 매뉴얼 100% 준수 버전 - 모든 탭 구조 완전 구현

// Global State Management
let currentStep = 'learning';
let currentTab = 'monitoring'; // 매뉴얼 요구사항: 모니터링이 첫 번째 탭

// Workflow Steps Configuration
const stepConfigs = {
    'learning': {
        title: '🧠 학습 관리',
        subtitle: '모니터링, Fine Tuning 데이터와 Biasing Code를 관리하고 학습을 진행하세요',
        tabs: [
            { id: 'monitoring', label: '모니터링', active: true },
            { id: 'fine-tuning', label: 'Fine Tuning 데이터', active: false },
            { id: 'biasing-code', label: 'Biasing Code 데이터', active: false }
        ]
    },
    'deployment': {
        title: '🚀 배포 관리',
        subtitle: '학습된 모델을 서비스 환경에 배포하고 관리하세요',
        tabs: [
            { id: 'deployment-model', label: '배포 모델', active: true },
            { id: 'deployment-status', label: '배포 현황', active: false }
        ]
    },
    'validation': {
        title: '✅ 검증 관리',
        subtitle: '배포된 모델의 성능을 검증하고 분석하세요',
        tabs: [
            { id: 'validation-dataset', label: '검증데이터셋', active: true },
            { id: 'validation-request', label: '검증요청', active: false },
            { id: 'recognition-chart', label: '인식률차트', active: false }
        ]
    },
    'testing': {
        title: '🧪 단건테스트',
        subtitle: '개별 음성 파일로 모델 성능을 실시간 테스트하세요',
        tabs: [
            { id: 'testing', label: '단건 테스트', active: true }
        ]
    }
};

// Auto-refresh for monitoring
let autoRefreshInterval = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AMP Complete Dashboard 초기화');
    
    setTimeout(() => {
        initializeApp();
        setupEventHandlers();
        
        // Initialize with learning step and monitoring tab
        switchStep('learning');
        
        // Start monitoring auto-refresh (매뉴얼 요구사항: 30초마다)
        startMonitoringAutoRefresh();
        
        console.log('✅ 모든 초기화 완료');
    }, 100);
});

function initializeApp() {
    console.log('⚙️ 앱 초기화 중...');
    
    // Initialize workflow progress
    updateProgressLine();
    
    // Setup sidebar navigation
    setupSidebarNavigation();
}

function setupEventHandlers() {
    // Global event listeners setup
    document.addEventListener('click', handleGlobalClicks);
}

function handleGlobalClicks(event) {
    // Handle any global click events if needed
}

// Step Management
function switchStep(step) {
    console.log('🔄 단계 전환:', step);
    
    currentStep = step;
    
    // Update progress steps
    updateProgressSteps(step);
    
    // Update content
    updateStepContent(step);
    
    // Update sidebar active state
    updateSidebarActiveState(step);
    
    // Update progress line
    updateProgressLine();
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

function updateStepContent(step) {
    const config = stepConfigs[step];
    if (!config) return;
    
    // Update title and subtitle
    document.getElementById('contentTitle').textContent = config.title;
    document.getElementById('contentSubtitle').textContent = config.subtitle;
    
    // Update tabs
    updateTabsForStep(step);
    
    // Switch to first tab of the step
    const firstTab = config.tabs.find(tab => tab.active);
    if (firstTab) {
        switchTab(firstTab.id);
    }
}

function updateTabsForStep(step) {
    const tabNavigation = document.getElementById('tabNavigation');
    const config = stepConfigs[step];
    
    if (!config || !tabNavigation) return;
    
    // Special handling for testing step (hide tabs and header)
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
        
        // Show testing panel directly
        showTabPanel('testing');
        return;
    } else {
        // Restore normal display for other steps
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
    
    // Generate tab navigation HTML
    tabNavigation.innerHTML = config.tabs.map(tab => `
        <button class="tab-btn ${tab.active ? 'active' : ''}" 
                data-tab="${tab.id}" 
                onclick="switchTab('${tab.id}')">
            ${tab.label}
        </button>
    `).join('');
}

// Tab Management
function switchTab(tabId) {
    console.log('📋 탭 전환:', tabId);
    
    currentTab = tabId;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    
    // Show corresponding panel
    showTabPanel(tabId);
    
    // Load tab-specific content
    loadTabContent(tabId);
}

function showTabPanel(tabId) {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    // Show target panel
    const targetPanel = document.getElementById(`${tabId}-panel`);
    if (targetPanel) {
        targetPanel.style.display = 'block';
        console.log(`✅ ${tabId} 패널 표시됨`);
    } else {
        console.error(`❌ ${tabId}-panel을 찾을 수 없음`);
    }
}

function loadTabContent(tabId) {
    console.log('📄 탭 컨텐츠 로드:', tabId);
    
    switch(tabId) {
        case 'monitoring':
            updateMonitoringData();
            break;
        case 'fine-tuning':
            loadFineTuningData();
            break;
        case 'biasing-code':
            loadBiasingCodeData();
            break;
        case 'deployment-model':
            loadDeploymentModelData();
            break;
        case 'deployment-status':
            loadDeploymentStatusData();
            break;
        case 'validation-dataset':
            loadValidationDatasetData();
            break;
        case 'validation-request':
            loadValidationRequestData();
            break;
        case 'recognition-chart':
            loadRecognitionChartData();
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
    
    // Update real-time stats with simulation
    updateMonitoringStats();
    
    // Update resource monitoring
    updateResourceMonitoring();
    
    // Update performance chart
    updatePerformanceChart();
    
    // Update recent activities
    updateRecentActivities();
}

function updateMonitoringStats() {
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
    const tbody = document.getElementById('recentActivities');
    if (!tbody) return;
    
    // Update time in first row
    const now = new Date();
    const timeCell = tbody.querySelector('td:first-child');
    if (timeCell) {
        timeCell.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                              now.getMinutes().toString().padStart(2, '0');
    }
}

// Auto-refresh for monitoring (매뉴얼 요구사항: 30초마다)
function startMonitoringAutoRefresh() {
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
function loadFineTuningData() {
    console.log('📁 Fine Tuning 데이터 로드');
    // Implementation for Fine Tuning data loading
}

function loadBiasingCodeData() {
    console.log('🔧 Biasing Code 데이터 로드');
    // Implementation for Biasing Code data loading
}

function loadDeploymentModelData() {
    console.log('📦 배포 모델 데이터 로드');
    // Implementation for Deployment Model data loading
}

function loadDeploymentStatusData() {
    console.log('📊 배포 현황 데이터 로드');
    // Implementation for Deployment Status data loading
}

function loadValidationDatasetData() {
    console.log('📋 검증데이터셋 데이터 로드');
    // Implementation for Validation Dataset data loading
}

function loadValidationRequestData() {
    console.log('📝 검증요청 데이터 로드');
    // Implementation for Validation Request data loading
}

function loadRecognitionChartData() {
    console.log('📈 인식률차트 데이터 로드');
    // Implementation for Recognition Chart data loading
    
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

// Progress Line Management
function updateProgressLine() {
    const progressLine = document.getElementById('progressLine');
    if (!progressLine) return;
    
    const steps = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = steps.indexOf(currentStep);
    
    // Calculate progress percentage
    const progressPercent = (currentIndex / (steps.length - 1)) * 66.66; // Only goes to validation (66.66% of total width)
    
    progressLine.style.width = `${progressPercent}%`;
}

// Sidebar Navigation
function setupSidebarNavigation() {
    // Setup event listeners for sidebar navigation
    console.log('🔧 사이드바 네비게이션 설정');
}

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

// Navigation Section Toggle
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

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchStep,
        switchTab,
        navigateToStep,
        toggleNavSection,
        refreshCurrentStep,
        updateMonitoringData,
        showNotification
    };
}

