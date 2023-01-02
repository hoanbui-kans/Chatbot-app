import { request } from "@strapi/helper-plugin";

export const getBotData = async (id, token) => {
  try {
    const response = await request('https://api.wit.ai/apps/'+ id +'?v=20221114', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    if(response.id){
      return response;
    } 
    return false;
  } catch (error) {
    return false
  }
}

export const createBot = async (data) => {
  try {
    const response = await request('/kanbot/witai/create-bot/', {
      method: "POST",
      body: {
        data: data
      }
    });
    if(response.id){
      return response;
    } 
    return false;
  } catch (error) {
    return false
  }
}