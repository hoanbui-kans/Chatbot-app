

const { Configuration, OpenAIApi } = require("openai");

class OpenAiService {

    constructor() {
        this.config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async completion(message){
        
        const openai = new OpenAIApi(this.config);

        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: message,
          temperature: 0.9,
          max_tokens: 320,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        // const completion = await api.sendMessage( message, {
        //     conversationId: conversationId,
        //     parentMessageId: id
        // });

        // console.log('completion', completion);

        // return res;
        if(completion.data.choices){
            return completion.data.choices[0].text
        } else {
            return null
        }
    }
}

module.exports = OpenAiService