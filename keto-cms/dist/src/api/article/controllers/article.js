"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::article.article', ({ strapi }) => ({
    // Keep the default actions
    ...strapi_1.factories.createCoreController('api::article.article'),
    // Add custom actions
    async bulkCreate(ctx) {
        try {
            const { body } = ctx.request;
            console.log('Received body:', body); // Debug log
            if (!Array.isArray(body)) {
                console.log('Body type:', typeof body); // Debug log
                return ctx.badRequest('Request body must be an array of articles');
            }
            if (body.length === 0) {
                return ctx.badRequest('Article array cannot be empty');
            }
            const results = await Promise.all(body.map(async (article) => {
                console.log('Processing article:', article); // Debug log
                return strapi.entityService.create('api::article.article', {
                    data: article.data
                });
            }));
            return {
                data: results,
                meta: {
                    count: results.length
                }
            };
        }
        catch (error) {
            console.error('Bulk create error:', error); // Debug log
            return ctx.badRequest('Error creating articles', { error: error.message });
        }
    }
}));
