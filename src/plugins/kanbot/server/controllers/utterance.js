'use strict';

/**
 *  controller
 */

const axios = require('axios');

module.exports = ({strapi}) => ({
    async findManyUtterance (ctx) {
        try {
            ctx.body = await strapi
            .plugin('kanbot')
            .service('utterance')
            .findMany(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
     },
 
     async findOneUtterance (ctx) {
         try {
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .findOne(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async createUtterance (ctx) {
         try {

            const request = ctx.request.body;

            const { message, intent, entities, kanbot_witais } = request.data;

            let Keywords = [];

            const AppInfo = await strapi
            .plugin('kanbot')
            .service('witai')
            .findOne(kanbot_witais);
    
            if(!AppInfo){
                return ctx.throw(404, { message: "App not found"});
            }

            const WitUtteranceEntities = [];
            if(Array.isArray(entities) && entities.length){
                entities.map((val) => {
                    const EntityWithRole = `${val.entity.name}:${val.entity.name}`;
                    WitUtteranceEntities.push({
                        entity: EntityWithRole,
                        body: val.keyword.body,
                        start: val.keyword.start,
                        end: val.keyword.end,
                        entities: []
                    })
                })
            }

            const config = {
                url: `https://api.wit.ai/utterances?v=20221114`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AppInfo.server_access_token}`,
                    "Content-Type":" application/json"
                },
                data: [{
                    text: message,
                    intent: intent.name,
                    entities: WitUtteranceEntities,
                    traits: []
                  }]
            }

            const createdUtterance = await axios(config).then((res) => res.data).catch((err) => { console.log(err)});

            if(!createdUtterance){
                return ctx.throw(400, 'Utterance not created');
            }

            const CreateEntities = [];
            if(Array.isArray(entities) && entities.length){
                entities.map((val) => {
                    CreateEntities.push({
                        entity: val.entity.id,
                        keyword: val.keyword.body
                    })
                })
            }

            const requestData = {
                data: {
                    message: message,
                    intent: intent.id,
                    entities: CreateEntities,
                    kanbot_witais: kanbot_witais
                }
            }

            return ctx.body = await strapi
            .plugin('kanbot')
            .service('utterance')
            .create(requestData);

         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async updateUtterance (ctx) {
         try {
            const request = ctx.request.body;
            const { message, intent, entities, kanbot_witais } = request.data;
            let Keywords = [];
            const AppInfo = await strapi
            .plugin('kanbot')
            .service('witai')
            .findOne(kanbot_witais);
    
            if(!AppInfo){
                return ctx.throw(404, { message: "App not found"});
            }

            const WitUtteranceEntities = [];
            if(Array.isArray(entities) && entities.length){
                entities.map((val) => {
                    const EntityWithRole = `${val.entity.name}:${val.entity.name}`;
                    WitUtteranceEntities.push({
                        entity: EntityWithRole,
                        body: val.keyword.body,
                        start: val.keyword.start,
                        end: val.keyword.end,
                        entities: []
                    })
                })
            }

            const config = {
                url: `https://api.wit.ai/utterances?v=20221114`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${AppInfo.server_access_token}`,
                    "Content-Type":" application/json"
                },
                data: [{
                    text: message,
                    intent: intent.name,
                    entities: WitUtteranceEntities,
                    traits: []
                  }]
            }

            const createdUtterance = await axios(config).then((res) => res.data).catch((err) => { console.log(err)});

            if(!createdUtterance){
                return ctx.throw(400, 'Utterance not created');
            }

            const CreateEntities = [];
            if(Array.isArray(entities) && entities.length){
                entities.map((val) => {
                    CreateEntities.push({
                        entity: val.entity.id,
                        keyword: val.keyword.body
                    })
                })
            }

            const requestData = {
                data: {
                    message: message,
                    intent: intent.id,
                    entities: CreateEntities,
                    kanbot_witais: kanbot_witais
                }
            }

             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .update(ctx.params.id, requestData);
         } catch (err) {
             ctx.throw(500, err);
         }
     },
 
     async deleteUtterance (ctx) {
         try {

            const AppInfo = await strapi
            .plugin('kanbot')
            .service('witai')
            .findOne(request.data.kanbot_witais);
    
            if(!AppInfo){
                return ctx.throw(404, { message: "App not found"});
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
             ctx.body = await strapi
             .plugin('kanbot')
             .service('utterance')
             .delete(ctx.params.id);
         } catch (err) {
             ctx.throw(500, err);
         }
     },

});
