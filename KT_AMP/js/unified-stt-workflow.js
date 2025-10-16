// Unified STT Workflow - JavaScript Logic
// 학습 → 배포 → 검증 → 테스트 통합 관리 시스템

// Global State Management
let currentStep = 'learning';
let selectedProject = '';
let workflowData = {
    learning: {
        progress: 73,
        accuracy: 94.2,
        status: 'in-progress'
    },
    deployment: {
        progress: 0,
        status: 'pending'
    },
    validation: {
        progress: 0,
        status: 'pending'
    },
    testing: {
        progress: 0,
        status: 'pending'
    }
};

let isRecording = false;
let recognition = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateProgressIndicator();
});

function initializeApp() {
    console.log('🚀 AMP 통합 STT 워크플로우 시스템 초기화');
    loadProjectData();
    updateStats();
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        initializeSpeechRecognition();
    }
}

function setupEventListeners() {
    // Project selector change
    const projectSelector = document.getElementById('projectSelector');
    if (projectSelector) {
        projectSelector.addEventListener('change', loadProjectData);
    }

    // File upload drag and drop
    setupFileUpload();
    
    // Auto-save functionality
    setInterval(autoSave, 30000); // Auto-save every 30 seconds
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
    logActivity(`${getStepName(step)} 단계로 이동`);
}

function isStepAccessible(step) {
    const stepOrder = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(step);
    
    // Allow going back or moving to the next step if current is completed
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
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    // Show current tab panel
    const currentPanel = document.getElementById(`${currentStep}-tab`);
    if (currentPanel) {
        currentPanel.classList.remove('hidden');
    }
    
    // Update step circles and labels
    document.querySelectorAll('.progress-step').forEach(step => {
        const stepId = step.querySelector('.step-circle').id.replace('step-', '');
        const circle = step.querySelector('.step-circle');
        const label = step.querySelector('.step-label');
        
        // Reset classes
        circle.className = 'step-circle';
        label.className = 'step-label';
        
        if (stepId === currentStep) {
            circle.classList.add('active');
            label.classList.add('active');
        } else if (workflowData[stepId]?.status === 'completed') {
            circle.classList.add('completed');
        } else {
            circle.classList.add('pending');
        }
    });
}

function updateProgressIndicator() {
    const progressFill = document.getElementById('progressFill');
    const steps = ['learning', 'deployment', 'validation', 'testing'];
    const currentIndex = steps.indexOf(currentStep);
    const progressPercent = (currentIndex / (steps.length - 1)) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
    }
}

// Project Management
function loadProjectData() {
    const selector = document.getElementById('projectSelector');
    selectedProject = selector?.value || '';
    
    if (!selectedProject) return;
    
    console.log(`📂 프로젝트 데이터 로드: ${selectedProject}`);
    
    // Simulate loading project-specific data
    setTimeout(() => {
        updateStats();
        updateProjectSpecificData();
        showNotification(`${getProjectName(selectedProject)} 프로젝트가 로드되었습니다.`, 'success');
    }, 500);
}

function getProjectName(projectId) {
    const names = {
        'korean-stt-v3': '한국어 STT v3.0',
        'biasing-optimization': 'Biasing 최적화',
        'multilang-support': '다국어 지원 모델'
    };
    return names[projectId] || projectId;
}

function updateProjectSpecificData() {
    if (!selectedProject) return;
    
    const projectData = {
        'korean-stt-v3': {
            progress: 73,
            accuracy: 94.2,
            processingTime: '1.8s'
        },
        'biasing-optimization': {
            progress: 100,
            accuracy: 97.8,
            processingTime: '1.2s'
        },
        'multilang-support': {
            progress: 45,
            accuracy: 89.1,
            processingTime: '2.3s'
        }
    };
    
    const data = projectData[selectedProject];
    if (data) {
        document.getElementById('overallProgress').textContent = `${data.progress}%`;
        document.getElementById('currentAccuracy').textContent = `${data.accuracy}%`;
        document.getElementById('processingTime').textContent = data.processingTime;
    }
}

