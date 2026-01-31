/*
    script.js
    Simple, self-contained utilities for an HTML tutorial.
    - Safe no-op if expected elements are absent.
    - Features: live clock, counter, theme toggle (persisted), form validation, smooth scroll.
*/

'use strict';

// Tiny helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Init on DOM ready
// Theme Management
const initTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Preloader
const hidePreloader = () => {
    // support either .preloader (index.html) or #loader (antony.html)
    const preloader = document.querySelector('.preloader') || document.querySelector('#loader');
    if (!preloader) return;

    // Try a gentle fade then remove the element to avoid blocking interaction
    preloader.classList.add('opacity-0');
    preloader.style.transition = 'opacity 400ms ease';
    // If using Tailwind, opacity-0 will work; remove from DOM shortly after
    setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 450);

    // Reveal main content if it's hidden (antony.html uses id=portfolio + class hidden)
    const main = document.querySelector('main#portfolio') || document.querySelector('main');
    if (main && main.classList.contains('hidden')) {
        main.classList.remove('hidden');
    }
};

// Scroll to Top functionality
const toggleScrollButton = () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;
    if (window.pageYOffset > 500) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Hide preloader after content loads
    window.addEventListener('load', () => {
        // be defensive: hidePreloader only if the element exists
        try { hidePreloader(); } catch (e) { /* noop */ }
    });

    // Theme toggle button (guarded)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Scroll to top button (guarded)
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        scrollButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Show/hide scroll button
    window.addEventListener('scroll', toggleScrollButton);
    initClock();
    initCounter();
    initThemeToggle();
    initUIHandlers();
    initFormValidation();
    initSmoothScroll();
});

