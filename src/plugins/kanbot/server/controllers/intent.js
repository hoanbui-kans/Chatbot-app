'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => ({

  async findManyIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .findMany(ctx.query);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async findOneIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .findOne(ctx.params.id);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async createIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .create(ctx.request.body);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async updateIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .update(ctx.params.id, ctx.request.body);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async deleteIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .delete(ctx.params.id);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

});
