const { Configuration, OpenAIApi } = require("openai");

class OpenAiService {
    constructor () {
        this.config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async completion(message){
        
        const openai = new OpenAIApi(this.config);

        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: message,
          temperature: 0.7,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
      
        if(completion.data.choices){
            return completion.data.choices[0].text
        } else {
            return null
        }
    }
}

module.exports = OpenAiService