'use strict';

/**
 *  service
 */

module.exports = ({strapi}) => ({
    async findMany(query) {
        return await strapi.entityService.findMany("plugin::kanbot.utterance", {
            query: query
        });
    },

    async findOne(id) {
        return await strapi.entityService.findOne("plugin::kanbot.utterance", id, {
            populate: "*"
        });
    },

    async create(data) {
        return await strapi.entityService.create("plugin::kanbot.utterance", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::kanbot.utterance", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::kanbot.utterance", id);
    }
});
