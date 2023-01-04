'use strict';

/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = ({ strapi }) => ({

    async findAll () {
      return await strapi.entityService.findMany("plugin::kanbot.entity");
    },
  
    async createEntity () {
      return [1, 2, 3];
    },
  
  });
