document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU LOGIC ---
    // Matches ID in index.html: <button id="mobile-menu-btn">
    const menuBtn = document.getElementById('mobile-menu-btn'); 
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

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