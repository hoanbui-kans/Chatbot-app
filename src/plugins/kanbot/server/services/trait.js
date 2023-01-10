'use strict';

/**
 *  service
 */

module.exports = ({strapi}) => ({

    async findMany(query) {
        return await strapi.entityService.findMany("plugin::kanbot.trait", {
            query: query
          });
    },
  
    async findOne(id) {
        return await strapi.entityService.findOne("plugin::kanbot.trait", id, {
            populate: "*"
        });
    },

    async create(data) {
        return await strapi.entityService.create("plugin::kanbot.trait", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::kanbot.trait", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::kanbot.trait", id);
    }

});
