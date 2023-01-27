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
                return ctx.throw(404, { message: "App not found"});
            }

            let Keywords = [];

            if(Array.isArray(request.data.keywords) && request.data.keywords.length){
                request.data.keywords.map((val) => {
                    let synonyms = [val.keyword];
                    Keywords.push({
                        keyword: val.keyword,
                        synonyms: synonyms
                    })
                })
            }

            const config = {
                url: "https://api.wit.ai/entities?v=20221114",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AppInfo.server_access_token}`,
                    "Content-Type": "application/json"
                },
                data: {
                    "name": request.data.name,
                    "roles":[],
                    "keywords": Keywords
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
            const request = ctx.request.body;
            let Keywords = [];

            const AppInfo = await strapi
            .plugin('kanbot')
            .service('witai')
            .findOne(request.data.kanbot_witais);
    
            if(!AppInfo){
                return ctx.throw(404, { message: "App not found"});
            }

            if(Array.isArray(request.data.keywords) && request.data.keywords.length){
                request.data.keywords.map((val) => {
                    let synonyms = [val.keyword];
                    Keywords.push({
                        keyword: val.keyword,
                        synonyms: synonyms
                    })
                })
            }

            const config = {
                url: `https://api.wit.ai/entities/${request.data.name}?v=20221114`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${AppInfo.server_access_token}`,
                    "Content-Type":" application/json"
                },
                data: {
                    "name": request.data.name,
                    "roles": [request.data.name],
                    "lookups": ["free-text", "keywords"],
                    "keywords": Keywords
                }
            }

            const updatedEntity = await axios(config).then((res) => res.data).catch((err) => { console.log(err)});

            if(!updatedEntity){
                return ctx.throw(400, 'Entity not updated');
            }

            return ctx.body = await strapi
            .plugin('kanbot')
            .service('entity')
            .update(ctx.params.id, request);

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async deleteEntity (ctx) {
        try {
            const request = ctx.request.body;
            const config = {
                url: `https://api.wit.ai/entities/${request.data.name}?v=20221114`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
            const DeletedEntity = await axios(config).then((res) => res.data).catch((err) => { console.log(err) });
            if(!DeletedEntity){
                return ctx.throw(400, 'Entity not deleted');
            }

            return  ctx.body = await strapi
                                .plugin('kanbot')
                                .service('entity')
                                .delete(ctx.request.data.id);

        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
});
