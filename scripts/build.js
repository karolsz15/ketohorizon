const fs = require('fs');
const path = require('path');

// Create necessary directories
const languages = ['es', 'zh'];
const dirs = ['css', 'js', 'images'];

// Create base directories
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Create language directories
languages.forEach(lang => {
    if (!fs.existsSync(lang)) {
        fs.mkdirSync(lang, { recursive: true });
    }
});

// Copy files to language directories
languages.forEach(lang => {
    const files = [
        'index.html',
        'articles.html',
        'recipes.html',
        'ebooks.html'
    ];
    
    files.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(lang, file));
        }
    });
});

console.log('Build completed successfully!'); 