const OpenAiService = require('../OpenAi/OpenAiService');

class ConservationService {

  static async run(WitService, text, context){
    if(!text){
      context.conservation.followUp = 'Hey back!';
      return context;
    }
    const { intents, entities } = await (new WitService()).query(text);
    context.conservation = {
      intents: intents,
      entities: { ...context.conservation.entities, ...entities }
    }
    if(Object.keys(entities).length !== 0) {
      return ConservationService.intentQuery(context);
    }
    
    const OpenAi = new OpenAiService();

    const completion = await OpenAi.completion(`Hãy thông báo cho khách hàng rằng họ cần hỏi thông tin về sản phẩm và dịch vụ, tin nhắn của họ ${text} là khó hiểu`);
    context.conservation.followUp = completion;

    return context;
  }

  static async intentQuery(context) {

    const OpenAi = new OpenAiService();

    const { conservation } = context;
    const { entities } = conservation;

    if(!entities['service:service']){
      const completion = await OpenAi.completion('Giới thiệu sản phẩm dịch vụ thiết kế website của công ty Kan Solution cho khách hàng');
      context.conservation.followUp = completion;
      return context;
    } 

    if(!entities['wit$contact:contact']){
      const completion = await OpenAi.completion('Viết tin nhắn hỏi tên của khách hàng');
      context.conservation.followUp = completion;
      return context;
    } 

    if(!entities['wit$phone_number:phone_number']){
      const completion = await OpenAi.completion('Viết tin nhắn hỏi số điện thoại của khách hàng');
      context.conservation.followUp = completion;
      return context;
    } 

    if(!entities['wit$location:location']){
      const completion = await OpenAi.completion('Viết tin nhắn hỏi số nơi ở của khách hàng');
      context.conservation.followUp = completion;
      return context;
    } 

    if(!entities['payment:paymentMethod']){
      context.conservation.followUp = 'Bạn muốn thanh toán bằng cách nào?';
      return context;
    } 

    context.conservation.followUp = `Cám ơn ${entities['wit$contact:contact']}, đơn hàng của bạn đã được đặt thành công!`;
    context.conservation.complete = true;

    return context

    // if(Object.keys(flow).length !== 0){
    //   request = [...flow];
    // }

    // if(Array.isArray(request)){
    //   let notIncludeNode = false;
    //   if(request.length == 0){
    //     request.push(nodes[0]); 
    //   } else {
    //     for( let i = 0; i < nodes.length; i++ ){
    //       if(nodes[i].id){
    //         const include = request.find((val) => val == nodes[i].id )
    //         if(!include){
    //           notIncludeNode = nodes[i];
    //           break;
    //         }
    //       }
    //     }
    //   }

    //   if(notIncludeNode){
    //     const BotResponse = notIncludeNode.data.response[0];
    //     const response = await strapi.plugin('kanbot').service('response').findOne(BotResponse.id);
    //     if(response){
    //       const messages = response.type[0].messages;
    //       const random = Math.floor(Math.random() * messages.length);
    //       request.push(notIncludeNode);
    //       context.conservation.flow = request;
    //       context.conservation.followUp = messages[random].message;
    //       return context;
    //     }
    //   } else {
        
    //   }
    // }
  }
}

module.exports = ConservationService