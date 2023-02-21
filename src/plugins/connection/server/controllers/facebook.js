'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::connection.facebook', (({ strapi }) => ({

        async findAllFacebookPage(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .findAll(ctx.query);
            } catch (error) {
                ctx.throw(403, error)
            }
        },

        async findOneFacebookPageById(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .findOneByPageId(ctx.params.id);
            } catch (error) {
                ctx.throw(403, error)
            }
        },

        async findOneFacebookPage(ctx) {
            try {
                ctx.body = await strapi
                .plugin('connection')
                .service('facebook')
                .findOne(ctx.params.id);
            } catch (err) {
                ctx.throw(500, err);
            }
        },

})));

