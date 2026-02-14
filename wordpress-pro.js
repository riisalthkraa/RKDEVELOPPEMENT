// ===================================
// WORDPRESS PRO FEATURES
// Améliorations premium style WordPress/Joomla
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // READING PROGRESS BAR
    // ===================================

    const readingProgress = document.createElement('div');
    readingProgress.className = 'reading-progress';
    document.body.prepend(readingProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        readingProgress.style.width = progress + '%';
    });

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================

    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // DARK MODE TOGGLE
    // ===================================

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <i class="fas fa-moon moon-icon"></i>
        <i class="fas fa-sun sun-icon"></i>
    `;
    themeToggle.setAttribute('aria-label', 'Changer le thème');
    document.body.appendChild(themeToggle);

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ===================================
    // CUSTOM CURSOR
    // ===================================

    if (window.innerWidth > 968) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .pricing-card, .faq-question');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Click effect
        document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

        // Hide default cursor
        document.body.style.cursor = 'none';
        interactiveElements.forEach(el => el.style.cursor = 'none');
    }

    // ===================================
    // AOS-LIKE SCROLL ANIMATIONS
    // ===================================

    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    // ===================================
    // FAQ ACCORDION
    // ===================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===================================
    // TESTIMONIALS CAROUSEL
    // ===================================

    const carousel = document.querySelector('.testimonials-carousel');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevArrow = document.querySelector('.testimonial-arrow.prev');
    const nextArrow = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;
    let totalSlides = document.querySelectorAll('.testimonial-card').length;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentSlide = index;

        if (carousel) {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    if (prevArrow) {
        prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // Auto-slide every 5 seconds
    if (carousel) {
        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    // ===================================
    // ANIMATED COUNTERS
    // ===================================

    const counters = document.querySelectorAll('.counter-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.textContent = Math.floor(count) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target + suffix;
                        entry.target.classList.add('counted');
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===================================
    // SMOOTH REVEAL ANIMATIONS
    // ===================================

    const revealElements = document.querySelectorAll('.section-header, .process-content, .testimonial-content');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ===================================
    // NAVBAR ENHANCEMENTS
    // ===================================

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
                ? 'rgba(15, 23, 42, 0.98)'
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark'
                ? 'rgba(15, 23, 42, 0.95)'
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ===================================
    // NEWSLETTER FORM
    // ===================================

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Show success message
            alert('Merci pour votre inscription ! Vous recevrez bientôt nos actualités.');
            newsletterForm.reset();
        });
    }

    // ===================================
    // LIGHTBOX FOR PORTFOLIO
    // ===================================

    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        card.addEventListener('dblclick', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                    ${card.outerHTML}
                </div>
            `;
            document.body.appendChild(lightbox);

            setTimeout(() => lightbox.classList.add('active'), 10);

            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.classList.remove('active');
                setTimeout(() => lightbox.remove(), 300);
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => lightbox.remove(), 300);
                }
            });
        });
    });

    // ===================================
    // PARALLAX EFFECT ON HERO
    // ===================================

    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // ===================================
    // TYPING EFFECT ON HERO (Optional)
    // ===================================

    const gradientText = document.querySelector('.gradient-text');
    if (gradientText && !gradientText.classList.contains('typed')) {
        const originalText = gradientText.textContent;
        gradientText.textContent = '';
        gradientText.classList.add('typed');

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                gradientText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing after page load
        setTimeout(typeWriter, 1000);
    }

    // ===================================
    // SCROLL INDICATOR HIDE ON SCROLL
    // ===================================

    const scrollIndicator = document.querySelector('.premium-scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    console.log('%c WordPress Pro Features Loaded!', 'font-size: 14px; font-weight: bold; color: #2563eb;');
});
