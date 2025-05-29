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

const languages = ['es', 'zh'];

// Create language directories
languages.forEach(lang => {
    const langDirs = ['css', 'js', 'images'].map(dir => path.join(lang, dir));
    langDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
});

const translations = {
    es: require('./translations/es.json'),
    zh: require('./translations/zh.json')
};

// Create language directories and copy files
languages.forEach(lang => {
    // Create directories
    const langDirs = ['css', 'js', 'images'].map(dir => path.join(lang, dir));
    langDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    // Copy and translate files
    filesToMove.forEach(file => {
        if (file.endsWith('.html')) {
            // Translate HTML content
            const content = fs.readFileSync(file, 'utf8');
            const translatedContent = translateContent(content, translations[lang]);
            fs.writeFileSync(path.join(lang, file), translatedContent);
        } else {
            // Copy other files as-is
            const sourcePath = file;
            const destPath = path.join(lang, file);
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
            }
        }
    });
});

console.log('Build completed successfully!'); 