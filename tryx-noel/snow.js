// ===== SNOW EFFECT =====

class SnowEffect {
    constructor() {
        this.canvas = document.getElementById('snow-container');
        this.flakes = [];
        this.maxFlakes = 150;
        this.wind = 0;
        this.lastTime = 0;
        
        this.init();
    }
    
    init() {
        // Create canvas
        this.canvas.innerHTML = '';
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create initial flakes
        for (let i = 0; i < this.maxFlakes; i++) {
            this.createFlake(true);
        }
        
        // Start animation
        this.animate(0);
        
        // Add wind effect with mouse
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            this.wind = (e.clientX - centerX) / centerX * 2;
        });
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    createFlake(randomY = false) {
        const size = Math.random() * 5 + 2;
        const flake = {
            x: Math.random() * this.width,
            y: randomY ? Math.random() * this.height : -size,
            size: size,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            sway: Math.random() * 0.5 - 0.25,
            swaySpeed: Math.random() * 0.02 + 0.01
        };
        this.flakes.push(flake);
    }
    
    animate(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        // Clear canvas with slight fade for trail effect
        this.ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Update and draw flakes
        for (let i = this.flakes.length - 1; i >= 0; i--) {
            const flake = this.flakes[i];
            
            // Update position
            flake.y += flake.speed;
            flake.x += Math.sin(timestamp * flake.swaySpeed) * flake.sway + this.wind;
            
            // Remove if out of bounds
            if (flake.y > this.height || flake.x < -flake.size || flake.x > this.width + flake.size) {
                this.flakes.splice(i, 1);
                this.createFlake();
                continue;
            }
            
            // Draw flake
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.fill();
            
            // Add glow for larger flakes
            if (flake.size > 4) {
                this.ctx.beginPath();
                this.ctx.arc(flake.x, flake.y, flake.size * 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity * 0.3})`;
                this.ctx.fill();
            }
        }
        
        // Ensure we have enough flakes
        while (this.flakes.length < this.maxFlakes) {
            this.createFlake(true);
        }
        
        requestAnimationFrame((ts) => this.animate(ts));
    }
}

// Initialize snow effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SnowEffect();
    
    // Create large decorative flakes
    createLargeFlakes();
});

function createLargeFlakes() {
    const container = document.querySelector('.large-flakes');
    
    for (let i = 0; i < 8; i++) {
        const flake = document.createElement('div');
        flake.className = 'decorative-flake';
        
        // Random properties
        const size = Math.random() * 40 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 20;
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Apply styles
        flake.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle at 30% 30%, white, transparent 70%);
            border-radius: 50%;
            left: ${left}%;
            top: -${size}px;
            opacity: ${opacity};
            pointer-events: none;
            z-index: 1;
            filter: blur(${size * 0.1}px);
            animation: decorativeFall ${duration}s linear ${delay}s infinite;
        `;
        
        // Add random rotation
        const rotation = Math.random() * 360;
        flake.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(flake);
    }
}

// Add CSS for decorative flakes
const flakeStyle = document.createElement('style');
flakeStyle.textContent = `
    @keyframes decorativeFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .decorative-flake:nth-child(odd) {
        animation-timing-function: ease-in-out;
    }
    
    .decorative-flake:nth-child(even) {
        animation-timing-function: linear;
    }
`;
document.head.appendChild(flakeStyle);