// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.toggle('active-link', item.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Light / dark mode toggle
    const root = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');

    let savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* storage unavailable */ }

    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        root.setAttribute('data-theme', 'light');
    }

    function updateThemeIcon() {
        if (!themeBtn) return;
        // moon shown in light mode (click to go dark), sun shown in dark mode
        themeBtn.innerHTML = root.getAttribute('data-theme') === 'light' ? '&#9789;' : '&#9728;';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            if (next === 'light') {
                root.setAttribute('data-theme', 'light');
            } else {
                root.removeAttribute('data-theme');
            }
            try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
            updateThemeIcon();
        });
    }
    updateThemeIcon();
});
