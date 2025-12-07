// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }

            // Smooth scroll to target
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveLink() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ===================================
// ANIMATE PROGRESS BARS ON SCROLL
// ===================================

const progressBars = document.querySelectorAll('.progress-fill');

const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible && !bar.classList.contains('animated')) {
            const targetWidth = bar.style.width;

            // Désactiver la transition temporairement
            bar.style.transition = 'none';
            bar.style.width = '0%';

            setTimeout(() => {
                // Réactiver la transition
                bar.style.transition = 'width 1s ease-out';
                bar.style.width = targetWidth;
                bar.classList.add('animated');
            }, 50);
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// ===================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
const cardsToAnimate = document.querySelectorAll('.service-card, .portfolio-card, .tech-category');
cardsToAnimate.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// COUNTER ANIMATION FOR HERO STATS
// ===================================

const animateCounter = (element, target, suffix = '') => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };

    updateCounter();
};

// Trigger counter animation when hero is visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroStats.classList.contains('animated')) {
                const statNumbers = heroStats.querySelectorAll('.stat-number');

                // Animate first stat (9 Applications)
                if (statNumbers[0]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        statNumbers[0].textContent = count;
                        if (count >= 9) clearInterval(interval);
                    }, 150);
                }

                // Animate second stat (450K+ lignes de code)
                if (statNumbers[1]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 15;
                        if (count >= 450) {
                            statNumbers[1].textContent = '450K+';
                            clearInterval(interval);
                        } else {
                            statNumbers[1].textContent = count + 'K+';
                        }
                    }, 20);
                }

                // Animate third stat (18 Mois)
                if (statNumbers[2]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        statNumbers[2].textContent = count;
                        if (count >= 18) clearInterval(interval);
                    }, 100);
                }

                // Animate fourth stat (25+ Technologies)
                if (statNumbers[3]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        statNumbers[3].textContent = count + '+';
                        if (count >= 25) clearInterval(interval);
                    }, 50);
                }

                heroStats.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroStats);
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👨‍💻 VIEY David - Développeur Expert', 'font-size: 16px; font-weight: bold; color: #2563eb;');
console.log('%cApplications Médicales & Logiciels Sur Mesure', 'font-size: 12px; color: #475569;');
console.log('%cContact: Riisalthkarral@gmail.com', 'font-size: 12px; color: #10b981;');
