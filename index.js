/* ══════════════════════════════════════
   SYRION SYSTEMS — main.js
   Animaciones con GSAP + ScrollTrigger
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ──────────────────────────────────
    // REGISTER SCROLLTRIGGER
    // ──────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    // ──────────────────────────────────
    // LOADER
    // ──────────────────────────────────
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            initHeroAnimations();
        }, 1600);
    });

    // Fallback si load no dispara rápido
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            initHeroAnimations();
        }
    }, 3000);

    // ──────────────────────────────────
    // NAVBAR SCROLL
    // ──────────────────────────────────
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ──────────────────────────────────
    // HAMBURGER MOBILE
    // ──────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // Cerrar menu al hacer clic en un link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // ──────────────────────────────────
    // PARTÍCULAS DE FONDO
    // ──────────────────────────────────
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const count = window.innerWidth < 768 ? 15 : 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 15;
            const drift = (Math.random() - 0.5) * 100;

            p.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
                opacity: 0;
            `;
            particlesContainer.appendChild(p);
        }
    }

    createParticles();

    // ──────────────────────────────────
    // HERO ANIMATIONS (post-loader)
    // ──────────────────────────────────
    function initHeroAnimations() {

        // Badge
        gsap.to('#heroBadge', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.1
        });

        // Headline lines — stagger
        const lines = document.querySelectorAll('.hero-headline .line');
        gsap.fromTo(lines,
            { y: '110%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
                delay: 0.3
            }
        );

        // Subtítulo
        gsap.to('#heroSub', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.85
        });

        // Botones
        gsap.to('#heroActions', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: 1.1
        });

        // Stats
        gsap.to('#heroStats', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.4
        });

        // Scroll indicator
        gsap.to('#scrollIndicator', {
            opacity: 1,
            duration: 0.5,
            delay: 2
        });

        // Contador de números
        setTimeout(animateCounters, 1500);
    }

    // ──────────────────────────────────
    // COUNTERS
    // ──────────────────────────────────
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 1800;
            const start = performance.now();

            function update(time) {
                const elapsed = time - start;
                const progress = Math.min(elapsed / duration, 1);
                // Easing out quart
                const eased = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target;
            }

            requestAnimationFrame(update);
        });
    }

    // ──────────────────────────────────
    // REVEAL ON SCROLL (intersection observer fallback + gsap)
    // ──────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal');

    revealEls.forEach((el, i) => {
        const delay = parseInt(el.dataset.delay || 0);

        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay / 1000,
                    ease: 'power2.out'
                });
                el.classList.add('visible');
            },
            once: true
        });
    });

    // ──────────────────────────────────
    // TECH ITEMS — stagger on scroll
    // ──────────────────────────────────
    ScrollTrigger.create({
        trigger: '.tech-grid',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.tech-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out'
                }
            );
        },
        once: true
    });

    // ──────────────────────────────────
    // NAVBAR ACTIVE LINK on scroll
    // ──────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.style.color = '');
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.style.color = 'var(--white)';
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // ──────────────────────────────────
    // SMOOTH SCROLL (backup por si CSS smooth-scroll no funciona en todos)
    // ──────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ──────────────────────────────────
    // SERVICE CARDS — parallax sutil
    // ──────────────────────────────────
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(card, {
                    rotateY: x * 4,
                    rotateX: -y * 4,
                    duration: 0.4,
                    ease: 'power1.out',
                    transformPerspective: 800
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
    }

    // ──────────────────────────────────
    // FORM — feedback visual
    // ──────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const btn = this.querySelector('.btn-submit');
            btn.textContent = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btn.innerHTML = `Solicitud enviada ✓`;
                btn.style.background = 'var(--blue-glow)';
                btn.style.opacity = '1';
            }, 1000);
        });
    }

});