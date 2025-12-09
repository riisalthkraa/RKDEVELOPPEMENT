// ========================================
// PREMIUM ANIMATIONS JS - NIVEAU 5000€
// Ultra Modern Professional Animations
// ========================================

(function() {
    'use strict';

    // === CONFIGURATION ===
    const config = {
        cursorEnabled: window.innerWidth > 968,
        loaderDuration: 2000,
        parallaxIntensity: 0.5,
        revealThreshold: 0.15
    };

    // === LOADER PREMIUM ===
    function initPremiumLoader() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.premium-loader-wrapper');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 800);
                }, config.loaderDuration);
            }
        });
    }

    // === CUSTOM CURSOR DISABLED ===
    function initCustomCursor() {
        // Curseur personnalisé désactivé à la demande de l'utilisateur
        return;
    }

    // === NAVBAR PREMIUM SCROLL ===
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('premium-scrolled');
            } else {
                navbar.classList.remove('premium-scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // === ANIMATED COUNTERS ===
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;

        let hasAnimated = false;

        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        function checkCounters() {
            if (hasAnimated) return;

            counters.forEach(counter => {
                const rect = counter.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

                if (isVisible) {
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    animateCounter(counter, target);
                    hasAnimated = true;
                }
            });
        }

        window.addEventListener('scroll', checkCounters);
        checkCounters();
    }

    // === SCROLL REVEAL ANIMATIONS ===
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.premium-reveal, .premium-reveal-left, .premium-reveal-right, .premium-reveal-scale');

        if (revealElements.length === 0) return;

        const observerOptions = {
            threshold: config.revealThreshold,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // === STAGGERED ANIMATIONS ===
    function initStaggeredAnimations() {
        const staggerContainers = document.querySelectorAll('.premium-stagger');

        if (staggerContainers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        staggerContainers.forEach(container => observer.observe(container));
    }

    // === PARALLAX SCROLLING ===
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.premium-parallax-layer');
        const shapes = document.querySelectorAll('.premium-shape');

        if (parallaxElements.length === 0 && shapes.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Parallax for designated layers
            parallaxElements.forEach((element, index) => {
                const speed = element.dataset.speed || (0.3 + index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Parallax for floating shapes
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.15);
                const yPos = scrolled * speed;
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // === 3D TILT EFFECT (Vanilla JS Implementation) ===
    function init3DTilt() {
        const tiltCards = document.querySelectorAll('.card-3d-tilt');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', handleTiltMove);
            card.addEventListener('mouseleave', handleTiltLeave);
        });

        function handleTiltMove(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }

        function handleTiltLeave(e) {
            const card = e.currentTarget;
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
    }

    // === SMOOTH SCROLL TO ANCHORS ===
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    }

    // === ACTIVE NAV HIGHLIGHT ===
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (sections.length === 0 || navLinks.length === 0) return;

        function highlightNav() {
            const scrollPosition = window.pageYOffset + 150;

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

        window.addEventListener('scroll', highlightNav);
        highlightNav();
    }

    // === MOBILE MENU ===
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // === LAZY LOAD IMAGES ===
    function initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');

        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // === SCROLL TO TOP BUTTON ===
    function initScrollToTop() {
        const scrollBtn = document.querySelector('.premium-floating-call');

        if (!scrollBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.pointerEvents = 'auto';
            } else {
                scrollBtn.style.opacity = '0.8';
            }
        });
    }

    // === PERFORMANCE: DEBOUNCE SCROLL EVENTS ===
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // === INITIALIZE ALL ===
    function init() {
        console.log('🚀 Premium Effects Initialized');

        // Core animations
        initPremiumLoader();
        initCustomCursor();
        initNavbarScroll();

        // Scroll effects
        initAnimatedCounters();
        initScrollReveal();
        initStaggeredAnimations();
        initParallax();

        // Interactive effects
        init3DTilt();
        initSmoothScroll();
        initActiveNav();
        initMobileMenu();

        // Performance
        initLazyLoad();
        initScrollToTop();

        // Add loaded class to body
        setTimeout(() => {
            document.body.classList.add('premium-loaded');
        }, 100);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use if needed
    window.PremiumEffects = {
        init,
        reinitialize: init
    };

})();

// === VanillaTilt Integration (Optional Enhanced Version) ===
document.addEventListener('DOMContentLoaded', () => {
    // Check if VanillaTilt is loaded
    if (typeof VanillaTilt !== 'undefined') {
        console.log('🎨 VanillaTilt Enhanced Mode Active');

        // Apply to service cards
        VanillaTilt.init(document.querySelectorAll('.service-card'), {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            perspective: 1000,
        });

        // Apply to portfolio cards
        VanillaTilt.init(document.querySelectorAll('.portfolio-card'), {
            max: 12,
            speed: 400,
            glare: true,
            'max-glare': 0.4,
            perspective: 1000,
        });

        // Apply to pricing cards
        VanillaTilt.init(document.querySelectorAll('.pricing-card'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.35,
            perspective: 1000,
        });
    }
});
