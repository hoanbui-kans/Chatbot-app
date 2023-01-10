'use strict';

/**
 *  service
 */

const populate = {
  intents: true
}

module.exports = ({ strapi }) => ({

    async findMany(query) {
        return await strapi.entityService.findMany("plugin::kanbot.entity", {
            query: query,
            populate: populate
        });
    },

    async findOne(id) {
        return await strapi.entityService.findOne("plugin::kanbot.entity", id, {
            populate: populate
        });
    },

    async create(data) {
        return await strapi.entityService.create("plugin::kanbot.entity", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::kanbot.entity", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::kanbot.entity", id);
    }

});
