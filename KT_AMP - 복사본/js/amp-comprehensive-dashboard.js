// AMP Comprehensive Dashboard - JavaScript Logic
// 스토리보드 기반 통합 STT 워크플로우 시스템

// Global State Management
let currentStep = 'learning';
let currentTab = 'overview';

let sidebarCollapsed = false;

// Workflow Data
let workflowData = {
    learning: {
        progress: 73,
        accuracy: 94.2,
        status: 'in-progress',
        startTime: '2025-01-18 09:30:00',
        estimatedCompletion: '2025-01-18 14:30:00'
    },
    deployment: {
        progress: 0,
        status: 'pending',
        instances: 0,
        uptime: 0
    },
    validation: {
        progress: 0,
        status: 'pending',
        accuracy: 0,
        responseTime: 0
    },
    testing: {
        progress: 0,
        status: 'pending',
        testsRun: 0,
        successRate: 0
    }
};



// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventHandlers();
    loadInitialData();
    
    // Initialize tabs for current step
    updateTabsForStep(currentStep);
});

function initializeApp() {
    console.log('🚀 AMP 종합 대시보드 초기화');
    
    // Load saved state
    loadSavedState();
    
    // Update UI
    updateProgressIndicator();
    updateStepContent();
    updateProjectStats();
    
    // Setup auto-refresh
    setInterval(updateRealTimeData, 30000); // Update every 30 seconds
    
    console.log('✅ 초기화 완료');
}

function setupEventHandlers() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize
    window.addEventListener('resize', handleResize);
    
    // Auto-save
    setInterval(autoSave, 60000); // Save every minute
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveProgress();
                break;
            case 'r':
                e.preventDefault();
                refreshCurrentStep();
                break;
            case 'k':
                e.preventDefault();
                focusSearch();
                break;
        }
    }
    
    // Function keys
    switch(e.key) {
        case 'F1':
            e.preventDefault();
            showHelp();
            break;
        case 'F5':
            e.preventDefault();
            refreshCurrentStep();
            break;
    }
}

function handleResize() {
    if (window.innerWidth < 768) {
        // Mobile: Auto-collapse sidebar
        if (!sidebarCollapsed) {
            toggleSidebar();
        }
    }
}

// Sidebar Management
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebarCollapsed = !sidebarCollapsed;
    
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
    
    // Save state
    localStorage.setItem('amp_sidebar_collapsed', sidebarCollapsed);
    
    logActivity(`사이드바 ${sidebarCollapsed ? '축소' : '확장'}`);
}

// Step Management
function switchStep(step) {
    if (!isStepAccessible(step)) {
        showNotification('이전 단계를 완료해야 접근할 수 있습니다.', 'warning');
        return;
    }

    currentStep = step;
    updateStepUI();
    updateProgressIndicator();
    updateStepContent();
    updateSidebarForStep(step); // 사이드바 활성화 상태 업데이트
    updateTabsForStep(step); // 단계별 탭 구성 업데이트
    
    logActivity(`${getStepName(step)} 단계로 이동`);
}

function isStepAccessible(step) {
    const stepOrder = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(step);
    
    // Allow going back or moving to next step if current has some progress
    return targetIndex <= currentIndex + 1;
}

function getStepName(step) {
    const names = {
        'learning': '학습 관리',
        'deployment': '배포 관리', 
        'validation': '검증 관리',
        'testing': '테스트 관리'
    };
    return names[step] || step;
}

function updateStepUI() {
    // Update step circles
    document.querySelectorAll('.progress-step').forEach(stepElement => {
        const stepId = stepElement.querySelector('.step-circle').id.replace('step-', '');
        const circle = stepElement.querySelector('.step-circle');
        const status = stepElement.querySelector('.step-status');
        
        // Reset classes
        circle.className = 'step-circle';
        
        if (stepId === currentStep) {
            circle.classList.add('active');
            status.textContent = '진행중';
            status.className = 'step-status active';
        } else if (workflowData[stepId]?.status === 'completed') {
            circle.classList.add('completed');
            status.textContent = '완료';
            status.className = 'step-status completed';
        } else {
            circle.classList.add('pending');
            status.textContent = '대기중';
            status.className = 'step-status pending';
        }
    });
}

function updateProgressIndicator() {
    const progressFill = document.getElementById('progressFill');
    const steps = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = steps.indexOf(currentStep);
    
    let progressPercent = 0;
    if (currentIndex >= 0) {
        // Calculate progress based on current step completion
        const currentStepProgress = workflowData[currentStep]?.progress || 0;
        progressPercent = (currentIndex * 25) + (currentStepProgress * 0.25);
    }
    
    if (progressFill) {
        progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
    }
}

function updateStepContent() {
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    const executeButtonText = document.getElementById('executeButtonText');
    
    const stepConfig = {
        learning: {
            title: '🧠 학습 관리',
            subtitle: 'Fine Tuning 데이터와 Biasing Code를 관리하고 학습을 진행하세요',
            buttonText: '학습 시작'
        },
        deployment: {
            title: '🚀 배포 관리',
            subtitle: '학습된 모델을 배포하고 서비스를 관리하세요',
            buttonText: '모델 배포'
        },
        validation: {
            title: '✅ 검증 관리',
            subtitle: '배포된 모델의 성능을 테스트하고 검증하세요',
            buttonText: '검증 시작'
        },
        testing: {
            title: '🧪 테스트 관리',
            subtitle: '실시간 음성 인식 테스트를 진행하세요',
            buttonText: '테스트 시작'
        }
    };
    
    const config = stepConfig[currentStep];
    if (config) {
        contentTitle.textContent = config.title;
        contentSubtitle.textContent = config.subtitle;
        executeButtonText.textContent = config.buttonText;
    }
    
    // Reset to overview tab when switching steps
    switchTab('overview');
}

// Tab Management
function switchTab(tab) {
    try {
        console.log('switchTab 호출됨:', tab);
        
        currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tab) {
                btn.classList.add('active');
            }
        });
        
        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.style.display = 'none';
        });
        
        const activePanel = document.getElementById(`${tab}-panel`);
        if (activePanel) {
            activePanel.style.display = 'block';
            console.log(`${tab}-panel 표시됨`);
        } else {
            console.error(`${tab}-panel을 찾을 수 없음`);
        }
    } catch (error) {
        console.error('switchTab 에러:', error);
    }
    
    // Load tab-specific content
    loadTabContent(tab);
    
    logActivity(`${tab} 탭으로 전환`);
}

function loadTabContent(tab) {
    switch(tab) {
        case 'overview':
            updateOverviewStats();
            break;
        case 'data':
            loadDataManagement();
            break;
        case 'config':
            loadConfiguration();
            break;
        case 'monitor':
            updateMonitoringData();
            break;
    }
}



function updateOverviewStats() {
    // This would be called when switching to overview tab
    // Update the stats cards in the overview panel
    console.log('📊 개요 통계 업데이트');
}

// Data Management
function openDataRegistration(type) {
    console.log(`📝 ${type} 데이터 등록 모달 열기`);
    
    // Create modal for data registration
    const modal = createDataRegistrationModal(type);
    document.body.appendChild(modal);
    
    // Show with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    logActivity(`${type} 데이터 등록 시작`);
}

function createDataRegistrationModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const title = type === 'fine-tuning' ? 'Fine Tuning 데이터 등록' : 'Biasing Code 등록';
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 16px;
            padding: 32px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 style="margin: 0; font-size: 20px; font-weight: 600;">${title}</h2>
                <button onclick="closeDataRegistrationModal()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6b7280;
                ">×</button>
            </div>
            
            <form id="dataRegistrationForm">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">서비스 모델 *</label>
                        <select required style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="">선택</option>
                            <option value="korean-stt">한국어 STT</option>
                            <option value="english-stt">영어 STT</option>
                            <option value="multilang-stt">다국어 STT</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">모델타입 *</label>
                        <select required style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="">선택</option>
                            <option value="fine-tuning" ${type === 'fine-tuning' ? 'selected' : ''}>Fine Tuning</option>
                            <option value="biasing" ${type === 'biasing' ? 'selected' : ''}>Biasing Code</option>
                        </select>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">데이터셋 이름 *</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="text" required placeholder="데이터셋 이름을 입력하세요" style="
                            flex: 1;
                            padding: 12px;
                            border: 1px solid #d1d5db;
                            border-radius: 8px;
                        ">
                        <button type="button" onclick="checkDuplicate()" style="
                            padding: 12px 16px;
                            background: #f3f4f6;
                            border: 1px solid #d1d5db;
                            border-radius: 8px;
                            cursor: pointer;
                        ">중복확인</button>
                    </div>
                </div>
                
                <div style="display: flex; gap: 16px; justify-content: flex-end; margin-top: 32px;">
                    <button type="button" onclick="closeDataRegistrationModal()" style="
                        padding: 12px 24px;
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        cursor: pointer;
                    ">취소</button>
                    <button type="submit" style="
                        padding: 12px 24px;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">등록</button>
                </div>
            </form>
        </div>
    `;
    
    return modal;
}

function closeDataRegistrationModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

function importData() {
    console.log('📁 데이터 가져오기');
    showNotification('파일 가져오기 기능을 준비 중입니다.', 'info');
}

function loadDataManagement() {
    console.log('📊 데이터 관리 탭 로드');
    // Refresh data table
}

function loadConfiguration() {
    console.log('⚙️ 설정 탭 로드');
    // Load current configurations
}

function updateMonitoringData() {
    console.log('📈 모니터링 데이터 업데이트');
    // Update real-time monitoring data
}

// Workflow Actions
function executeCurrentStep() {
    switch(currentStep) {
        case 'learning':
            startLearning();
            break;
        case 'deployment':
            deployModel();
            break;
        case 'validation':
            startValidation();
            break;
        case 'testing':
            startTesting();
            break;
    }
}

function startLearning() {
    
    console.log('🧠 학습 시작');
    showNotification('학습을 시작합니다.', 'success');
    
    // Update workflow data
    workflowData.learning.status = 'in-progress';
    
    // Simulate learning progress
    simulateLearningProgress();
    
    logActivity('학습 시작');
}

function deployModel() {
    if (workflowData.learning.status !== 'completed') {
        showNotification('학습이 완료된 후 배포할 수 있습니다.', 'warning');
        return;
    }
    
    console.log('🚀 모델 배포 시작');
    showNotification('모델을 배포합니다.', 'info');
    
    setTimeout(() => {
        workflowData.deployment.status = 'completed';
        showNotification('모델이 성공적으로 배포되었습니다!', 'success');
        enableNextStep('validation');
    }, 3000);
    
    logActivity('모델 배포');
}

function startValidation() {
    if (workflowData.deployment.status !== 'completed') {
        showNotification('배포가 완료된 후 검증할 수 있습니다.', 'warning');
        return;
    }
    
    console.log('✅ 검증 시작');
    showNotification('성능 검증을 시작합니다.', 'info');
    
    setTimeout(() => {
        workflowData.validation.status = 'completed';
        showNotification('검증이 완료되었습니다!', 'success');
        enableNextStep('testing');
    }, 4000);
    
    logActivity('검증 시작');
}

function startTesting() {
    console.log('🧪 테스트 시작');
    showNotification('음성 인식 테스트를 시작합니다.', 'info');
    
    logActivity('테스트 시작');
}

function simulateLearningProgress() {
    let progress = workflowData.learning.progress;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeLearning();
        }
        
        workflowData.learning.progress = Math.round(progress);
        updateProjectStats();
        updateProgressIndicator();
    }, 1000);
}

function completeLearning() {
    workflowData.learning.status = 'completed';
    workflowData.learning.accuracy = 94.2;
    
    showNotification('학습이 완료되었습니다! 배포 단계로 진행할 수 있습니다.', 'success');
    enableNextStep('deployment');
    
    logActivity('학습 완료');
}

function enableNextStep(step) {
    const stepCircle = document.getElementById(`step-${step}`);
    if (stepCircle) {
        stepCircle.classList.remove('pending');
        stepCircle.classList.add('active');
    }
}



function refreshCurrentStep() {
    console.log('🔄 현재 단계 새로고침');
    
    // Refresh current step data
    loadTabContent(currentTab);
    updateProjectStats();
    updateRealTimeData();
    
    showNotification('데이터가 새로고침되었습니다.', 'success');
    logActivity('데이터 새로고침');
}

function saveProgress() {
    console.log('💾 진행상황 저장');
    
    const progressData = {
        currentStep,
        currentTab,
        workflowData,
        timestamp: Date.now()
    };
    
    localStorage.setItem('amp_dashboard_state', JSON.stringify(progressData));
    showNotification('진행상황이 저장되었습니다.', 'success');
    
    logActivity('진행상황 저장');
}

function autoSave() {
    saveProgress();
    console.log('🔄 자동 저장 완료');
}

function loadSavedState() {
    try {
        const saved = localStorage.getItem('amp_dashboard_state');
        if (saved) {
            const state = JSON.parse(saved);
            if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
                currentStep = state.currentStep || 'learning';
                currentTab = state.currentTab || 'overview';
                workflowData = state.workflowData || workflowData;
                
                console.log('📁 이전 상태 복원됨');
            }
        }
        
        // Load sidebar state
        const sidebarState = localStorage.getItem('amp_sidebar_collapsed');
        if (sidebarState === 'true') {
            sidebarCollapsed = true;
            document.getElementById('sidebar').classList.add('collapsed');
        }
    } catch (e) {
        console.error('상태 로드 실패:', e);
    }
}

// Real-time Updates
function updateRealTimeData() {
    // Simulate real-time data updates
    if (workflowData.learning.status === 'in-progress') {
        // Simulate small progress increments
        workflowData.learning.progress = Math.min(workflowData.learning.progress + Math.random() * 2, 100);
        updateProgressIndicator();
    }
}

// Helper Functions
function animateValue(element) {
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function logActivity(activity) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${activity}`);
    
    // Could send to analytics or logging service
}

function focusSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.focus();
    }
}

function showHelp() {
    showNotification('도움말: F1-도움말, F5-새로고침, Ctrl+S-저장, Ctrl+K-검색', 'info');
}







function exportWorkflow() {
    console.log('📤 워크플로우 내보내기');
    
    const workflowExport = {
        workflowData: workflowData,
        currentStep: currentStep,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(workflowExport, null, 2)], { 
        type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMP_workflow_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('워크플로우가 내보내기되었습니다.', 'success');
    logActivity('워크플로우 내보내기');
}

function checkDuplicate() {
    // Simulate duplicate check
    showNotification('중복 확인 중...', 'info');
    
    setTimeout(() => {
        const isUnique = Math.random() > 0.3;
        
        if (isUnique) {
            showNotification('사용 가능한 이름입니다.', 'success');
        } else {
            showNotification('이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.', 'warning');
        }
    }, 1000);
}

// Load initial data
function loadInitialData() {
    setTimeout(() => {
        updateRealTimeData();
    }, 500);
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('시스템 오류:', e.error);
    showNotification('시스템 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
});

// Pagination Variables
let currentPage = 1;
let itemsPerPage = 10;
let totalItems = 0;
let totalPages = 0;
let allTableData = []; // 전체 데이터를 저장할 배열

// Initialize table data on page load
function initializeTableData() {
    const tableBody = document.getElementById('dataTableBody');
    const rows = tableBody?.getElementsByTagName('tr') || [];
    
    allTableData = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        if (cells.length >= 7) {
            allTableData.push({
                checkbox: cells[0].innerHTML,
                name: cells[1].textContent,
                type: cells[2].textContent,
                size: cells[3].textContent,
                status: cells[4].innerHTML,
                accuracy: cells[5].textContent,
                date: cells[6].textContent,
                actions: cells[7].innerHTML,
                element: row
            });
        }
    }
    
    totalItems = allTableData.length;
    calculateTotalPages();
    updatePagination();
    displayCurrentPage();
}

// Calculate total pages based on current items per page
function calculateTotalPages() {
    totalPages = Math.ceil(totalItems / itemsPerPage);
}

