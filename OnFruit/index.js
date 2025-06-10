document.addEventListener('DOMContentLoaded', function () {
    
    const toggle = document.getElementById('audienceToggle');
    const userContent = document.getElementById('userContent');
    const farmerContent = document.getElementById('farmerContent');

    function showContent(isFarmer) {
        if (isFarmer) {
            userContent.classList.remove('show');
            farmerContent.classList.add('show');
        } else {
            farmerContent.classList.remove('show');
            userContent.classList.add('show');
        }
    }

    if (toggle) {
        toggle.addEventListener('change', function () {
            showContent(this.checked);
        });
        showContent(toggle.checked);
    }

    // FAQ accordion code
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function () {
            // Bonus: Only one open at a time
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.classList.remove('show');
                }
            });
            btn.classList.toggle('active');
            btn.nextElementSibling.classList.toggle('show');
        });
    });

    // Contact form validation and feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            // Get fields and error spans
            const name = document.getElementById('contactName');
            const email = document.getElementById('contactEmail');
            const message = document.getElementById('contactMessage');
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';

            // Name validation
            if (!name.value.trim()) {
                nameError.textContent = 'Name is required.';
                valid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                emailError.textContent = 'Email is required.';
                valid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email.';
                valid = false;
            }

            
            if (!message.value.trim()) {
                messageError.textContent = 'Message is required.';
                valid = false;
            }

            if (valid) {
                alert('Thank you for contacting us! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }


    const visitCountSpan = document.getElementById('visitCount');
    if (visitCountSpan) {
        let count = parseInt(localStorage.getItem('onfruit_visit_count') || '0', 10);
        count += 1;
        localStorage.setItem('onfruit_visit_count', count);
        visitCountSpan.textContent = count;
    }
});
document.addEventListener('DOMContentLoaded', function () {


    
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    function setTheme(mode) {
        if (mode === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.classList.add('dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.classList.remove('dark');
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    }
  // Load theme from localStorage or system
    let savedTheme = localStorage.getItem('onfruit_theme');
    if (!savedTheme) savedTheme = prefersDark ? 'dark' : 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('onfruit_theme', isDark ? 'dark' : 'light');
            setTheme(isDark ? 'dark' : 'light');
        });
    }
  // SMOOTH SCROLL NAVIGATION + ACTIVE LINK HIGHLIGHT
    const navLinks = document.querySelectorAll('ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

  // Highlight active nav link on scroll
    function highlightNav() {
        let scrollPos = window.scrollY || document.documentElement.scrollTop;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const top = section.offsetTop - 80;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

   const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


});