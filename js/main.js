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