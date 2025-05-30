"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