function updateStats() {
    // Update dashboard statistics
    const stats = calculateCurrentStats();
    
    const elements = {
        'overallProgress': `${stats.progress}%`,
        'currentAccuracy': `${stats.accuracy}%`,
        'processingTime': stats.processingTime
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            animateValue(element, value);
        }
    });
}

function calculateCurrentStats() {
    return {
        progress: Math.round(Math.random() * 20 + 70), // 70-90%
        accuracy: Math.round((Math.random() * 5 + 92) * 10) / 10, // 92-97%
        processingTime: `${(Math.random() * 1 + 1).toFixed(1)}s` // 1.0-2.0s
    };
}

function animateValue(element, newValue) {
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

// Learning Management Functions
function handleFileUpload(input, type) {
    const file = input.files[0];
    if (!file) return;
    
    console.log(`📁 파일 업로드: ${file.name} (${type})`);
    
    // Validate file
    if (!validateFile(file, type)) {
        showNotification('지원되지 않는 파일 형식입니다.', 'error');
        return;
    }
    
    // Simulate upload process
    showUploadProgress(file.name);
    
    setTimeout(() => {
        addToLearningDataTable(file, type);
        showNotification(`${file.name} 파일이 성공적으로 업로드되었습니다.`, 'success');
        hideUploadProgress();
    }, 2000);
}

function validateFile(file, type) {
    const allowedTypes = {
        'fine-tuning': ['.csv', '.json', '.txt'],
        'biasing': ['.py', '.json']
    };
    
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    return allowedTypes[type]?.includes(extension);
}

function setupFileUpload() {
    // Setup drag and drop for file uploads
    document.querySelectorAll('.file-upload').forEach(uploadArea => {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-blue)';
            uploadArea.style.backgroundColor = 'rgba(102, 126, 234, 0.02)';
        });
        
        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            uploadArea.style.backgroundColor = 'transparent';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(0, 0, 0, 0.1)';
            uploadArea.style.backgroundColor = 'transparent';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const input = uploadArea.querySelector('input[type="file"]');
                if (input) {
                    input.files = files;
                    const type = input.id.includes('biasing') ? 'biasing' : 'fine-tuning';
                    handleFileUpload(input, type);
                }
            }
        });
    });
}

