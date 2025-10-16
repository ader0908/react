/**
 * STT 통합 워크플로우 관리
 * 학습, 배포, 검증, 테스트 프로세스를 하나의 화면에서 관리
 */

class STTWorkflow {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.uploadedFiles = [];
    this.trainingStatus = 'ready';
    this.isTraining = false;
    this.trainingInterval = null;
    this.logEntries = [];
    
    this.stepTips = {
      1: '파일을 드래그 앤 드롭으로 쉽게 업로드할 수 있습니다. 음성 파일과 전사 텍스트를 함께 업로드하세요.',
      2: '기본 모델 선택이 성능에 큰 영향을 줍니다. Wav2Vec2가 한국어에 최적화되어 있습니다.',
      3: '학습 중에도 다른 작업을 할 수 있습니다. 브라우저를 닫아도 학습은 계속됩니다.',
      4: '다양한 테스트 데이터로 모델 성능을 확인하세요. WER이 5% 이하면 우수한 성능입니다.',
      5: '스테이징 환경에서 충분히 테스트한 후 운영 환경에 배포하세요.'
    };
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateStepperProgress();
    this.updateStepTip();
    this.updateQuickStats();
    this.initializeStep1();
  }

  setupEventListeners() {
    // 스텝 네비게이션
    document.getElementById('nextStepBtn').addEventListener('click', () => {
      this.nextStep();
    });

    // 파일 업로드
    this.setupFileUpload();
    
    // 액션 버튼들
    this.setupActionButtons();
    
    // 단계별 특정 이벤트
    this.setupStepSpecificEvents();
  }

  setupFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    if (!uploadZone || !fileInput) return;

    // 클릭 업로드
    uploadZone.addEventListener('click', () => {
      fileInput.click();
    });

    // 파일 선택
    fileInput.addEventListener('change', (e) => {
      this.handleFiles(e.target.files);
    });

    // 드래그 앤 드롭
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      this.handleFiles(e.dataTransfer.files);
    });
  }

  setupActionButtons() {
    // 진행상황 저장
    document.getElementById('saveProgress').addEventListener('click', () => {
      this.saveProgress();
    });

    // 템플릿 로드
    document.getElementById('loadTemplate').addEventListener('click', () => {
      this.loadTemplate();
    });

    // 설정 내보내기
    document.getElementById('exportConfig').addEventListener('click', () => {
      this.exportConfig();
    });
  }

  setupStepSpecificEvents() {
    // Step 3: 학습 제어
    const pauseBtn = document.getElementById('pauseTraining');
    const stopBtn = document.getElementById('stopTraining');
    
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.pauseTraining();
      });
    }
    
    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.stopTraining();
      });
    }

    // 데이터 분할 비율 자동 계산
    const ratioInputs = ['trainRatio', 'validRatio', 'testRatio'];
    ratioInputs.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          this.updateRatios(id);
        });
      }
    });
  }

  handleFiles(files) {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;

    Array.from(files).forEach(file => {
      if (this.isValidFile(file)) {
        this.uploadedFiles.push({
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading',
          progress: 0
        });
      }
    });

    this.renderFileList();
    this.updateQuickStats();
    this.simulateUpload();
  }

  isValidFile(file) {
    const validTypes = [
      'audio/wav', 'audio/mp3', 'audio/flac', 'audio/mpeg',
      'text/plain', 'application/json'
    ];
    const validExtensions = ['.wav', '.mp3', '.flac', '.txt', '.json'];
    
    const hasValidType = validTypes.some(type => file.type.includes(type));
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidType && !hasValidExtension) {
      this.showNotification('지원하지 않는 파일 형식입니다: ' + file.name, 'error');
      return false;
    }
    
    if (file.size > 500 * 1024 * 1024) { // 500MB
      this.showNotification('파일 크기가 너무 큽니다: ' + file.name, 'error');
      return false;
    }
    
    return true;
  }

  renderFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;

    if (this.uploadedFiles.length === 0) {
      fileList.style.display = 'none';
      return;
    }

    fileList.style.display = 'block';
    fileList.innerHTML = this.uploadedFiles.map(file => `
      <div class="file-item ${file.status === 'completed' ? 'status-success' : file.status === 'error' ? 'status-error' : ''}">
        <div class="file-info">
          <div class="file-icon">${this.getFileIcon(file.type)}</div>
          <div class="file-details">
            <div class="file-name">${file.name}</div>
            <div class="file-meta">${this.formatFileSize(file.size)} • ${this.getFileStatus(file.status)}</div>
          </div>
        </div>
        <div class="file-status">
          <div class="file-progress">
            <div class="file-progress-bar" style="width: ${file.progress}%;"></div>
          </div>
        </div>
        <div class="file-actions">
          <button class="file-action-btn remove" onclick="sttWorkflow.removeFile('${file.id}')">
            🗑️
          </button>
        </div>
      </div>
    `).join('');
  }

  getFileIcon(type) {
    if (type.includes('audio')) return '🎵';
    if (type.includes('text')) return '📝';
    return '📄';
  }

  getFileStatus(status) {
    const statusMap = {
      uploading: '업로드 중...',
      completed: '완료',
      error: '오류',
      processing: '처리 중...'
    };
    return statusMap[status] || '대기';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  simulateUpload() {
    this.uploadedFiles.forEach(file => {
      if (file.status === 'uploading') {
        const interval = setInterval(() => {
          file.progress += Math.random() * 20;
          if (file.progress >= 100) {
            file.progress = 100;
            file.status = 'completed';
            clearInterval(interval);
          }
          this.renderFileList();
          this.updateQuickStats();
        }, 200);
      }
    });
  }

  removeFile(fileId) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== fileId);
    this.renderFileList();
    this.updateQuickStats();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      // 현재 단계 검증
      if (!this.validateCurrentStep()) {
        return;
      }

      // 이전 단계 비활성화
      document.getElementById(`step-${this.currentStep}`).classList.remove('active');
      document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.remove('active');
      document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.add('completed');

      // 다음 단계 활성화
      this.currentStep++;
      document.getElementById(`step-${this.currentStep}`).classList.add('active');
      document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.add('active');

      this.updateStepperProgress();
      this.updateStepTip();
      this.updateNextButton();
      
      // 단계별 초기화
      this.initializeCurrentStep();
    }
  }

  validateCurrentStep() {
    switch (this.currentStep) {
      case 1:
        if (this.uploadedFiles.length === 0) {
          this.showNotification('최소 하나 이상의 파일을 업로드해주세요.', 'warning');
          return false;
        }
        const completedFiles = this.uploadedFiles.filter(f => f.status === 'completed');
        if (completedFiles.length === 0) {
          this.showNotification('파일 업로드가 완료될 때까지 기다려주세요.', 'warning');
          return false;
        }
        break;
      case 2:
        // 설정 검증 로직
        break;
      case 3:
        if (this.trainingStatus !== 'completed') {
          this.showNotification('모델 학습이 완료될 때까지 기다려주세요.', 'warning');
          return false;
        }
        break;
      case 4:
        // 검증 완료 확인
        break;
    }
    return true;
  }

  initializeCurrentStep() {
    switch (this.currentStep) {
      case 2:
        this.initializeStep2();
        break;
      case 3:
        this.initializeStep3();
        break;
      case 4:
        this.initializeStep4();
        break;
      case 5:
        this.initializeStep5();
        break;
    }
  }

  initializeStep1() {
    // 이미 setupFileUpload에서 처리됨
  }

  initializeStep2() {
    // 모델 설정 초기화
    this.updateEstimatedTime();
  }

  initializeStep3() {
    // 학습 시작 가능 상태로 설정
    const nextBtn = document.getElementById('nextStepBtn');
    if (nextBtn) {
      nextBtn.textContent = '🚀 학습 시작';
      nextBtn.onclick = () => this.startTraining();
    }
  }

  initializeStep4() {
    // 검증 결과 로드
    this.loadValidationResults();
    
    // 테스트 파일 업로드 설정
    this.setupTestFileUpload();
  }

  initializeStep5() {
    // 배포 준비
    this.prepareDeplomynet();
  }

  startTraining() {
    if (this.isTraining) return;

    this.isTraining = true;
    this.trainingStatus = 'training';
    
    // UI 업데이트
    const nextBtn = document.getElementById('nextStepBtn');
    if (nextBtn) {
      nextBtn.textContent = '⏸️ 학습 중...';
      nextBtn.disabled = true;
    }

    // 학습 진행 시뮬레이션
    this.simulateTraining();
    
    this.showNotification('모델 학습을 시작합니다.', 'info');
    this.addLog('학습 시작', 'info');
  }

  simulateTraining() {
    let currentEpoch = 0;
    const totalEpochs = parseInt(document.getElementById('epochs')?.value || 50);
    let trainLoss = 2.5;
    let validLoss = 2.3;
    let accuracy = 60;

    this.trainingInterval = setInterval(() => {
      currentEpoch++;
      
      // 메트릭 업데이트 (시뮬레이션)
      trainLoss = Math.max(0.1, trainLoss - (Math.random() * 0.1));
      validLoss = Math.max(0.1, validLoss - (Math.random() * 0.08));
      accuracy = Math.min(95, accuracy + (Math.random() * 2));
      
      // UI 업데이트
      this.updateTrainingMetrics(currentEpoch, trainLoss, validLoss, accuracy);
      this.updateTrainingProgress(currentEpoch, totalEpochs);
      
      // 로그 추가
      if (currentEpoch % 5 === 0) {
        this.addLog(`Epoch ${currentEpoch}/${totalEpochs} - Loss: ${trainLoss.toFixed(3)}, Accuracy: ${accuracy.toFixed(1)}%`, 'info');
      }
      
      // 학습 완료
      if (currentEpoch >= totalEpochs) {
        this.completeTraining();
      }
    }, 1000); // 1초마다 업데이트 (실제로는 훨씬 느림)
  }

  updateTrainingMetrics(epoch, trainLoss, validLoss, accuracy) {
    const elements = {
      currentEpoch: epoch,
      trainLoss: trainLoss.toFixed(3),
      validLoss: validLoss.toFixed(3),
      accuracy: accuracy.toFixed(1) + '%'
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });
  }

  updateTrainingProgress(current, total) {
    const progress = (current / total) * 100;
    
    const progressBar = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${progress.toFixed(1)}%`;
    }
  }

  completeTraining() {
    if (this.trainingInterval) {
      clearInterval(this.trainingInterval);
      this.trainingInterval = null;
    }

    this.isTraining = false;
    this.trainingStatus = 'completed';
    
    // UI 업데이트
    const nextBtn = document.getElementById('nextStepBtn');
    if (nextBtn) {
      nextBtn.textContent = '➡️ 다음 단계';
      nextBtn.disabled = false;
      nextBtn.onclick = () => this.nextStep();
    }

    this.addLog('학습 완료!', 'success');
    this.showNotification('모델 학습이 성공적으로 완료되었습니다.', 'success');
    
    // 통계 업데이트
    document.getElementById('currentStatus').textContent = '학습완료';
  }

  pauseTraining() {
    if (this.trainingInterval) {
      clearInterval(this.trainingInterval);
      this.trainingInterval = null;
      this.addLog('학습 일시정지', 'warning');
      this.showNotification('학습이 일시정지되었습니다.', 'warning');
    }
  }

  stopTraining() {
    if (this.trainingInterval) {
      clearInterval(this.trainingInterval);
      this.trainingInterval = null;
    }
    
    this.isTraining = false;
    this.trainingStatus = 'stopped';
    
    this.addLog('학습 중지됨', 'error');
    this.showNotification('학습이 중지되었습니다.', 'error');
    
    // UI 리셋
    const nextBtn = document.getElementById('nextStepBtn');
    if (nextBtn) {
      nextBtn.textContent = '🚀 학습 재시작';
      nextBtn.disabled = false;
      nextBtn.onclick = () => this.startTraining();
    }
  }

  updateStepperProgress() {
    const progress = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    const progressBar = document.querySelector('.stepper-progress');
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  updateStepTip() {
    const tipElement = document.getElementById('stepTip');
    if (tipElement && this.stepTips[this.currentStep]) {
      tipElement.textContent = this.stepTips[this.currentStep];
    }
  }

  updateQuickStats() {
    const totalFiles = this.uploadedFiles.length;
    const totalSize = this.uploadedFiles.reduce((sum, file) => sum + file.size, 0);
    
    document.getElementById('totalFiles').textContent = totalFiles;
    document.getElementById('totalSize').textContent = this.formatFileSize(totalSize);
    
    this.updateEstimatedTime();
  }

  updateEstimatedTime() {
    const fileCount = this.uploadedFiles.length;
    const epochs = parseInt(document.getElementById('epochs')?.value || 50);
    
    // 간단한 시간 추정 (실제로는 더 복잡한 계산 필요)
    const estimatedMinutes = Math.max(30, fileCount * 5 + epochs * 2);
    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = estimatedMinutes % 60;
    
    const timeText = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
    document.getElementById('estimatedTime').textContent = timeText;
  }

  updateNextButton() {
    const nextBtn = document.getElementById('nextStepBtn');
    if (!nextBtn) return;

    if (this.currentStep === this.totalSteps) {
      nextBtn.textContent = '🚀 배포하기';
    } else {
      nextBtn.textContent = '➡️ 다음 단계';
    }
  }

  updateRatios(changedId) {
    const trainRatio = document.getElementById('trainRatio');
    const validRatio = document.getElementById('validRatio');
    const testRatio = document.getElementById('testRatio');
    
    if (!trainRatio || !validRatio || !testRatio) return;

    const values = {
      train: parseInt(trainRatio.value),
      valid: parseInt(validRatio.value),
      test: parseInt(testRatio.value)
    };

    // 100%를 초과하지 않도록 조정
    const total = values.train + values.valid + values.test;
    if (total > 100) {
      if (changedId === 'trainRatio') {
        values.train = 100 - values.valid - values.test;
        trainRatio.value = values.train;
      } else if (changedId === 'validRatio') {
        values.valid = 100 - values.train - values.test;
        validRatio.value = values.valid;
      } else if (changedId === 'testRatio') {
        values.test = 100 - values.train - values.valid;
        testRatio.value = values.test;
      }
    }
  }

  loadValidationResults() {
    // 검증 결과 시뮬레이션
    setTimeout(() => {
      this.showNotification('모델 검증이 완료되었습니다.', 'success');
    }, 1000);
  }

  setupTestFileUpload() {
    const testUploadZone = document.getElementById('testUploadZone');
    if (!testUploadZone) return;

    testUploadZone.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.wav,.mp3,.flac';
      input.onchange = (e) => {
        this.handleTestFile(e.target.files[0]);
      };
      input.click();
    });
  }

  handleTestFile(file) {
    if (!file) return;

    const resultsElement = document.getElementById('testResults');
    if (!resultsElement) return;

    resultsElement.textContent = '음성 파일을 분석 중...';
    
    // 테스트 결과 시뮬레이션
    setTimeout(() => {
      const sampleResults = [
        '안녕하세요. 오늘 날씨가 정말 좋습니다.',
        '음성 인식 테스트를 진행하고 있습니다.',
        '모델의 성능이 예상보다 우수합니다.'
      ];
      
      const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
      resultsElement.textContent = `인식 결과: "${randomResult}"\n\n신뢰도: 94.2%\n처리 시간: 1.8초`;
    }, 2000);
  }

  prepareDeplomynet() {
    // 배포 준비 시뮬레이션
    setTimeout(() => {
      this.showNotification('배포 환경이 준비되었습니다.', 'success');
    }, 1000);
  }

  addLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    const logEntry = {
      timestamp,
      message,
      type
    };
    
    this.logEntries.push(logEntry);
    
    const logsContainer = document.getElementById('trainingLogs');
    if (logsContainer) {
      const logElement = document.createElement('div');
      logElement.className = `log-entry ${type}`;
      logElement.innerHTML = `
        <span class="log-timestamp">[${timestamp}]</span>
        <span>${message}</span>
      `;
      logsContainer.appendChild(logElement);
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
  }

  saveProgress() {
    const progressData = {
      currentStep: this.currentStep,
      uploadedFiles: this.uploadedFiles,
      trainingStatus: this.trainingStatus,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('stt-workflow-progress', JSON.stringify(progressData));
    this.showNotification('진행상황이 저장되었습니다.', 'success');
  }

  loadTemplate() {
    // 템플릿 로드 기능
    this.showNotification('템플릿 기능은 곧 추가될 예정입니다.', 'info');
  }

  exportConfig() {
    const config = {
      modelSettings: {
        baseModel: document.getElementById('baseModel')?.value,
        learningRate: document.getElementById('learningRate')?.value,
        batchSize: document.getElementById('batchSize')?.value,
        epochs: document.getElementById('epochs')?.value
      },
      dataSettings: {
        sampleRate: document.getElementById('sampleRate')?.value,
        trainRatio: document.getElementById('trainRatio')?.value,
        validRatio: document.getElementById('validRatio')?.value,
        testRatio: document.getElementById('testRatio')?.value
      },
      exportTime: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stt-workflow-config.json';
    a.click();
    URL.revokeObjectURL(url);
    
    this.showNotification('설정이 내보내졌습니다.', 'success');
  }

  showNotification(message, type = 'info') {
    if (window.ktampComponents) {
      window.ktampComponents.showNotification(message, type, 4000);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }
}

// 전역 인스턴스 생성
window.sttWorkflow = null;

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.sttWorkflow = new STTWorkflow();
});

export default STTWorkflow;






