'use strict';

/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::connection.facebook', (({strapi}) => ({

    async findMany(query) {
        console.log('query', query);
        return await strapi.query("plugin::connection.facebook").findPage({
            ...query
        });
    },

    async findOnePage(page_id) {
        return await strapi.query("plugin::connection.facebook").findOne({
            where: {
                page_id: page_id
            }
        });
    },

    async create(data) {
        return await strapi.db.query("plugin::connection.facebook").createMany(data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::connection.facebook", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::connection.facebook", id);
    }

})));
