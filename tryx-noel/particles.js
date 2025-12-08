// ===== CHRISTMAS PARTICLES =====

class ChristmasParticles {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.colors = [
            '#FF4757', // Red
            '#2ED573', // Green
            '#FFD700', // Gold
            '#3742FA', // Blue
            '#FFFFFF'  // White
        ];
        
        this.init();
    }
    
    init() {
        // Set canvas size
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        
        // Start animation
        this.animate();
        
        // Add interaction
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('click', (e) => this.onClick(e));
    }
    
    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
    
    createParticle(x = null, y = null, isExplosion = false) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const size = isExplosion ? 
            Math.random() * 8 + 4 : 
            Math.random() * 4 + 1;
        
        const particle = {
            x: x !== null ? x : Math.random() * this.width,
            y: y !== null ? y : Math.random() * this.height,
            size: size,
            color: color,
            speedX: isExplosion ? 
                (Math.random() - 0.5) * 10 : 
                (Math.random() - 0.5) * 0.5,
            speedY: isExplosion ? 
                (Math.random() - 0.5) * 10 : 
                (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            life: isExplosion ? 1 : Infinity,
            decay: isExplosion ? 0.02 : 0
        };
        
        this.particles.push(particle);
    }
    
    onMouseMove(e) {
        // Add particles on mouse movement
        if (Math.random() > 0.7) {
            this.createParticle(e.clientX, e.clientY);
            
            // Limit particles
            if (this.particles.length > 200) {
                this.particles.splice(0, 50);
            }
        }
        
        // Push existing particles away from mouse
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const radius = 100;
        
        this.particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                const force = (radius - distance) / radius;
                particle.speedX += (dx / distance) * force * 0.5;
                particle.speedY += (dy / distance) * force * 0.5;
            }
        });
    }
    
    onClick(e) {
        // Create explosion on click
        for (let i = 0; i < 30; i++) {
            this.createParticle(e.clientX, e.clientY, true);
        }
    }
    
    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 15, 30, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Apply gravity to explosion particles
            if (p.decay > 0) {
                p.speedY += 0.1;
                p.life -= p.decay;
                p.opacity = p.life;
            }
            
            // Bounce off walls
            if (p.x < 0 || p.x > this.width) p.speedX *= -0.9;
            if (p.y < 0 || p.y > this.height) p.speedY *= -0.9;
            
            // Keep particles on screen
            p.x = Math.max(0, Math.min(this.width, p.x));
            p.y = Math.max(0, Math.min(this.height, p.y));
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            
            // Create gradient for glow effect
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.size * 2
            );
            
            gradient.addColorStop(0, p.color + (p.decay > 0 ? Math.floor(p.opacity * 255).toString(16).padStart(2, '0') : '80'));
            gradient.addColorStop(1, p.color + '00');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Add twinkle effect randomly
            if (Math.random() > 0.99) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color + '40';
                this.ctx.fill();
            }
        }
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        // Add occasional random particle
        if (Math.random() > 0.97 && this.particles.length < 150) {
            this.createParticle();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 0.3 * (1 - distance / maxDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChristmasParticles();
});