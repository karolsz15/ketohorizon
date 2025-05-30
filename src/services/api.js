import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Debug log the base URL
console.log('API Base URL:', process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337');

export const getArticles = async (lang = 'en') => {
  try {
    console.log('Fetching articles with lang:', lang);

    const response = await api.get('/api/articles', {
      params: {
        locale: lang || 'en',
        populate: '*',
        sort: 'createdAt:desc'
      }
    });

    console.log('Raw API response:', response);

    // The response structure is different - data is directly in response.data.data
    const articles = response.data.data.map(article => ({
      id: article.id,
      attributes: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        publishedAt: article.publishedAt
      }
    }));

    return articles;
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const getArticle = async (slug, lang) => {
  try {
    const response = await api.get('/api/articles', {
      params: {
        filters: {
          slug: {
            $eq: slug
          }
        },
        locale: lang || 'en'
      }
    });

    console.log('Article response:', response.data); // Debug log

    if (!response.data?.data?.[0]) {
      throw new Error('Article not found');
    }

    const article = response.data.data[0];
    return {
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      slug: article.slug,
      category: article.category,
      publishedAt: article.publishedAt
    };
  } catch (error) {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const bulkCreateArticles = async (articles, token) => {
  try {
    const { data } = await api.post('/api/articles/bulk-create', articles, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// Example usage:
// const articles = [
//   {
//     title: 'Keto Basics',
//     slug: 'keto-basics',
//     content: '...',
//     excerpt: '...',
//     category: 'basics',
//     locale: 'en'
//   },
//   // ... more articles
// ]; 