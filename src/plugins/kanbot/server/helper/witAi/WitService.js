
const { Wit } = require('node-wit');

class WitService {
  constructor() {
      this.client = new Wit({
        accessToken: process.env.WITAI_BOT_CLIENT_TOKEN,
      });
  }

  async query(text) {

    try {

      const queryResult = await this.client.message(text);
      const { entities, intents } = queryResult;
      const extractedEntities = {};

      Object.keys(entities).forEach((key) => {
        if(entities[key][0].confidence > 0.98){
          extractedEntities[key] = entities[key][0].value;
        }
      });

      let extractedIntents = {};
      if(Array.isArray(intents) && intents.length){
        extractedIntents = intents.find((val) => val.confidence)
      }
      
      return {
        entities: extractedEntities,
        intent: extractedIntents
      };
    } catch (error) {
      console.log(error)
      return null
    }
  }

}

module.exports = WitService