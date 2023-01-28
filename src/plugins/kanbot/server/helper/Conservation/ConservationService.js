class ConservationService {

  static async run(strapi, WitToken, WitService, text, nodes, context){
    if(!text){
      context.conservation.followUp = 'Hey back!';
      return context;
    }

    const { intent, entities } = await (new WitService(WitToken)).query(text);

    context.conservation.entities = { ...context.conservation.entities, ...entities };
    
    if(Object.keys(entities).length !== 0) {
      return ConservationService.intentQuery(context, nodes);
    }

    context.conservation.followUp = 'Tôi không hiểu ý của bạn, xin vui lòng thử lại?';

    return context;
  }

  static async intentQuery(context, nodes) {

    const { conservation } = context;
    const { entities, flow } = conservation;

    let request = [];

    if(Object.keys(flow).length !== 0){
      request = [...flow];
    }

    if(Array.isArray(request)){
      let notIncludeNode = false;
      if(request.length == 0){
        request.push(nodes[0]); 
      } else {
        for( let i = 0; i < nodes.length; i++ ){
          if(nodes[i].id){
            const include = request.find((val) => val == nodes[i].id )
            if(!include){
              notIncludeNode = nodes[i];
              break;
            }
          }
        }
      }

      if(notIncludeNode){
        const BotResponse = notIncludeNode.data.response[0];
        const response = await strapi.plugin('kanbot').service('response').findOne(BotResponse.id);
        if(response){
          const messages = response.type[0].messages;
          const random = Math.floor(Math.random() * messages.length);
          request.push(notIncludeNode);
          context.conservation.flow = request;
          context.conservation.followUp = messages[random].message;
          return context;
        }
      } else {
        context.conservation.followUp = `Cám ơn ${entities['wit$contact:contact']}, đơn hàng của bạn đã được đặt thành công!`;
        context.conservation.complete = true;
        return context
      }
    }
  }

  static intentProductQuery(context){
    const { conservation } = context;
    const { entities } = conservation;

    if(!entities['product:product']){
      context.conservation.followUp = 'Xin chào, chúng tôi có bán điện thoại di động, bạn muốn mua điện thoại nào?';
      return context;
    } 

    if(!entities['wit$contact:contact']){
      context.conservation.followUp = 'Cho mình xin tên của bạn được không?';
      return context;
    } 

    if(!entities['wit$location:location']){
      context.conservation.followUp = 'Bạn đang ở đâu?';
      return context;
    } 

    if(!entities['payment:paymentMethod']){
      context.conservation.followUp = 'Bạn muốn thanh toán bằng cách nào?';
      return context;
    } 

    console.log(context.conservation);
    
    context.conservation.followUp = `Cám ơn ${entities['wit$contact:contact']}, đơn hàng của bạn đã được đặt thành công!`;
    context.conservation.complete = true;

    return context
  }
}

module.exports = ConservationService