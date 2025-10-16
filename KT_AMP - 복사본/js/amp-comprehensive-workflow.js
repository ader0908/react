/**
 * AMP 통합 관리 워크플로우
 * 학습관리, 배포관리, 검증관리, 테스트관리 통합 시스템
 */

class AMPComprehensiveWorkflow {
    constructor() {
        this.currentTab = 'learning';
        this.data = {
            learning: [],
            deployment: [],
            validation: [],
            testing: []
        };
        this.filters = {
            learning: {},
            deployment: {},
            validation: {},
            testing: {}
        };
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeData();
        this.updateStatistics();
        this.setupAutoRefresh();
    }

    setupEventListeners() {
        // 탭 네비게이션
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // 전체 선택 체크박스
        document.getElementById('selectAllLearning')?.addEventListener('change', (e) => {
            this.toggleSelectAll('learning', e.target.checked);
        });

        // 검색 기능
        this.setupSearchHandlers();
        
        // 파일 업로드
        this.setupFileUpload();
        
        // 키보드 단축키
        this.setupKeyboardShortcuts();
    }

    setupSearchHandlers() {
        // 학습관리 검색
        const learningSearch = document.getElementById('learningSearch');
        if (learningSearch) {
            learningSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchLearning();
                }
            });
        }

        // 배포관리 검색
        const deploymentSearch = document.getElementById('deploymentSearch');
        if (deploymentSearch) {
            deploymentSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchDeployment();
                }
            });
        }

        // 필터 변경 감지
        ['learningType', 'learningStatus', 'learningDate', 'learningCreator'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.applyFilters('learning');
                });
            }
        });

        ['deploymentEnv'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.applyFilters('deployment');
                });
            }
        });
    }

    setupFileUpload() {
        // 테스트 파일 업로드 처리
        const testUploadZone = document.querySelector('.file-upload-zone');
        if (testUploadZone) {
            testUploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                testUploadZone.classList.add('dragover');
            });

            testUploadZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                testUploadZone.classList.remove('dragover');
            });

            testUploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                testUploadZone.classList.remove('dragover');
                this.handleFileUpload(e.dataTransfer.files);
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        this.openNewModal();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.refreshCurrentTab();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                }
            }
        });
    }

    setupAutoRefresh() {
        // 30초마다 자동 새로고침
        setInterval(() => {
            if (!document.hidden) {
                this.refreshCurrentTab(true); // silent refresh
            }
        }, 30000);
    }

    switchTab(tabName) {
        // 현재 활성 탭 비활성화
        document.querySelector('.nav-tab.active')?.classList.remove('active');
        document.querySelector('.tab-content.active')?.classList.remove('active');

        // 새 탭 활성화
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
        document.getElementById(`${tabName}-tab`)?.classList.add('active');

        this.currentTab = tabName;
        this.loadTabData(tabName);
        this.updateStatistics();
    }

    loadTabData(tabName, silent = false) {
        if (!silent) {
            this.showLoading(true);
        }

        // 실제 구현에서는 API 호출
        setTimeout(() => {
            this.renderTabData(tabName);
            if (!silent) {
                this.showLoading(false);
            }
        }, silent ? 100 : 500);
    }

    renderTabData(tabName) {
        switch (tabName) {
            case 'learning':
                this.renderLearningData();
                break;
            case 'deployment':
                this.renderDeploymentData();
                break;
            case 'validation':
                this.renderValidationData();
                break;
            case 'testing':
                this.renderTestingData();
                break;
        }
    }

    renderLearningData() {
        const tbody = document.getElementById('learningTableBody');
        if (!tbody) return;

        // 샘플 데이터로 렌더링 (실제로는 this.data.learning 사용)
        const sampleData = [
            {
                id: 1,
                name: '한국어 STT 모델 v2.0',
                type: 'Fine Tuning',
                model: 'wav2vec2-korean-v2',
                status: 'running',
                progress: 65,
                createdAt: '2025-01-27',
                creator: '관리자'
            },
            {
                id: 2,
                name: '음성 인식 정확도 개선',
                type: 'Biasing Code',
                model: 'custom-biasing-model',
                status: 'completed',
                progress: 100,
                createdAt: '2025-01-25',
                creator: '사용자1'
            },
            {
                id: 3,
                name: '실시간 음성 변환',
                type: 'Fine Tuning',
                model: 'whisper-ko-realtime',
                status: 'ready',
                progress: 0,
                createdAt: '2025-01-26',
                creator: '사용자2'
            }
        ];

        tbody.innerHTML = sampleData.map(item => `
            <tr>
                <td><input type="checkbox" data-id="${item.id}"></td>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.model}</td>
                <td><span class="status-badge ${item.status}">${this.getStatusText(item.status)}</span></td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${item.progress}%;"></div>
                    </div>
                    <small>${item.progress}%</small>
                </td>
                <td>${item.createdAt}</td>
                <td>${item.creator}</td>
                <td>
                    <div class="action-group">
                        <button class="action-btn secondary" onclick="ampWorkflow.viewItem('learning', ${item.id})">보기</button>
                        <button class="action-btn secondary" onclick="ampWorkflow.editItem('learning', ${item.id})">수정</button>
                        <button class="action-btn danger" onclick="ampWorkflow.deleteItem('learning', ${item.id})">삭제</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    renderDeploymentData() {
        // 배포관리 데이터 렌더링 로직
        console.log('배포관리 데이터 렌더링');
    }

    renderValidationData() {
        // 검증관리 데이터 렌더링 로직
        console.log('검증관리 데이터 렌더링');
    }

    renderTestingData() {
        // 테스트관리 데이터 렌더링 로직
        console.log('테스트관리 데이터 렌더링');
    }

    getStatusText(status) {
        const statusMap = {
            ready: '대기',
            running: '실행중',
            completed: '완료',
            failed: '실패',
            pending: '대기중'
        };
        return statusMap[status] || status;
    }

    // 검색 및 필터링
    searchLearning() {
        const searchTerm = document.getElementById('learningSearch')?.value;
        this.filters.learning.search = searchTerm;
        this.applyFilters('learning');
        this.showNotification(`"${searchTerm}"로 검색 중...`, 'info');
    }

    searchDeployment() {
        const searchTerm = document.getElementById('deploymentSearch')?.value;
        this.filters.deployment.search = searchTerm;
        this.applyFilters('deployment');
        this.showNotification(`"${searchTerm}"로 검색 중...`, 'info');
    }

    applyFilters(tabName) {
        // 필터 적용 로직
        const filters = this.filters[tabName];
        console.log(`${tabName} 필터 적용:`, filters);
        
        // 실제 구현에서는 서버 API 호출 또는 클라이언트 필터링
        this.loadTabData(tabName);
    }

    // CRUD 작업
    viewItem(type, id) {
        this.showNotification(`${type} 항목 ${id} 상세보기`, 'info');
        // 상세보기 모달 또는 페이지 표시
    }

    editItem(type, id) {
        this.showNotification(`${type} 항목 ${id} 수정`, 'info');
        // 수정 모달 표시
    }

    deleteItem(type, id) {
        if (confirm('정말로 삭제하시겠습니까?')) {
            this.showNotification(`${type} 항목 ${id} 삭제됨`, 'success');
            // 실제 삭제 로직
            this.loadTabData(this.currentTab);
        }
    }

    createItem(type, data) {
        this.showNotification(`새 ${type} 항목이 생성되었습니다`, 'success');
        // 실제 생성 로직
        this.loadTabData(this.currentTab);
    }

    // 모달 관리
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            // 모달 내 첫 번째 입력 필드에 포커스
            const firstInput = modal.querySelector('input, select, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    openNewModal() {
        const modalMap = {
            learning: 'newLearningModal',
            deployment: 'newDeploymentModal',
            validation: 'newValidationModal',
            testing: 'newTestModal'
        };
        
        const modalId = modalMap[this.currentTab];
        if (modalId) {
            this.openModal(modalId);
        }
    }

    // 파일 처리
    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (this.validateFile(file)) {
                this.uploadFile(file);
            }
        });
    }

    validateFile(file) {
        const validTypes = ['audio/wav', 'audio/mp3', 'audio/flac'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
            this.showNotification('지원하지 않는 파일 형식입니다.', 'error');
            return false;
        }

        if (file.size > maxSize) {
            this.showNotification('파일 크기가 너무 큽니다. (최대 10MB)', 'error');
            return false;
        }

        return true;
    }

    uploadFile(file) {
        this.showNotification(`${file.name} 업로드 중...`, 'info');
        
        // 실제 구현에서는 FormData와 fetch API 사용
        setTimeout(() => {
            this.showNotification(`${file.name} 업로드 완료`, 'success');
        }, 2000);
    }

    // 테스트 실행
    runTest() {
        const testResult = document.getElementById('testResult');
        if (testResult) {
            testResult.textContent = '테스트를 실행 중입니다...';
            
            // 시뮬레이션된 테스트 실행
            setTimeout(() => {
                const sampleResults = [
                    '안녕하세요. 오늘 날씨가 정말 좋습니다.',
                    '음성 인식 테스트를 진행하고 있습니다.',
                    '모델의 성능이 예상보다 우수합니다.',
                    '실시간 음성 변환이 정상적으로 작동합니다.'
                ];
                
                const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
                const accuracy = (Math.random() * 10 + 90).toFixed(1);
                const responseTime = (Math.random() * 2 + 1).toFixed(1);
                
                testResult.innerHTML = `
<strong>인식 결과:</strong>
"${randomResult}"

<strong>성능 지표:</strong>
- 정확도: ${accuracy}%
- 응답 시간: ${responseTime}초
- 신뢰도: ${(Math.random() * 5 + 95).toFixed(1)}%

<strong>상세 분석:</strong>
- 음성 품질: 우수
- 노이즈 수준: 낮음
- 화자 특성: 표준 한국어 남성
                `;
                
                this.showNotification('테스트가 완료되었습니다.', 'success');
            }, 3000);
        }
    }

    // 빠른 액션
    quickAction(action) {
        switch (action) {
            case 'newProject':
                this.openNewModal();
                break;
            case 'import':
                this.showNotification('데이터 가져오기 기능은 준비 중입니다.', 'info');
                break;
            case 'export':
                this.exportReport();
                break;
            case 'backup':
                this.createBackup();
                break;
        }
    }

    exportReport() {
        this.showNotification('리포트를 생성 중입니다...', 'info');
        
        setTimeout(() => {
            const data = {
                tab: this.currentTab,
                timestamp: new Date().toISOString(),
                statistics: this.getCurrentStatistics()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `amp-report-${this.currentTab}-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showNotification('리포트가 다운로드되었습니다.', 'success');
        }, 2000);
    }

    createBackup() {
        this.showNotification('백업을 생성 중입니다...', 'info');
        
        setTimeout(() => {
            this.showNotification('백업이 성공적으로 생성되었습니다.', 'success');
        }, 3000);
    }

    // 데이터 새로고침
    refreshData(type) {
        this.refreshCurrentTab();
    }

    refreshCurrentTab(silent = false) {
        if (!silent) {
            this.showNotification('데이터를 새로고침 중입니다...', 'info');
        }
        this.loadTabData(this.currentTab, silent);
    }

    focusSearch() {
        const searchInputs = {
            learning: 'learningSearch',
            deployment: 'deploymentSearch'
        };
        
        const searchId = searchInputs[this.currentTab];
        if (searchId) {
            document.getElementById(searchId)?.focus();
        }
    }

    // 선택 관리
    toggleSelectAll(type, checked) {
        const checkboxes = document.querySelectorAll(`#${type}-tab input[type="checkbox"][data-id]`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
        });
    }

    getSelectedItems(type) {
        const checkboxes = document.querySelectorAll(`#${type}-tab input[type="checkbox"][data-id]:checked`);
        return Array.from(checkboxes).map(cb => cb.getAttribute('data-id'));
    }

    // 통계 업데이트
    updateStatistics() {
        // 헤더 통계 업데이트
        document.getElementById('totalProjects').textContent = this.getTotalProjects();
        document.getElementById('completedTasks').textContent = this.getCompletedTasks();
        document.getElementById('activeModels').textContent = this.getActiveModels();

        // 사이드바 통계 업데이트
        this.updateSidebarStats();
    }

    getTotalProjects() {
        return Object.values(this.data).reduce((total, items) => total + items.length, 0);
    }

    getCompletedTasks() {
        return Object.values(this.data).reduce((total, items) => {
            return total + items.filter(item => item.status === 'completed').length;
        }, 0);
    }

    getActiveModels() {
        return Math.floor(Math.random() * 10) + 5; // 시뮬레이션
    }

    updateSidebarStats() {
        // 사이드바의 빠른 통계 업데이트
        const stats = document.querySelectorAll('.side-section .stat-item-value');
        if (stats.length >= 4) {
            stats[0].textContent = this.data.learning?.length || 23;
            stats[1].textContent = this.data.deployment?.length || 15;
            stats[2].textContent = this.data.validation?.length || 89;
            stats[3].textContent = this.data.testing?.length || 142;
        }
    }

    getCurrentStatistics() {
        return {
            totalProjects: this.getTotalProjects(),
            completedTasks: this.getCompletedTasks(),
            activeModels: this.getActiveModels(),
            currentTab: this.currentTab
        };
    }

    // 초기 데이터 로드
    initializeData() {
        // 실제 구현에서는 API에서 데이터 로드
        this.data = {
            learning: [],
            deployment: [],
            validation: [],
            testing: []
        };
        
        this.loadTabData(this.currentTab);
    }

    // 로딩 상태 관리
    showLoading(show) {
        this.isLoading = show;
        
        const currentTabContent = document.querySelector('.tab-content.active');
        if (currentTabContent) {
            if (show) {
                currentTabContent.classList.add('loading');
            } else {
                currentTabContent.classList.remove('loading');
            }
        }
    }

    // 알림 시스템
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
                ${this.getNotificationTitle(type)}
            </div>
            <div style="font-size: 14px; color: #4a5568;">${message}</div>
        `;

        const container = document.getElementById('notificationContainer') || document.body;
        container.appendChild(notification);

        // 애니메이션 시작
        setTimeout(() => notification.classList.add('show'), 100);

        // 자동 제거
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);

        // 클릭으로 제거
        notification.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    getNotificationTitle(type) {
        const titles = {
            success: '성공',
            error: '오류',
            warning: '경고',
            info: '알림'
        };
        return titles[type] || '알림';
    }

    // 실시간 업데이트 시뮬레이션
    simulateRealTimeUpdates() {
        setInterval(() => {
            if (this.currentTab === 'learning' && !document.hidden) {
                // 진행률 업데이트 시뮬레이션
                const progressBars = document.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const currentWidth = parseInt(bar.style.width) || 0;
                    if (currentWidth < 100 && Math.random() > 0.7) {
                        const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 5) + 1);
                        bar.style.width = `${newWidth}%`;
                        bar.parentElement.nextElementSibling.textContent = `${newWidth}%`;
                    }
                });
            }
        }, 5000);
    }

    // 웹소켓 연결 (실제 구현 시)
    connectWebSocket() {
        // 실제 구현에서는 WebSocket 연결
        console.log('WebSocket 연결 시뮬레이션');
    }

    // 도구 함수들
    formatDate(date) {
        return new Date(date).toLocaleDateString('ko-KR');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}시간 ${minutes}분`;
        } else if (minutes > 0) {
            return `${minutes}분 ${remainingSeconds}초`;
        } else {
            return `${remainingSeconds}초`;
        }
    }
}

