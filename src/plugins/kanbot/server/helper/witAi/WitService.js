
const { Wit } = require('node-wit');

class WitService {
  constructor() {
      this.client = new Wit({
        accessToken: 'IV32DLW5JLLMUGMEQGZACMY2GXEFNV4S',
      });
  }

  async query(text) {
    const queryResult = await this.client.message(text);
    const { entities } = queryResult;
    const extractedEntities = {};
    Object.keys(entities).forEach((key) => {
      if(entities[key][0].confidence > 0.7){
        extractedEntities[key] = entities[key][0].value;
      }
    });
    return extractedEntities;
  }

}

module.exports = WitService