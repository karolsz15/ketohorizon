import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api'
});

export const getArticles = async (lang) => {
  const { data } = await api.get('/articles', {
    params: {
      locale: lang,
      populate: '*'
    }
  });
  return data.data;
};

export const getArticle = async (slug, lang) => {
  const { data } = await api.get('/articles', {
    params: {
      locale: lang,
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: '*'
    }
  });
  return data.data[0];
}; 