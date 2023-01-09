'use strict';
/**
 *  controller
 */

const { FacebookMessagingAPIClient, ValidateWebhook, FacebookMessageParser }  = require("fb-messenger-bot-api");
const HandlerFacebookMessage = require("../helper/Facebook/HandlerFaceookMessage");
const { createClient } = require('redis');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::kanbot.conservation', (({ strapi }) => ({

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
        
        messagingClient.sendTextMessage(senderId, text).then(async(result) => {});

        // closing redis
        await client.disconnect(); 
        // fallback context
        return ctx.body = text
      } catch (err) {
        ctx.throw(403, err);
      }
  }
})));
