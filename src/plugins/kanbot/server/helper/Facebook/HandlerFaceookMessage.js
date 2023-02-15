const ConservationService = require('../Conservation/ConservationService');
const WitService = require('../witAi/WitService');

class HandlerFacebookMessage {
  
  constructor( message, context ){
    this.app_token = process.env.WITAI_BOT_CLIENT_TOKEN;
    this.message = message.text;
    this.context = context;
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

      const context = await ConservationService.run(WitService, messageText, redisContext);
      const { conservation } = context;
      const { entities } = conservation;

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
      return null
    }
  }

  async responseMessage(){
    const handleProcessContext = await this.processMessage();
    return handleProcessContext;
  }

  async responseMessage(){
    const handleProcessContext = await this.processMessage();
    return handleProcessContext;
  }
}

module.exports = HandlerFacebookMessage