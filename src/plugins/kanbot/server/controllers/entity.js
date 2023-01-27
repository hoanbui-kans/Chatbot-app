'use strict';

/**
 *  controller
 */
const axios = require('axios');

module.exports = ({ strapi }) => ({

    async findManyEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .findMany(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOneEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .findOne(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async createEntity (ctx) {
        try {
            const request = ctx.request.body;
            const AppInfo = await strapi
            .plugin('kanbot')
            .service('witai')
            .findOne(request.data.kanbot_witais);

            if(!AppInfo){
                ctx.throw(404, { message: "App not found"});
            }
            let Keywords = [];
            request.data.entity.keywords.map((val) => {
                let synonyms = [val.keyword];
                Keywords.push({
                    keyword: val.keyword,
                    synonyms: synonyms
                })
            })

            const config = {
                url: "https://api.wit.ai/entities?v=20221114",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AppInfo.server_access_token}`,
                    "Content-Type": "application/json"
                },
                data: {
                    "name": entity.name,
                    "roles":[],
                    "keywords": entity.keywords
                }
            }
            const entityCreated = await axios(config).then((res) => res.data);

            if(!entityCreated){
                ctx.throw(404, { message: "Entity not created"});
            }

            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .create(request);
            
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async updateEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .update(ctx.params.id, ctx.request.body);
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async deleteEntity (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .delete(ctx.params.id);
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
});
