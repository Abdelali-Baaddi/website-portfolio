document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
        });
    });

    // --- Hero Animations (on load) ---
    const heroElements = document.querySelectorAll('.animate-hidden');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('show-animate');
        }, 100 * index);
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    // --- Collapsible Certificate Toggle (NEW) ---
    const toggleButton = document.querySelector('.linkedin-toggle-btn');
    const collapsibleContent = document.querySelector('.collapsible-content');
    const toggleIcon = document.querySelector('.toggle-icon');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Toggle the 'active' class to control max-height in CSS
            collapsibleContent.classList.toggle('active');
            
            // Toggle the icon (chevron up/down)
            if (collapsibleContent.classList.contains('active')) {
                toggleIcon.innerHTML = '<i class="fas fa-chevron-up"></i>';
            } else {
                toggleIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';
            }
        });
    }


    // --- Parallax Effect for Hero Shapes ---
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20; // Different speeds for depth
            const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
            const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section, header');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            // Ensure link includes the section ID (e.g., href="#about" matches id="about")
            if (a.getAttribute('href') && a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});