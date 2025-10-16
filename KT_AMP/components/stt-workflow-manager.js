/**
 * STT 워크플로우 매니저
 * 학습/배포/검증/테스트 프로세스를 통합 관리하는 고급 컴포넌트
 */

class STTWorkflowManager {
  constructor() {
    this.workflows = new Map();
    this.activeWorkflow = null;
    this.realTimeMetrics = {};
    this.notifications = [];
    
    this.init();
  }

  init() {
    this.setupEventHandlers();
    this.initializeWebSocket();
    this.loadSavedWorkflows();
    this.startMetricsCollection();
  }

  /**
   * 새 워크플로우 생성
   */
  createWorkflow(config) {
    const workflowId = this.generateWorkflowId();
    const workflow = {
      id: workflowId,
      name: config.name || `STT-Workflow-${Date.now()}`,
      status: 'created',
      steps: this.initializeSteps(),
      config: config,
      metrics: {},
      logs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.workflows.set(workflowId, workflow);
    this.activeWorkflow = workflowId;
    
    this.logEvent('info', `새 워크플로우 생성: ${workflow.name}`);
    this.saveWorkflows();
    
    return workflow;
  }

  /**
   * 워크플로우 단계 초기화
   */
  initializeSteps() {
    return {
      dataPreparation: {
        name: '데이터 준비',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        config: {}
      },
      modelConfiguration: {
        name: '모델 설정',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        config: {}
      },
      training: {
        name: '모델 학습',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        config: {},
        metrics: {
          epoch: 0,
          loss: null,
          accuracy: null,
          learningRate: null
        }
      },
      validation: {
        name: '모델 검증',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        config: {},
        metrics: {
          accuracy: null,
          wer: null,
          cer: null,
          processingTime: null
        }
      },
      deployment: {
        name: '배포 및 테스트',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        config: {},
        endpoints: []
      },
      analysis: {
        name: '성능 분석',
        status: 'pending',
        progress: 0,
        startTime: null,
        endTime: null,
        artifacts: [],
        report: null
      }
    };
  }

  /**
   * 단계 시작
   */
  startStep(workflowId, stepName) {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`워크플로우를 찾을 수 없습니다: ${workflowId}`);
    }

    const step = workflow.steps[stepName];
    if (!step) {
      throw new Error(`단계를 찾을 수 없습니다: ${stepName}`);
    }

    step.status = 'running';
    step.startTime = new Date().toISOString();
    step.progress = 0;
    
    workflow.updatedAt = new Date().toISOString();
    
    this.logEvent('info', `단계 시작: ${step.name}`);
    this.notifyStepChange(workflowId, stepName, 'started');
    
    // 단계별 특화 로직 실행
    this.executeStepLogic(workflowId, stepName);
    
