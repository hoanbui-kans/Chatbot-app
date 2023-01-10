'use strict';

/**
 *  controller
 */

module.exports = ({strapi}) => ({
    async findManyRole (ctx) {
        try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('role')
          .findAll(ctx.request.body);
        } catch (error) {
          ctx.throw(403, error)
        }
      },

      async findOneRole (ctx) {
        try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('role')
          .findOne(ctx.params.id);
        } catch (error) {
          ctx.throw(403, error)
        }
      },
    
      async createRole (ctx) {
        try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('role')
          .create(ctx.request.body);
        } catch (error) {
          ctx.throw(403, error)
        }
      },
  
      async updateRole (ctx) {
        try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('role')
          .update(ctx.params.id, ctx.request.body);
        } catch (error) {
          ctx.throw(403, error)
        }
      },
  
      async deleteRole (ctx) {
        try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('role')
          .delete(ctx.params.id);
        } catch (error) {
          ctx.throw(403, error)
        }
      },
});
