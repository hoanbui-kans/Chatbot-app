'use strict';

/**
 *  service
 */


module.exports = ({ strapi }) => ({

  async findBot (id) {
    return await strapi.entityService.findOne("plugin::kanbot.witai", id);
  },
  

  async findAllBot () {
    return [1, 2, 3];
  },

  async create (data) {
    return await strapi.entityService.create("plugin::kanbot.witai", data);
  },

  async update (id, data) {
    return await strapi.entityService.update("plugin::kanbot.witai", id, data);
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::kanbot.witai", id);
  },

});