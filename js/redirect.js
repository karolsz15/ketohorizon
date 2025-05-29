const path = window.location.pathname;
const redirects = {
    '/articles': '/articles.html',
    '/recipes': '/recipes.html',
    '/ebooks': '/ebooks.html'
};

if (redirects[path]) {
    window.location.replace(redirects[path]);
} 