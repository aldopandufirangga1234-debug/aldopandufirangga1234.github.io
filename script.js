// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const musicPlayer = document.getElementById('musicPlayer');
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const rsvpForm = document.getElementById('rsvpForm');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add haptic feedback for Android
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
});

// Touch events for Android
hamburger.addEventListener('touchstart', (e) => {
    e.preventDefault();
    hamburger.style.transform = 'scale(0.95)';
}, { passive: false });

hamburger.addEventListener('touchend', (e) => {
    e.preventDefault();
    hamburger.style.transform = 'scale(1)';
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add haptic feedback for Android
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}, { passive: false });

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
    
    // Touch events for Android
    link.addEventListener('touchstart', (e) => {
        link.style.transform = 'scale(0.95)';
        link.style.opacity = '0.8';
    });
    
    link.addEventListener('touchend', (e) => {
        link.style.transform = 'scale(1)';
        link.style.opacity = '1';
    });
});

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Music Control Functions
let isPlaying = false;

// Auto-play music when page loads
function autoPlayMusic() {
    // Try to play music immediately
    backgroundMusic.play().then(() => {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlayer.style.display = 'flex';
        console.log('Musik otomatis berputar');
    }).catch(error => {
        console.log('Auto-play gagal, menunggu interaksi user:', error);
        // Show music player but don't play yet
        musicPlayer.style.display = 'flex';
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Try to play on first user interaction
        document.addEventListener('click', playMusicOnInteraction, { once: true });
        document.addEventListener('touchstart', playMusicOnInteraction, { once: true });
    });
}

function playMusicOnInteraction() {
    backgroundMusic.play().then(() => {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        console.log('Musik diputar setelah interaksi user');
    }).catch(error => {
        console.log('Gagal memutar musik:', error);
    });
}

function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        backgroundMusic.play().then(() => {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log('Play failed:', error);
            showNotification('Tidak dapat memutar musik', 'error');
        });
    }
}

function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Gallery Lightbox Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        createLightbox(img.src, img.alt);
    });
});

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
    });
}

// RSVP Form Handling
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(rsvpForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Terima kasih! Konfirmasi kehadiran Anda telah diterima.', 'success');
    
    // Reset form
    rsvpForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('RSVP Data:', data);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Scroll Animation System
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special handling for text reveal
            if (entry.target.classList.contains('text-reveal')) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all elements with scroll animation classes
document.querySelectorAll('.scroll-animate, .fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .bounce-in, .text-reveal').forEach(el => {
    scrollObserver.observe(el);
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}


// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    
    // Parallax Effect for Hero Section
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Floating hearts animation based on scroll
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        heart.style.transform = `translateY(${yPos}px) rotate(45deg)`;
    });
});

// Floating Hearts Animation Enhancement
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        if (document.querySelector('.floating-hearts').contains(heart)) {
            document.querySelector('.floating-hearts').removeChild(heart);
        }
    }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Add click effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open lightboxes
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
        }
    }
    
    if (e.key === ' ') {
        e.preventDefault();
        toggleMusic();
    }
});

// Preload Images
const imageUrls = [
    'Gambar WhatsApp 2025-09-28 pukul 21.08.55_c826ca58.jpg',
    'Gambar WhatsApp 2025-09-28 pukul 21.09.40_6e47c05b.jpg',
    'Gambar WhatsApp 2025-09-28 pukul 21.09.41_40a124bf.jpg',
    'Gambar WhatsApp 2025-09-28 pukul 21.09.41_c98533a2.jpg',
    'Gambar WhatsApp 2025-09-28 pukul 21.09.41_de3d8db0.jpg',
    'Gambar WhatsApp 2025-09-28 pukul 21.11.03_50717906.jpg'
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wedding Invitation loaded successfully!');
    
    // Start auto-play music
    setTimeout(() => {
        autoPlayMusic();
    }, 1000); // Delay 1 second after page load
    
    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
