'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::connection.facebook', (({ strapi }) => ({

        async findMany(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .findMany(ctx.query);
            } catch (error) {
                ctx.throw(403, error)
            }
        },

        async fineOnePage(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .findOnePage(ctx.params.page_id);
            } catch (error) {
                ctx.throw(403, error)
            }
        },
        
        async create(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .create(ctx.request.body);
            } catch (err) {
                ctx.throw(500, err);
            }
        },

        async delete(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .delete(ctx.params.id);
            } catch (err) {
                ctx.throw(500, err);
            }
        },

})));

