'use strict';

/**
 *  service
 */

const populate = {
    intent: true,
    entities: {
        populate: {
            entity: true,
            keyword: true
        }
    },
    traits: true,
};

module.exports = ({strapi}) => ({
    async findMany(query) {
        return await strapi.db.query("plugin::kanbot.utterance").findMany({
            where: query,
            populate: populate
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
