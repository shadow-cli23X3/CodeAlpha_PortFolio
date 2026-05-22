/* ========================================
   PORTFOLIO JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const typingText = document.getElementById('typingText');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const yearSpan = document.getElementById('year');

    // ========================================
    // UPDATE COPYRIGHT YEAR
    // ========================================
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========================================
    // STICKY NAVIGATION & SCROLL EFFECTS
    // ========================================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky header background
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link highlighting
        highlightActiveNav();
    }

    window.addEventListener('scroll', handleScroll);

    // ========================================
    // SMOOTH SCROLLING FOR NAV LINKS
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // DARK/LIGHT MODE TOGGLE
    // ========================================
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // ========================================
    // TYPING ANIMATION
    // ========================================
    const roles = [
        'BTech CSE Student',
        'Web Developer',
        'AI/ML Enthusiast',
        'Problem Solver',
        'Frontend Developer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeEffect, 1000);

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate skill bars when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }

                // Animate stat numbers when resume section is visible
                if (entry.target.closest('#resume')) {
                    animateStats();
                }

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;
        skillsAnimated = true;

        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    }

    // ========================================
    // STAT COUNTER ANIMATION
    // ========================================
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:shivam@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        alert('Thank you for your message! Your email client should open shortly.');

        // Reset form
        this.reset();
    });

    // ========================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ========================================
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ========================================
    // NAVBAR HIDE/SHOW ON SCROLL
    // ========================================
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    header.style.transition = 'transform 0.3s ease';

    // ========================================
    // KEYBOARD NAVIGATION SUPPORT
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cWelcome to Shivam\'s Portfolio!', 'font-size: 14px; color: #475569;');
    console.log('%cFeel free to explore the code. 🚀', 'font-size: 12px; color: #94a3b8;');

}); // End DOMContentLoaded
