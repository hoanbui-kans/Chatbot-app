'use strict';

/**
 *  controller
**/

const axios = require('axios');

module.exports = ({ strapi }) => ({
  async findManyIntent (ctx) {
      try {
          ctx.body = await strapi
          .plugin('kanbot')
          .service('intent')
          .findMany(ctx.query);
      } catch (err) {
          ctx.throw(500, err);
      }
  },
  async createIntent (ctx) {
      try {
        const request = ctx.request.body;
        const AppInfo = await strapi
        .plugin('kanbot')
        .service('witai')
        .findOne(request.data.kanbot_witais);

        if(!AppInfo){
            return ctx.throw(404, { message: "App not found"});
        }

        const config = {
            url: "https://api.wit.ai/intents?v=20221114",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${AppInfo.server_access_token}`,
                "Content-Type": "application/json"
            },
            data: {
                "name": request.data.name
            }
        }

        const createIntentWit = await axios(config).then((res) => res.data);

        if(!createIntentWit){
            return ctx.throw(404, { message: "Witai Intents not created"});
        }

        ctx.body = await strapi
                    .plugin('kanbot')
                    .service('intent')
                    .create(request);
      } catch (err) {
          ctx.throw(500, err);
      }
  },

  async deleteIntent (ctx) {
      try {
        const request = ctx.request.body;
        const AppInfo = await strapi
        .plugin('kanbot')
        .service('witai')
        .findOne(request.data.kanbot_witais);

        if(!AppInfo){
            ctx.throw(404, { message: "App not found"});
        }

        const config = {
            url: `https://api.wit.ai/intents/${request.data.name}?v=20221114`,
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${AppInfo.server_access_token}`,
                "Content-Type": "application/json"
            }
        }

        const deleteIntentWit = await axios(config).then((res) => res.data);

        if(!deleteIntentWit){
            ctx.throw(404, { message: "Witai Intents not deleted"});
        }

        ctx.body = await strapi
        .plugin('kanbot')
        .service('intent')
        .delete(request.data.id);

      } catch (err) {
          ctx.throw(500, err);
      }
  },

});