// Display current page data
function displayCurrentPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    const tableBody = document.getElementById('dataTableBody');
    if (!tableBody) return;
    
    // Clear current table
    tableBody.innerHTML = '';
    
    // Add rows for current page
    for (let i = startIndex; i < endIndex; i++) {
        if (allTableData[i]) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${allTableData[i].checkbox}</td>
                <td>${allTableData[i].name}</td>
                <td>${allTableData[i].type}</td>
                <td>${allTableData[i].size}</td>
                <td>${allTableData[i].status}</td>
                <td>${allTableData[i].accuracy}</td>
                <td>${allTableData[i].date}</td>
                <td>${allTableData[i].actions}</td>
            `;
            tableBody.appendChild(row);
        }
    }
    
    updateResultsCount();
    updatePageInfo();
    updatePaginationButtons();
}

// Update pagination controls
function updatePagination() {
    const pageNumbers = document.getElementById('pageNumbers');
    if (!pageNumbers) return;
    
    pageNumbers.innerHTML = '';
    
    // Calculate page range to show
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        pageButton.style.cssText = `
            padding: 4px 8px;
            border: 1px solid #d1d5db;
            background: ${i === currentPage ? '#6b7280' : 'white'};
            color: ${i === currentPage ? 'white' : '#374151'};
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            min-width: 28px;
        `;
        pageNumbers.appendChild(pageButton);
    }
}

// Go to specific page
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    displayCurrentPage();
    updatePagination();
}

// Change items per page
function changeItemsPerPage() {
    const select = document.getElementById('itemsPerPage');
    itemsPerPage = parseInt(select.value);
    currentPage = 1; // Reset to first page
    calculateTotalPages();
    displayCurrentPage();
    updatePagination();
    
    showNotification(`페이지당 ${itemsPerPage}개 항목으로 설정되었습니다.`, 'info');
}

// Update results count display
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
        resultsCount.innerHTML = `총 <strong>${totalItems}</strong>개 항목 (${startIndex}-${endIndex}번째 표시)`;
    }
}

// Update page info display
function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
        pageInfo.innerHTML = `페이지 <strong>${currentPage}</strong> / <strong>${totalPages}</strong>`;
    }
}

// Update pagination buttons state
function updatePaginationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.disabled = currentPage <= 1;
        prevButton.style.opacity = currentPage <= 1 ? '0.5' : '1';
        prevButton.style.cursor = currentPage <= 1 ? 'not-allowed' : 'pointer';
    }
    
    if (nextButton) {
        nextButton.disabled = currentPage >= totalPages;
        nextButton.style.opacity = currentPage >= totalPages ? '0.5' : '1';
        nextButton.style.cursor = currentPage >= totalPages ? 'not-allowed' : 'pointer';
    }
}

// Search and Filter Functions
function filterData() {
    const searchName = document.getElementById('searchDataName')?.value.toLowerCase() || '';
    const filterType = document.getElementById('filterDataType')?.value || '';
    const filterStatus = document.getElementById('filterDataStatus')?.value || '';
    const filterDate = document.getElementById('filterDataDate')?.value || '';
    
    const tableBody = document.getElementById('dataTableBody');
    const rows = tableBody?.getElementsByTagName('tr') || [];
    let visibleCount = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        if (cells.length < 7) continue;
        
        const dataName = cells[1].textContent.toLowerCase();
        const dataType = cells[2].textContent.toLowerCase();
        const dataStatus = cells[4].querySelector('.status-badge')?.textContent.toLowerCase() || '';
        const dataDate = cells[6].textContent;
        
        let showRow = true;
        
        // Filter by name
        if (searchName && !dataName.includes(searchName)) {
            showRow = false;
        }
        
        // Filter by type
        if (filterType) {
            const typeMap = {
                'fine-tuning': 'fine tuning',
                'biasing': 'biasing code',
                'base-model': 'base model'
            };
            if (!dataType.includes(typeMap[filterType] || filterType)) {
                showRow = false;
            }
        }
        
        // Filter by status
        if (filterStatus) {
            const statusMap = {
                'completed': '완료',
                'processing': '처리중',
                'pending': '대기중',
                'error': '오류'
            };
            if (!dataStatus.includes(statusMap[filterStatus] || filterStatus)) {
                showRow = false;
            }
        }
        
        // Filter by date
        if (filterDate && dataDate !== filterDate) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
        if (showRow) visibleCount++;
    }
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.innerHTML = `총 <strong>${visibleCount}</strong>개 항목`;
    }
    
    console.log(`🔍 필터 적용: ${visibleCount}개 항목 표시`);
}

function resetFilters() {
    // Reset all filter inputs
    const filterInputs = [
        'searchDataName',
        'filterDataType', 
        'filterDataStatus',
        'filterDataDate'
    ];
    
    filterInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    
    // Show all rows
    const tableBody = document.getElementById('dataTableBody');
    const rows = tableBody?.getElementsByTagName('tr') || [];
    let totalCount = 0;
    
    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = '';
        totalCount++;
    }
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.innerHTML = `총 <strong>${totalCount}</strong>개 항목`;
    }
    
    // Reset selected count
    updateSelectedCount();
    
    showNotification('필터가 초기화되었습니다.', 'info');
    console.log('🔄 필터 초기화 완료');
}

function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.row-select');
    
    checkboxes.forEach(checkbox => {
        // Only toggle visible rows
        const row = checkbox.closest('tr');
        if (row && row.style.display !== 'none') {
            checkbox.checked = selectAll?.checked || false;
        }
    });
    
    updateSelectedCount();
}

function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.row-select:checked');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedCount) {
        selectedCount.innerHTML = `선택된 항목: <strong>${checkboxes.length}</strong>개`;
    }
    
    // Update select all checkbox state
    const selectAll = document.getElementById('selectAll');
    const visibleCheckboxes = Array.from(document.querySelectorAll('.row-select')).filter(cb => {
        const row = cb.closest('tr');
        return row && row.style.display !== 'none';
    });
    
    if (selectAll && visibleCheckboxes.length > 0) {
        const checkedCount = visibleCheckboxes.filter(cb => cb.checked).length;
        selectAll.checked = checkedCount === visibleCheckboxes.length;
        selectAll.indeterminate = checkedCount > 0 && checkedCount < visibleCheckboxes.length;
    }
}

function exportSelectedData() {
    const selectedCheckboxes = document.querySelectorAll('.row-select:checked');
    
    if (selectedCheckboxes.length === 0) {
        showNotification('내보낼 항목을 선택해주세요.', 'warning');
        return;
    }
    
    const selectedData = [];
    selectedCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const cells = row.getElementsByTagName('td');
        
        if (cells.length >= 7) {
            selectedData.push({
                name: cells[1].textContent,
                type: cells[2].textContent,
                size: cells[3].textContent,
                status: cells[4].textContent,
                accuracy: cells[5].textContent,
                date: cells[6].textContent
            });
        }
    });
    
    const exportData = {
        exportDate: new Date().toISOString(),
        totalItems: selectedData.length,
        data: selectedData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMP_selected_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${selectedData.length}개 항목이 내보내기되었습니다.`, 'success');
    logActivity(`선택된 데이터 내보내기: ${selectedData.length}개 항목`);
}

// Enhanced Data Management Functions
function refreshDataTable() {
    console.log('📊 데이터 테이블 새로고침');
    
    // Simulate data refresh
    setTimeout(() => {
        // Reset filters and update counts
        const tableBody = document.getElementById('dataTableBody');
        const rows = tableBody?.getElementsByTagName('tr') || [];
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.innerHTML = `총 <strong>${rows.length}</strong>개 항목`;
        }
        
        // Reset selected count
        updateSelectedCount();
        
        showNotification('데이터 테이블이 새로고침되었습니다.', 'success');
    }, 1000);
}

// Enhanced Tab Loading
function loadTabContent(tab) {
    switch(tab) {
        case 'overview':
            updateOverviewStats();
            break;
        case 'fine-tuning':
            loadFineTuningData();
            initializeFineTuningTable();
            break;
        case 'biasing-code':
            loadBiasingCodeData();
            initializeBiasingCodeTable();
            break;
        case 'config':
            loadConfiguration();
            break;
        case 'monitor':
            updateMonitoringData();
            break;
    }
}

// Fine Tuning Data Functions
function filterFineTuningData() {
    const modelType = document.getElementById('fineTuningModelType')?.value || '';
    const serviceModel = document.getElementById('fineTuningServiceModel')?.value || '';
    const dataset = document.getElementById('fineTuningDataset')?.value.toLowerCase() || '';
    const author = document.getElementById('fineTuningAuthor')?.value.toLowerCase() || '';
    const description = document.getElementById('fineTuningDescription')?.value.toLowerCase() || '';
    const dateFrom = document.getElementById('fineTuningDateFrom')?.value || '';
    const dateTo = document.getElementById('fineTuningDateTo')?.value || '';
    
    const tableBody = document.getElementById('fineTuningTableBody');
    const rows = tableBody?.getElementsByTagName('tr') || [];
    let visibleCount = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        if (cells.length < 8) continue;
        
        const rowModelType = cells[3].textContent;
        const rowServiceModel = cells[4].textContent;
        const rowDataset = cells[5].textContent.toLowerCase();
        const rowAuthor = cells[7].textContent.toLowerCase();
        const rowDate = cells[8].textContent.split(' ')[0]; // Extract date part
        
        let showRow = true;
        
        if (modelType && !rowModelType.includes(modelType)) showRow = false;
        if (serviceModel && !rowServiceModel.includes(serviceModel)) showRow = false;
        if (dataset && !rowDataset.includes(dataset)) showRow = false;
        if (author && !rowAuthor.includes(author)) showRow = false;
        if (dateFrom && rowDate < dateFrom) showRow = false;
        if (dateTo && rowDate > dateTo) showRow = false;
        
        row.style.display = showRow ? '' : 'none';
        if (showRow) visibleCount++;
    }
    
    console.log(`🔍 Fine Tuning 필터 적용: ${visibleCount}개 항목 표시`);
}

function resetFineTuningFilters() {
    const filterInputs = [
        'fineTuningModelType',
        'fineTuningServiceModel',
        'fineTuningDataset',
        'fineTuningAuthor',
        'fineTuningDescription',
        'fineTuningDateFrom',
        'fineTuningDateTo'
    ];
    
    filterInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    filterFineTuningData();
    showNotification('Fine Tuning 필터가 초기화되었습니다.', 'info');
}

function toggleSelectAllFineTuning() {
    const selectAll = document.getElementById('selectAllFineTuning');
    const checkboxes = document.querySelectorAll('.row-select-ft');
    
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        if (row && row.style.display !== 'none') {
            checkbox.checked = selectAll?.checked || false;
        }
    });
    
    updateFineTuningSelectedCount();
}

function updateFineTuningSelectedCount() {
    const checkboxes = document.querySelectorAll('.row-select-ft:checked');
    console.log(`Fine Tuning 선택된 항목: ${checkboxes.length}개`);
}

function initializeFineTuningTable() {
    console.log('📊 Fine Tuning 테이블 초기화');
    setTimeout(() => {
        filterFineTuningData();
        updateFineTuningSelectedCount();
    }, 100);
}

function loadFineTuningData() {
    console.log('📋 Fine Tuning 데이터 로드');
}

// Biasing Code Data Functions
function filterBiasingCodeData() {
    const code = document.getElementById('biasingCodeSearch')?.value.toLowerCase() || '';
    const name = document.getElementById('biasingCodeName')?.value.toLowerCase() || '';
    const author = document.getElementById('biasingCodeAuthor')?.value.toLowerCase() || '';
    const dateFrom = document.getElementById('biasingCodeDateFrom')?.value || '';
    const dateTo = document.getElementById('biasingCodeDateTo')?.value || '';
    
    const tableBody = document.getElementById('biasingCodeTableBody');
    const rows = tableBody?.getElementsByTagName('tr') || [];
    let visibleCount = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        if (cells.length < 8) continue;
        
        const rowCode = cells[2].textContent.toLowerCase();
        const rowName = cells[3].textContent.toLowerCase();
        const rowAuthor = cells[6].textContent.toLowerCase();
        const rowDate = cells[7].textContent.split(' ')[0]; // Extract date part
        
        let showRow = true;
        
        if (code && !rowCode.includes(code)) showRow = false;
        if (name && !rowName.includes(name)) showRow = false;
        if (author && !rowAuthor.includes(author)) showRow = false;
        if (dateFrom && rowDate < dateFrom) showRow = false;
        if (dateTo && rowDate > dateTo) showRow = false;
        
        row.style.display = showRow ? '' : 'none';
        if (showRow) visibleCount++;
    }
    
    // Update results count
    const resultsCount = document.getElementById('biasingCodeResultsCount');
    if (resultsCount) {
        resultsCount.innerHTML = `검색결과: <strong>${visibleCount}</strong>건`;
    }
    
    console.log(`🔍 Biasing Code 필터 적용: ${visibleCount}개 항목 표시`);
}

function searchBiasingCodeData() {
    filterBiasingCodeData();
    showNotification('Biasing Code 검색이 완료되었습니다.', 'success');
}

