/* ══════════════════════════════════════
   SYRION SYSTEMS — servicios.js
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
    // PAGE SPECIFIC ANIMATIONS
    // ──────────────────────────────────
    function initPageAnimations() {
        // Page title reveal
        gsap.to('.page-header', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
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

    // Parallax on service cards
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

});
