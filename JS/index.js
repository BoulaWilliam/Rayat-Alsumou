// Ensure all necessary DOM elements are loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Loading Screen Start ---
    const loadingScreen = document.getElementById('loadingScreen');
    const mainHeader = document.getElementById('mainHeader'); // The header element

    // Use window.onload to ensure all assets are loaded before hiding loader
    window.addEventListener('load', function () {
        if (loadingScreen) {
            loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none'; // Make it non-interactive

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (mainHeader) mainHeader.style.opacity = '1'; // Ensure header is visible
            }, 500); // Matches the CSS transition duration
        }
    });
    // --- Loading Screen End ---


    // --- Scroll to Top Button + Navbar Scroll Effects Start ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navbar = document.querySelector('.main-header'); // Select by the new class name

    if (scrollToTopBtn) {
        // Event listener for scroll to top button click
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Event listener for window scroll to handle button visibility and navbar changes
    window.addEventListener('scroll', function () {
        // Show/hide scroll to top button based on scroll position
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none'; // Show/hide, flex for centering icon
        }

        // Navbar behavior on scroll
        if (navbar) {
            // Check if scrolling down (past 250px and before 949px) to hide navbar
            // Or scrolling very far down (past 950px) to add black background
            // Or scrolling near top (below 250px) to remove black background
            if (window.scrollY < 949 && window.scrollY > 250) {
                navbar.style.display = "none"; // Hide navbar
            } else {
                navbar.style.display = "block"; // Ensure navbar is visible

                if (window.scrollY > 950) {
                    navbar.classList.add('main-header--scrolled'); // Add scrolled class
                    // No specific logo text color changes as per new HTML structure
                } else if (window.scrollY < 250) {
                    navbar.classList.remove('main-header--scrolled'); // Remove scrolled class
                    // No specific logo text color changes
                }
            }
        }
    });
    // --- Scroll to Top Button + Navbar Scroll Effects End ---

}); // End DOMContentLoaded


// --- Menu, Login, and Search Toggles Functions Start ---
function toggleMenu() {
    document.getElementById('menu')?.classList.toggle('open'); // Side navigation menu
    document.getElementById('overlay')?.classList.toggle('show'); // Overlay for menu
}

function toggleLogin() {
    document.getElementById('loginOverlay')?.classList.toggle('show'); // Login popup
}

function toggleSearch() {
    document.getElementById('searchOverlay')?.classList.toggle('show'); // Search popup
}
// --- Menu, Login, and Search Toggles Functions End ---


// --- Login Form Validation Start ---
function validateLogin() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    let valid = true;

    if (!email) {
        if (emailError) emailError.style.display = 'block';
        valid = false;
    } else {
        if (emailError) emailError.style.display = 'none';
    }

    if (!password) {
        if (passwordError) passwordError.style.display = 'block';
        valid = false;
    } else {
        if (passwordError) passwordError.style.display = 'none';
    }

    if (valid) {
        console.log("Login form is valid. Attempting to log in...");
        toggleLogin(); 
    }
}
// --- Login Form Validation End ---


