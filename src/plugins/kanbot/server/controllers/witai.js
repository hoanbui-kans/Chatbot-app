'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::kanbot.witai', ({ strapi }) => ({

  async findbot (ctx) {
    ctx.body = await strapi
    .plugin('kanbot')
    .service('witai')
    .findAllBot();
  },

  async findAllBot (ctx) {
    ctx.body = await strapi
    .plugin('kanbot')
    .service('witai')
    .findAllBot();
  },

  async createbot (ctx) {
    try {
      ctx.body = await strapi
        .plugin("kanbot")
        .service("witai")
        .create(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async updatebot (ctx) {
    try {
      ctx.body = await strapi
        .plugin("kanbot")
        .service("witai")
        .update(ctx.request.body.id, ctx.request.body.data);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async deletebot (ctx) {
    try {
      ctx.body = await strapi
        .plugin("kanbot")
        .service("witat")
        .delete(ctx.request.body.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  }

}));