function showUploadProgress(filename) {
    // Create and show upload progress indicator
    const progressDiv = document.createElement('div');
    progressDiv.id = 'upload-progress';
    progressDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 24px; border-radius: 16px; box-shadow: var(--shadow-large); z-index: 2000; text-align: center;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">파일 업로드 중...</div>
            <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${filename}</div>
            <div style="width: 200px; height: 4px; background: rgba(0,0,0,0.1); border-radius: 2px; overflow: hidden;">
                <div style="height: 100%; background: linear-gradient(90deg, var(--primary-blue), var(--primary-purple)); width: 0%; transition: width 2s ease;" id="upload-bar"></div>
            </div>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); z-index: 1999;"></div>
    `;
    document.body.appendChild(progressDiv);
    
    // Animate progress bar
    setTimeout(() => {
        document.getElementById('upload-bar').style.width = '100%';
    }, 100);
}

function hideUploadProgress() {
    const progressDiv = document.getElementById('upload-progress');
    if (progressDiv) {
        progressDiv.remove();
    }
}

function addToLearningDataTable(file, type) {
    const table = document.getElementById('learningDataTable');
    if (!table) return;
    
    const row = table.insertRow(0);
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + 'MB';
    const currentDate = new Date().toISOString().split('T')[0];
    
    row.innerHTML = `
        <td>${file.name}</td>
        <td>${type === 'fine-tuning' ? 'Fine Tuning' : 'Biasing Code'}</td>
        <td>${fileSize}</td>
        <td><span class="status-badge status-info">업로드됨</span></td>
        <td>-</td>
        <td>${currentDate}</td>
        <td>
            <button class="btn btn-primary" style="padding: 4px 8px; font-size: 12px;" onclick="startProcessing('${file.name}')">처리시작</button>
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="deleteData('${file.name}')">삭제</button>
        </td>
    `;
    
    // Highlight new row
    row.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    setTimeout(() => {
        row.style.backgroundColor = '';
        row.style.transition = 'background-color 0.5s ease';
    }, 2000);
}

// Learning Management Actions
function startLearning() {
    if (!selectedProject) {
        showNotification('먼저 프로젝트를 선택해주세요.', 'warning');
        return;
    }
    
    console.log('🧠 학습 시작');
    showNotification('학습이 시작되었습니다.', 'success');
    
    // Update workflow data
    workflowData.learning.status = 'in-progress';
    workflowData.learning.progress = 0;
    
    // Simulate learning progress
    simulateLearningProgress();
}

function simulateLearningProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeLearning();
        }
        
        workflowData.learning.progress = Math.round(progress);
        updateStats();
        
        // Update progress in UI
        const progressElements = document.querySelectorAll('.progress-fill-bar');
        progressElements.forEach(el => {
            if (el.closest('.content-card')) {
                el.style.width = `${progress}%`;
            }
        });
    }, 1000);
}

function completeLearning() {
    workflowData.learning.status = 'completed';
    workflowData.learning.accuracy = 94.2;
    
    showNotification('학습이 완료되었습니다! 배포 단계로 진행할 수 있습니다.', 'success');
    
    // Enable next step
    enableNextStep('deployment');
    
    // Auto-advance to next step
    setTimeout(() => {
        if (confirm('학습이 완료되었습니다. 배포 단계로 이동하시겠습니까?')) {
            switchStep('deployment');
        }
    }, 2000);
}

function enableNextStep(step) {
    const stepCircle = document.getElementById(`step-${step}`);
    if (stepCircle) {
        stepCircle.classList.remove('pending');
        stepCircle.classList.add('active');
    }
}

// Deployment Management Functions
function deployModel() {
    if (workflowData.learning.status !== 'completed') {
        showNotification('학습이 완료된 후 배포할 수 있습니다.', 'warning');
        return;
    }
    
    console.log('🚀 모델 배포 시작');
    showNotification('모델 배포를 시작합니다.', 'info');
    
    // Simulate deployment process
    setTimeout(() => {
        workflowData.deployment.status = 'completed';
        showNotification('모델이 성공적으로 배포되었습니다!', 'success');
        enableNextStep('validation');
        
        setTimeout(() => {
            if (confirm('배포가 완료되었습니다. 검증 단계로 이동하시겠습니까?')) {
                switchStep('validation');
            }
        }, 1500);
    }, 3000);
}

// Validation Management Functions
function startValidation() {
    if (workflowData.deployment.status !== 'completed') {
        showNotification('배포가 완료된 후 검증할 수 있습니다.', 'warning');
        return;
    }
    
    console.log('✅ 검증 시작');
    showNotification('성능 검증을 시작합니다.', 'info');
    
    // Simulate validation process
    setTimeout(() => {
        workflowData.validation.status = 'completed';
        showNotification('검증이 완료되었습니다! 모든 지표가 목표를 달성했습니다.', 'success');
        enableNextStep('testing');
        
        setTimeout(() => {
            if (confirm('검증이 완료되었습니다. 테스트 단계로 이동하시겠습니까?')) {
                switchStep('testing');
            }
        }, 1500);
    }, 4000);
}

// Speech Recognition for Testing
function initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.warn('Speech Recognition API not supported');
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';
    
    recognition.onstart = function() {
        console.log('🎤 음성 인식 시작');
        document.getElementById('recordingStatus').style.display = 'block';
    };
    
    recognition.onresult = function(event) {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        const resultDiv = document.getElementById('recognitionResult');
        if (resultDiv) {
            resultDiv.textContent = finalTranscript || interimTranscript || '인식 중...';
        }
        
        if (finalTranscript) {
            displayTestResults(finalTranscript);
            addToTestHistory(finalTranscript);
        }
    };
    
    recognition.onend = function() {
        console.log('🎤 음성 인식 종료');
        isRecording = false;
        updateRecordButton();
        document.getElementById('recordingStatus').style.display = 'none';
    };
    
    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        showNotification(`음성 인식 오류: ${event.error}`, 'error');
        isRecording = false;
        updateRecordButton();
    };
}

function toggleRecording() {
    if (!recognition) {
        showNotification('음성 인식이 지원되지 않는 브라우저입니다.', 'error');
        return;
    }
    
    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
        isRecording = true;
        updateRecordButton();
    }
}

function updateRecordButton() {
    const button = document.getElementById('recordButton');
    if (!button) return;
    
    if (isRecording) {
        button.style.background = 'var(--error)';
        button.innerHTML = '⏹️';
        button.style.animation = 'pulse 1s infinite';
    } else {
        button.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))';
        button.innerHTML = '🎤';
        button.style.animation = '';
    }
}

function displayTestResults(transcript) {
    const startTime = Date.now();
    
    // Simulate processing time
    setTimeout(() => {
        const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);
        const confidence = (Math.random() * 10 + 90).toFixed(1);
        const accuracy = (Math.random() * 5 + 95).toFixed(1);
        
        document.getElementById('processingTime').textContent = `${processingTime}초`;
        document.getElementById('confidence').textContent = `${confidence}%`;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        // Animate the results
        [document.getElementById('processingTime'), 
         document.getElementById('confidence'), 
         document.getElementById('accuracy')].forEach(el => {
            animateValue(el, el.textContent);
        });
        
    }, Math.random() * 1000 + 500);
}

function addToTestHistory(transcript) {
    const table = document.getElementById('testHistoryTable');
    if (!table) return;
    
    const row = table.insertRow(0);
    const now = new Date();
    const timeString = now.toISOString().slice(0, 19).replace('T', ' ');
    
    const processingTime = (Math.random() * 1 + 0.5).toFixed(1);
    const confidence = (Math.random() * 10 + 88).toFixed(1);
    const accuracy = Math.random() > 0.1 ? '100%' : (Math.random() * 5 + 95).toFixed(1) + '%';
    
    row.innerHTML = `
        <td>${timeString}</td>
        <td>한국어 STT v3.0</td>
        <td>${transcript}</td>
        <td>${transcript}</td>
        <td>${processingTime}초</td>
        <td>${confidence}%</td>
        <td>${accuracy}</td>
        <td>
            <button class="btn btn-primary" style="padding: 4px 8px; font-size: 12px;">재생</button>
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;">상세</button>
        </td>
    `;
    
    // Highlight new row
    row.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
    setTimeout(() => {
        row.style.backgroundColor = '';
        row.style.transition = 'background-color 0.5s ease';
    }, 2000);
}

// Utility Functions
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
    
    // Could be extended to send to analytics or logging service
}

function autoSave() {
    if (selectedProject) {
        console.log('💾 자동 저장 수행');
        localStorage.setItem('amp_workflow_state', JSON.stringify({
            currentStep,
            selectedProject,
            workflowData,
            timestamp: Date.now()
        }));
    }
}

function loadSavedState() {
    const saved = localStorage.getItem('amp_workflow_state');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) { // 24 hours
                currentStep = state.currentStep;
                selectedProject = state.selectedProject;
                workflowData = state.workflowData;
                
                // Update UI
                const selector = document.getElementById('projectSelector');
                if (selector) selector.value = selectedProject;
                
                switchStep(currentStep);
                showNotification('이전 작업 상태가 복원되었습니다.', 'info');
            }
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

// Header Action Functions
function exportData() {
    console.log('📊 데이터 내보내기');
    
    const exportData = {
        project: selectedProject,
        currentStep: currentStep,
        workflowData: workflowData,
        timestamp: new Date().toISOString(),
        stats: calculateCurrentStats()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMP_workflow_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('데이터가 성공적으로 내보내졌습니다.', 'success');
}

function saveProgress() {
    console.log('💾 진행상황 저장');
    autoSave();
    showNotification('진행상황이 저장되었습니다.', 'success');
}

// Quick Action Functions
function quickStart() {
    if (!selectedProject) {
        showNotification('먼저 프로젝트를 선택해주세요.', 'warning');
        return;
    }
    
    if (currentStep === 'learning' && workflowData.learning.status !== 'completed') {
        startLearning();
    } else if (currentStep === 'deployment' && workflowData.deployment.status !== 'completed') {
        deployModel();
    } else if (currentStep === 'validation' && workflowData.validation.status !== 'completed') {
        startValidation();
    } else if (currentStep === 'testing') {
        startVoiceTest();
    }
}

function viewLogs() {
    console.log('📋 로그 보기');
    showNotification('로그 뷰어를 준비 중입니다...', 'info');
    
    // Could open a modal or new window with detailed logs
    setTimeout(() => {
        showNotification('로그 기능은 개발 중입니다.', 'info');
    }, 1000);
}

function downloadReport() {
    console.log('📥 리포트 다운로드');
    
    const reportData = {
        projectName: getProjectName(selectedProject),
        currentStep: getStepName(currentStep),
        overallProgress: document.getElementById('overallProgress')?.textContent || 'N/A',
        accuracy: document.getElementById('currentAccuracy')?.textContent || 'N/A',
        processingTime: document.getElementById('processingTime')?.textContent || 'N/A',
        generatedAt: new Date().toISOString(),
        workflowStatus: workflowData
    };
    
    const reportText = `
