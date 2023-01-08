import ConservationService from '../../../../services/ConservationService';
import WitService from '../../../../services/witService';

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

  async getPageInfo(pageId){
    if(!pageId) return false;
    try {
        const query = 'SELECT `page_access_key` FROM `kanbox_socials_page` WHERE `page_id`= ?';
        const SaveMessage = await connection.promise().query( query , [pageId],
        function(err, result) {
            console.log(err)
            return result;
        });
        if(Array.isArray(SaveMessage[0]) && SaveMessage[0].length){
          return SaveMessage[0][0];
        }
      } catch (error) {
        console.log(error);
      }
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
          const query = 'INSERT INTO `kanbox_conservation` (sender, receiver, chanel, status, message ) VALUES ( ?, ?, ?, ?, ?)';
          const SaveMessage = await connection.promise().query(query,
          [senderID, recipientID, 'facebook', 'recieved', messageText],
          function(err, result) {
              console.log(err)
              return result;
          });
        } catch (error) {
          console.log(error);
        }
    }
  }
}

export default HandlerFacebookMessage;