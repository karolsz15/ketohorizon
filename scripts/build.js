const fs = require('fs');
const path = require('path');

// Create necessary directories
const dirs = ['css', 'js', 'images'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Define files to copy
const filesToMove = [
    'index.html',
    'articles.html',
    'recipes.html',
    'ebooks.html',
    '404.html',
    'css/styles.css',
    'js/articles.js',
    'js/recipes.js',
    'js/redirect.js'
];

// Copy files
filesToMove.forEach(file => {
    const sourcePath = path.join('public', file);
    const destPath = file;
    
    // Create directories if they don't exist
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Copy file if it exists
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
    }
});

// Log completion
console.log('Build completed successfully!'); 