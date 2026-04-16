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
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
// INTERSECTION OBSERVER FOR FADE-IN
// ===================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.service-card, .portfolio-card, .tech-category, .stat-block, .pricing-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    observer.observe(el);
});

// ===================================
// HERO STATS COUNTER ANIMATION
// ===================================

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroStats.classList.contains('animated')) {
                const statNumbers = heroStats.querySelectorAll('.stat-number');

                // 4 Sites Clients
                if (statNumbers[0]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        statNumbers[0].textContent = count;
                        if (count >= 4) clearInterval(interval);
                    }, 200);
                }

                // 8+ Applications
                if (statNumbers[1]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count++;
                        statNumbers[1].textContent = count + '+';
                        if (count >= 8) clearInterval(interval);
                    }, 150);
                }

                // 450K+ LOC
                if (statNumbers[2]) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 15;
                        if (count >= 450) {
                            statNumbers[2].textContent = '450K+';
                            clearInterval(interval);
                        } else {
                            statNumbers[2].textContent = count + 'K+';
                        }
                    }, 20);
                }

                // 25+ Technologies
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
// FAQ ACCORDION
// ===================================

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));

        if (!isActive) item.classList.add('active');
    });
});

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================

const carousel = document.querySelector('.testimonials-carousel');
const dots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.testimonial-arrow.prev');
const nextBtn = document.querySelector('.testimonial-arrow.next');
let currentSlide = 0;

function updateCarousel() {
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.testimonial-card');
    const total = cards.length;

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

if (prevBtn) prevBtn.addEventListener('click', () => {
    const total = carousel.querySelectorAll('.testimonial-card').length;
    currentSlide = (currentSlide - 1 + total) % total;
    updateCarousel();
});

if (nextBtn) nextBtn.addEventListener('click', () => {
    const total = carousel.querySelectorAll('.testimonial-card').length;
    currentSlide = (currentSlide + 1) % total;
    updateCarousel();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        updateCarousel();
    });
});

// Auto-advance every 6s
setInterval(() => {
    if (!carousel) return;
    const total = carousel.querySelectorAll('.testimonial-card').length;
    currentSlide = (currentSlide + 1) % total;
    updateCarousel();
}, 6000);

// ===================================
// LOADER HIDE
// ===================================

window.addEventListener('load', () => {
    const loader = document.querySelector('.premium-loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => loader.remove(), 400);
        }, 800);
    }
});

// ===================================
// CONSOLE
// ===================================

console.log('%c<RK/> Développement', 'font-size: 16px; font-weight: bold; color: #00ff88;');
console.log('%cVIEY David - Développeur Expert', 'font-size: 12px; color: #8a93a6;');
console.log('%cContact: Riisalthkarral@gmail.com', 'font-size: 12px; color: #00ff88;');
