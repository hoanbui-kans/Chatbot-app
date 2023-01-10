'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => ({

    async findManyResponse (ctx) {
       try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('response')
            .findMany(ctx.query);
       } catch (err) {
            ctx.throw(500, err);
       }
    },

    async findOneResponse (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('response')
            .findOne(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async createResponse (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('response')
            .create(ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async updateResponse (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('response')
            .update(ctx.params.id, ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async deleteResponse (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('response')
            .delete(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

});
