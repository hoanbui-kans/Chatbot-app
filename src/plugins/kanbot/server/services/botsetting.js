'use strict';

/**
 *  service
 */

module.exports = ({ strapi }) => ({
  async findOne(id) {
      return await strapi.entityService.findOne("plugin::kanbot.botsetting", id);
  }
});;
