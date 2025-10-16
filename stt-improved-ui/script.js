// STT-SMP 통합 관리 시스템 JavaScript
class STTManager {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordingTimer = null;
        this.recordingTime = 0;
        this.processQueue = [];
        this.results = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadHistory();
        this.updateStats();
        this.initializeProgress();
    }

    setupEventListeners() {
        // File upload
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        
        uploadZone.addEventListener('click', () => fileInput.click());
        uploadZone.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadZone.addEventListener('drop', this.handleFileDrop.bind(this));
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Recording
        document.getElementById('recordBtn').addEventListener('click', this.toggleRecording.bind(this));

        // Process button
        document.getElementById('processBtn').addEventListener('click', this.startProcessing.bind(this));

        // Results tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', this.switchTab.bind(this));
        });

        // Export and clear buttons
        document.getElementById('exportBtn').addEventListener('click', this.exportResults.bind(this));
        document.getElementById('clearBtn').addEventListener('click', this.clearResults.bind(this));

        // Settings modal
        document.querySelector('.btn-settings').addEventListener('click', this.openSettings.bind(this));
        document.getElementById('closeModal').addEventListener('click', this.closeSettings.bind(this));
        document.querySelector('.btn-cancel').addEventListener('click', this.closeSettings.bind(this));
        document.querySelector('.btn-save').addEventListener('click', this.saveSettings.bind(this));

        // Help and API buttons
        document.querySelector('.btn-help').addEventListener('click', this.showHelp.bind(this));
        document.querySelector('.btn-api').addEventListener('click', this.showAPI.bind(this));

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('settingsModal');
            if (e.target === modal) {
                this.closeSettings();
            }
        });
    }

    // File handling
    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.remove('dragover');
    }

    handleFileDrop(e) {
        e.preventDefault();
        document.getElementById('uploadZone').classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files).filter(file => 
            file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|m4a|aac|ogg)$/i)
        );
        this.addFiles(files);
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        this.addFiles(files);
    }

    addFiles(files) {
        const fileList = document.getElementById('fileList');
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-audio"></i>
                    <span>${file.name}</span>
                    <small>(${this.formatFileSize(file.size)})</small>
                </div>
                <button class="btn-remove" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });

        this.processQueue.push(...files);
        this.updateProcessButton();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Recording functionality
    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            this.recordingTime = 0;

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                this.addRecordedAudio(audioBlob);
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordingUI();
            this.startRecordingTimer();
            this.startAudioLevelMonitoring(stream);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            this.showNotification('마이크 접근 권한이 필요합니다.', 'error');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        this.isRecording = false;
        this.updateRecordingUI();
        this.stopRecordingTimer();
    }

    addRecordedAudio(audioBlob) {
        const fileName = `Recording_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.wav`;
        const file = new File([audioBlob], fileName, { type: 'audio/wav' });
        this.addFiles([file]);
    }

    updateRecordingUI() {
        const recordBtn = document.getElementById('recordBtn');
        if (this.isRecording) {
            recordBtn.innerHTML = '<i class="fas fa-stop"></i><span>녹음 중지</span>';
            recordBtn.classList.add('recording');
        } else {
            recordBtn.innerHTML = '<i class="fas fa-circle"></i><span>녹음 시작</span>';
            recordBtn.classList.remove('recording');
        }
    }

    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            this.recordingTime++;
            const minutes = Math.floor(this.recordingTime / 60);
            const seconds = this.recordingTime % 60;
            document.querySelector('.recording-time').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
        document.querySelector('.recording-time').textContent = '00:00';
    }

    startAudioLevelMonitoring(stream) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        microphone.connect(analyser);
        analyser.fftSize = 256;

        const updateLevel = () => {
            if (this.isRecording) {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                const percentage = (average / 255) * 100;
                document.querySelector('.level-bar').style.width = `${percentage}%`;
                requestAnimationFrame(updateLevel);
            }
        };

        updateLevel();
    }

    // Processing functionality
    async startProcessing() {
        if (this.processQueue.length === 0) {
            this.showNotification('처리할 파일이 없습니다.', 'warning');
            return;
        }

        const processBtn = document.getElementById('processBtn');
        processBtn.disabled = true;
        processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리 중...';

        try {
            for (let i = 0; i < this.processQueue.length; i++) {
                const file = this.processQueue[i];
                await this.processFile(file, i);
            }

            this.showNotification('모든 파일 처리가 완료되었습니다.', 'success');
            this.processQueue = [];
            this.updateProcessButton();

        } catch (error) {
            console.error('Processing error:', error);
            this.showNotification('처리 중 오류가 발생했습니다.', 'error');
        } finally {
            processBtn.disabled = false;
            processBtn.innerHTML = '<i class="fas fa-play"></i> STT 변환 시작';
        }
    }

    async processFile(file, index) {
        const statusQueue = document.getElementById('statusQueue');
        const statusItem = document.createElement('div');
        statusItem.className = 'status-item processing';
        statusItem.innerHTML = `
            <span>${file.name}</span>
            <span>처리 중...</span>
        `;
        statusQueue.appendChild(statusItem);

        // 진행률 업데이트
        const progress = ((index + 1) / this.processQueue.length) * 100;
        document.getElementById('overallProgress').style.width = `${progress}%`;
        document.querySelector('.progress-percent').textContent = `${Math.round(progress)}%`;

        try {
            // 시뮬레이션된 STT 처리 (실제로는 API 호출)
            const result = await this.simulateSTTProcessing(file);
            
            statusItem.className = 'status-item completed';
            statusItem.innerHTML = `
                <span>${file.name}</span>
                <span>완료</span>
            `;

            this.results.push({
                fileName: file.name,
                timestamp: new Date(),
                result: result
            });

            this.updateResults();
            this.addToHistory(file.name, result);

        } catch (error) {
            statusItem.className = 'status-item error';
            statusItem.innerHTML = `
                <span>${file.name}</span>
                <span>오류</span>
            `;
            throw error;
        }
    }

    async simulateSTTProcessing(file) {
        // 실제 STT API 호출을 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        const sampleTexts = [
            "안녕하세요. 오늘 회의에서 논의할 주요 안건은 다음과 같습니다. 첫 번째로 프로젝트 진행 현황을 점검하고, 두 번째로 예산 배정에 대해 검토하겠습니다.",
            "음성 인식 기술의 발전으로 인해 다양한 분야에서 활용도가 높아지고 있습니다. 특히 고객 서비스와 교육 분야에서 큰 효과를 보이고 있습니다.",
            "날씨가 좋네요. 오늘은 산책을 하기에 딱 좋은 날씨입니다. 미세먼지도 적고 바람도 시원해서 기분이 좋습니다.",
            "회사의 새로운 정책에 대해 설명드리겠습니다. 재택근무 확대와 유연근무제 도입으로 직원들의 만족도를 높이고자 합니다."
        ];

        const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        
        return {
            text: text,
            confidence: 0.85 + Math.random() * 0.14,
            duration: Math.random() * 120 + 30,
            words: this.generateWordTimestamps(text),
            language: document.getElementById('languageSelect').value,
            speakerSeparation: document.getElementById('speakerSeparation').checked
        };
    }

    generateWordTimestamps(text) {
        const words = text.split(' ');
        let currentTime = 0;
        
        return words.map(word => {
            const duration = 0.3 + Math.random() * 0.7;
            const result = {
                word: word,
                start: currentTime,
                end: currentTime + duration,
                confidence: 0.8 + Math.random() * 0.2
            };
            currentTime += duration + 0.1;
            return result;
        });
    }

    updateResults() {
        if (this.results.length === 0) return;

        const latestResult = this.results[this.results.length - 1];
        
        // Text tab
        document.getElementById('textResult').innerHTML = `
            <div class="result-header">
                <h4>${latestResult.fileName}</h4>
                <div class="result-meta">
                    <span>정확도: ${(latestResult.result.confidence * 100).toFixed(1)}%</span>
                    <span>길이: ${latestResult.result.duration.toFixed(1)}초</span>
                    <span>언어: ${latestResult.result.language}</span>
                </div>
            </div>
            <div class="result-text">${latestResult.result.text}</div>
        `;

        // JSON tab
        document.getElementById('jsonResult').textContent = JSON.stringify(latestResult.result, null, 2);

        // SRT tab
        document.getElementById('srtResult').textContent = this.generateSRT(latestResult.result);
    }

    generateSRT(result) {
        if (!result.words) return '';
        
        let srt = '';
        let subtitle = 1;
        let currentText = '';
        let startTime = 0;
        
        result.words.forEach((word, index) => {
            if (currentText === '') {
                startTime = word.start;
            }
            
            currentText += word.word + ' ';
            
            // 10단어마다 또는 마지막 단어일 때 자막 생성
            if (currentText.split(' ').length >= 10 || index === result.words.length - 1) {
                const endTime = word.end;
                srt += `${subtitle}\n`;
                srt += `${this.formatSRTTime(startTime)} --> ${this.formatSRTTime(endTime)}\n`;
                srt += `${currentText.trim()}\n\n`;
                
                subtitle++;
                currentText = '';
            }
        });
        
        return srt;
    }

    formatSRTTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
    }

    // UI Updates
    updateProcessButton() {
        const processBtn = document.getElementById('processBtn');
        if (this.processQueue.length > 0) {
            processBtn.textContent = `STT 변환 시작 (${this.processQueue.length}개 파일)`;
            processBtn.disabled = false;
        } else {
            processBtn.innerHTML = '<i class="fas fa-play"></i> STT 변환 시작';
            processBtn.disabled = true;
        }
    }

    switchTab(e) {
        const targetTab = e.target.dataset.tab;
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        e.target.classList.add('active');
        document.getElementById(`${targetTab}Tab`).classList.add('active');
    }

    exportResults() {
        if (this.results.length === 0) {
            this.showNotification('내보낼 결과가 없습니다.', 'warning');
            return;
        }

        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        const latestResult = this.results[this.results.length - 1];
        
        let content, filename, mimeType;
        
        switch (activeTab) {
            case 'text':
                content = latestResult.result.text;
                filename = `${latestResult.fileName.replace(/\.[^/.]+$/, "")}.txt`;
                mimeType = 'text/plain';
                break;
            case 'json':
                content = JSON.stringify(latestResult.result, null, 2);
                filename = `${latestResult.fileName.replace(/\.[^/.]+$/, "")}.json`;
                mimeType = 'application/json';
                break;
            case 'srt':
                content = this.generateSRT(latestResult.result);
                filename = `${latestResult.fileName.replace(/\.[^/.]+$/, "")}.srt`;
                mimeType = 'text/plain';
                break;
        }

        this.downloadFile(content, filename, mimeType);
        this.showNotification(`${filename} 파일이 다운로드되었습니다.`, 'success');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    clearResults() {
        this.results = [];
        document.getElementById('textResult').innerHTML = '<p class="placeholder">STT 변환 결과가 여기에 표시됩니다...</p>';
        document.getElementById('jsonResult').textContent = '';
        document.getElementById('srtResult').textContent = '';
        document.getElementById('statusQueue').innerHTML = '';
        document.getElementById('overallProgress').style.width = '0%';
        document.querySelector('.progress-percent').textContent = '0%';
        this.showNotification('결과가 삭제되었습니다.', 'info');
    }

    // Settings
    openSettings() {
        document.getElementById('settingsModal').classList.add('show');
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('show');
    }

    saveSettings() {
        const apiEndpoint = document.getElementById('apiEndpoint').value;
        const apiKey = document.getElementById('apiKey').value;
        const autoSave = document.getElementById('autoSave').checked;
        const notifications = document.getElementById('notifications').checked;

        // 설정 저장 (실제로는 localStorage 또는 서버에 저장)
        localStorage.setItem('stt-settings', JSON.stringify({
            apiEndpoint,
            apiKey,
            autoSave,
            notifications
        }));

        this.showNotification('설정이 저장되었습니다.', 'success');
        this.closeSettings();
    }

    // History and Statistics
    addToHistory(fileName, result) {
        const historyList = document.getElementById('historyList');
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-info">
                <div class="history-name">${fileName}</div>
                <div class="history-time">${new Date().toLocaleString('ko-KR')}</div>
            </div>
            <button class="history-action" onclick="sttManager.viewHistoryResult('${fileName}')">
                보기
            </button>
        `;
        historyList.insertBefore(historyItem, historyList.firstChild);

        // 최대 10개까지만 표시
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    loadHistory() {
        // 시뮬레이션된 이력 데이터
        const sampleHistory = [
            { name: 'meeting_20250105.mp3', time: '2025-01-05 14:30' },
            { name: 'interview_audio.wav', time: '2025-01-04 10:15' },
            { name: 'presentation_record.m4a', time: '2025-01-03 16:45' }
        ];

        const historyList = document.getElementById('historyList');
        sampleHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-info">
                    <div class="history-name">${item.name}</div>
                    <div class="history-time">${item.time}</div>
                </div>
                <button class="history-action" onclick="sttManager.viewHistoryResult('${item.name}')">
                    보기
                </button>
            `;
            historyList.appendChild(historyItem);
        });
    }

    viewHistoryResult(fileName) {
        this.showNotification(`${fileName}의 결과를 불러오는 중...`, 'info');
        // 실제로는 서버에서 해당 파일의 결과를 가져와서 표시
    }

    updateStats() {
        // 시뮬레이션된 통계 데이터 (실제로는 서버에서 가져옴)
        const stats = {
            todayProcessed: 24 + Math.floor(Math.random() * 10),
            weekProcessed: 156 + Math.floor(Math.random() * 50),
            accuracy: (98.5 + Math.random() * 1.4).toFixed(1),
            avgResponse: (2.3 + Math.random() * 0.7).toFixed(1)
        };

        document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = stats.todayProcessed;
        document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = stats.weekProcessed;
        document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = stats.accuracy + '%';
        document.querySelector('.stat-item:nth-child(4) .stat-value').textContent = stats.avgResponse + 's';
    }

    initializeProgress() {
        document.getElementById('overallProgress').style.width = '0%';
        document.querySelector('.progress-percent').textContent = '0%';
    }

    // Help and API
    showHelp() {
        window.open('https://docs.stt-smp.com/help', '_blank');
    }

    showAPI() {
        window.open('https://docs.stt-smp.com/api', '_blank');
    }

    // Notifications
    showNotification(message, type = 'info') {
        // 간단한 알림 시스템 (실제로는 더 정교한 토스트 알림 구현)
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // 애니메이션
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 자동 제거
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

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#38a169',
            error: '#e53e3e',
            warning: '#ed8936',
            info: '#667eea'
        };
        return colors[type] || '#667eea';
    }
}

// 애플리케이션 초기화
let sttManager;
document.addEventListener('DOMContentLoaded', () => {
    sttManager = new STTManager();
});

// 전역 함수들
window.sttManager = sttManager;