    this.saveWorkflows();
  }

  /**
   * 단계별 특화 로직 실행
   */
  executeStepLogic(workflowId, stepName) {
    switch (stepName) {
      case 'dataPreparation':
        this.handleDataPreparation(workflowId);
        break;
      case 'modelConfiguration':
        this.handleModelConfiguration(workflowId);
        break;
      case 'training':
        this.handleTraining(workflowId);
        break;
      case 'validation':
        this.handleValidation(workflowId);
        break;
      case 'deployment':
        this.handleDeployment(workflowId);
        break;
      case 'analysis':
        this.handleAnalysis(workflowId);
        break;
    }
  }

  /**
   * 데이터 준비 단계 처리
   */
  async handleDataPreparation(workflowId) {
    const workflow = this.workflows.get(workflowId);
    const step = workflow.steps.dataPreparation;
    
    try {
      // 데이터 검증
      this.updateStepProgress(workflowId, 'dataPreparation', 20);
      await this.sleep(1000);
      
      // 전처리
      this.updateStepProgress(workflowId, 'dataPreparation', 50);
      await this.sleep(2000);
      
      // 데이터셋 분할
      this.updateStepProgress(workflowId, 'dataPreparation', 80);
      await this.sleep(1000);
      
      // 완료
      this.completeStep(workflowId, 'dataPreparation', {
        totalFiles: 150,
        totalDuration: '2.5시간',
        trainSet: 120,
        validationSet: 20,
        testSet: 10
      });
      
    } catch (error) {
      this.failStep(workflowId, 'dataPreparation', error.message);
    }
  }

  /**
   * 모델 학습 단계 처리
   */
  async handleTraining(workflowId) {
    const workflow = this.workflows.get(workflowId);
    const step = workflow.steps.training;
    
    // 학습 시뮬레이션
    const totalEpochs = 100;
    let currentEpoch = 0;
    
    const trainingInterval = setInterval(() => {
      currentEpoch++;
      const progress = (currentEpoch / totalEpochs) * 100;
      
      // 메트릭 업데이트
      step.metrics.epoch = currentEpoch;
      step.metrics.loss = (Math.random() * 0.5 + 0.1).toFixed(4);
      step.metrics.accuracy = (85 + Math.random() * 10).toFixed(2);
      step.metrics.learningRate = (0.001 * Math.pow(0.95, Math.floor(currentEpoch / 10))).toExponential(3);
      
      this.updateStepProgress(workflowId, 'training', progress);
      
      // 로그 추가
      if (currentEpoch % 10 === 0) {
        this.logEvent('info', 
          `Epoch ${currentEpoch}/${totalEpochs} - Loss: ${step.metrics.loss}, Accuracy: ${step.metrics.accuracy}%`
        );
      }
      
      // 완료 체크
      if (currentEpoch >= totalEpochs) {
        clearInterval(trainingInterval);
        this.completeStep(workflowId, 'training', {
          finalAccuracy: step.metrics.accuracy,
          finalLoss: step.metrics.loss,
          totalEpochs: totalEpochs,
          modelSize: '2.3GB'
        });
      }
    }, 200); // 200ms마다 업데이트
  }

  /**
   * 모델 검증 단계 처리
   */
  async handleValidation(workflowId) {
    const workflow = this.workflows.get(workflowId);
    const step = workflow.steps.validation;
    
    try {
      // 테스트 데이터 로드
      this.updateStepProgress(workflowId, 'validation', 20);
      await this.sleep(1000);
      
      // 추론 실행
      this.updateStepProgress(workflowId, 'validation', 60);
      await this.sleep(3000);
      
      // 메트릭 계산
      this.updateStepProgress(workflowId, 'validation', 90);
      
      step.metrics.accuracy = (92 + Math.random() * 5).toFixed(2);
      step.metrics.wer = (3 + Math.random() * 4).toFixed(2);
      step.metrics.cer = (1.5 + Math.random() * 2).toFixed(2);
      step.metrics.processingTime = (1.8 + Math.random() * 0.8).toFixed(2);
      
      await this.sleep(1000);
      
      this.completeStep(workflowId, 'validation', step.metrics);
      
    } catch (error) {
      this.failStep(workflowId, 'validation', error.message);
    }
  }

  /**
   * 단계 진행률 업데이트
   */
  updateStepProgress(workflowId, stepName, progress) {
    const workflow = this.workflows.get(workflowId);
    if (workflow && workflow.steps[stepName]) {
      workflow.steps[stepName].progress = Math.min(100, Math.max(0, progress));
      workflow.updatedAt = new Date().toISOString();
      
      this.notifyProgressUpdate(workflowId, stepName, progress);
      this.saveWorkflows();
    }
  }

  /**
   * 단계 완료
   */
  completeStep(workflowId, stepName, result = {}) {
    const workflow = this.workflows.get(workflowId);
    const step = workflow.steps[stepName];
    
    step.status = 'completed';
    step.progress = 100;
    step.endTime = new Date().toISOString();
    step.result = result;
    
    workflow.updatedAt = new Date().toISOString();
    
    this.logEvent('success', `단계 완료: ${step.name}`);
    this.notifyStepChange(workflowId, stepName, 'completed');
    
    // 다음 단계 자동 시작 (옵션)
    if (this.shouldAutoStartNextStep(stepName)) {
      const nextStep = this.getNextStep(stepName);
      if (nextStep) {
        setTimeout(() => {
          this.startStep(workflowId, nextStep);
        }, 2000);
      }
    }
    
    this.saveWorkflows();
  }

  /**
   * 단계 실패
   */
  failStep(workflowId, stepName, error) {
    const workflow = this.workflows.get(workflowId);
    const step = workflow.steps[stepName];
    
    step.status = 'failed';
    step.endTime = new Date().toISOString();
    step.error = error;
    
    workflow.updatedAt = new Date().toISOString();
    
    this.logEvent('error', `단계 실패: ${step.name} - ${error}`);
    this.notifyStepChange(workflowId, stepName, 'failed');
    
    this.saveWorkflows();
  }

  /**
   * 다음 단계 결정
   */
  getNextStep(currentStep) {
    const stepOrder = [
      'dataPreparation',
      'modelConfiguration', 
      'training',
      'validation',
      'deployment',
      'analysis'
    ];
    
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
  }

  /**
   * 자동 다음 단계 시작 여부
   */
  shouldAutoStartNextStep(stepName) {
    // 학습 단계는 자동으로 검증 단계로 이동
    return ['dataPreparation', 'training'].includes(stepName);
  }

  /**
   * 실시간 메트릭 수집
   */
  startMetricsCollection() {
    setInterval(() => {
      this.collectSystemMetrics();
      this.updateRealtimeCharts();
    }, 5000);
  }

  collectSystemMetrics() {
    // 시스템 메트릭 시뮬레이션
    this.realTimeMetrics = {
      timestamp: new Date().toISOString(),
      cpu: {
        usage: Math.random() * 30 + 60, // 60-90%
        temperature: Math.random() * 20 + 65 // 65-85°C
      },
      gpu: {
        usage: Math.random() * 40 + 50, // 50-90%
        memory: Math.random() * 20 + 70, // 70-90%
        temperature: Math.random() * 15 + 70 // 70-85°C
      },
      memory: {
        used: Math.random() * 20 + 70, // 70-90%
        available: Math.random() * 10 + 5 // 5-15GB
      },
      network: {
        inbound: Math.random() * 100 + 50, // 50-150 Mbps
        outbound: Math.random() * 50 + 20 // 20-70 Mbps
      }
    };
  }

  /**
   * 워크플로우 일시정지
   */
  pauseWorkflow(workflowId) {
    const workflow = this.workflows.get(workflowId);
    if (workflow) {
      // 현재 실행 중인 단계 찾기
      for (const [stepName, step] of Object.entries(workflow.steps)) {
        if (step.status === 'running') {
          step.status = 'paused';
          step.pausedAt = new Date().toISOString();
          break;
        }
      }
      
      workflow.status = 'paused';
      workflow.updatedAt = new Date().toISOString();
      
      this.logEvent('warning', '워크플로우 일시정지됨');
      this.saveWorkflows();
    }
  }

  /**
   * 워크플로우 재시작
   */
  resumeWorkflow(workflowId) {
    const workflow = this.workflows.get(workflowId);
    if (workflow) {
      // 일시정지된 단계 찾기
      for (const [stepName, step] of Object.entries(workflow.steps)) {
        if (step.status === 'paused') {
          step.status = 'running';
          step.resumedAt = new Date().toISOString();
          this.executeStepLogic(workflowId, stepName);
          break;
        }
      }
      
      workflow.status = 'running';
      workflow.updatedAt = new Date().toISOString();
      
      this.logEvent('info', '워크플로우 재시작됨');
      this.saveWorkflows();
    }
  }

  /**
   * 워크플로우 중단
   */
  stopWorkflow(workflowId) {
    const workflow = this.workflows.get(workflowId);
    if (workflow) {
      // 모든 실행 중인 단계 중단
      for (const step of Object.values(workflow.steps)) {
        if (step.status === 'running' || step.status === 'paused') {
          step.status = 'stopped';
          step.stoppedAt = new Date().toISOString();
        }
      }
      
      workflow.status = 'stopped';
      workflow.updatedAt = new Date().toISOString();
      
      this.logEvent('warning', '워크플로우 중단됨');
      this.saveWorkflows();
    }
  }

  /**
   * 워크플로우 복제
   */
  cloneWorkflow(workflowId, newName) {
    const originalWorkflow = this.workflows.get(workflowId);
    if (!originalWorkflow) {
      throw new Error(`워크플로우를 찾을 수 없습니다: ${workflowId}`);
    }
    
    const clonedWorkflow = {
      ...originalWorkflow,
      id: this.generateWorkflowId(),
      name: newName || `${originalWorkflow.name} (복사본)`,
      status: 'created',
      steps: this.initializeSteps(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 설정만 복사, 진행 상태는 초기화
    for (const [stepName, originalStep] of Object.entries(originalWorkflow.steps)) {
      clonedWorkflow.steps[stepName].config = { ...originalStep.config };
    }
    
    this.workflows.set(clonedWorkflow.id, clonedWorkflow);
    this.logEvent('info', `워크플로우 복제 완료: ${clonedWorkflow.name}`);
    
    return clonedWorkflow;
  }

  /**
   * 성능 비교 분석
   */
  compareWorkflows(workflowIds) {
    const comparison = {
      workflows: [],
      metrics: {},
      summary: {}
    };
    
    for (const id of workflowIds) {
      const workflow = this.workflows.get(id);
      if (workflow) {
        comparison.workflows.push({
          id: workflow.id,
          name: workflow.name,
          accuracy: workflow.steps.validation?.metrics?.accuracy,
          wer: workflow.steps.validation?.metrics?.wer,
          processingTime: workflow.steps.validation?.metrics?.processingTime,
          trainingTime: this.calculateTrainingTime(workflow),
          modelSize: workflow.steps.training?.result?.modelSize
        });
      }
    }
    
    // 최고 성능 모델 찾기
    if (comparison.workflows.length > 0) {
      const bestAccuracy = Math.max(...comparison.workflows.map(w => parseFloat(w.accuracy || 0)));
      const bestWER = Math.min(...comparison.workflows.map(w => parseFloat(w.wer || 100)));
      
      comparison.summary = {
        bestAccuracy: bestAccuracy,
        bestWER: bestWER,
        recommendedModel: comparison.workflows.find(w => 
          parseFloat(w.accuracy || 0) === bestAccuracy
        )?.name
      };
    }
    
    return comparison;
  }

  /**
   * 자동 하이퍼파라미터 튜닝
   */
  async autoTuneHyperparameters(baseWorkflowId, tuningConfig) {
    const baseWorkflow = this.workflows.get(baseWorkflowId);
    if (!baseWorkflow) {
      throw new Error('기준 워크플로우를 찾을 수 없습니다');
    }
    
    const tuningResults = [];
    const parameterSets = this.generateParameterSets(tuningConfig);
    
    for (let i = 0; i < parameterSets.length; i++) {
      const params = parameterSets[i];
      const tuningWorkflow = this.cloneWorkflow(
        baseWorkflowId, 
        `AutoTune-${i + 1}-LR${params.learningRate}-BS${params.batchSize}`
      );
      
      // 파라미터 적용
      tuningWorkflow.steps.modelConfiguration.config = {
        ...tuningWorkflow.steps.modelConfiguration.config,
        ...params
      };
      
      // 학습 실행
      await this.runWorkflowAutomated(tuningWorkflow.id);
      
      tuningResults.push({
        parameters: params,
        workflow: tuningWorkflow,
        performance: tuningWorkflow.steps.validation?.metrics
      });
    }
    
    // 최적 파라미터 선택
    const bestResult = tuningResults.reduce((best, current) => {
      const currentAccuracy = parseFloat(current.performance?.accuracy || 0);
      const bestAccuracy = parseFloat(best.performance?.accuracy || 0);
      return currentAccuracy > bestAccuracy ? current : best;
    });
    
    this.logEvent('success', 
      `자동 튜닝 완료 - 최적 파라미터: LR=${bestResult.parameters.learningRate}, BS=${bestResult.parameters.batchSize}`
    );
    
    return {
      bestParameters: bestResult.parameters,
      bestWorkflow: bestResult.workflow,
      allResults: tuningResults
    };
  }

  /**
   * 파라미터 세트 생성
   */
  generateParameterSets(config) {
    const sets = [];
    const learningRates = config.learningRates || [0.001, 0.01, 0.1];
    const batchSizes = config.batchSizes || [16, 32, 64];
    
    for (const lr of learningRates) {
      for (const bs of batchSizes) {
        sets.push({
          learningRate: lr,
          batchSize: bs,
          epochs: config.epochs || 50
        });
      }
    }
    
    return sets;
  }

  /**
   * 워크플로우 자동 실행
   */
  async runWorkflowAutomated(workflowId) {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return;
    
    const steps = Object.keys(workflow.steps);
    
    for (const stepName of steps) {
      this.startStep(workflowId, stepName);
      
      // 단계 완료까지 대기
      await this.waitForStepCompletion(workflowId, stepName);
      
      // 실패시 중단
      if (workflow.steps[stepName].status === 'failed') {
        break;
      }
    }
  }

  /**
   * 단계 완료 대기
   */
  waitForStepCompletion(workflowId, stepName) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const workflow = this.workflows.get(workflowId);
        const step = workflow.steps[stepName];
        
        if (step.status === 'completed' || step.status === 'failed') {
          clearInterval(checkInterval);
          resolve();
        }
      }, 1000);
    });
  }

  /**
   * 유틸리티 메서드들
   */
  generateWorkflowId() {
    return 'wf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  calculateTrainingTime(workflow) {
    const training = workflow.steps.training;
    if (training.startTime && training.endTime) {
      const start = new Date(training.startTime);
      const end = new Date(training.endTime);
      return Math.round((end - start) / 1000 / 60); // 분 단위
    }
    return null;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logEvent(level, message) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level,
      message: message
    };
    
    // 활성 워크플로우에 로그 추가
    if (this.activeWorkflow) {
      const workflow = this.workflows.get(this.activeWorkflow);
      if (workflow) {
        workflow.logs.push(logEntry);
        
        // 최대 1000개 로그만 유지
        if (workflow.logs.length > 1000) {
          workflow.logs = workflow.logs.slice(-1000);
        }
      }
    }
    
    // 글로벌 이벤트 발생
    this.notifyLogEvent(logEntry);
  }

  /**
   * 이벤트 알림
   */
  notifyStepChange(workflowId, stepName, action) {
    const event = new CustomEvent('stt-workflow-step-change', {
      detail: { workflowId, stepName, action }
    });
    document.dispatchEvent(event);
  }

  notifyProgressUpdate(workflowId, stepName, progress) {
    const event = new CustomEvent('stt-workflow-progress', {
      detail: { workflowId, stepName, progress }
    });
    document.dispatchEvent(event);
  }

  notifyLogEvent(logEntry) {
    const event = new CustomEvent('stt-workflow-log', {
      detail: logEntry
    });
    document.dispatchEvent(event);
  }

  /**
   * 데이터 저장/로드
   */
  saveWorkflows() {
    try {
      const data = {};
      for (const [id, workflow] of this.workflows) {
        data[id] = workflow;
      }
      localStorage.setItem('stt-workflows', JSON.stringify(data));
    } catch (error) {
      console.error('워크플로우 저장 실패:', error);
    }
  }

  loadSavedWorkflows() {
    try {
      const saved = localStorage.getItem('stt-workflows');
      if (saved) {
        const data = JSON.parse(saved);
        for (const [id, workflow] of Object.entries(data)) {
          this.workflows.set(id, workflow);
        }
      }
    } catch (error) {
      console.error('워크플로우 로드 실패:', error);
    }
  }

  /**
   * WebSocket 연결 (실시간 통신)
   */
  initializeWebSocket() {
    // 실제 구현에서는 WebSocket 서버 연결
    // 여기서는 시뮬레이션
    console.log('🔌 WebSocket 연결 시뮬레이션');
  }

  /**
   * 실시간 차트 업데이트
   */
  updateRealtimeCharts() {
    const event = new CustomEvent('stt-metrics-update', {
      detail: this.realTimeMetrics
    });
    document.dispatchEvent(event);
  }

  /**
   * 공개 API
   */
  getWorkflow(id) {
    return this.workflows.get(id);
  }

  getAllWorkflows() {
    return Array.from(this.workflows.values());
  }

  getActiveWorkflow() {
    return this.activeWorkflow ? this.workflows.get(this.activeWorkflow) : null;
  }

  setActiveWorkflow(id) {
    if (this.workflows.has(id)) {
      this.activeWorkflow = id;
      return true;
    }
    return false;
  }

  deleteWorkflow(id) {
    const deleted = this.workflows.delete(id);
    if (deleted) {
      if (this.activeWorkflow === id) {
        this.activeWorkflow = null;
      }
      this.saveWorkflows();
      this.logEvent('info', `워크플로우 삭제됨: ${id}`);
    }
    return deleted;
  }

  getWorkflowSummary() {
    const total = this.workflows.size;
    const running = Array.from(this.workflows.values()).filter(w => w.status === 'running').length;
    const completed = Array.from(this.workflows.values()).filter(w => w.status === 'completed').length;
    const failed = Array.from(this.workflows.values()).filter(w => w.status === 'failed').length;
    
    return { total, running, completed, failed };
  }
}

// 전역 인스턴스 생성
window.sttWorkflowManager = new STTWorkflowManager();

export default STTWorkflowManager;










