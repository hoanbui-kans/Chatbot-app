'use strict';

/**
 *  service
 */

const populate = {
    flow: {
      populate: {
          kanbot_entity: true,
          kanbot_response: {
            populate: {
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
          }
      }
    },
}

module.exports = ({ strapi }) => ({

  async findMany (query) {
      return await strapi.entityService.findMany("plugin::kanbot.conservation", {
        query: query,
        populate: populate
      });
    },
    
    async findOneByIntent (intent_name) {
      return await strapi.db.query("plugin::kanbot.conservation").findOne({
        where: {

        },
        populate: populate
      });
    },
    async findOne (id) {
      return await strapi.entityService.findOne("plugin::kanbot.conservation", id, {
        populate: populate
      });
    },
    
    async create (data) {
      return await strapi.entityService.create("plugin::kanbot.conservation", data);
    },

    async update (id, data) {
      return await strapi.entityService.update("plugin::kanbot.conservation", id, data);
    },

    async delete (id) {
      return await strapi.entityService.delete("plugin::kanbot.conservation", id, data);
    },

});
