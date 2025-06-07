// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.section, .card, .figure-container');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
});

// Lazy loading for images with blur-up effect
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.style.filter = 'blur(0)';
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.filter = 'blur(5px)';
        img.style.transition = 'filter 0.5s ease';
        imageObserver.observe(img);
    });
});

// Parallax effect for sections
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const speed = section.getAttribute('data-speed') || 0.5;
        const yPos = -(window.pageYOffset * speed);
        section.style.backgroundPositionY = yPos + 'px';
    });
});

// Add animation to figures on scroll
const figureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.figure-container').forEach(figure => {
    figureObserver.observe(figure);
});

// Add hover effect to gallery images
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


//  what is infographics?
const dynamicTitle = document.querySelector('.dynamic-title');
const introSection = document.querySelector('.intro-section');

window.addEventListener('scroll', () => {
    if (!dynamicTitle || !introSection) return;

    const scrollPosition = window.scrollY;
    const introTop = introSection.offsetTop;
    const viewportHeight = window.innerHeight;

    // 原始滚动进度
    let progress = (scrollPosition - (introTop - viewportHeight)) / viewportHeight;

    // 限制进度最大值（比如只在进入 70% 高度时结束）
    const maxProgress = 0.5;
    progress = Math.min(Math.max(progress, 0), maxProgress);

    // 字号：5rem → 最大值 5 + 2.5 * 0.7 = 6.75rem
    const fontSize = 4 + (2.5 * (progress / maxProgress));
    const opacity = 0.1 + (0.9 * (progress / maxProgress));

    dynamicTitle.style.fontSize = `${fontSize}rem`;
    dynamicTitle.style.opacity = opacity;
});


// Global variables
// const generateSection = document.querySelector('.generate-section');

// Limitations section scroll handling
// const limitationSection = document.querySelector('.limitation-section');
// const limitationCards = document.querySelector('.limitation-cards');
// let isTransitioning = false;

// function handleLimitationScroll(e) {
//     if (isTransitioning) return;

//     const rect = limitationSection.getBoundingClientRect();
//     const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
    
//     if (isInView && e.deltaY > 0) {
//         isTransitioning = true;
        
//         // First, move cards out of view
//         limitationCards.style.transform = 'translateX(-100%)';
        
//         // After cards are out of view, show generate section
//         setTimeout(() => {
//             generateSection.classList.add('visible');
//         }, 400); // Half of the transition duration
        
//         // Reset transition flag after animation completes
//         setTimeout(() => {
//             isTransitioning = false;
//         }, 1800);
//     } else if (isInView && e.deltaY < 0) {
//         isTransitioning = true;
        
//         // First, hide generate section
//         generateSection.classList.remove('visible');
        
//         // After generate section is hidden, move cards back
//         setTimeout(() => {
//             limitationCards.style.transform = 'translateX(0)';
//         }, 1000);
        
//         setTimeout(() => {
//             isTransitioning = false;
//         }, 800);
//     }
// }

// window.addEventListener('wheel', handleLimitationScroll);