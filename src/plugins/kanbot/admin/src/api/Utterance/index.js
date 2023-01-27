import { request } from '@strapi/helper-plugin';

export const findManyUtterance = async () => {
    try {
        const response = await request('/kanbot/utterance/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneUtterance = async (id) => {
    try {
        const response = await request(`/kanbot/utterance/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createUtterance = async (token, utterance) => {
    try {
        const data = utterance.entities;
        // Create witai Utterance
        const witUtterance = await request(`https://api.wit.ai/utterances?v=20221114`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: [{
                "text": "I want to fly to sfo",
                "intent": "flight_request",
                "entities": [
                  {
                    "entity": "wit$location:to",
                    "start": 17,
                    "end": 20,
                    "body": "sfo",
                    "entities": []
                  }
                ],
                "traits": []
              }]
        });

        if(witUtterance.sent){
            const response = await request(`/kanbot/utterance/`, {
                method: "POST",
                body: {
                    data: data
                }
            })
            return response;
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export const updateUtterance = async (id, data) => {
    try {
        const response = await request(`/kanbot/utterance/${id}`, {
            method: "PUT",
            body: {
                data: data
            }
        })
        return response;
    } catch (error) {
        return false
    }
}

export const deleteUtterance = async (id) => {
    try {
        const response = await request(`/kanbot/utterance/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}