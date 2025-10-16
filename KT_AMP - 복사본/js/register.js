/**
 * 회원가입 기능을 위한 JavaScript
 */

class EnhancedRegister {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.newUsernameInput = document.getElementById('newUsername');
        this.emailInput = document.getElementById('email');
        this.newPasswordInput = document.getElementById('newPassword');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.fullNameInput = document.getElementById('fullName');
        this.registerButton = document.getElementById('registerButton');
        this.registerLoadingSpinner = document.getElementById('registerLoadingSpinner');
        this.registerButtonText = document.getElementById('registerButtonText');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupValidation();
        this.setupPasswordToggles();
    }

    bindEvents() {
        // 폼 제출
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // 실시간 검증
        this.newUsernameInput.addEventListener('input', () => {
            this.validateNewUsername();
        });

        this.emailInput.addEventListener('input', () => {
            this.validateEmail();
            this.showEmailSuggestions();
        });

        this.newPasswordInput.addEventListener('input', () => {
            this.validateNewPassword();
            this.checkPasswordStrength();
        });

        this.confirmPasswordInput.addEventListener('input', () => {
            this.validateConfirmPassword();
        });

        this.fullNameInput.addEventListener('input', () => {
            this.validateFullName();
        });

        // 이메일 제안 숨기기
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.email-suggestions') && e.target !== this.emailInput) {
                const suggestionsDiv = this.emailInput.parentNode.querySelector('.email-suggestions');
                if (suggestionsDiv) {
                    suggestionsDiv.style.display = 'none';
                }
            }
        });
    }

    setupPasswordToggles() {
        // 새 비밀번호 토글
        document.getElementById('newPasswordToggle').addEventListener('click', () => {
            this.togglePassword('newPassword', 'newPasswordToggle');
        });

        // 비밀번호 확인 토글
        document.getElementById('confirmPasswordToggle').addEventListener('click', () => {
            this.togglePassword('confirmPassword', 'confirmPasswordToggle');
        });
    }

    togglePassword(inputId, toggleId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleId);
        const isPassword = input.type === 'password';
        
        input.type = isPassword ? 'text' : 'password';
        toggle.textContent = isPassword ? '🙈' : '👁️';
        toggle.setAttribute('aria-label', 
            isPassword ? '비밀번호 숨김' : '비밀번호 표시'
        );
    }

    setupValidation() {
        this.validators = {
            newUsername: (value) => {
                if (!value.trim()) return '사용자 ID를 입력해주세요.';
                if (value.length < 3) return '사용자 ID는 3자 이상이어야 합니다.';
                if (value.length > 20) return '사용자 ID는 20자 이하여야 합니다.';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return '영문, 숫자, 언더스코어만 사용할 수 있습니다.';
                return null;
            },
            email: (value) => {
                if (!value.trim()) return '이메일을 입력해주세요.';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
                return null;
            },
            newPassword: (value) => {
                if (!value) return '비밀번호를 입력해주세요.';
                if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return '대문자, 소문자, 숫자를 포함해야 합니다.';
                }
                return null;
            },
            confirmPassword: (value) => {
                if (!value) return '비밀번호 확인을 입력해주세요.';
                if (value !== this.newPasswordInput.value) return '비밀번호가 일치하지 않습니다.';
                return null;
            },
            fullName: (value) => {
                if (!value.trim()) return '이름을 입력해주세요.';
                if (value.length < 2) return '이름은 2자 이상이어야 합니다.';
                if (!/^[가-힣a-zA-Z\s]+$/.test(value)) return '한글 또는 영문만 입력할 수 있습니다.';
                return null;
            }
        };
    }

    validateNewUsername() {
        const error = this.validators.newUsername(this.newUsernameInput.value);
        this.showFieldError('newUsername', error);
        return !error;
    }

    validateEmail() {
        const error = this.validators.email(this.emailInput.value);
        this.showFieldError('email', error);
        return !error;
    }

    validateNewPassword() {
        const error = this.validators.newPassword(this.newPasswordInput.value);
        this.showFieldError('newPassword', error);
        return !error;
    }

    validateConfirmPassword() {
        const error = this.validators.confirmPassword(this.confirmPasswordInput.value);
        this.showFieldError('confirmPassword', error);
        return !error;
    }

    validateFullName() {
        const error = this.validators.fullName(this.fullNameInput.value);
        this.showFieldError('fullName', error);
        return !error;
    }

    showFieldError(fieldName, error) {
        const field = document.getElementById(fieldName);
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        if (error) {
            field.style.borderColor = '#e53e3e';
            field.classList.remove('valid');
            field.classList.add('invalid');
            errorDiv.textContent = error;
            errorDiv.classList.remove('visually-hidden');
            errorDiv.setAttribute('aria-live', 'polite');
        } else {
            field.style.borderColor = '#48bb78';
            field.classList.remove('invalid');
            field.classList.add('valid');
            errorDiv.classList.add('visually-hidden');
        }
    }

    checkPasswordStrength() {
        const password = this.newPasswordInput.value;
        if (!password) {
            this.hidePasswordStrength();
            return;
        }

        let strength = 0;
        let strengthText = '';
        let strengthClass = '';

        // 강도 계산
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        // 강도 분류
        if (strength < 3) {
            strengthText = '약함: 대문자, 소문자, 숫자, 특수문자를 포함하세요';
            strengthClass = 'weak';
        } else if (strength < 4) {
            strengthText = '보통: 특수문자를 추가하면 더 안전합니다';
            strengthClass = 'medium';
        } else {
            strengthText = '강함: 안전한 비밀번호입니다';
            strengthClass = 'strong';
        }

        // 강도 표시
        this.showPasswordStrength(strengthText, strengthClass);
    }

    showPasswordStrength(text, strengthClass) {
        let strengthDiv = this.newPasswordInput.parentNode.querySelector('.password-strength');
        if (!strengthDiv) {
            strengthDiv = document.createElement('div');
            strengthDiv.className = 'password-strength';
            this.newPasswordInput.parentNode.appendChild(strengthDiv);
        }

        strengthDiv.textContent = text;
        strengthDiv.className = `password-strength ${strengthClass}`;
        strengthDiv.style.display = 'block';
    }

    hidePasswordStrength() {
        const strengthDiv = this.newPasswordInput.parentNode.querySelector('.password-strength');
        if (strengthDiv) {
            strengthDiv.style.display = 'none';
        }
    }

    showEmailSuggestions() {
        const email = this.emailInput.value;
        const atIndex = email.indexOf('@');
        
        if (atIndex > 0 && atIndex === email.length - 1) {
            const suggestions = ['gmail.com', 'naver.com', 'kakao.com', 'daum.net', 'kt.com'];
            const emailPrefix = email.substring(0, atIndex);
            
            let suggestionsDiv = this.emailInput.parentNode.querySelector('.email-suggestions');
            if (!suggestionsDiv) {
                suggestionsDiv = document.createElement('div');
                suggestionsDiv.className = 'email-suggestions';
                this.emailInput.parentNode.appendChild(suggestionsDiv);
            }
            
            suggestionsDiv.innerHTML = suggestions.map(domain => 
                `<div class="email-suggestion" onclick="window.enhancedRegister.selectEmailSuggestion('${emailPrefix}@${domain}')">${emailPrefix}@${domain}</div>`
            ).join('');
            
            suggestionsDiv.style.display = 'block';
        } else {
            this.hideEmailSuggestions();
        }
    }

    hideEmailSuggestions() {
        const suggestionsDiv = this.emailInput.parentNode.querySelector('.email-suggestions');
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
    }

    selectEmailSuggestion(email) {
        this.emailInput.value = email;
        this.hideEmailSuggestions();
        this.validateEmail();
    }

    async handleRegister() {
        // 모든 필드 검증
        const isValid = [
            this.validateNewUsername(),
            this.validateEmail(),
            this.validateNewPassword(),
            this.validateConfirmPassword(),
            this.validateFullName()
        ].every(result => result);

        // 약관 동의 확인
        const agreeTerms = document.getElementById('agreeTerms').checked;
        if (!agreeTerms) {
            this.showError('서비스 이용약관에 동의해주세요.');
            return;
        }

        if (!isValid) {
            this.showError('입력 정보를 확인해주세요.');
            return;
        }

        // 로딩 상태 시작
        this.setLoading(true);

        try {
            // 회원가입 API 호출 시뮬레이션
            const result = await this.performRegister({
                username: this.newUsernameInput.value,
                email: this.emailInput.value,
                password: this.newPasswordInput.value,
                fullName: this.fullNameInput.value,
                department: document.getElementById('department').value,
                agreeMarketing: document.getElementById('agreeMarketing').checked
            });

            if (result.success) {
                this.showSuccess('회원가입이 완료되었습니다. 로그인 화면으로 이동합니다...');
                
                // 로그인 탭으로 전환
                setTimeout(() => {
                    switchTab('login');
                    // 가입한 ID를 로그인 폼에 자동 입력
                    document.getElementById('username').value = this.newUsernameInput.value;
                    document.getElementById('password').focus();
                    this.showSuccess('가입이 완료되었습니다. 로그인해주세요.');
                }, 2000);
            } else {
                this.showError(result.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            this.showError('서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            this.setLoading(false);
        }
    }

    async performRegister(userData) {
        // 실제 구현에서는 서버 API 호출
        return new Promise((resolve) => {
            setTimeout(() => {
                // 중복 사용자 시뮬레이션
                if (userData.username === 'testUser3') {
                    resolve({ 
                        success: false, 
                        message: '이미 사용 중인 사용자 ID입니다.' 
                    });
                } else if (userData.email === 'test@example.com') {
                    resolve({ 
                        success: false, 
                        message: '이미 가입된 이메일 주소입니다.' 
                    });
                } else {
                    resolve({ success: true });
                }
            }, 3000); // 3초 로딩 시뮬레이션
        });
    }

    setLoading(isLoading) {
        this.registerButton.disabled = isLoading;
        
        if (isLoading) {
            this.registerLoadingSpinner.style.display = 'inline-block';
            this.registerButtonText.textContent = '회원가입 중...';
        } else {
            this.registerLoadingSpinner.style.display = 'none';
            this.registerButtonText.textContent = '회원가입';
        }
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        
        successMessage.style.display = 'none';
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showSuccess(message) {
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        
        errorMessage.style.display = 'none';
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 전역 변수로 인스턴스 저장
window.enhancedRegister = null;

// 초기화 함수
function initializeRegister() {
    if (document.getElementById('registerForm')) {
        window.enhancedRegister = new EnhancedRegister();
    }
}

// DOM 로드 완료 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRegister);
} else {
    initializeRegister();
}








