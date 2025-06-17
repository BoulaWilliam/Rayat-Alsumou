document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainHeader = document.getElementById('mainHeader');
    const logo = document.querySelector('.main-header__logo-link');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navbar = document.querySelector('.main-header');
    let lastNavbarVisible = true;

    // Prepare logo for fade-in effect
    if (logo) logo.style.transition = 'opacity 0.6s ease';

    // --- Page Load: hide loading screen and show main header ---
    window.addEventListener('load', function () {
        if (loadingScreen) {
            loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (mainHeader) mainHeader.style.opacity = '1';
            }, 500);
        }

        controlResponsiveCarousels();
    });

    // --- Scroll Event Handling ---
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        // Scroll-to-top button visibility
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = scrollY > 300 ? 'flex' : 'none';
        }

        // Navbar hide/show and logo animation
        if (navbar) {
            if (scrollY > 250 && scrollY < 949) {
                navbar.style.display = "none";
                lastNavbarVisible = false;
            } else {
                if (!lastNavbarVisible) {
                    navbar.style.display = "block";

                    // Fade-in logo when nav reappears
                    if (logo) {
                        logo.style.opacity = '0';
                        setTimeout(() => {
                            logo.style.opacity = '1';
                        }, 300);
                    }

                    lastNavbarVisible = true;
                }

                // Add/remove scrolled class
                if (scrollY > 950) {
                    navbar.classList.add('main-header--scrolled');
                } else if (scrollY < 250) {
                    navbar.classList.remove('main-header--scrolled');
                }
            }
        }
    });

    // --- Scroll to top click ---
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Responsive Carousel Setup ---
    window.addEventListener('resize', controlResponsiveCarousels);

    function controlResponsiveCarousels() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
            initializeCarousel('#servicesCarousel');
            initializeCarousel('#featureCarousel');
        } else {
            destroyCarousel('#servicesCarousel');
            destroyCarousel('#featureCarousel');
        }
    }

    function initializeCarousel(selector) {
        const element = document.querySelector(selector);
        if (!element || element.classList.contains('carousel-initialized')) return;

        const carousel = new bootstrap.Carousel(element, {
            interval: 3000,
            ride: 'carousel',
            pause: false,
            wrap: true
        });

        element.classList.add('carousel-initialized');

        element.addEventListener('slid.bs.carousel', function () {
            const activeItem = element.querySelector('.carousel-item.active');
            const items = element.querySelectorAll('.carousel-item');
            if (activeItem === items[items.length - 1]) {
                setTimeout(() => {
                    carousel.to(0);
                }, 3000);
            }
        });
    }

    function destroyCarousel(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        const instance = bootstrap.Carousel.getInstance(element);
        if (instance) {
            instance.pause();
            instance.dispose();
            element.classList.remove('carousel-initialized');
        }
    }
});

// --- Menu Toggle ---
function toggleMenu() {
    document.getElementById('menu')?.classList.toggle('open');
    document.getElementById('overlay')?.classList.toggle('show');
}

// --- Login Toggle ---
function toggleLogin() {
    document.getElementById('loginOverlay')?.classList.toggle('show');
}

// --- Search Toggle ---
function toggleSearch() {
    document.getElementById('searchOverlay')?.classList.toggle('show');
}

// --- Login Validation ---
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
