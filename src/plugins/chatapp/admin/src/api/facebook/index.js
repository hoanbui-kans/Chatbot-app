import axios from 'axios'
import { request } from '@strapi/helper-plugin';

/* CURD kết nối facebook */
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

export const getAllConservation = async (page) => {
    const params = {
        platform: 'messenger',
        access_token: page.page_token
    };
    const queryParams = new URLSearchParams(params).toString();
    const response = await axios
                        .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${page.page_id}/conversations?${queryParams}`)
                        .then((res) => res.data)
                        .catch((err) => null)
    return response;
}

export const getAllMessages = async (page, conservation) => {
    const params = {
        fields: 'messages',
        access_token: page.page_token
    };
    const queryParams = new URLSearchParams(params).toString();
    const response = await axios
                        .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${conservation.id}/?${queryParams}`)
                        .then((res) => res.data)
                        .catch((err) => null)
    return response;
}

export const getMessageInfo = async (page, message) => {
    const params = {
        fields: 'id,created_time,from,to,message',
        access_token: page.page_token
    };
    const queryParams = new URLSearchParams(params).toString();
    const response = await axios
                        .get(`${ENV.CLIENT_FB_URL}/${ENV.CLIENT_FB_REQUEST_VERSION}/${message.id}/?${queryParams}`)
                        .then((res) => res.data)
                        .catch((err) => null)
    return response;
}