// 전역 함수들 (HTML에서 호출)
function openModal(modalId) {
    window.ampWorkflow.openModal(modalId);
}

function closeModal(modalId) {
    window.ampWorkflow.closeModal(modalId);
}

function refreshData(type) {
    window.ampWorkflow.refreshData(type);
}

function searchLearning() {
    window.ampWorkflow.searchLearning();
}

function searchDeployment() {
    window.ampWorkflow.searchDeployment();
}

function viewLearning(id) {
    window.ampWorkflow.viewItem('learning', id);
}

function editLearning(id) {
    window.ampWorkflow.editItem('learning', id);
}

function deleteLearning(id) {
    window.ampWorkflow.deleteItem('learning', id);
}

function createLearning() {
    // 폼 데이터 수집 및 생성
    window.ampWorkflow.createItem('learning', {});
    closeModal('newLearningModal');
}

function uploadTestFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.wav,.mp3,.flac';
    input.onchange = (e) => {
        window.ampWorkflow.handleFileUpload(e.target.files);
    };
    input.click();
}

function runTest() {
    window.ampWorkflow.runTest();
}

function quickAction(action) {
    window.ampWorkflow.quickAction(action);
}

// 전역 인스턴스 생성
window.ampWorkflow = null;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.ampWorkflow = new AMPComprehensiveWorkflow();
    
    // 실시간 업데이트 시작
    window.ampWorkflow.simulateRealTimeUpdates();
    
    // 웹소켓 연결 (실제 구현 시)
    // window.ampWorkflow.connectWebSocket();
});

// 모달 외부 클릭으로 닫기
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    // 리소스 정리
    console.log('AMP Workflow 정리 중...');
});

export default AMPComprehensiveWorkflow;






