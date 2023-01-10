'use strict';

/**
 *  controller
 */

module.exports = ({strapi}) => ({

    async findManyTrait (ctx) {
        try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('trait')
             .findMany(ctx.query);
        } catch (err) {
             ctx.throw(500, err);
        }
     },
 
     async findOneTrait (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('trait')
             .findOne(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async createTrait (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('trait')
             .create(ctx.request.body);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async updateTrait (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('trait')
             .update(ctx.params.id, ctx.request.body);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async deleteTrait (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('trait')
             .delete(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },

});
