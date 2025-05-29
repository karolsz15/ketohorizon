const contentGenerator = require('../services/contentGenerator');

async function generateInitialContent() {
    // Generate 20 articles
    const articleTopics = [
        "Keto Diet Basics",
        "Benefits of Ketosis",
        // ... add more topics
    ];

    // Generate 20 recipes
    const recipeTypes = [
        "Breakfast",
        "Lunch",
        // ... add more meal types
    ];

    for (const topic of articleTopics) {
        const article = await contentGenerator.generateArticle(topic);
        // Save to database
    }

    for (const type of recipeTypes) {
        const recipe = await contentGenerator.generateRecipe(type);
        // Save to database
    }
} 