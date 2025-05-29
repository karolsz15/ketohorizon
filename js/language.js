// Get browser language
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.split('-')[0]; // Get primary language code
}

// Check if language is supported
function isSupportedLanguage(lang) {
    return ['en', 'es', 'zh'].includes(lang);
}

// Redirect to appropriate language version
function redirectToLanguage(lang) {
    const currentPath = window.location.pathname;
    const currentLang = currentPath.split('/')[1];
    
    // Don't redirect if already on correct language version
    if (currentLang === lang) return;
    
    // Get base path without language
    const basePath = currentPath.replace(/^\/[a-z]{2}\//, '/');
    
    // Construct new path
    const newPath = lang === 'en' ? basePath : `/${lang}${basePath}`;
    
    window.location.href = newPath;
}

// Initialize language handling
function initLanguage() {
    // Attach event listeners to language options
    attachLanguageListeners();

    // Check for stored preference first
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && isSupportedLanguage(storedLang)) {
        redirectToLanguage(storedLang);
        return;
    }
    
    // Fall back to browser language
    const browserLang = getBrowserLanguage();
    if (isSupportedLanguage(browserLang)) {
        redirectToLanguage(browserLang);
    }
}

// Attach event listeners to language options
function attachLanguageListeners() {
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.dataset.lang;
            selectLanguage(lang);
        });
    });
}

// Language selector functionality
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

// Handle language selection
function selectLanguage(lang) {
    localStorage.setItem('preferred-language', lang);
    // Get the correct path for the selected language
    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/^\/[a-z]{2}\//, '/').replace(/^\//, '');
    const newPath = lang === 'en' ? `/${basePath}` : `/${lang}/${basePath}`;
    window.location.href = newPath;
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('languageMenu');
    const langSelector = e.target.closest('.language-selector');
    
    if (!langSelector && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLanguage); 