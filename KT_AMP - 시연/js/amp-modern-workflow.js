/**
 * AMP Modern Workflow - 2025 Design System
 * 최신 UI/UX 트랜드를 적용한 차세대 워크플로우 시스템
 */

class ModernWorkflowManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentTab = 'learning';
        this.animationQueue = [];
        this.particles = [];
        this.observers = new Map();
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupAnimations();
        this.setupInteractiveElements();
        this.setupParticleSystem();
        this.setupProgressAnimations();
        this.startRealTimeUpdates();
    }

    setupTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        
        // Theme transition with smooth color changes
        document.body.style.transition = 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Trigger theme change animation
        this.animateThemeChange();
    }

    animateThemeChange() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = this.currentTheme === 'dark' 
            ? 'radial-gradient(circle, rgba(26,32,44,0.9) 0%, rgba(26,32,44,0) 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }, 200);
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Apply animations to elements
        document.querySelectorAll('.stat-card, .activity-item, .modern-table tr').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
            fadeInObserver.observe(el);
        });

        this.observers.set('fadeIn', fadeInObserver);
    }

    setupInteractiveElements() {
        // Enhanced button interactions
        document.querySelectorAll('.modern-btn').forEach(btn => {
            this.addButtonEffects(btn);
        });

        // Table row hover effects
        document.querySelectorAll('.modern-table tr').forEach(row => {
            this.addRowEffects(row);
        });

        // Card hover effects
        document.querySelectorAll('.stat-card').forEach(card => {
            this.addCardEffects(card);
        });

        // Navigation effects
        document.querySelectorAll('.nav-item').forEach(nav => {
            this.addNavEffects(nav);
        });
    }

    addButtonEffects(button) {
        // Ripple effect
        button.addEventListener('click', (e) => {
            this.createRipple(e, button);
        });

        // Magnetic effect for primary buttons
        if (button.classList.contains('primary')) {
            button.addEventListener('mousemove', (e) => {
                this.createMagneticEffect(e, button);
            });

            button.addEventListener('mouseleave', () => {
                this.resetMagneticEffect(button);
            });
        }

        // Particle burst effect
        button.addEventListener('mouseenter', (e) => {
            if (button.classList.contains('primary')) {
                this.createParticleBurst(e, button);
            }
        });
    }

    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.opacity = '0';
        });

        setTimeout(() => ripple.remove(), 600);
    }

    createMagneticEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);

        const moveX = x * 0.3;
        const moveY = y * 0.3;

        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }

    resetMagneticEffect(element) {
        element.style.transform = 'translate(0, 0) scale(1)';
    }

    createParticleBurst(event, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            particle.style.transition = 'all 1s cubic-bezier(0.33, 1, 0.68, 1)';

            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => particle.remove(), 1000);
        }
    }

    addRowEffects(row) {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'translateX(8px) scale(1.01)';
            row.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
        });

        row.addEventListener('mouseleave', () => {
            row.style.transform = 'translateX(0) scale(1)';
            row.style.boxShadow = 'none';
        });
    }

    addCardEffects(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });

        // Add floating animation
        const randomDelay = Math.random() * 2;
        card.style.animation = `float 4s ease-in-out ${randomDelay}s infinite`;
    }

    addNavEffects(nav) {
        nav.addEventListener('click', () => {
            // Create expanding circle effect
            const circle = document.createElement('div');
            circle.style.position = 'absolute';
            circle.style.left = '50%';
            circle.style.top = '50%';
            circle.style.width = '0';
            circle.style.height = '0';
            circle.style.background = 'rgba(255, 255, 255, 0.3)';
            circle.style.borderRadius = '50%';
            circle.style.transform = 'translate(-50%, -50%)';
            circle.style.pointerEvents = 'none';
            circle.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';

            nav.style.position = 'relative';
            nav.style.overflow = 'hidden';
            nav.appendChild(circle);

            requestAnimationFrame(() => {
                circle.style.width = '200px';
                circle.style.height = '200px';
                circle.style.opacity = '0';
            });

            setTimeout(() => circle.remove(), 600);
        });
    }

    setupParticleSystem() {
        // Background particle system
        this.createBackgroundParticles();
        this.animateBackgroundParticles();
    }

    createBackgroundParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        particleContainer.style.opacity = '0.3';
        particleContainer.id = 'particle-system';

        document.body.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 220}, 70%, 70%)`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.filter = 'blur(1px)';

            const duration = Math.random() * 20 + 10;
            particle.style.animation = `floatParticle ${duration}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * duration + 's';

            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
                33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
                66% { transform: translateY(10px) translateX(-5px) rotate(240deg); }
            }
        `;
        document.head.appendChild(style);
    }

    animateBackgroundParticles() {
        // Dynamic particle movement based on mouse position
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
        });

        const animateParticles = () => {
            this.particles.forEach((particle, index) => {
                const speed = 0.5 + index * 0.1;
                const x = Math.sin(Date.now() * 0.001 * speed + index) * 30;
                const y = Math.cos(Date.now() * 0.001 * speed + index) * 20;
                
                const mouseInfluence = 20;
                const mouseX_influence = (mouseX - 0.5) * mouseInfluence;
                const mouseY_influence = (mouseY - 0.5) * mouseInfluence;

                particle.style.transform = `translate(${x + mouseX_influence}px, ${y + mouseY_influence}px)`;
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    setupProgressAnimations() {
        // Animated progress bars
        document.querySelectorAll('.progress-fill').forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.style.transition = 'width 2s cubic-bezier(0.33, 1, 0.68, 1)';
            }, index * 200);
        });

        // Animated counters
        this.animateCounters();
    }

    animateCounters() {
        document.querySelectorAll('.stat-value').forEach(counter => {
            const target = counter.textContent;
            const isPercentage = target.includes('%');
            const isTime = target.includes('s') || target.includes('ms');
            
            if (!isPercentage && !isTime && !isNaN(parseFloat(target))) {
                const targetValue = parseFloat(target);
                let currentValue = 0;
                const increment = targetValue / 60; // 60 frames animation
                
                counter.textContent = '0';
                
                const updateCounter = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                        counter.textContent = Math.floor(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                // Start animation after a delay
                setTimeout(updateCounter, Math.random() * 1000);
            }
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateRealTimeData();
        }, 3000);

        // Progress bar updates
        setInterval(() => {
            this.updateProgressBars();
        }, 5000);
    }

    updateRealTimeData() {
        // Update system health bars
        const healthBars = document.querySelectorAll('.side-section .progress-fill');
        healthBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width) || 0;
            const variation = (Math.random() - 0.5) * 10;
            const newWidth = Math.max(0, Math.min(100, currentWidth + variation));
            
            bar.style.width = newWidth + '%';
        });

        // Update activity timestamps
        document.querySelectorAll('.activity-time').forEach((time, index) => {
            const times = ['방금 전', '2분 전', '5분 전', '1시간 전', '2시간 전'];
            if (Math.random() > 0.7) {
                time.textContent = times[Math.floor(Math.random() * times.length)];
            }
        });
    }

    updateProgressBars() {
        // Update training progress
        document.querySelectorAll('.modern-table .progress-fill').forEach(bar => {
            const currentWidth = parseInt(bar.style.width) || 0;
            if (currentWidth < 100 && Math.random() > 0.5) {
                const increment = Math.floor(Math.random() * 5) + 1;
                const newWidth = Math.min(100, currentWidth + increment);
                bar.style.width = newWidth + '%';
                
                // Update percentage text
                const percentageText = bar.parentElement.nextElementSibling;
                if (percentageText) {
                    percentageText.textContent = newWidth + '%';
                }

                // Add completion effect when reaching 100%
                if (newWidth >= 100) {
                    this.celebrateCompletion(bar);
                }
            }
        });
    }

    celebrateCompletion(element) {
        // Create celebration particles
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#4ade80';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            particle.style.transition = 'all 2s cubic-bezier(0.33, 1, 0.68, 1)';

            document.body.appendChild(particle);

            const angle = (i / 20) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => particle.remove(), 2000);
        }
    }

    // Tab switching with enhanced animations
    switchTab(tabName) {
        const currentTab = document.querySelector('.tab-content.active');
        const newTab = document.getElementById(`${tabName}-tab`);
        
        if (currentTab && newTab && currentTab !== newTab) {
            // Exit animation
            currentTab.style.opacity = '0';
            currentTab.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                currentTab.classList.remove('active');
                newTab.classList.add('active');
                
                // Enter animation
                newTab.style.opacity = '0';
                newTab.style.transform = 'translateX(50px)';
                
                requestAnimationFrame(() => {
                    newTab.style.opacity = '1';
                    newTab.style.transform = 'translateX(0)';
                });
            }, 200);
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        this.currentTab = tabName;
    }

    // Enhanced file upload with drag and drop animations
    setupFileUpload() {
        document.querySelectorAll('.upload-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.style.transform = 'scale(1.05)';
                zone.style.borderColor = '#667eea';
                zone.style.background = 'rgba(102, 126, 234, 0.1)';
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                zone.style.transform = 'scale(1)';
                zone.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                zone.style.background = 'var(--glass-bg)';
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.style.transform = 'scale(1)';
                this.handleFileUpload(e.dataTransfer.files, zone);
            });
        });
    }

    handleFileUpload(files, zone) {
        // Create upload animation
        const uploadIndicator = document.createElement('div');
        uploadIndicator.style.position = 'absolute';
        uploadIndicator.style.top = '50%';
        uploadIndicator.style.left = '50%';
        uploadIndicator.style.transform = 'translate(-50%, -50%)';
        uploadIndicator.style.background = 'var(--primary-gradient)';
        uploadIndicator.style.color = 'white';
        uploadIndicator.style.padding = '12px 24px';
        uploadIndicator.style.borderRadius = 'var(--radius-lg)';
        uploadIndicator.style.fontWeight = '600';
        uploadIndicator.style.boxShadow = 'var(--shadow-lg)';
        uploadIndicator.textContent = `업로드 중... (${files.length}개 파일)`;

        zone.style.position = 'relative';
        zone.appendChild(uploadIndicator);

        // Simulate upload progress
        setTimeout(() => {
            uploadIndicator.textContent = '업로드 완료! ✨';
            uploadIndicator.style.background = 'var(--success-gradient)';
            
            setTimeout(() => {
                uploadIndicator.remove();
                this.showNotification('파일 업로드가 완료되었습니다.', 'success');
            }, 1500);
        }, 2000);
    }

    // Enhanced notification system
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'var(--glass-bg)';
        notification.style.backdropFilter = 'var(--glass-backdrop)';
        notification.style.border = '1px solid var(--glass-border)';
        notification.style.borderRadius = 'var(--radius-lg)';
        notification.style.padding = 'var(--space-4) var(--space-6)';
        notification.style.color = 'inherit';
        notification.style.fontWeight = '600';
        notification.style.zIndex = '10000';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
        notification.style.boxShadow = 'var(--shadow-xl)';
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span style="font-size: 1.2rem;">${icons[type]}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 500);
        }, duration);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 500);
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.particles.forEach(particle => particle.remove());
        document.getElementById('particle-system')?.remove();
    }
}

// Global instance
let modernWorkflow;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    modernWorkflow = new ModernWorkflowManager();
    
    // Setup global event listeners
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
        modernWorkflow.toggleTheme();
    });

    // Tab navigation
    document.querySelectorAll('.nav-item').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.closest('.nav-item').getAttribute('data-tab');
            modernWorkflow.switchTab(tabName);
        });
    });

    // Setup file upload
    modernWorkflow.setupFileUpload();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    modernWorkflow?.destroy();
});

export default ModernWorkflowManager;






