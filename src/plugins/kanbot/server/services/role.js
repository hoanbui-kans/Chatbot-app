'use strict';

/**
 *  service
 */

module.exports = ({strapi}) => ({

    async findMany(query) {
        return await strapi.entityService.findMany("plugin::kanbot.role", {
            query: query
        });
    },
  
    async findOne(id) {
        return await strapi.entityService.findOne("plugin::kanbot.role", id, {
            populate: "*"
        });
    },

    async create(data) {
        return await strapi.entityService.create("plugin::kanbot.role", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::kanbot.role", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::kanbot.role", id);
    }

});
