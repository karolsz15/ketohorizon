// Get browser language
function getBrowserLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.split('-')[0]; // Get primary language code
}

// Check if language is supported
function isSupportedLanguage(lang) {
    return ['en', 'es', 'zh'].includes(lang);
}

// Language selector functionality
function toggleLanguageMenu(event) {
    console.log('Toggle menu clicked');
    event.preventDefault();
    event.stopPropagation();
    
    const menu = document.getElementById('languageMenu');
    if (!menu) {
        console.error('Language menu not found');
        return;
    }
    
    // Toggle menu visibility using classList
    menu.classList.toggle('show');
    console.log('Menu visibility:', menu.classList.contains('show'));
}

// Handle language selection
function selectLanguage(event, lang) {
    console.log('Language selected:', lang);
    event.preventDefault();
    
    localStorage.setItem('preferred-language', lang);
    
    const repoPath = '/ketohorizon';
    let newPath;
    if (lang === 'en') {
        newPath = `${repoPath}/index.html`;
    } else {
        newPath = `${repoPath}/${lang}/index.html`;
    }
    
    console.log('Redirecting to:', newPath);
    window.location.href = newPath;
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('languageMenu');
    const langSelector = e.target.closest('.language-selector');
    
    if (!langSelector && menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Language script initialized');
    
    // Add click event to language button
    const langButton = document.querySelector('.current-lang');
    if (langButton) {
        langButton.addEventListener('click', toggleLanguageMenu);
    }
    
    // Add click events to language options
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.getAttribute('data-lang');
            selectLanguage(e, lang);
        });
    });
    
    // Check for stored language preference
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && isSupportedLanguage(storedLang)) {
        const currentLang = window.location.pathname.split('/')[2];
        if (currentLang !== storedLang) {
            const repoPath = '/ketohorizon';
            const newPath = storedLang === 'en' ? 
                `${repoPath}/index.html` : 
                `${repoPath}/${storedLang}/index.html`;
            window.location.href = newPath;
        }
    }
}); 