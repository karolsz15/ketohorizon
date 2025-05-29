const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// MongoDB connection with error handling
mongoose.connect('mongodb://localhost/ketoguru')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Define schemas for content
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    seoTitle: String,
    seoDescription: String,
    category: String,
    tags: [String],
    publishDate: { type: Date, default: Date.now },
    author: String,
    imageUrl: String
});

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: [String],
    prepTime: Number,
    cookTime: Number,
    servings: Number,
    nutritionInfo: {
        calories: Number,
        protein: Number,
        fat: Number,
        netCarbs: Number
    },
    tags: [String],
    imageUrl: String
});

const Article = mongoose.model('Article', articleSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'articles.html'));
});

app.get('/recipes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recipes.html'));
});

app.get('/ebooks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ebooks.html'));
});

app.get('/api/articles', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const articles = await Article.find(query).sort('-publishDate');
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching articles' });
    }
});

app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 