document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU LOGIC ---
    // Matches ID in index.html: <button id="mobile-menu-btn">
    const menuBtn = document.getElementById('mobile-menu-btn'); 
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU LOGIC ---
    const menuBtn = document.getElementById('mobile-menu-btn'); 
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        }

        menuBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- 2. DARK/LIGHT MODE TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const html = document.documentElement;

    // Check Local Storage or System Preference
    if (localStorage.getItem('color-theme') === 'light' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        html.classList.remove('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    } else {
        html.classList.add('dark');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            lightIcon.classList.toggle('hidden');
            darkIcon.classList.toggle('hidden');

            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    html.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    html.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (html.classList.contains('dark')) {
                    html.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    html.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // --- 3. IMAGE LAZY LOADING ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // --- 4. COOKIE CONSENT ---
    const cookieBanner = document.getElementById('cookie-banner');
    
    if (!localStorage.getItem('cookieConsent')) {
        if (cookieBanner) cookieBanner.classList.remove('hidden');
    }

    window.acceptCookies = function() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
            console.log('Google Consent: Granted');
        }
        
        localStorage.setItem('cookieConsent', 'accepted');
        if (cookieBanner) cookieBanner.classList.add('hidden');
    };

    window.rejectCookies = function() {
        localStorage.setItem('cookieConsent', 'rejected');
        if (cookieBanner) cookieBanner.classList.add('hidden');
    };
});

    if (menuBtn && mobileMenu) {
        function toggleMenu() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            // Optional: Toggle icon state here if you want to animate the hamburger
        }

        menuBtn.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- 2. IMAGE LAZY LOADING (PERFORMANCE) ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    // --- 5. PREMIUM LIGHTBOX GALLERY ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    if (lightbox && galleryItems.length > 0) {
        let currentIndex = 0;
        let imageUrls = [];

        // Събираме всички сорсове на снимки
        galleryItems.forEach((img, index) => {
            imageUrls.push(img.src);
            
            // Отваряне при клик върху снимката в мрежата
            img.parentElement.addEventListener('click', () => {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.remove('hidden');
                
                // Fade & Scale In
                setTimeout(() => {
                    lightbox.classList.remove('opacity-0');
                    lightboxImg.classList.remove('scale-95');
                    lightboxImg.classList.add('scale-100');
                }, 10);
                
                document.body.style.overflow = 'hidden'; // Спира скролирането на сайта
            });
        });

        // Ъпдейт на снимката и брояча
        function updateLightbox() {
            lightboxImg.src = imageUrls[currentIndex];
            lightboxCounter.innerText = `${currentIndex + 1} / ${imageUrls.length}`;
        }

        function nextImage(e) {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex === imageUrls.length - 1) ? 0 : currentIndex + 1;
            updateLightbox();
        }

        function prevImage(e) {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex === 0) ? imageUrls.length - 1 : currentIndex - 1;
            updateLightbox();
        }

        function closeLightbox() {
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300); // Изчаква CSS транзицията
        }

        // Кликане върху лява/дясна зона
        document.getElementById('lightbox-next').addEventListener('click', nextImage);
        document.getElementById('lightbox-prev').addEventListener('click', prevImage);
        document.getElementById('close-lightbox').addEventListener('click', closeLightbox);

        // Навигация с клавиатурата (Arrows & Escape)
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'Escape') closeLightbox();
            }
        });

        // Swipe навигация за мобилни устройства
        let touchstartX = 0;
        let touchendX = 0;

        lightbox.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            // Настройка на чувствителността на свайпа (50px)
            if (touchendX < touchstartX - 50) nextImage(); // Swipe наляво
            if (touchendX > touchstartX + 50) prevImage(); // Swipe надясно
            
            // Ако кликне извън снимката (нагоре/надолу), може да добавиш затваряне
            if (Math.abs(touchendX - touchstartX) < 10 && e.target === lightbox) {
                 closeLightbox();
            }
        }
    }

    // --- 3. COOKIE CONSENT & GOOGLE TAGS ---
    const cookieBanner = document.getElementById('cookie-banner');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        if (cookieBanner) cookieBanner.classList.remove('hidden');
    }

    // Define Global Functions for Button OnClick events
    window.acceptCookies = function() {
        // Update Google Consent Mode v2
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
            console.log('Google Consent: Granted');
        }
        
        localStorage.setItem('cookieConsent', 'accepted');
        if (cookieBanner) cookieBanner.classList.add('hidden');
    };

    window.rejectCookies = function() {
        localStorage.setItem('cookieConsent', 'rejected');
        if (cookieBanner) cookieBanner.classList.add('hidden');
    };
});