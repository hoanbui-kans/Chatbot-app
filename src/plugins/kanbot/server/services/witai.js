'use strict';

/**
 *  service
 */

module.exports = ({ strapi }) => ({

  async findMany(query) {
       return await strapi.entityService.findMany("plugin::kanbot.witai", {
           query: query
       });
   },

   async findOne(id) {
       return await strapi.entityService.findOne("plugin::kanbot.witai", id, {
           populate: "*"
       });
   },

   async findOneByName(appname) {
        const AppInfo =  await strapi.db.query("plugin::kanbot.witai").findOne({
            where: { 
                app_name: appname
            }
        });
        return AppInfo;
    },

   async create(data) {
       return await strapi.entityService.create("plugin::kanbot.witai", data);
   },

   async update(id, data) {
       return await strapi.entityService.update("plugin::kanbot.witai", id, data);
   },

   async delete(id) {
       return await strapi.entityService.delete("plugin::kanbot.witai", id);
   }

});