import axios from 'axios'
import { request } from '@strapi/helper-plugin';

/* CURD kết nối trang database */
export const findOnePage = async (page_id) => {
    try {
        const response = await request(`/connection/facebook/${page_id}/`, {
            method: 'GET'
        });
        return response;
    } catch (error) {
        return null
    }
} 

export const getFaceBookConnection = async () => {
    try {
        const response = await request(`/connection/facebook/`, {
            method: "GET"
        });
        return response;
    } catch (error) {
        return null
    }
}

/* CURD KẾT NỐI VỚI FACEOOK */

export const getAllConservation = async (page) => {

    return await axios
    .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${page.page_id}/conversations`, {
        params: {
            platform: 'messenger',
            access_token: page.page_token
        }
    })
    .then((res) => res.data)
    .catch((err) => null);
}

export const getAllMessages = async (page, conservation) => {
   return await axios
   .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${conservation.id}`, {
        params: {
            fields: 'messages',
            access_token: page.page_token
        }
    })
    .then((res) => res.data)
    .catch((err) => null)
}

export const getMessageInfo = async (page, message) => {
    return await axios
    .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${message.id}`, {
        params: {
            fields: 'id,created_time,from,to,message',
            access_token: page.page_token
        }
    })
    .then((res) => res.data)
    .catch((err) => null)
}

export const getConservationParticipant = async (page, conservation) => {
    return await axios
    .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${conservation.id}`, {
        params: {
            fields: 'participants',
            access_token: page.page_token
        }
    })
    .then((res) => res.data)
    .catch((err) => null)
}

export const getUserInfo = async (page, user_id) => {
    return await axios
    .get(`${ENV.CLIENT_FB_URL}/${user_id}`, {
        params: {
            fields: 'first_name,last_name,profile_pic',
            access_token: page.page_token
        }
    })
    .then((res) => res.data)
    .catch((err) => null)
}

export const sendMessage = async (page, participant, message) => {
    return await axios
    .post(`${ENV.CLIENT_FB_URL}/${page.page_id}/messages?access_token=${page.page_token}`, 
        {
            recipient:{
            id: participant.id
        },
        messaging_type: "RESPONSE",
        message:{
            text: message
        }
        })
    .then((res) => res.data)
    .catch((err) => null)
}