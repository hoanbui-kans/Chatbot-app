class ConservationService {

  static async run(strapi, WitToken, WitService, text, nodes, context){
    if(!text){
      context.conservation.followUp = 'Hey back!';
      return context;
    }
    const entities = await (new WitService(WitToken)).query(text);
    context.conservation.entities = { ...context.conservation.entities, ...entities };
 
    if(Object.keys(entities).length !== 0) {
      return ConservationService.intentQuery(context, nodes);
    }
    context.conservation.followUp = 'Tôi không hiểu ý của bạn, xin vui lòng thử lại?';
    strapi.db.query("")
    return context;
  }

  static intentQuery(context, nodes){
    const { conservation } = context;
    const { entities, flow } = conservation;
    let request = [];
    if(Object.keys(flow).length !== 0){
      request = [...flow];
    }

    console.log('request', request);

    if(Array.isArray(request)){
      let notIncludeNode = false;
      if(request.length == 0){
        request.push(nodes[0]);
      } else {
        for( let i = 0; i < nodes.length; i++ ){
          if(nodes[i].id){
            const include = request.find((val) => val.id == nodes[i].id )
            if(!include){
              notIncludeNode = nodes[i];
              break;
            }
          }
        }
      }

      console.log('notIncludeNode', notIncludeNode);

      if(notIncludeNode){
        request.push(notIncludeNode);
      }
     
      context.conservation.flow = request;

    }

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

    context.conservation.followUp = `Cám ơn ${entities['wit$contact:contact']}, đơn hàng của bạn đã được đặt thành công!`;
    context.conservation.complete = true;
    return context
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