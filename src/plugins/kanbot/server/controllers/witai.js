'use strict';

/**
 *  controller
 */

module.exports = ({ strapi }) => ({

    async findManyWitAi (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('witai')
          .findMany(ctx.query);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async findOneWitAi (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('witai')
          .findOne(ctx.params.id);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async createWitAi (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('witai')
          .create(ctx.request.body);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async updateWitAi (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('witai')
          .update(ctx.params.id, ctx.request.body);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async deleteWitAi (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('witai')
          .delete(ctx.params.id);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

});