AMP STT 워크플로우 리포트
========================

프로젝트: ${reportData.projectName}
현재 단계: ${reportData.currentStep}
전체 진행률: ${reportData.overallProgress}
현재 정확도: ${reportData.accuracy}
평균 처리시간: ${reportData.processingTime}

생성일시: ${reportData.generatedAt}

워크플로우 상태:
${JSON.stringify(reportData.workflowStatus, null, 2)}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMP_report_${selectedProject}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('리포트가 다운로드되었습니다.', 'success');
}

// Data Management Functions
function refreshLearningData() {
    console.log('🔄 학습 데이터 새로고침');
    showNotification('데이터를 새로고침하고 있습니다...', 'info');
    
    setTimeout(() => {
        updateStats();
        showNotification('학습 데이터가 업데이트되었습니다.', 'success');
    }, 1000);
}

function refreshDeployments() {
    console.log('🔄 배포 현황 새로고침');
    showNotification('배포 현황을 새로고침하고 있습니다...', 'info');
    
    setTimeout(() => {
        showNotification('배포 현황이 업데이트되었습니다.', 'success');
    }, 1000);
}

function refreshValidation() {
    console.log('🔄 검증 결과 새로고침');
    showNotification('검증 결과를 새로고침하고 있습니다...', 'info');
    
    setTimeout(() => {
        showNotification('검증 결과가 업데이트되었습니다.', 'success');
    }, 1000);
}

