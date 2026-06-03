/* ══════════════════════════════════════
   SYRION SYSTEMS — contacto.js
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
            initPageAnimations();
        }, 1000);
    });

    // Fallback
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            initPageAnimations();
        }
    }, 2500);

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

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // ──────────────────────────────────
    // PAGE ANIMATIONS (post-loader)
    // ──────────────────────────────────
    function initPageAnimations() {
        gsap.fromTo('.page-header',
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'power3.out',
                delay: 0.1
            }
        );
    }

    // ──────────────────────────────────
    // REVEAL ON SCROLL
    // ──────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal');

    revealEls.forEach((el) => {
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
    // FORM — feedback visual
    // ──────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const btn = this.querySelector('.btn-submit');
            btn.innerHTML = 'Enviando...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            setTimeout(() => {
                btn.innerHTML = `Solicitud enviada ✓`;
                btn.style.background = 'var(--blue-glow)';
                btn.style.opacity = '1';
            }, 1000);
        });
    }

    // ──────────────────────────────────
    // SMOOTH SCROLL — backup
    // ──────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

});