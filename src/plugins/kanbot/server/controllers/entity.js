'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => ({

    async findManyEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .findMany(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOneEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .findOne(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async createEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .create(ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async updateEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .update(ctx.params.id, ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async deleteEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .delete(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
});