function toggleSelectAllBiasingCode() {
    const selectAll = document.getElementById('selectAllBiasingCode');
    const checkboxes = document.querySelectorAll('.row-select-bc');
    
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        if (row && row.style.display !== 'none') {
            checkbox.checked = selectAll?.checked || false;
        }
    });
    
    updateBiasingCodeSelectedCount();
}

function updateBiasingCodeSelectedCount() {
    const checkboxes = document.querySelectorAll('.row-select-bc:checked');
    console.log(`Biasing Code 선택된 항목: ${checkboxes.length}개`);
}

function deleteSelectedBiasingCode() {
    const selectedCheckboxes = document.querySelectorAll('.row-select-bc:checked');
    
    if (selectedCheckboxes.length === 0) {
        showNotification('삭제할 항목을 선택해주세요.', 'warning');
        return;
    }
    
    if (confirm(`선택한 ${selectedCheckboxes.length}개 항목을 삭제하시겠습니까?`)) {
        selectedCheckboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            if (row) row.remove();
        });
        
        filterBiasingCodeData(); // Update counts
        showNotification(`${selectedCheckboxes.length}개 항목이 삭제되었습니다.`, 'success');
    }
}

function changeBiasingCodeItemsPerPage() {
    const select = document.getElementById('biasingCodeItemsPerPage');
    const itemsPerPage = select.value;
    showNotification(`페이지당 ${itemsPerPage}개 항목으로 설정되었습니다.`, 'info');
}

function goToBiasingCodePage(direction) {
    console.log(`Biasing Code 페이지 이동: ${direction}`);
    // Implement pagination logic here
}

function initializeBiasingCodeTable() {
    console.log('📊 Biasing Code 테이블 초기화');
    setTimeout(() => {
        filterBiasingCodeData();
        updateBiasingCodeSelectedCount();
    }, 100);
}

function loadBiasingCodeData() {
    console.log('📋 Biasing Code 데이터 로드');
}

// Fine Tuning specific functions
function downloadSelectedFineTuning() {
    const selectedCheckboxes = document.querySelectorAll('.row-select-ft:checked');
    
    if (selectedCheckboxes.length === 0) {
        showNotification('다운로드할 항목을 선택해주세요.', 'warning');
        return;
    }
    
    const selectedData = [];
    selectedCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const cells = row.getElementsByTagName('td');
        
        if (cells.length >= 10) {
            selectedData.push({
                no: cells[1].textContent,
                dataType: cells[2].textContent,
                modelType: cells[3].textContent,
                serviceModel: cells[4].textContent,
                dataset: cells[5].textContent,
                audioCount: cells[6].textContent,
                description: cells[7].textContent,
                author: cells[8].textContent,
                registDate: cells[9].textContent,
                modifyDate: cells[10].textContent
            });
        }
    });
    
    const exportData = {
        exportDate: new Date().toISOString(),
        totalItems: selectedData.length,
        type: 'Fine Tuning Data',
        data: selectedData
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FineTuning_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`${selectedData.length}개 Fine Tuning 데이터가 다운로드되었습니다.`, 'success');
    logActivity(`Fine Tuning 데이터 다운로드: ${selectedData.length}개 항목`);
}

function deleteSelectedFineTuning() {
    const selectedCheckboxes = document.querySelectorAll('.row-select-ft:checked');
    
    if (selectedCheckboxes.length === 0) {
        showNotification('삭제할 항목을 선택해주세요.', 'warning');
        return;
    }
    
    if (confirm(`선택한 ${selectedCheckboxes.length}개 Fine Tuning 데이터를 삭제하시겠습니까?`)) {
        selectedCheckboxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            if (row) row.remove();
        });
        
        filterFineTuningData(); // Update counts
        showNotification(`${selectedCheckboxes.length}개 Fine Tuning 데이터가 삭제되었습니다.`, 'success');
        logActivity(`Fine Tuning 데이터 삭제: ${selectedCheckboxes.length}개 항목`);
    }
}

// 재학습 기능
function retrainModel(modelId) {
    // 현재 상태 확인
    const rows = document.querySelectorAll('#fineTuningTableBody tr');
    let currentStatus = '';
    
    rows.forEach(row => {
        const idCell = row.children[1];
        if (idCell && idCell.textContent === modelId.toString()) {
            const statusCell = row.children[8];
            if (statusCell) {
                const statusText = statusCell.querySelector('span');
                if (statusText) {
                    currentStatus = statusText.textContent;
                }
            }
        }
    });
    
    // READY 상태가 아니면 재학습 불가
    if (currentStatus !== 'READY') {
        showNotification('재학습은 READY 상태일 때만 가능합니다.', 'warning');
        return;
    }
    
    showNotification('재학습을 시작합니다...', 'info');
    
    // 상태를 TRAINING으로 변경
    updateModelStatus(modelId, 'TRAINING', '#22c55e');
    
    // 시뮬레이션: 3초 후 완료 처리
    setTimeout(() => {
        updateModelStatus(modelId, 'COMPLETE', '#6b7280');
        showNotification(`모델 ${modelId} 재학습이 완료되었습니다.`, 'success');
        logActivity(`모델 ${modelId} 재학습 완료`);
    }, 3000);
    
    logActivity(`모델 ${modelId} 재학습 시작`);
}

// 학습 중지 기능
function stopTraining(modelId) {
    if (confirm('정말로 학습을 중지하시겠습니까?')) {
        showNotification('학습을 중지하고 있습니다...', 'warning');
        
        // 상태를 READY로 변경
        updateModelStatus(modelId, 'READY', '#3b82f6');
        
        setTimeout(() => {
            showNotification(`모델 ${modelId} 학습이 중지되었습니다.`, 'info');
            logActivity(`모델 ${modelId} 학습 중지`);
        }, 1000);
    }
}

