document.addEventListener('DOMContentLoaded', async () => {
    const articlesGrid = document.getElementById('articles-grid');
    
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        const response = await fetch(`/api/articles${category ? `?category=${category}` : ''}`);
        const articles = await response.json();
        
        articles.forEach(article => {
            const articleCard = createArticleCard(article);
            articlesGrid.appendChild(articleCard);
        });
    } catch (error) {
        console.error('Error loading articles:', error);
    }
});

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';
    
    card.innerHTML = `
        <div class="article-image" style="background-image: url('${article.imageUrl}')"></div>
        <div class="article-content">
            <h3>${article.title}</h3>
            <p>${article.seoDescription}</p>
            <a href="/article/${article._id}" class="read-more">Read More</a>
        </div>
    `;
    
    return card;
} 