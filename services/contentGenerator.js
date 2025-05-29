const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateArticle(topic) {
    const completion = await openai.createCompletion({
        model: "gpt-4",
        prompt: `Write a comprehensive, SEO-optimized article about ${topic} for a keto diet website. Include scientific references and practical tips.`,
        max_tokens: 2000
    });
    return completion.data.choices[0].text;
}

async function generateRecipe(mealType) {
    const completion = await openai.createCompletion({
        model: "gpt-4",
        prompt: `Create a keto-friendly recipe for ${mealType} including ingredients, instructions, and nutritional information.`,
        max_tokens: 1000
    });
    return completion.data.choices[0].text;
}

module.exports = {
    generateArticle,
    generateRecipe
}; 