/* 6) UI handlers for antony.html: hamburger/menu, modal, quick tabs, settings, contact form */
function initUIHandlers() {
    // Hamburger toggles #menu visibility and animates lines
    const ham = $('#hamburger');
    const menu = $('#menu');
    const ham1 = $('#ham1');
    const ham2 = $('#ham2');
    const ham3 = $('#ham3');
    if (ham && menu) {
        // add ARIA for accessibility
        try {
            ham.setAttribute('role', 'button');
            ham.setAttribute('aria-controls', 'menu');
            ham.setAttribute('aria-expanded', 'false');
            menu.setAttribute('role', 'navigation');
            menu.setAttribute('aria-hidden', 'true');
        } catch (e) { /* ignore */ }

        // helper to set animated state of hamburger lines (tuned)
        const setHamburgerOpen = (open) => {
            // apply inline transforms so this works without Tailwind utilities
            const transDur = '260ms';
            const transEasing = 'cubic-bezier(.2,.9,.2,1)';
            if (ham1) {
                ham1.style.transition = `transform ${transDur} ${transEasing}, opacity ${transDur} ${transEasing}`;
                ham1.style.transform = open ? 'translateY(7px) rotate(45deg)' : 'none';
            }
            if (ham2) {
                ham2.style.transition = `opacity ${transDur} ${transEasing}`;
                ham2.style.opacity = open ? '0' : '1';
            }
            if (ham3) {
                ham3.style.transition = `transform ${transDur} ${transEasing}, opacity ${transDur} ${transEasing}`;
                ham3.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : 'none';
            }
            // update aria-expanded
            try { ham.setAttribute('aria-expanded', open ? 'true' : 'false'); } catch (e) {}
        };

        // functions to open/close menu with a tuned slide animation
        const openMenu = () => {
            const slideOffset = '-28px';
            const dur = 360;
            const easing = 'cubic-bezier(.2,.9,.2,1)';
            menu.classList.remove('hidden');
            menu.style.opacity = '0';
            menu.style.transform = `translateX(${slideOffset})`;
            menu.style.transition = `transform ${dur}ms ${easing}, opacity ${dur}ms ${easing}`;
            // animate to visible
            requestAnimationFrame(() => {
                menu.style.opacity = '1';
                menu.style.transform = 'translateX(0)';
                menu.setAttribute('aria-hidden', 'false');
            });
            setHamburgerOpen(true);
        };

        const closeMenu = () => {
            const slideOffset = '-28px';
            const dur = 360;
            const easing = 'cubic-bezier(.2,.9,.2,1)';
            menu.style.opacity = '0';
            menu.style.transform = `translateX(${slideOffset})`;
            menu.setAttribute('aria-hidden', 'true');
            setTimeout(() => {
                // only add hidden after animation completes
                if (!menu.classList.contains('hidden')) menu.classList.add('hidden');
                // clear inline styles that might interfere later
                menu.style.opacity = '';
                menu.style.transform = '';
                menu.style.transition = '';
            }, dur + 20);
            setHamburgerOpen(false);
        };

        ham.addEventListener('click', (e) => {
            e.stopPropagation();
            const opening = menu.classList.contains('hidden');
            if (opening) openMenu(); else closeMenu();
        });

        // keyboard: Enter or Space toggles the hamburger
        ham.addEventListener('keydown', (e) => {
            const k = e.key || e.code;
            if (k === 'Enter' || k === ' ' || k === 'Spacebar' || k === 'Space') {
                e.preventDefault();
                const opening = menu.classList.contains('hidden');
                if (opening) openMenu(); else closeMenu();
            }
        });

        // close menu with Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                if (menu && !menu.classList.contains('hidden')) {
                    closeMenu();
                    // return focus to hamburger
                    try { ham.focus(); } catch (err) {}
                }
            }
        });
    }

    // Close menu when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!menu || !ham) return;
        if (menu.classList.contains('hidden')) return;
        if (!menu.contains(e.target) && !ham.contains(e.target)) {
            // animate close
            if (typeof closeMenu === 'function') closeMenu();
            else {
                menu.classList.add('hidden');
                if (ham1) { ham1.style.transform = 'none'; }
                if (ham2) { ham2.style.opacity = '1'; }
                if (ham3) { ham3.style.transform = 'none'; }
            }
        }
    });

    // Qualifications modal
    const qualBtn = $('#Qualifications');
    const qualModal = $('#theQualifications');
    const closeModalBtn = $('#closeModal');
    if (qualBtn && qualModal) {
        qualBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            qualModal.classList.remove('hidden');
            // focus the close button for keyboard users
            try { closeModalBtn && closeModalBtn.focus(); } catch (err) {}
        });
        // keyboard: Enter/Space opens modal when qualification icon is focused
        qualBtn.addEventListener('keydown', (e) => {
            const k = e.key || e.code;
            if (k === 'Enter' || k === ' ' || k === 'Spacebar' || k === 'Space') {
                e.preventDefault();
                qualModal.classList.remove('hidden');
                try { closeModalBtn && closeModalBtn.focus(); } catch (err) {}
            }
        });
        // clicking overlay hides
        qualModal.addEventListener('click', () => qualModal.classList.add('hidden'));
        // prevent clicks inside modal content from closing
        const modalContent = qualModal.querySelector('.bg-white');
        if (modalContent) modalContent.addEventListener('click', (ev) => ev.stopPropagation());
    }
    if (closeModalBtn && qualModal) {
        closeModalBtn.addEventListener('click', () => qualModal.classList.add('hidden'));
        // allow Esc to close modal as well
        closeModalBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                qualModal.classList.add('hidden');
                try { qualBtn && qualBtn.focus(); } catch (err) {}
            }
        });
    }

    // Global escape to close modal as well (if focused anywhere)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (qualModal && !qualModal.classList.contains('hidden')) {
                qualModal.classList.add('hidden');
                try { qualBtn && qualBtn.focus(); } catch (err) {}
            }
        }
    });

    // Quick tab buttons: projects, home
    const projBtn = $('#theprojects');
    if (projBtn) {
        projBtn.addEventListener('click', () => {
            const target = $('#project');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    const homeBtn = $('#thehome');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Settings toggles theme
    const settingsBtn = $('#settings');
    if (settingsBtn) settingsBtn.addEventListener('click', toggleTheme);

    // Contact form (#theform) validation and submission guard
    const theform = $('#theform');
    if (theform) {
        theform.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = theform.querySelector('input[name="email"]');
            const nameInput = theform.querySelector('input[name="name"]');
            const messageInput = theform.querySelector('textarea[name="message"], #message');
            const feedback = $('#checkEmail');
            const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email) {
                if (feedback) feedback.textContent = 'Please enter your email.';
                return;
            }
            if (!isEmail(email)) {
                if (feedback) feedback.textContent = 'Please enter a valid email address.';
                return;
            }
            // success (demo): clear feedback and show a little confirmation
            if (feedback) {
                feedback.textContent = 'Message sent (demo).';
                setTimeout(() => { feedback.textContent = ''; }, 3000);
            }
            // In real site, you would post the form via fetch here.
            theform.reset();
        });
    }
}

