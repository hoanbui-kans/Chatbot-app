const ConservationService = require('../Conservation/ConservationService');
const WitService = require('../witAi/WitService');

class HandlerFacebookMessage {
  
  constructor(strapi, token, senderId, recipientId, context, nodes, message){
    this.app_token = token;
    this.message = message.text;
    this.context = context;
    this.nodes = nodes;
    this.strapi = strapi;
  }

  localizeMessage(message){
      const mention = /<@[A-Z0-9]+>/;
      if(!message) return;
      message = message.replace(mention, '').trim();
      return message;
  }

  async processMessage () {
    try {
      const messageText = this.localizeMessage(this.message);
      const redisContext = this.context;
      const WitToken = this.app_token;
      const nodes = this.nodes;
      const strapi = this.strapi;
      const context = await ConservationService.run(strapi, WitToken, WitService, messageText, nodes, redisContext);
      const { conservation } = context;
      const { entities, intents } = conservation;

      let text = '';
      if(!conservation.complete){
        text = conservation.followUp;
      } else {
        const ReservationResult = ConservationService.intentQuery(context);
        return ReservationResult;
      }
      return context;
    } catch (error) {
      console.log('error', error);
    }
  }

  async responseMessage(){
    const handleProcessContext = await this.processMessage();
    return handleProcessContext;
  }
  
}

module.exports = HandlerFacebookMessage