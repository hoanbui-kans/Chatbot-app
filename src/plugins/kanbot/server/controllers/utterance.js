'use strict';

/**
 *  controller
 */

module.exports = ({strapi}) => ({
    async findManyUtterance (ctx) {
        try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .findMany(ctx.query);
        } catch (err) {
             ctx.throw(500, err);
        }
     },
 
     async findOneUtterance (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .findOne(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async createUtterance (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .create(ctx.request.body);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async updateUtterance (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .update(ctx.params.id, ctx.request.body);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async deleteUtterance (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .delete(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },

});
