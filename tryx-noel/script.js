// ===== TRYX WEBSITE - MAIN SCRIPT =====

// Configuration
const CONFIG = {
    discordUrl: "https://discord.gg/example",
    githubUrl: "https://github.com/Moon-820/Tryx",
    keyUrl: "https://lootdest.org/s?1JF9UJv7",
    scriptUrl: "https://raw.githubusercontent.com/Moon-820/Tryx/refs/heads/main/Loader",
    developer: "moon_820"
};

// DOM Elements
let currentTab = 'loader';
let copyTimeout = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎄 TRYX Noël Edition loaded');
    
    // Initialize components
    initTypewriter();
    initCountdown();
    initEventListeners();
    initAnimations();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('🎄 Welcome to TRYX Noël Edition!', 'success');
    }, 1000);
});

// Typewriter Effect
function initTypewriter() {
    const textElement = document.getElementById('typewriter-text');
    const texts = [
        "Premium Roblox Exploit",
        "No Key System",
        "Christmas Limited Edition",
        "Actually Works",
        "50 Robux = Everything"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Christmas Countdown
function initCountdown() {
    const christmas = new Date(new Date().getFullYear(), 11, 25); // Dec 25
    
    // If Christmas passed this year, target next year
    if (christmas < new Date()) {
        christmas.setFullYear(christmas.getFullYear() + 1);
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = christmas - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Event Listeners
function initEventListeners() {
    // Buy Button
    const buyBtn = document.getElementById('buyBtn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function() {
            showNotification('🎁 Redirecting to purchase...', 'info');
            setTimeout(() => {
                window.open(CONFIG.keyUrl, '_blank');
            }, 800);
            
            // Confetti effect
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF4757', '#2ED573', '#FFD700', '#3742FA']
            });
        });
    }
    
    // Discord Link
    const discordLink = document.getElementById('discordLink');
    if (discordLink) {
        discordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('🎄 Joining Discord server...', 'info');
            setTimeout(() => {
                window.open(CONFIG.discordUrl, '_blank');
            }, 800);
        });
    }
}

// Tab Switching
function switchTab(tabName) {
    if (currentTab === tabName) return;
    
    // Update UI
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.code-content pre').forEach(pre => {
        pre.classList.remove('active');
    });
    
    // Activate new tab
    event.target.classList.add('active');
    document.getElementById(tabName + 'Code').classList.add('active');
    currentTab = tabName;
    
    // Update copy button text
    const copyBtn = document.querySelector('.btn-copy');
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    
    // Animation
    const activePre = document.getElementById(tabName + 'Code');
    activePre.style.animation = 'none';
    setTimeout(() => {
        activePre.style.animation = 'fadeIn 0.3s ease';
    }, 10);
}

// Copy Script Function
function copyScript() {
    const activeCode = document.querySelector('.code-content pre.active');
    const text = activeCode.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.btn-copy');
        const originalHTML = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#2ED573';
        
        // Show notification
        showNotification('📋 Copied to clipboard!', 'success');
        
        // Reset button after 2 seconds
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 2000);
        
        // Confetti for success
        if (currentTab === 'loader') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 }
            });
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('❌ Failed to copy', 'error');
    });
}

// Execute Script (Simulation)
function executeScript() {
    showNotification('🚀 Executing TRYX script...', 'info');
    
    // Update loader status
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.loader-status span');
    
    statusDot.style.background = '#FFD700';
    statusText.textContent = 'Executing...';
    
    // Simulate execution
    setTimeout(() => {
        statusDot.style.background = '#2ED573';
        statusText.textContent = 'Success!';
        
        showNotification('✅ TRYX loaded successfully!', 'success');
        
        // Big confetti celebration
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF4757', '#2ED573', '#FFD700', '#3742FA', '#FFFFFF']
        });
        
        // Reset status after 3 seconds
        setTimeout(() => {
            statusText.textContent = 'Ready';
        }, 3000);
    }, 1500);
}

// Show Features
function showFeatures() {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
    
    // Pulse animation on features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(255, 71, 87, 0.3)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 500);
        }, index * 100);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(46, 213, 115, 0.9)' : 
                     type === 'error' ? 'rgba(255, 71, 87, 0.9)' : 
                     'rgba(55, 66, 250, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        min-width: 300px;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature-card, .christmas-card, .developer-card, .loader-container').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Modal System
function showModal(title, content) {
    // Remove existing modal
    const existing = document.querySelector('.modal');
    if (existing) existing.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
        document.body.style.overflow = '';
    }
}

// Feature modals
function showChangelog() {
    const content = `
        <div class="changelog">
            <div class="changelog-item">
                <span class="version">v2.0.1</span>
                <span class="date">Dec 2024</span>
                <h4>Noël Edition</h4>
                <ul>
                    <li>🎄 Christmas theme added</li>
                    <li>❄️ Snow effects and animations</li>
                    <li>🎁 Special holiday features</li>
                    <li>🛠️ Performance improvements</li>
                </ul>
            </div>
            <div class="changelog-item">
                <span class="version">v2.0.0</span>
                <span class="date">Nov 2024</span>
                <h4>Major Update</h4>
                <ul>
                    <li>🎯 AIM MODES completely rebuilt</li>
                    <li>🔫 Sheriff trolling improved</li>
                    <li>🌾 Auto farming optimized</li>
                    <li>🔪 Kill Aura added</li>
                </ul>
            </div>
        </div>
    `;
    showModal('Changelog', content);
}

