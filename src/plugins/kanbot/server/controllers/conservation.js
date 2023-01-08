'use strict';

/**
 *  controller
 */

import { FacebookMessagingAPIClient, ValidateWebhook, FacebookMessageParser } from "fb-messenger-bot-api";
import HandlerFacebookMessage from "../helper/Facebook/HandlerFaceookMessage";
import { createClient } from 'redis';

const { createCoreController } = require('@strapi/strapi').factories;

const client = createClient(6379);

client.on('error', (err) => console.log('Redis Client Error', err));

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
        const incomingMessages = FacebookMessageParser.parsePayload(ctx.body);
        const { sender, recipient, message } = incomingMessages[0];

        const senderId = sender.id;
        const recipientId = recipient.id;
        const conservationId = senderId + '-' + recipientId;

        await client.connect();
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

        const handerFbMessage = new HandlerFacebookMessage(senderId, recipientId, context, message);
        const pageAccessToken = await handerFbMessage.getPageInfo(recipientId);
        const { page_access_key } = pageAccessToken;
        const messagingClient = new FacebookMessagingAPIClient(page_access_key);

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
        await client.disconnect(); 
        ctx.body = context
      } catch (err) {
        ctx.throw(403, err);
      }
  }

})));
