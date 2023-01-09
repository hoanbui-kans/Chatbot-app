'use strict';

/**
 *  service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::connection.facebook', (({strapi}) => ({

    async findAll() {
        return await strapi.entityService.findMany("plugin::connection.facebook", {
            query: query,
            populate: populate
        });
    },

    async findOneByPageId(page_id) {
        const query = {
            filters: {
                page_id: { '$eq': page_id }
            }
        }
        const response = await strapi.entityService.findMany("plugin::connection.facebook", query);
        if(Array.isArray(response) && response.length){
            return(response[0]);
        }

        return false 
    },

    async findOne(id) {
        return await strapi.entityService.findOne("plugin::connection.facebook", id);
    },

    async create(data) {
        return await strapi.entityService.create("plugin::connection.facebook", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::connection.facebook", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::connection.facebook", id);
    }

})));
