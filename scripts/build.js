const fs = require('fs');
const path = require('path');

// Create necessary directories
const dirs = ['css', 'js', 'images'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
});

// Move files from public to root if they exist
const filesToMove = [
    'index.html',
    'articles.html',
    'recipes.html',
    'ebooks.html',
    'css/styles.css',
    'js/articles.js',
    'js/recipes.js'
];

filesToMove.forEach(file => {
    const sourcePath = path.join('public', file);
    if (fs.existsSync(sourcePath)) {
        const destPath = file;
        fs.copyFileSync(sourcePath, destPath);
    }
}); 