// Scroll Reveal Code

   // Initialize ScrollReveal
        ScrollReveal().reveal('.animate__animated', {
            delay: 200,    // Delay before the animation starts
            distance: '50px', // Distance of the animation
            origin: 'bottom', // Direction from which the animation originates (can be 'top', 'bottom', 'left', 'right')
            duration: 1000,  // Duration of the animation
            easing: 'ease-in-out', // Easing function
            interval: 50, // Stagger animations by 50ms for elements with the same selector
            mobile: true, // Enable animations on mobile
            reset: true, // Reset animation when element is out of view (good for repeated animations)
        });

        // You can customize individual elements with specific Animate.css classes
        // For example, to make the hero section text fade in:
        ScrollReveal().reveal('.hero-section__text', {
            delay: 300,
            origin: 'left',
            distance: '20px',
            duration: 1200,
            class: 'animate__fadeInLeft' // Applying Animate.css class directly
        });

        // For the logo, you can make it zoom in
        ScrollReveal().reveal('.hero-section__logo', {
            delay: 100,
            scale: 0.8,
            duration: 1000,
            class: 'animate__zoomIn'
        });

        // Example for about section title and text
        ScrollReveal().reveal('.about-us-section__title', {
            delay: 200,
            origin: 'top',
            distance: '20px',
            duration: 1000,
            class: 'animate__fadeInDown'
        });

        ScrollReveal().reveal('.about-us-section__text', {
            delay: 300,
            origin: 'bottom',
            distance: '20px',
            duration: 1000,
            class: 'animate__fadeInUp'
        });

        // Example for info cards in about section
        ScrollReveal().reveal('.info-card', {
            delay: 200,
            interval: 100,
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            class: 'animate__fadeInUp'
        });

        // Example for service items
        ScrollReveal().reveal('.service-item', {
            delay: 200,
            interval: 150,
            origin: 'bottom',
            distance: '30px',
            duration: 900,
            class: 'animate__zoomIn'
        });

        // Example for wooden doors section headings and descriptions
        ScrollReveal().reveal('.wooden-doors-section__heading', {
            delay: 200,
            origin: 'left',
            distance: '20px',
            duration: 1000,
            class: 'animate__fadeInLeft'
        });
        ScrollReveal().reveal('.wooden-doors-section__description', {
            delay: 300,
            origin: 'left',
            distance: '20px',
            duration: 1100,
            class: 'animate__fadeInLeft'
        });
        ScrollReveal().reveal('.wooden-doors-section__button', {
            delay: 400,
            origin: 'left',
            distance: '20px',
            duration: 1200,
            class: 'animate__fadeInLeft'
        });

        // Example for feature cards in wooden doors section
        ScrollReveal().reveal('.feature-card', {
            delay: 200,
            interval: 100,
            origin: 'bottom',
            distance: '30px',
            duration: 800,
            class: 'animate__flipInX'
        });

        // Example for gallery images
        ScrollReveal().reveal('.gallery-section__img', {
            delay: 200,
            interval: 100,
            origin: 'bottom',
            distance: '30px',
            duration: 900,
            class: 'animate__fadeInUp'
        });

        // Example for value cards in gallery section
        ScrollReveal().reveal('.value-card', {
            delay: 200,
            interval: 150,
            origin: 'bottom',
            distance: '30px',
            duration: 1000,
            class: 'animate__bounceIn'
        });

        // Example for location section elements
        ScrollReveal().reveal('.location-section__title', {
            delay: 200,
            origin: 'top',
            distance: '20px',
            duration: 1000,
            class: 'animate__fadeInDown'
        });
        ScrollReveal().reveal('.location-section__subtitle', {
            delay: 300,
            origin: 'top',
            distance: '20px',
            duration: 1100,
            class: 'animate__fadeInDown'
        });
        ScrollReveal().reveal('.location-section__map-link', {
            delay: 400,
            origin: 'left',
            distance: '20px',
            duration: 1200,
            class: 'animate__fadeInLeft'
        });
        ScrollReveal().reveal('.location-section__map-embed', {
            delay: 500,
            origin: 'bottom',
            distance: '50px',
            duration: 1300,
            class: 'animate__zoomIn'
        });

        // Example for footer elements
        ScrollReveal().reveal('.footer p.animate__animated, .footer h3.animate__animated, .footer h5.animate__animated, .footer input.animate__animated, .footer .subscribeBtn.animate__animated', {
            delay: 150,
            interval: 50,
            origin: 'bottom',
            distance: '20px',
            duration: 800,
            class: 'animate__fadeInUp'
        });

        ScrollReveal().reveal('.social-icon.animate__animated', {
            delay: 200,
            interval: 70,
            origin: 'bottom',
            distance: '20px',
            duration: 700,
            class: 'animate__flipInY'
        });

        ScrollReveal().reveal('.footerImage img.animate__animated', {
            delay: 100,
            scale: 0.8,
            duration: 900,
            class: 'animate__zoomIn'
        });

        ScrollReveal().reveal('ul.ourLinks li.animate__animated', {
            delay: 100,
            interval: 50,
            origin: 'right',
            distance: '20px',
            duration: 800,
            class: 'animate__fadeInRight'
        });

        ScrollReveal().reveal('.btn.customer.animate__animated', {
            delay: 150,
            interval: 70,
            origin: 'bottom',
            distance: '20px',
            duration: 700,
            class: 'animate__fadeInUp'
        });

        ScrollReveal().reveal('.payment img.animate__animated', {
            delay: 100,
            interval: 50,
            origin: 'bottom',
            distance: '20px',
            duration: 600,
            class: 'animate__fadeInUp'
        });

        ScrollReveal().reveal('.copyRights a', {
            delay: 200,
            origin: 'bottom',
            distance: '20px',
            duration: 1000,
            class: 'animate__fadeIn'
        });

        ScrollReveal().reveal('.scroll-to-top', {
            delay: 500,
            distance: '20px',
            origin: 'right',
            duration: 800,
            class: 'animate__fadeInRight'
        });
