document.addEventListener('DOMContentLoaded', async () => {
    const recipesGrid = document.getElementById('recipes-grid');
    
    try {
        const response = await fetch('/api/recipes');
        const recipes = await response.json();
        
        recipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipesGrid.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
});

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
        <div class="recipe-image" style="background-image: url('${recipe.imageUrl}')"></div>
        <div class="recipe-content">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>Prep: ${recipe.prepTime} mins</span>
                <span>Cook: ${recipe.cookTime} mins</span>
                <span>Servings: ${recipe.servings}</span>
            </div>
            <div class="recipe-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="/recipe/${recipe._id}" class="read-more">View Recipe</a>
        </div>
    `;
    
    return card;
} 