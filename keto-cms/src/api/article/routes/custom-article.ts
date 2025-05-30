export default {
  routes: [
    {
      method: 'POST',
      path: '/articles/bulk-create',
      handler: 'api::article.article.bulkCreate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}; 