/* 1) Live clock: put current time (HH:MM:SS) into #timeDisplay if present */
function initClock() {
    const el = $('#timeDisplay');
    if (!el) return;
    const pad = n => String(n).padStart(2, '0');
    function update() {
        const d = new Date();
        el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    update();
    setInterval(update, 1000);
}

/* 2) Simple counter using #countDisplay, #incrementBtn, #decrementBtn */
function initCounter() {
    const disp = $('#countDisplay');
    const inc = $('#incrementBtn');
    const dec = $('#decrementBtn');
    if (!disp || !inc || !dec) return;
    let count = Number(disp.textContent) || 0;
    const render = () => (disp.textContent = String(count));
    inc.addEventListener('click', () => { count += 1; render(); });
    dec.addEventListener('click', () => { count -= 1; render(); });
    render();
}

/* 3) Theme toggle persisted to localStorage. Button id: #themeToggle
     Toggles data-theme="dark" on <html>, default is light. */
function initThemeToggle() {
    const btn = $('#themeToggle');
    if (!btn) return;
    const KEY = 'tutorial-theme';
    const root = document.documentElement;
    const apply = theme => {
        if (theme === 'dark') root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
        btn.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    };
    const stored = localStorage.getItem(KEY) || 'light';
    apply(stored);
    btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem(KEY, next);
        apply(next);
    });
}

/* 4) Basic form validation for a form with id #demoForm and an email input name="email" */
function initFormValidation() {
    const form = $('#demoForm');
    if (!form) return;
    const messageEl = $('#formMessage') || (() => {
        const m = document.createElement('div');
        m.id = 'formMessage';
        form.appendChild(m);
        return m;
    })();
    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(form);
        const email = (data.get('email') || '').toString().trim();
        if (!email) {
            showFormMsg('Please enter an email address.', 'error');
            return;
        }
        if (!isEmail(email)) {
            showFormMsg('Please enter a valid email address.', 'error');
            return;
        }
        showFormMsg('Form submitted successfully (demo).', 'success');
        // In a real app, submit via fetch() here.
    });

    function showFormMsg(text, type = 'info') {
        messageEl.textContent = text;
        messageEl.className = `form-message ${type}`;
        // Auto-clear after a while
        setTimeout(() => {
            if (messageEl.textContent === text) {
                messageEl.textContent = '';
                messageEl.className = '';
            }
        }, 4000);
    }
}

/* 5) Smooth scrolling for internal anchor links */
function initSmoothScroll() {
    // Only intercept same-page anchor links
    $$('a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        if (href === '#' || href === '#!') return;
        a.addEventListener('click', e => {
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // update hash without jumping
            history.pushState(null, '', href);
        });
    });
}

/* Export small API (optional) - attach to window for interactive console during tutorial */
window.__tut = {
    formatTime: (d = new Date()) => d.toTimeString().split(' ')[0],
};