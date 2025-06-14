document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainHeader = document.getElementById('mainHeader');
    const logo = document.querySelector('.main-header__logo-link');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navbar = document.querySelector('.main-header');
    let lastNavbarVisible = true;


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

        // Show/hide scroll to top button
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = scrollY > 300 ? 'flex' : 'none';
        }

        if (navbar) {
            if (scrollY > 250 && scrollY < 949) {
                navbar.classList.add('hidden');
                lastNavbarVisible = false;
            } else {
                if (!lastNavbarVisible) {
                    navbar.classList.remove('hidden');

                    // Fade-in logo
                    if (logo) {
                        logo.style.opacity = '0';
                        setTimeout(() => {
                            logo.style.opacity = '1';
                        }, 300);
                    }

                    lastNavbarVisible = true;
                }

                // Add or remove background color on scroll
                if (scrollY > 950) {
                    navbar.classList.add('main-header--scrolled', 'nav-visible');
                } else {
                    navbar.classList.remove('main-header--scrolled', 'nav-visible');
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

// ---
