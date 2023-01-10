'use strict';

/**
 *  service
 */

const populate = {
  entities: true
}

module.exports = ({ strapi }) => ({
  async findMany (query) {
    return await strapi.entityService.findMany("plugin::kanbot.intent", {
      query: query,
      populate: populate
    });
  },

  async findOne (id) {
    return await strapi.entityService.findOne("plugin::kanbot.intent", id, {
      populate: populate
    });
  },

  async create (data) {
    return await strapi.entityService.create("plugin::kanbot.intent", data);
  },

  async update (id, data) {
    return await strapi.entityService.update("plugin::kanbot.intent", id, data);
  },

  async delete (id) {
    return await strapi.entityService.delete("plugin::kanbot.intent", id);
  },

});