function refreshTests() {
    console.log('🔄 테스트 히스토리 새로고침');
    showNotification('테스트 히스토리를 새로고침하고 있습니다...', 'info');
    
    setTimeout(() => {
        showNotification('테스트 히스토리가 업데이트되었습니다.', 'success');
    }, 1000);
}

// Filter and Search Functions
function filterLearningData(searchTerm) {
    const table = document.getElementById('learningDataTable');
    if (!table) return;
    
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

function filterByType(type) {
    console.log(`🔍 타입 필터: ${type}`);
    // Implementation would filter table rows by type
}

function filterByStatus(status) {
    console.log(`🔍 상태 필터: ${status}`);
    // Implementation would filter table rows by status
}

// Testing Functions
function startVoiceTest() {
    console.log('🧪 음성 테스트 시작');
    if (recognition) {
        toggleRecording();
    } else {
        showNotification('음성 인식 기능을 초기화하는 중입니다...', 'info');
        setTimeout(() => {
            initializeSpeechRecognition();
            if (recognition) {
                toggleRecording();
            }
        }, 1000);
    }
}

// Initialize saved state on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSavedState, 500);
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('시스템 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
});

// Manual Registration Modal Functions
let currentModalTab = 'manual';
let currentRegistrationType = 'fine-tuning';

