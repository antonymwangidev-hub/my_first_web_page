// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #2c3e50;
            padding: 1rem 0;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
});
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