// 모델 다운로드 기능
function downloadModel(modelId) {
    showNotification('모델을 다운로드 중입니다...', 'info');
    
    // 다운로드 시뮬레이션
    const progressInterval = setInterval(() => {
        // 실제로는 서버에서 파일을 생성하고 다운로드 링크 제공
    }, 100);
    
    // 시뮬레이션: 2초 후 다운로드 완료
    setTimeout(() => {
        clearInterval(progressInterval);
        
        // 실제 파일 다운로드 시뮬레이션
        const modelData = {
            modelId: modelId,
            version: '1.0',
            createdAt: new Date().toISOString(),
            format: 'pytorch',
            size: '256MB',
            accuracy: '94.2%'
        };
        
        const blob = new Blob([JSON.stringify(modelData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `model_${modelId}_v1.0.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(`모델 ${modelId} 다운로드가 완료되었습니다.`, 'success');
        logActivity(`모델 ${modelId} 다운로드 완료`);
    }, 2000);
}

// 모델 배포 기능
function deployModel(modelId) {
    if (confirm('이 모델을 프로덕션 환경에 배포하시겠습니까?')) {
        showNotification('모델을 배포하고 있습니다...', 'info');
        
        // 배포 프로세스 시뮬레이션
        setTimeout(() => {
            showNotification(`모델 ${modelId}이 성공적으로 배포되었습니다.`, 'success');
            logActivity(`모델 ${modelId} 배포 완료`);
            
            // 배포 후 상태 업데이트
            console.log(`🚀 모델 ${modelId} 배포 완료 - 서비스 엔드포인트: /api/stt/v1/model_${modelId}`);
        }, 3000);
    }
}

// 상세정보 보기 기능
function viewDetails(modelId) {
    // 모달 또는 새 페이지로 상세 정보 표시
    const detailsHtml = `
        <div style="padding: 20px;">
            <h3>모델 ${modelId} 상세 정보</h3>
            <div style="margin: 20px 0;">
                <p><strong>모델 ID:</strong> ${modelId}</p>
                <p><strong>서비스 타입:</strong> 콜봇</p>
                <p><strong>정확도:</strong> 94.2%</p>
                <p><strong>학습 데이터 크기:</strong> 10,000 샘플</p>
                <p><strong>마지막 업데이트:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" onclick="closeModal()">닫기</button>
                <button class="btn btn-secondary" onclick="downloadModel(${modelId})">다운로드</button>
                <button class="btn btn-primary" onclick="deployModel(${modelId})">배포</button>
            </div>
        </div>
    `;
    
    // 간단한 모달 구현
    showModal('모델 상세 정보', detailsHtml);
    logActivity(`모델 ${modelId} 상세 정보 조회`);
}

// 모델 상태 업데이트 헬퍼 함수
function updateModelStatus(modelId, status, color) {
    const rows = document.querySelectorAll('#fineTuningTableBody tr');
    rows.forEach(row => {
        const idCell = row.children[1];
        if (idCell && idCell.textContent === modelId.toString()) {
            const statusCell = row.children[8]; // 상태 컬럼
            if (statusCell) {
                const indicator = statusCell.querySelector('.status-indicator');
                const statusText = statusCell.querySelector('span');
                
                if (indicator) indicator.style.background = color;
                if (statusText) statusText.textContent = status;
                
                // 재학습 버튼 상태 업데이트 (READY 상태일 때만 활성화)
                const retrainBtn = row.children[10].querySelector('button'); // 재학습 버튼
                if (retrainBtn) {
                    if (status === 'READY') {
                        retrainBtn.disabled = false;
                        retrainBtn.style.opacity = '1';
                    } else {
                        retrainBtn.disabled = true;
                        retrainBtn.style.opacity = '0.5';
                    }
                }
                
                // 중지 버튼 상태 업데이트 (TRAINING 상태일 때만 활성화)
                const stopBtn = row.children[11].querySelector('button'); // 중지 버튼
                if (stopBtn) {
                    if (status === 'TRAINING') {
                        stopBtn.disabled = false;
                        stopBtn.style.opacity = '1';
                    } else {
                        stopBtn.disabled = true;
                        stopBtn.style.opacity = '0.5';
                    }
                }
                
                // 다운로드 버튼 상태
                const downloadBtn = row.children[12].querySelector('button');
                if (downloadBtn) {
                    if (status === 'COMPLETE') {
                        downloadBtn.className = 'btn btn-success';
                    } else {
                        downloadBtn.className = 'btn btn-secondary';
                    }
                }
            }
        }
    });
}

// 간단한 모달 구현
function showModal(title, content) {
    // 기존 모달이 있으면 제거
    const existingModal = document.getElementById('detailModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'detailModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <div style="
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="margin: 0; color: #1f2937;">${title}</h3>
                <button onclick="closeModal()" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #6b7280;
                ">×</button>
            </div>
            <div>${content}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('detailModal');
    if (modal) {
        modal.remove();
    }
}

// 모델 상태 조회 (새로고침) 기능
function refreshModelStatus(modelId) {
    showNotification('상태를 조회하고 있습니다...', 'info');
    
    // 새로고침 아이콘 애니메이션
    const refreshBtn = document.querySelector(`button[onclick="refreshModelStatus(${modelId})"] i`);
    if (refreshBtn) {
        refreshBtn.style.animation = 'spin 1s linear infinite';
    }
    
    // 실제로는 서버에서 최신 상태를 가져오는 API 호출
    setTimeout(() => {
        // 시뮬레이션: 랜덤하게 상태 변경
        const statuses = [
            { name: 'READY', color: '#3b82f6' },
            { name: 'TRAINING', color: '#22c55e' },
            { name: 'COMPLETE', color: '#6b7280' }
        ];
        
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        updateModelStatus(modelId, randomStatus.name, randomStatus.color);
        
        // 애니메이션 중지
        if (refreshBtn) {
            refreshBtn.style.animation = '';
        }
        
        showNotification(`모델 ${modelId} 상태가 업데이트되었습니다: ${randomStatus.name}`, 'success');
        logActivity(`모델 ${modelId} 상태 조회: ${randomStatus.name}`);
    }, 1500);
}

// CSS 애니메이션 추가 (스핀 효과)
if (!document.getElementById('refresh-animation-style')) {
    const style = document.createElement('style');
    style.id = 'refresh-animation-style';
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// 왼쪽 메뉴에서 워크플로우 탭으로 네비게이션
function navigateToTab(tabName) {
    try {
        console.log('navigateToTab 호출됨:', tabName);
        
        // 사이드바 메뉴 활성화 상태 업데이트
        updateSidebarActiveState(tabName);
        
        // 해당 탭으로 이동
        switchTab(tabName);
        
        // 알림 표시
        const tabNames = {
            'fine-tuning': '학습 관리',
            'deployment': '배포 관리', 
            'validation': '검증 관리',
            'testing': '테스트 관리'
        };
        
        if (tabNames[tabName]) {
            console.log(`${tabNames[tabName]} 탭으로 이동 완료`);
            // showNotification과 logActivity가 없어도 기본 기능은 작동해야 함
            if (typeof showNotification === 'function') {
                showNotification(`${tabNames[tabName]} 탭으로 이동했습니다.`, 'info');
            }
            if (typeof logActivity === 'function') {
                logActivity(`${tabNames[tabName]} 메뉴 선택`);
            }
        }
    } catch (error) {
        console.error('navigateToTab 에러:', error);
        alert('메뉴 이동 중 오류가 발생했습니다: ' + error.message);
    }
}

// 사이드바 메뉴 활성화 상태 업데이트 (워크플로우 단계용)
function updateSidebarForStep(step) {
    // 모든 nav-item에서 active 클래스 제거
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 클릭된 단계에 해당하는 메뉴에 active 클래스 추가
    const stepMenuMapping = {
        'learning': '학습 관리',
        'deployment': '배포 관리',
        'validation': '검증 관리', 
        'testing': '테스트 관리'
    };
    
    if (stepMenuMapping[step]) {
        // 텍스트로 찾기
        document.querySelectorAll('.nav-item .nav-text').forEach(text => {
            if (text.textContent.trim() === stepMenuMapping[step]) {
                text.closest('.nav-item').classList.add('active');
            }
        });
    }
}

// 단계별 동적 탭 구성
function updateTabsForStep(step) {
    const tabNavigation = document.getElementById('tabNavigation');
    if (!tabNavigation) return;

    // 단계별 탭 구성 정의
    const stepTabConfigs = {
        'learning': [
            { id: 'monitor', label: '모니터링', active: true },
            { id: 'fine-tuning', label: 'Fine Tuning 데이터', active: false },
            { id: 'biasing-code', label: 'Biasing Code 데이터', active: false }
        ],
        'deployment': [
            { id: 'monitor', label: '모니터링', active: true },
            { id: 'deployment-model', label: '배포 모델', active: false },
            { id: 'deployment-request', label: '배포 현황', active: false }
        ],
        'validation': [
            { id: 'monitor', label: '모니터링', active: true },
            { id: 'performance-validation', label: '성능 검증', active: false }
        ],
        'testing': [
            { id: 'monitor', label: '모니터링', active: true },
            { id: 'test-execution', label: '테스트 실행', active: false },
            { id: 'test-results', label: '결과 분석', active: false }
        ]
    };

    const tabs = stepTabConfigs[step] || stepTabConfigs['learning'];
    
    // 탭 네비게이션 HTML 생성
    tabNavigation.innerHTML = tabs.map(tab => `
        <button class="tab-btn ${tab.active ? 'active' : ''}" 
                data-tab="${tab.id}" 
                onclick="switchTab('${tab.id}')">
            ${tab.label}
        </button>
    `).join('');

    // 활성 탭 표시
    const activeTab = tabs.find(tab => tab.active);
    if (activeTab) {
        switchTab(activeTab.id);
    }
}

// 사이드바 메뉴 활성화 상태 업데이트 (탭용 - 필요시 사용)
function updateSidebarActiveState(activeTab) {
    // 모든 nav-item에서 active 클래스 제거
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 클릭된 메뉴에 active 클래스 추가
    const menuMapping = {
        'fine-tuning': '학습 관리',
        'deployment': '배포 관리',
        'validation': '검증 관리', 
        'testing': '테스트 관리'
    };
    
    if (menuMapping[activeTab]) {
        // 텍스트로 찾기
        document.querySelectorAll('.nav-item .nav-text').forEach(text => {
            if (text.textContent.trim() === menuMapping[activeTab]) {
                text.closest('.nav-item').classList.add('active');
            }
        });
    }
}

// 테스트 함수 - 브라우저 콘솔에서 사용 가능
function testNavigation() {
    console.log('=== 네비게이션 테스트 ===');
    console.log('navigateToTab 함수 존재:', typeof navigateToTab);
    console.log('switchTab 함수 존재:', typeof switchTab);
    
    // 메뉴 요소들 확인
    const navItems = document.querySelectorAll('.nav-item');
    console.log('네비게이션 아이템 개수:', navItems.length);
    
    navItems.forEach((item, index) => {
        const text = item.querySelector('.nav-text')?.textContent;
        const onclick = item.getAttribute('onclick');
        console.log(`메뉴 ${index}: ${text}, onclick: ${onclick}`);
    });
    
    // 탭 패널들 확인
    const tabPanels = document.querySelectorAll('.tab-panel');
    console.log('탭 패널 개수:', tabPanels.length);
    
    tabPanels.forEach(panel => {
        console.log('탭 패널 ID:', panel.id);
    });
}

// Initialize search functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 테스트 함수를 전역으로 노출
    window.testNavigation = testNavigation;
    window.navigateToTab = navigateToTab;
    
    // Setup search input debouncing
    const searchInput = document.getElementById('searchDataName');
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterData, 300);
        });
    }
    
    // Initialize pagination and table data
    setTimeout(() => {
        initializeTableData();
        updateSelectedCount();
    }, 500);
    
    // Initialize when switching to data tab
    const dataTabButton = document.querySelector('[onclick="switchTab(\'data\')"]');
    if (dataTabButton) {
        dataTabButton.addEventListener('click', function() {
            setTimeout(() => {
                initializeTableData();
            }, 100);
        });
    }
});

// ===== DEPLOYMENT MANAGEMENT FUNCTIONS =====

// 배포 모델 데이터 샘플 (기존 시스템 구조)
let deployModelData = [
    {
        id: 1,
        no: 1,
        service: '콜봇',
        model: '한국어 STT v3.0',
        modelType: '키워드 부스팅',
        biasingCode: '100',
        modelId: 'kolbot-2025-08-04-12:40:25.826',
        description: '모델학습목록',
        trainingDataSize: '2 건',
        author: 'dev*****',
        regDate: '2025-08-07 18:07:09'
    },
    {
        id: 2,
        no: 2,
        service: '챗봇',
        model: '영어 STT v2.5',
        modelType: '일반학습',
        biasingCode: '150',
        modelId: 'chatbot-2025-08-05-14:22:15.432',
        description: '영어 음성인식 모델',
        trainingDataSize: '5.2 만건',
        author: 'john****',
        regDate: '2025-08-08 10:15:23'
    },
    {
        id: 3,
        no: 3,
        service: '음성인식',
        model: '의료용 STT v1.2',
        modelType: '전문분야',
        biasingCode: '200',
        modelId: 'medical-2025-08-06-16:45:30.123',
        description: '의료분야 특화 음성인식',
        trainingDataSize: '1.8 만건',
        author: 'lee****',
        regDate: '2025-08-09 14:45:12'
    },
    {
        id: 4,
        no: 4,
        service: '콜봇',
        model: '금융용 STT v2.1',
        modelType: '키워드 부스팅',
        biasingCode: '75',
        modelId: 'finance-2025-08-07-11:20:45.567',
        description: '금융권 특화 음성인식',
        trainingDataSize: '3.1 만건',
        author: 'fin****',
        regDate: '2025-08-10 11:20:15'
    },
    {
        id: 5,
        no: 5,
        service: '챗봇',
        model: '법률상담 STT v1.8',
        modelType: '전문분야',
        biasingCode: '300',
        modelId: 'legal-2025-08-08-13:45:22.890',
        description: '법률 전문 용어 인식',
        trainingDataSize: '2.5 만건',
        author: 'law****',
        regDate: '2025-08-11 13:45:33'
    },
    {
        id: 6,
        no: 6,
        service: '음성인식',
        model: '교육용 STT v2.3',
        modelType: '일반학습',
        biasingCode: '120',
        modelId: 'education-2025-08-09-09:20:11.234',
        description: '교육 콘텐츠 음성인식',
        trainingDataSize: '4.2 만건',
        author: 'edu****',
        regDate: '2025-08-12 09:20:45'
    },
    {
        id: 7,
        no: 7,
        service: '콜봇',
        model: '부동산 STT v1.5',
        modelType: '키워드 부스팅',
        biasingCode: '180',
        modelId: 'realestate-2025-08-10-16:30:45.678',
        description: '부동산 업무 특화',
        trainingDataSize: '1.9 만건',
        author: 'real****',
        regDate: '2025-08-13 16:30:22'
    },
    {
        id: 8,
        no: 8,
        service: '챗봇',
        model: '음식배달 STT v3.1',
        modelType: '일반학습',
        biasingCode: '90',
        modelId: 'food-2025-08-11-11:15:33.901',
        description: '음식주문 배달 서비스',
        trainingDataSize: '6.8 만건',
        author: 'food****',
        regDate: '2025-08-14 11:15:11'
    },
    {
        id: 9,
        no: 9,
        service: '음성인식',
        model: 'IT기술 STT v2.8',
        modelType: '전문분야',
        biasingCode: '250',
        modelId: 'it-2025-08-12-08:50:44.567',
        description: 'IT 기술 용어 인식',
        trainingDataSize: '3.7 만건',
        author: 'it****',
        regDate: '2025-08-15 08:50:33'
    },
    {
        id: 10,
        no: 10,
        service: '콜봇',
        model: '여행업 STT v1.2',
        modelType: '키워드 부스팅',
        biasingCode: '160',
        modelId: 'travel-2025-08-13-14:25:55.789',
        description: '여행 서비스 특화',
        trainingDataSize: '2.3 만건',
        author: 'travel****',
        regDate: '2025-08-16 14:25:44'
    }
];

// 배포 요청 데이터 샘플
let deploymentData = [
    {
        id: 1,
        requestNo: 'DR-2025-001',
        modelName: '한국어 STT v3.0',
        version: 'v3.0.1',
        environment: '운영환경',
        port: 8080,
        status: '배포완료',
        requestDate: '2025-01-15 14:30',
        requester: '김개발'
    },
    {
        id: 2,
        requestNo: 'DR-2025-002', 
        modelName: '영어 STT v2.5',
        version: 'v2.5.3',
        environment: '스테이징환경',
        port: 8081,
        status: '배포중',
        requestDate: '2025-01-16 09:15',
        requester: '박배포'
    },
    {
        id: 3,
        requestNo: 'DR-2025-003',
        modelName: '의료용 STT v1.2', 
        version: 'v1.2.0',
        environment: '개발환경',
        port: 8082,
        status: '요청대기',
        requestDate: '2025-01-14 16:45',
        requester: '이운영'
    },
    {
        id: 4,
        requestNo: 'DR-2025-004',
        modelName: '금융용 STT v2.1',
        version: 'v2.1.4', 
        environment: '운영환경',
        port: 8083,
        status: '배포실패',
        requestDate: '2025-01-17 11:20',
        requester: '최테스트'
    },
    {
        id: 5,
        requestNo: 'DR-2025-005',
        modelName: '법률상담 STT v1.8',
        version: 'v1.8.1',
        environment: '스테이징환경',
        port: 8084,
        status: '배포중',
        requestDate: '2025-01-18 13:45',
        requester: '박법률'
    },
    {
        id: 6,
        requestNo: 'DR-2025-006',
        modelName: '교육용 STT v2.3',
        version: 'v2.3.2',
        environment: '개발환경',
        port: 8085,
        status: '요청대기',
        requestDate: '2025-01-19 09:20',
        requester: '김교육'
    },
    {
        id: 7,
        requestNo: 'DR-2025-007',
        modelName: '부동산 STT v1.5',
        version: 'v1.5.3',
        environment: '운영환경',
        port: 8086,
        status: '배포완료',
        requestDate: '2025-01-20 16:30',
        requester: '이부동산'
    },
    {
        id: 8,
        requestNo: 'DR-2025-008',
        modelName: '음식배달 STT v3.1',
        version: 'v3.1.0',
        environment: '스테이징환경',
        port: 8087,
        status: '배포중',
        requestDate: '2025-01-21 11:15',
        requester: '최배달'
    },
    {
        id: 9,
        requestNo: 'DR-2025-009',
        modelName: 'IT기술 STT v2.8',
        version: 'v2.8.4',
        environment: '개발환경',
        port: 8088,
        status: '요청대기',
        requestDate: '2025-01-22 08:50',
        requester: '박IT'
    },
    {
        id: 10,
        requestNo: 'DR-2025-010',
        modelName: '여행업 STT v1.2',
        version: 'v1.2.1',
        environment: '운영환경',
        port: 8089,
        status: '배포완료',
        requestDate: '2025-01-23 14:25',
        requester: '김여행'
    }
];

function filterDeploymentData() {
    const modelType = document.getElementById('deploymentModelType')?.value || '';
    const serviceModel = document.getElementById('deploymentServiceModel')?.value || '';
    const modelName = document.getElementById('deploymentModelName')?.value || '';
    const status = document.getElementById('deploymentStatus')?.value || '';
    const user = document.getElementById('deploymentUser')?.value || '';

    const filteredData = deploymentData.filter(item => {
        return (!modelType || item.modelType.includes(modelType)) &&
               (!serviceModel || item.serviceModel.includes(serviceModel)) &&
               (!modelName || item.modelName.toLowerCase().includes(modelName.toLowerCase())) &&
               (!status || item.status.includes(status)) &&
               (!user || item.deployer.toLowerCase().includes(user.toLowerCase()));
    });

    displayDeploymentData(filteredData);
    updateDeploymentCounts(filteredData.length);
}

function displayDeploymentData(data = deploymentData) {
    const tbody = document.getElementById('deploymentTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map((item, index) => {
        const statusColor = getStatusColor(item.status);
        return `
            <tr>
                <td><input type="checkbox" class="row-select-deployment" value="${item.id}"></td>
                <td>${index + 1}</td>
                <td>${item.requestNo}</td>
                <td>${item.modelName}</td>
                <td>${item.version}</td>
                <td>${item.environment}</td>
                <td>${item.port}</td>
                <td><span class="status-badge" style="background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${item.status}</span></td>
                <td>${item.requestDate}</td>
                <td>${item.requester}</td>
                <td>
                    <button onclick="refreshDeploymentStatus(${item.id})" style="
                        background: #22c55e;
                        border: none;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                    ">🔄</button>
                </td>
                <td>
                    <button class="btn btn-primary" style="padding: 4px 8px; font-size: 12px;" onclick="manageDeployment(${item.id})">관리</button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="viewDeploymentLogs(${item.id})">로그</button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateDeploymentCounts(filteredCount) {
    const totalCountEl = document.getElementById('deploymentTotalCount');
    const filteredCountEl = document.getElementById('deploymentFilteredCount');
    
    if (totalCountEl) totalCountEl.textContent = deploymentData.length;
    if (filteredCountEl) filteredCountEl.textContent = filteredCount;
}

function resetDeploymentFilters() {
    document.getElementById('deploymentModelType').value = '';
    document.getElementById('deploymentServiceModel').value = '';
    document.getElementById('deploymentModelName').value = '';
    document.getElementById('deploymentStatus').value = '';
    document.getElementById('deploymentUser').value = '';
    filterDeploymentData();
}

function toggleSelectAllDeployment() {
    const selectAll = document.getElementById('selectAllDeployment');
    const checkboxes = document.querySelectorAll('.row-select-deployment');
    
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

function deploySelectedModels() {
    const selected = document.querySelectorAll('.row-select-deployment:checked');
    if (selected.length === 0) {
        showNotification('배포할 모델을 선택해주세요.', 'warning');
        return;
    }
    showNotification(`${selected.length}개 모델 배포를 시작합니다.`, 'success');
}

function stopSelectedDeployments() {
    const selected = document.querySelectorAll('.row-select-deployment:checked');
    if (selected.length === 0) {
        showNotification('중지할 배포를 선택해주세요.', 'warning');
        return;
    }
    showNotification(`${selected.length}개 배포를 중지합니다.`, 'warning');
}

function downloadDeploymentData() {
    showNotification('배포 데이터를 다운로드합니다.', 'info');
}

function manageDeployment(id) {
    showNotification(`배포 ${id} 관리 페이지를 엽니다.`, 'info');
}

function viewDeploymentLogs(id) {
    showNotification(`배포 ${id}의 로그를 확인합니다.`, 'info');
}

// 배포 상태 새로고침
function refreshDeploymentStatus(id) {
    console.log('배포 상태 새로고침:', id);
    showNotification('배포 상태를 새로고침했습니다.', 'success');
    
    // 실제로는 서버에서 상태를 가져와야 합니다
    // 여기서는 시뮬레이션으로 랜덤하게 상태 업데이트
    const statuses = ['배포완료', '배포중', '요청대기', '배포실패'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const itemIndex = deploymentData.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        deploymentData[itemIndex].status = randomStatus;
        displayDeploymentData();
    }
}

// 모델 배포 함수
function deployModel() {
    const modelSelect = document.getElementById('deployModelSelect').value;
    const environment = document.getElementById('deployEnvironment').value;
    const port = document.getElementById('deployPort').value;
    const instances = document.getElementById('deployInstances').value;
    
    if (!modelSelect) {
        showNotification('배포할 모델을 선택해주세요.', 'warning');
        return;
    }
    
    console.log('모델 배포 요청:', {
        model: modelSelect,
        environment: environment,
        port: port,
        instances: instances
    });
    
    showNotification('모델 배포 요청이 성공적으로 전송되었습니다.', 'success');
    
    // 새로운 배포 요청을 deploymentData에 추가
    const newRequest = {
        id: deploymentData.length + 1,
        requestNo: `DR-2025-${String(deploymentData.length + 1).padStart(3, '0')}`,
        modelName: modelSelect,
        version: 'v1.0.0',
        environment: environment,
        port: parseInt(port),
        status: '요청대기',
        requestDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        requester: '현재사용자'
    };
    
    deploymentData.push(newRequest);
    
    // 배포 현황 탭으로 이동하여 결과 확인
    setTimeout(() => {
        switchTab('deployment-request');
        displayDeploymentData();
        updateDeploymentCounts(deploymentData.length);
    }, 1000);
}

// 배포 모델 필터링
function filterDeployModelData() {
    const modelType = document.getElementById('deployModelModelType')?.value || '';
    const serviceModel = document.getElementById('deployModelServiceModel')?.value || '';
    const modelName = document.getElementById('deployModelModelName')?.value || '';
    const description = document.getElementById('deployModelDescription')?.value || '';
    const user = document.getElementById('deployModelUser')?.value || '';

    const filteredData = deployModelData.filter(item => {
        return (!modelType || item.modelType.includes(modelType)) &&
               (!serviceModel || item.service.includes(serviceModel)) &&
               (!modelName || item.model.toLowerCase().includes(modelName.toLowerCase())) &&
               (!description || item.description.toLowerCase().includes(description.toLowerCase())) &&
               (!user || item.author.toLowerCase().includes(user.toLowerCase()));
    });

    displayDeployModelData(filteredData);
    updateDeployModelCounts(filteredData.length);
}

function displayDeployModelData(data = deployModelData) {
    const tbody = document.getElementById('deployModelTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map((item, index) => {
        return `
            <tr>
                <td><input type="checkbox" class="row-select-deploy-model" value="${item.id}"></td>
                <td>${item.no}</td>
                <td>${item.service}</td>
                <td>${item.model}</td>
                <td>${item.modelType}</td>
                <td>${item.biasingCode}</td>
                <td>${item.modelId}</td>
                <td>${item.description}</td>
                <td>${item.trainingDataSize}</td>
                <td>${item.author}</td>
                <td>${item.regDate}</td>
            </tr>
        `;
    }).join('');
}

function updateDeployModelCounts(filteredCount) {
    const totalCountEl = document.getElementById('deployModelTotalCount');
    const filteredCountEl = document.getElementById('deployModelFilteredCount');
    
    if (totalCountEl) totalCountEl.textContent = deployModelData.length;
    if (filteredCountEl) filteredCountEl.textContent = filteredCount;
}

function resetDeployModelFilters() {
    document.getElementById('deployModelModelType').value = '';
    document.getElementById('deployModelServiceModel').value = '';
    document.getElementById('deployModelModelName').value = '';
    document.getElementById('deployModelDescription').value = '';
    document.getElementById('deployModelUser').value = '';
    filterDeployModelData();
}

function toggleSelectAllDeployModel() {
    const selectAll = document.getElementById('selectAllDeployModel');
    const checkboxes = document.querySelectorAll('.row-select-deploy-model');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

function refreshDeployModelStatus(id) {
    console.log('배포 모델 상태 새로고침:', id);
    showNotification('배포 모델 상태를 새로고침했습니다.', 'success');
    
    const statuses = ['운영중', '배포중', '중지', '오류'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const itemIndex = deployModelData.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        deployModelData[itemIndex].status = randomStatus;
        displayDeployModelData();
    }
}

function manageDeployModel(id) {
    showNotification(`배포 모델 ${id} 관리 페이지를 엽니다.`, 'info');
}

function viewDeployModelLogs(id) {
    showNotification(`배포 모델 ${id}의 로그를 확인합니다.`, 'info');
}

function deleteSelectedDeployModels() {
    const selectedIds = Array.from(document.querySelectorAll('.row-select-deploy-model:checked')).map(cb => cb.value);
    
    if (selectedIds.length === 0) {
        showNotification('삭제할 모델을 선택해주세요.', 'warning');
        return;
    }
    
    if (confirm(`선택된 ${selectedIds.length}개의 모델을 삭제하시겠습니까?`)) {
        // 선택된 모델들을 배열에서 제거
        selectedIds.forEach(id => {
            const index = deployModelData.findIndex(item => item.id == id);
            if (index !== -1) {
                deployModelData.splice(index, 1);
            }
        });
        
        // 테이블 다시 렌더링
        displayDeployModelData();
        updateDeployModelCounts(deployModelData.length);
        
        // 체크박스 상태 초기화
        document.getElementById('selectAllDeployModel').checked = false;
        
        showNotification(`${selectedIds.length}개의 모델이 삭제되었습니다.`, 'success');
    }
}

// ===== VALIDATION MANAGEMENT FUNCTIONS =====

// 검증 데이터 샘플
let validationData = [
    {
        id: 1,
        validationType: '성능검증',
        serviceModel: '콜봇',
        modelName: '콜봇 STT v2.1',
        modelVersion: 'v2.1.3',
        accuracy: '94.2%',
        status: '완료',
        validationDate: '2025-01-15 13:45',
        validator: '김검증'
    },
    {
        id: 2,
        validationType: '품질검증',
        serviceModel: '챗봇',
        modelName: '챗봇 STT v1.8',
        modelVersion: 'v1.8.2',
        accuracy: '91.7%',
        status: '검증중',
        validationDate: '2025-01-16 10:20',
        validator: '이품질'
    },
    {
        id: 3,
        validationType: '안정성검증',
        serviceModel: '음성인식',
        modelName: '특화 STT v3.0',
        modelVersion: 'v3.0.1',
        accuracy: '96.8%',
        status: '대기',
        validationDate: '2025-01-14 15:30',
        validator: '박안정'
    },
    {
        id: 4,
        validationType: '성능검증',
        serviceModel: '콜봇',
        modelName: '금융업무 STT v2.1',
        modelVersion: 'v2.1.4',
        accuracy: '93.5%',
        status: '완료',
        validationDate: '2025-01-17 14:20',
        validator: '최성능'
    },
    {
        id: 5,
        validationType: '품질검증',
        serviceModel: '챗봇',
        modelName: '법률상담 STT v1.8',
        modelVersion: 'v1.8.1',
        accuracy: '89.3%',
        status: '실패',
        validationDate: '2025-01-18 16:45',
        validator: '김품질'
    },
    {
        id: 6,
        validationType: '성능검증',
        serviceModel: '음성인식',
        modelName: '교육용 STT v2.3',
        modelVersion: 'v2.3.2',
        accuracy: '95.7%',
        status: '검증중',
        validationDate: '2025-01-19 11:10',
        validator: '이교육'
    },
    {
        id: 7,
        validationType: '안정성검증',
        serviceModel: '콜봇',
        modelName: '부동산 STT v1.5',
        modelVersion: 'v1.5.3',
        accuracy: '92.1%',
        status: '완료',
        validationDate: '2025-01-20 13:30',
        validator: '박부동산'
    },
    {
        id: 8,
        validationType: '성능검증',
        serviceModel: '챗봇',
        modelName: '음식배달 STT v3.1',
        modelVersion: 'v3.1.0',
        accuracy: '94.8%',
        status: '검증중',
        validationDate: '2025-01-21 09:55',
        validator: '최배달'
    },
    {
        id: 9,
        validationType: '품질검증',
        serviceModel: '음성인식',
        modelName: 'IT기술 STT v2.8',
        modelVersion: 'v2.8.4',
        accuracy: '97.2%',
        status: '대기',
        validationDate: '2025-01-22 15:20',
        validator: '김IT'
    },
    {
        id: 10,
        validationType: '성능검증',
        serviceModel: '콜봇',
        modelName: '여행업 STT v1.2',
        modelVersion: 'v1.2.1',
        accuracy: '91.9%',
        status: '완료',
        validationDate: '2025-01-23 12:40',
        validator: '이여행'
    }
];

function filterValidationData() {
    const validationType = document.getElementById('validationType')?.value || '';
    const serviceModel = document.getElementById('validationServiceModel')?.value || '';
    const modelName = document.getElementById('validationModelName')?.value || '';
    const status = document.getElementById('validationStatus')?.value || '';
    const user = document.getElementById('validationUser')?.value || '';

    const filteredData = validationData.filter(item => {
        return (!validationType || item.validationType.includes(validationType)) &&
               (!serviceModel || item.serviceModel.includes(serviceModel)) &&
               (!modelName || item.modelName.toLowerCase().includes(modelName.toLowerCase())) &&
               (!status || item.status.includes(status)) &&
               (!user || item.validator.toLowerCase().includes(user.toLowerCase()));
    });

    displayValidationData(filteredData);
    updateValidationCounts(filteredData.length);
}

function displayValidationData(data = validationData) {
    const tbody = document.getElementById('validationTableBody');
    if (!tbody) return;

    tbody.innerHTML = data.map((item, index) => {
        const statusColor = getStatusColor(item.status);
        return `
            <tr>
                <td><input type="checkbox" class="row-select-validation" value="${item.id}"></td>
                <td>${index + 1}</td>
                <td>${item.validationType}</td>
                <td>${item.serviceModel}</td>
                <td>${item.modelName}</td>
                <td>${item.modelVersion}</td>
                <td>${item.accuracy}</td>
                <td><span class="status-badge" style="background: ${statusColor}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${item.status}</span></td>
                <td>${item.validationDate}</td>
                <td>${item.validator}</td>
                <td>
                    <button class="btn btn-primary" style="padding: 4px 8px; font-size: 12px;" onclick="startValidation(${item.id})">검증</button>
                    <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="viewValidationReport(${item.id})">리포트</button>
                </td>
            </tr>
        `;
    }).join('');
}

function updateValidationCounts(filteredCount) {
    const totalCountEl = document.getElementById('validationTotalCount');
    const filteredCountEl = document.getElementById('validationFilteredCount');
    
    if (totalCountEl) totalCountEl.textContent = validationData.length;
    if (filteredCountEl) filteredCountEl.textContent = filteredCount;
}

function resetValidationFilters() {
    document.getElementById('validationType').value = '';
    document.getElementById('validationServiceModel').value = '';
    document.getElementById('validationModelName').value = '';
    document.getElementById('validationStatus').value = '';
    document.getElementById('validationUser').value = '';
    filterValidationData();
}

function toggleSelectAllValidation() {
    const selectAll = document.getElementById('selectAllValidation');
    const checkboxes = document.querySelectorAll('.row-select-validation');
    
    checkboxes.forEach(cb => cb.checked = selectAll.checked);
}

function startSelectedValidations() {
    const selected = document.querySelectorAll('.row-select-validation:checked');
    if (selected.length === 0) {
        showNotification('검증할 모델을 선택해주세요.', 'warning');
        return;
    }
    showNotification(`${selected.length}개 모델 검증을 시작합니다.`, 'success');
}

function stopSelectedValidations() {
    const selected = document.querySelectorAll('.row-select-validation:checked');
    if (selected.length === 0) {
        showNotification('중지할 검증을 선택해주세요.', 'warning');
        return;
    }
    showNotification(`${selected.length}개 검증을 중지합니다.`, 'warning');
}

function downloadValidationData() {
    showNotification('검증 데이터를 다운로드합니다.', 'info');
}

function startValidation(id) {
    showNotification(`검증 ${id}을 시작합니다.`, 'info');
}

function viewValidationReport(id) {
    showNotification(`검증 ${id}의 리포트를 확인합니다.`, 'info');
}

// 상태에 따른 색상 반환
function getStatusColor(status) {
    switch(status) {
        case '운영중':
        case '완료':
            return '#22c55e';
        case '배포중':
        case '검증중':
            return '#3b82f6';
        case '중지':
        case '실패':
            return '#ef4444';
        case '대기':
            return '#f59e0b';
        case '오류':
            return '#dc2626';
        default:
            return '#6b7280';
    }
}

// loadTabContent 함수 업데이트
function loadTabContent(tab) {
    switch(tab) {
        case 'overview':
            updateOverviewStats();
            break;
        case 'fine-tuning':
            initializeFineTuningData();
            break;
        case 'biasing-code':
            initializeBiasingCodeData();
            break;
        case 'deployment-model':
            displayDeployModelData();
            updateDeployModelCounts(deployModelData.length);
            break;
        case 'deployment-request':
            displayDeploymentData();
            updateDeploymentCounts(deploymentData.length);
            break;
        case 'validation':
            displayValidationData();
            updateValidationCounts(validationData.length);
            break;
        case 'monitor':
            updateMonitoringData();
            break;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchStep,
        switchTab,
        executeCurrentStep,
        toggleSidebar,
        showNotification,
        filterData,
        resetFilters,
        toggleSelectAll,
        updateSelectedCount,
        exportSelectedData,
        initializeTableData,
        goToPage,
        changeItemsPerPage,
        displayCurrentPage,
        updatePagination,
        filterDeploymentData,
        filterValidationData
    };
}

// ===== GLOBAL SEARCH FUNCTIONALITY =====

// 검색 데이터 샘플
const searchData = {
    projects: [
        { id: 1, name: 'STT 음성인식 프로젝트', description: '콜센터 음성인식 시스템', type: '프로젝트', category: 'STT', status: '진행중' },
        { id: 2, name: '금융 챗봇 프로젝트', description: '고객 상담 자동화', type: '프로젝트', category: '챗봇', status: '완료' },
        { id: 3, name: 'TTS 음성합성 프로젝트', description: '다국어 음성합성', type: '프로젝트', category: 'TTS', status: '개발중' }
    ],
    models: [
        { id: 1, name: 'STT_음성인식_v2.1', description: '한국어 음성인식 모델', type: '모델', category: 'STT', status: 'READY' },
        { id: 2, name: '금융_챗봇_v1.8', description: '금융 도메인 특화 챗봇', type: '모델', category: '챗봇', status: 'TRAINING' },
        { id: 3, name: '의료_음성인식_v3.2', description: '의료진 전용 음성인식', type: '모델', category: 'STT', status: 'COMPLETE' },
        { id: 4, name: '교육_TTS_v1.5', description: '교육용 음성합성 모델', type: '모델', category: 'TTS', status: 'READY' }
    ],
    datasets: [
        { id: 1, name: '콜센터_음성데이터_v2.1', description: '콜센터 대화 음성 데이터', type: '데이터셋', category: '음성', size: '2.3GB' },
        { id: 2, name: '금융_텍스트데이터_v1.8', description: '금융 상담 텍스트 데이터', type: '데이터셋', category: '텍스트', size: '850MB' },
        { id: 3, name: '의료_음성인식_v3.2', description: '의료진 음성 명령 데이터', type: '데이터셋', category: '음성', size: '1.7GB' },
        { id: 4, name: '교육_TTS_데이터_v1.5', description: '교육용 텍스트 음성 데이터', type: '데이터셋', category: '음성', size: '3.1GB' }
    ]
};

// 검색 기능 구현
function initializeGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // 검색 결과 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
    
    // ESC 키로 검색 결과 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('show');
            searchInput.blur();
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const lowercaseQuery = query.toLowerCase();
    
    // 각 카테고리에서 검색
    const projectResults = searchData.projects.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) || 
        item.description.toLowerCase().includes(lowercaseQuery)
    );
    
    const modelResults = searchData.models.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) || 
        item.description.toLowerCase().includes(lowercaseQuery)
    );
    
    const datasetResults = searchData.datasets.filter(item => 
        item.name.toLowerCase().includes(lowercaseQuery) || 
        item.description.toLowerCase().includes(lowercaseQuery)
    );
    
    const totalResults = projectResults.length + modelResults.length + datasetResults.length;
    
    if (totalResults === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search" style="font-size: 24px; margin-bottom: 8px; opacity: 0.5;"></i>
                <div>"${query}"에 대한 검색 결과가 없습니다.</div>
            </div>
        `;
    } else {
        let resultsHTML = `
            <div class="search-results-header">
                총 ${totalResults}개의 검색 결과
            </div>
        `;
        
        // 프로젝트 결과
        if (projectResults.length > 0) {
            resultsHTML += `
                <div class="search-category">
                    <div class="search-category-title">프로젝트 (${projectResults.length})</div>
                    ${projectResults.map(item => `
                        <div class="search-item" onclick="goToProject(${item.id})">
                            <div class="search-item-title">${highlightQuery(item.name, query)}</div>
                            <div class="search-item-meta">
                                <span class="search-item-type">프로젝트</span>
                                <span>${item.description}</span>
                                <span>상태: ${item.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // 모델 결과
        if (modelResults.length > 0) {
            resultsHTML += `
                <div class="search-category">
                    <div class="search-category-title">모델 (${modelResults.length})</div>
                    ${modelResults.map(item => `
                        <div class="search-item" onclick="goToModel(${item.id})">
                            <div class="search-item-title">${highlightQuery(item.name, query)}</div>
                            <div class="search-item-meta">
                                <span class="search-item-type">모델</span>
                                <span>${item.description}</span>
                                <span>상태: ${item.status}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // 데이터셋 결과
        if (datasetResults.length > 0) {
            resultsHTML += `
                <div class="search-category">
                    <div class="search-category-title">데이터셋 (${datasetResults.length})</div>
                    ${datasetResults.map(item => `
                        <div class="search-item" onclick="goToDataset(${item.id})">
                            <div class="search-item-title">${highlightQuery(item.name, query)}</div>
                            <div class="search-item-meta">
                                <span class="search-item-type">데이터셋</span>
                                <span>${item.description}</span>
                                <span>크기: ${item.size}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        searchResults.innerHTML = resultsHTML;
    }
    
    searchResults.classList.add('show');
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #fef3c7; padding: 0 2px;">$1</mark>');
}

// 검색 결과 클릭 핸들러들
function goToProject(projectId) {
    hideSearchResults();
    showNotification(`프로젝트 ID ${projectId}로 이동합니다.`, 'info');
}

function goToModel(modelId) {
    hideSearchResults();
    switchStep('learning');
    showNotification(`모델 ID ${modelId}를 찾고 있습니다.`, 'info');
}

function goToDataset(datasetId) {
    hideSearchResults();
    switchStep('learning');
    showNotification(`데이터셋 ID ${datasetId}를 찾고 있습니다.`, 'info');
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('globalSearch');
    
    if (searchResults) {
        searchResults.classList.remove('show');
    }
    if (searchInput) {
        searchInput.value = '';
    }
}

// 페이지 로드시 검색 기능 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeGlobalSearch();
});
