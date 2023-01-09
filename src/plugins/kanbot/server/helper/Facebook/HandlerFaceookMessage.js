const ConservationService = require('../Conservation/ConservationService');
const WitService = require('../witAi/WitService');

class HandlerFacebookMessage {
  
  constructor(senderId, recipientId, context, message){
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
        const ReservationResult = ConservationService.intentProductQuery(context);
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

  async saveMessage (sender, recipient, message) {
    if(message && sender && recipient){
        try {
          const senderID = sender.id;
          const recipientID = recipient.id;
          const messageText = message.text;
        } catch (error) {
          console.log(error);
        }
    }
  }
  
}

module.exports = HandlerFacebookMessage