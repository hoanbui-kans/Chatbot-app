'use strict';

/**
 *  service
 */

const populate = {
    type: {
        populate: {
            messages: {
                populate: {
                    message: true
                }
            },
            option: {
                populate: {
                    image: true
                }
            },
            button: {
                populate: {
                    title: true,
                    url: true
                }
            }
        }
    }
}

module.exports = ({ strapi }) => ({

    async findMany(query) {
        return await strapi.entityService.findMany("plugin::kanbot.response", {
            query: query,
            populate: populate
        });
    },
  
    async findOne(id) {
        return await strapi.entityService.findOne("plugin::kanbot.response", id, {
            populate: populate
        });
    },

    async create(data) {
        return await strapi.entityService.create("plugin::kanbot.response", data);
    },

    async update(id, data) {
        return await strapi.entityService.update("plugin::kanbot.response", id, data);
    },

    async delete(id) {
        return await strapi.entityService.delete("plugin::kanbot.response", id);
    }

});
