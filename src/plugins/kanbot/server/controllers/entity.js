'use strict';

/**
 *  controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::kanbot.entity', ({ strapi }) => ({

    async findAllEntity (ctx) {
      ctx.body = await strapi
      .plugin('kanbot')
      .service('entity')
      .findAll();
    },
  
    async createEntity (ctx) {
      ctx.body = await strapi
      .plugin('kanbot')
      .service('entity')
      .createEntity();
    },

  
  }));