function openManualRegistration(type) {
    currentRegistrationType = type;
    const modal = document.getElementById('manualRegistrationModal');
    const title = document.getElementById('modalTitle');
    
    if (type === 'fine-tuning') {
        title.textContent = 'Fine Tuning 데이터 등록';
    } else if (type === 'biasing') {
        title.textContent = 'Biasing Code 등록';
        // Switch to advanced tab for biasing
        switchModalTab('advanced');
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Set default model type
    const modelTypeSelect = document.getElementById('modelType');
    if (modelTypeSelect) {
        modelTypeSelect.value = type;
    }
    
    logActivity(`${type} 수동 등록 모달 열기`);
}

function closeManualRegistration() {
    const modal = document.getElementById('manualRegistrationModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Reset form
    resetRegistrationForm();
    
    logActivity('수동 등록 모달 닫기');
}

function switchModalTab(tab) {
    currentModalTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.modal-tab').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update tab content
    document.querySelectorAll('.modal-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const activeContent = document.getElementById(`${tab}-tab-content`);
    if (activeContent) {
        activeContent.style.display = 'block';
    }
    
    logActivity(`모달 탭 전환: ${tab}`);
}

function resetRegistrationForm() {
    const forms = ['manualRegistrationForm', 'advancedRegistrationForm'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    });
    
    // Reset file upload displays
    resetFileUploadDisplays();
    
    // Reset to manual tab
    switchModalTab('manual');
}

function resetFileUploadDisplays() {
    const fileUploads = document.querySelectorAll('.modal-file-upload .modal-file-text');
    fileUploads.forEach(upload => {
        const originalText = upload.textContent.includes('정답지') ? '정답지 파일을 선택하세요' : '음성 파일을 선택하세요';
        upload.textContent = originalText;
    });
}

function checkDuplicate() {
    // Simulate duplicate check
    showNotification('중복 확인 중...', 'info');
    
    setTimeout(() => {
        const isUnique = Math.random() > 0.3; // 70% chance of being unique
        
        if (isUnique) {
            showNotification('사용 가능한 이름입니다.', 'success');
        } else {
            showNotification('이미 사용 중인 이름입니다. 다른 이름을 입력해주세요.', 'warning');
        }
    }, 1000);
}

function validateBiasingCode() {
    const code = document.getElementById('biasingCode').value;
    
    if (!code.trim()) {
        showNotification('Biasing Code를 입력해주세요.', 'warning');
        return;
    }
    
    // Simulate validation
    showNotification('Biasing Code 검증 중...', 'info');
    
    setTimeout(() => {
        const isValid = Math.random() > 0.2; // 80% chance of being valid
        const hint = document.querySelector('#advanced-tab-content .modal-form-hint');
        
        if (isValid) {
            showNotification('유효한 Biasing Code입니다.', 'success');
            hint.textContent = '유효한 BiasingCode입니다.';
            hint.style.color = 'var(--success)';
        } else {
            showNotification('유효하지 않은 Biasing Code입니다. 문법을 확인해주세요.', 'error');
            hint.textContent = '유효하지 않은 BiasingCode입니다.';
            hint.style.color = 'var(--error)';
        }
    }, 1500);
}

function submitManualRegistration() {
    const activeForm = currentModalTab === 'manual' ? 'manualRegistrationForm' : 'advancedRegistrationForm';
    const form = document.getElementById(activeForm);
    
    if (!form) return;
    
    // Basic validation
    if (!validateForm(form)) {
        showNotification('필수 항목을 모두 입력해주세요.', 'warning');
        return;
    }
    
    // Collect form data
    const formData = collectFormData(form);
    
    console.log('📝 수동 등록 데이터:', formData);
    
    // Simulate registration process
    showNotification('데이터를 등록하고 있습니다...', 'info');
    
    setTimeout(() => {
        // Add to table
        addManualRegistrationToTable(formData);
        
        showNotification('데이터가 성공적으로 등록되었습니다!', 'success');
        
        // Close modal
        closeManualRegistration();
        
        // Update stats
        updateStats();
        
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    return isValid;
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Get all form inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'file') {
            data[input.id] = input.files[0]?.name || '';
        } else {
            data[input.id] = input.value;
        }
    });
    
    // Add metadata
    data.registrationType = currentRegistrationType;
    data.registrationMethod = 'manual';
    data.timestamp = new Date().toISOString();
    
    return data;
}

function addManualRegistrationToTable(data) {
    const table = document.getElementById('learningDataTable');
    if (!table) return;
    
    const row = table.insertRow(0);
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Determine display values based on registration type
    let displayName, displayType, displaySize;
    
    if (data.registrationType === 'biasing') {
        displayName = data.biasingCodeName || 'Biasing Code';
        displayType = 'Biasing Code';
        displaySize = '코드';
    } else {
        displayName = data.datasetName || 'Manual Dataset';
        displayType = 'Fine Tuning';
        displaySize = data.audioFile ? '수동등록' : '텍스트';
    }
    
    row.innerHTML = `
        <td>${displayName}</td>
        <td>${displayType}</td>
        <td>${displaySize}</td>
        <td><span class="status-badge status-info">등록됨</span></td>
        <td>-</td>
        <td>${currentDate}</td>
        <td>
            <button class="btn btn-primary" style="padding: 4px 8px; font-size: 12px;" onclick="startProcessing('${displayName}')">처리시작</button>
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="editManualData('${displayName}')">수정</button>
            <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="deleteData('${displayName}')">삭제</button>
        </td>
    `;
    
    // Highlight new row
    row.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
    setTimeout(() => {
        row.style.backgroundColor = '';
        row.style.transition = 'background-color 0.5s ease';
    }, 2000);
    
    logActivity(`수동 데이터 등록 완료: ${displayName}`);
}

function editManualData(dataName) {
    console.log(`✏️ 수동 데이터 수정: ${dataName}`);
    showNotification('수정 기능은 개발 중입니다.', 'info');
    // Could open the modal with pre-filled data for editing
}

function openFileUpload() {
    const panel = document.getElementById('fileUploadPanel');
    if (panel.style.display === 'none' || !panel.style.display) {
        panel.style.display = 'grid';
        panel.style.animation = 'slideDown 0.3s ease';
    } else {
        panel.style.display = 'none';
    }
}

// File upload event handlers for modal
document.addEventListener('DOMContentLoaded', function() {
    // Setup file upload change handlers
    const fileInputs = ['answerFile', 'audioFile'];
    
    fileInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('change', function() {
                updateFileUploadDisplay(this);
            });
        }
    });
});

function updateFileUploadDisplay(input) {
    const file = input.files[0];
    if (!file) return;
    
    const uploadDiv = input.previousElementSibling;
    const textSpan = uploadDiv.querySelector('.modal-file-text');
    
    if (textSpan) {
        textSpan.textContent = `선택됨: ${file.name}`;
        uploadDiv.style.borderColor = 'var(--success)';
        uploadDiv.style.backgroundColor = 'rgba(72, 187, 120, 0.05)';
    }
}

// Add CSS animation for file upload panel
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Export functions for testing and debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchStep,
        loadProjectData,
        startLearning,
        deployModel,
        startValidation,
        toggleRecording,
        showNotification,
        openManualRegistration,
        closeManualRegistration,
        submitManualRegistration
    };
}
