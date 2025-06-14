document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainHeader = document.getElementById('mainHeader');
    const logo = document.querySelector('.main-header__logo-link');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navbar = document.querySelector('.main-header');
    let lastNavbarVisible = true;

    // ===== Page Load =====
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

    // ===== Scroll Events =====
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

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

                    if (logo) {
                        logo.style.opacity = '0';
                        setTimeout(() => {
                            logo.style.opacity = '1';
                        }, 300);
                    }

                    lastNavbarVisible = true;
                }

                if (scrollY > 950) {
                    navbar.classList.add('main-header--scrolled', 'nav-visible');
                } else {
                    navbar.classList.remove('main-header--scrolled', 'nav-visible');
                }
            }
        }
    });

    // ===== Scroll to top =====
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Responsive Carousel =====
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

    // ===== Header Interaction Functions =====

    window.toggleMenu = function () {
        const menu = document.getElementById('menu');
        const overlay = document.getElementById('overlay');
        if (menu && overlay) {
            menu.classList.toggle('open');
            overlay.classList.toggle('show');
        }
    };

    window.toggleSearch = function () {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) {
            searchOverlay.classList.toggle('show');
        }
    };

    window.toggleLogin = function () {
        const loginOverlay = document.getElementById('loginOverlay');
        if (loginOverlay) {
            loginOverlay.classList.toggle('show');
        }
    };

    window.validateLogin = function () {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        let isValid = true;

        if (!email) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        if (!password) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        if (isValid) {
            alert('تم تسجيل الدخول بنجاح');
            toggleLogin(); // Close the login popup
        }
    };
});
