'use strict';

/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = ({ strapi }) => ({
    async findAll () {
      return await strapi.entityService.findOne("plugin::kanbot.witai", id);
    },
  
    async createEntity () {
      return [1, 2, 3];
    },
  
  });
