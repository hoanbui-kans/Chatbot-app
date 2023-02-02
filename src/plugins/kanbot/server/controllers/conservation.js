'use strict';
/**
 *  controller
 */

const { FacebookMessagingAPIClient, ValidateWebhook, FacebookMessageParser } = require("fb-messenger-bot-api");
const { createClient } = require('redis');
const HandlerFacebookMessage = require("../helper/Facebook/HandlerFaceookMessage");

module.exports = ({ strapi }) => ({

  async messageHooks(ctx){
     // Parse the query params
     let mode = ctx.query["hub.mode"];
     let token = ctx.query["hub.verify_token"];
     let challenge = ctx.query["hub.challenge"];
     // Check if a token and mode is in the query string of the request
     if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === "subscribe") { // && token === config.verifyToken
        // Respond with the challenge token from the request
        ctx.body = challenge;
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        ctx.throw(403);
      }
    }
  },

  async incommingMessage(ctx){
    try {

        // create client connect redis
        const client = createClient(6379);
        client.on('error', (err) => console.log('Redis Client Error', err));

        await client.connect();

        // get incoming message data
        const incomingMessages = FacebookMessageParser.parsePayload(ctx.request.body);
        const { sender, recipient, message } = incomingMessages[0];
        if(!message) {
          return ctx.body = 'no message'
        }
        const senderId = sender.id;
        const recipientId = recipient.id;
        const conservationId = senderId + '-' + recipientId;
        // get page access token
        const { page_token } = await strapi
        .plugin('connection')
        .service('facebook')
        .findOneByPageId(recipientId);

        // get avaiable conservation context
        let context;
        const RedisContext = await client.get(conservationId);
        
        if(RedisContext){
          context = JSON.parse(RedisContext);
        } else {
          context = {
            conservation: {
              entities: {},
              followUp: '',
              complete: false,
              exit: false
            }
          }
        }

        // create facebook message convervation handler
        const handerFbMessage = new HandlerFacebookMessage(senderId, recipientId, context, message);

        // create message client
        const messagingClient = new FacebookMessagingAPIClient(page_token);

        // send message 
        await messagingClient.markSeen(senderId);
        await messagingClient.toggleTyping(senderId, true);

        const responseContext = await handerFbMessage.responseMessage();

        const { conservation } = responseContext;

        let text = conservation.followUp;;

        if(!conservation.complete) {
          text = conservation.followUp;
          await client.set( conservationId, JSON.stringify(responseContext));
        } else {
          await client.del( conservationId );
        }
        
        await messagingClient.sendTextMessage(senderId, text).then(async(result) => {
          console.log(result);
        });

        // closing redis
        await client.disconnect(); 
        // fallback context
        return ctx.body = text
      } catch (err) {
        ctx.throw(403, err);
      }
  },

  async incommingMessageSim(ctx){
    try {
        const AppInfo = await strapi
        .plugin('kanbot')
        .service('witai')
        .findOne(ctx.params.app_id);

        const token = AppInfo.server_access_token;
        if(!token) {
          return ctx.body = { 
            message: "Đã có lỗi không mong muốn xảy ra, xin liên hệ với quản trị viên để được hỗ trợ - " + ctx.params.app_id
          }
        }
        // create client connect redis
        const client = createClient(6379);
        client.on('error', (err) => console.log('Redis Client Error', err));
 
        await client.connect();

        const Payload = ctx.request.body;
        // get incoming message data
        const incomingMessages = FacebookMessageParser.parsePayload(Payload.message);
        const { sender, recipient, message } = incomingMessages[0]; 
        if(!message) {
          return ctx.body = 'no message'
        }
        const senderId = sender.id;
        const recipientId = recipient.id;
        const conservationId = senderId + '-' + recipientId;
        // get avaiable conservation context
        let context;
        const RedisContext = await client.get(conservationId);
        
        if(RedisContext){
          context = JSON.parse(RedisContext);
        } else {
          context = {
            intents: {},
            conservation: {
              entities: {},
              flow: {},
              followUp: '',
              complete: false,
              next: true,
              exit: false
            }
          }
        }

        // create facebook message convervation handler
        const nodes = Payload.nodes;
        const handerFbMessage = new HandlerFacebookMessage(strapi, token, senderId, recipientId, context, nodes, message);
        const responseContext = await handerFbMessage.responseMessage();
        if(!responseContext){
          return ctx.body = {
            message: "Đã có lỗi không mong muốn xảy ra, xin liên hệ với quản trị viên để được hỗ trợ"
          }
        }
        const { conservation } = responseContext;

        let text = conservation.followUp;;

        if(!conservation.complete) {
          text = conservation.followUp;
          await client.set( conservationId, JSON.stringify(responseContext));
        } else {
          await client.del( conservationId );
        }
      
        // closing redis
        await client.disconnect(); 
        // fallback context
        return ctx.body = conservation;
      } catch (err) {
        ctx.throw(403, err);
      }
  },

  async deteteMessageConservation(ctx){
    try {
      // create client connect redis
      const client = createClient(6379);
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.connect();
      await client.del( ctx.params.id );
      // closing redis
      await client.disconnect(); 
      return ctx.body = ctx.params.id;
    } catch (error) {
      ctx.throw(403, error)
    }
  },

  async findManyConservation(ctx) {
      try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .findMany(ctx.request.body);
      } catch (error) {
        ctx.throw(403, error)
      }
  },

  async findOneConservation(ctx) {
      try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .findOne(ctx.params.id);
      } catch (error) {
        ctx.throw(403, error)
      }
  },

  async findOneConservationByIntent(ctx) {
      try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .findOneByIntent(ctx.params.intent_name);
      } catch (error) {
        ctx.throw(403, error)
      }
  },

  async createConservation(ctx) {
      try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .create(ctx.request.body);
      } catch (error) {
        ctx.throw(403, error)
      }
  },

  async updateConservation(ctx) {
    try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .update(ctx.params.id, ctx.request.body);
      } catch (error) {
        ctx.throw(403, error)
      }
  },

  async deteteConservation(ctx) {
    try {
        ctx.body = await strapi.plugin('kanbot')
                  .service('conservation')
                  .delete(ctx.params.id);
      } catch (error) {
        ctx.throw(403, error)
      }
  },
});