function showFAQ() {
    const content = `
        <div class="faq">
            <div class="faq-item">
                <h4>How much does TRYX cost?</h4>
                <p>Only 50 Robux for lifetime access. No subscriptions.</p>
            </div>
            <div class="faq-item">
                <h4>Is there a key system?</h4>
                <p>No! We hate key systems. Pay once, use forever.</p>
            </div>
            <div class="faq-item">
                <h4>Will I get banned?</h4>
                <p>TRYX uses advanced undetected methods, but use at your own risk.</p>
            </div>
            <div class="faq-item">
                <h4>What executors are supported?</h4>
                <p>Synapse X, ScriptWare, KRNL, and most popular executors.</p>
            </div>
        </div>
    `;
    showModal('FAQ', content);
}

function showSupport() {
    const content = `
        <div class="support">
            <h4>Need Help?</h4>
            <p>Contact us through:</p>
            <div class="support-options">
                <a href="${CONFIG.discordUrl}" target="_blank" class="support-option">
                    <i class="fab fa-discord"></i>
                    <span>Discord Server</span>
                </a>
                <div class="support-option">
                    <i class="fas fa-user"></i>
                    <span>Developer: ${CONFIG.developer}</span>
                </div>
            </div>
            <p class="support-note">We typically respond within 24 hours.</p>
        </div>
    `;
    showModal('Support', content);
}

function showDisclaimer() {
    const content = `
        <div class="disclaimer">
            <h4>⚠️ Important Disclaimer</h4>
            <p>TRYX is a fan project and is not affiliated with Roblox Corporation.</p>
            <p>Using exploits may violate Roblox's Terms of Service and could result in account termination.</p>
            <p>Use at your own risk. The developers are not responsible for any consequences.</p>
            <p>This software is for educational purposes only.</p>
        </div>
    `;
    showModal('Disclaimer', content);
}

function showTerms() {
    const content = `
        <div class="terms">
            <h4>Terms of Service</h4>
            <p>1. By purchasing TRYX, you agree to these terms.</p>
            <p>2. No refunds are provided after purchase.</p>
            <p>3. You may not redistribute, resell, or leak TRYX.</p>
            <p>4. Updates are provided for free for life.</p>
            <p>5. We reserve the right to terminate access for violation of terms.</p>
        </div>
    `;
    showModal('Terms of Service', content);
}

function showPrivacy() {
    const content = `
        <div class="privacy">
            <h4>Privacy Policy</h4>
            <p>1. We do not collect personal information.</p>
            <p>2. No data is stored from your usage.</p>
            <p>3. We do not sell or share any data.</p>
            <p>4. The script only communicates with our secure servers for authentication.</p>
            <p>5. Your privacy and security are our top priority.</p>
        </div>
    `;
    showModal('Privacy Policy', content);
}

// Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Konami code activated!
        showNotification('🎮 Konami Code Activated! Merry Christmas!', 'success');
        
        // Massive confetti
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                confetti({
                    particleCount: 300,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#FF4757', '#2ED573', '#FFD700', '#3742FA']
                });
            }, i * 200);
        }
        
        // Special message
        setTimeout(() => {
            showModal('🎅 Secret Message', `
                <div class="secret-message">
                    <h3>You found the secret!</h3>
                    <p>Thanks for using TRYX. Here's a special Christmas gift:</p>
                    <div class="secret-code">
                        <code>-- TRYX_SECRET: MERRY_CHRISTMAS_2024</code>
                    </div>
                    <p>Merry Christmas and happy exploiting! 🎄</p>
                </div>
            `);
        }, 1000);
        
        konamiCode = [];
    }
});

// Add CSS for modals and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background: var(--bg-card);
        border-radius: var(--border-radius);
        padding: 30px;
        width: 90%;
        max-width: 500px;
        z-index: 10001;
        position: relative;
        border: 2px solid var(--christmas-green);
        animation: fadeInUp 0.3s ease;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 28px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition-smooth);
    }
    
    .modal-close:hover {
        background: var(--christmas-red);
        color: white;
    }
    
    .changelog-item, .faq-item {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .changelog-item:last-child, .faq-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    .version, .date {
        display: inline-block;
        background: var(--christmas-red);
        color: white;
        padding: 3px 10px;
        border-radius: 12px;
        font-size: 12px;
        margin-right: 10px;
    }
    
    .date {
        background: var(--bg-primary);
        color: var(--text-secondary);
    }
    
    .changelog-item h4, .faq-item h4 {
        color: var(--christmas-green);
        margin: 10px 0;
    }
    
    .changelog-item ul {
        padding-left: 20px;
        color: var(--text-secondary);
    }
    
    .changelog-item li {
        margin-bottom: 5px;
    }
    
    .faq-item p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .support-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 20px 0;
    }
    
    .support-option {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        text-decoration: none;
        color: var(--text-primary);
        transition: var(--transition-smooth);
    }
    
    .support-option:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
    }
    
    .support-option i {
        font-size: 24px;
        color: var(--christmas-gold);
        width: 30px;
    }
    
    .support-note {
        color: var(--text-muted);
        font-size: 14px;
        margin-top: 20px;
    }
    
    .disclaimer p, .terms p, .privacy p {
        color: var(--text-secondary);
        margin-bottom: 15px;
        line-height: 1.6;
    }
    
    .secret-message {
        text-align: center;
    }
    
    .secret-code {
        background: var(--bg-primary);
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        font-family: 'JetBrains Mono', monospace;
        color: var(--christmas-green);
        border: 1px solid var(--christmas-green);
    }
`;
document.head.appendChild(style);