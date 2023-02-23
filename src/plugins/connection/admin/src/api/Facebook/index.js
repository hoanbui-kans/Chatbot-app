import axios from "axios";
import { request } from '@strapi/helper-plugin';
import pluginId from "../../pluginId";
import { urlEncodeJson } from "../helper";

/* CURD kết nối facebook */
export const getFaceBookConnection = async (query) => {
    try {
        const response = await request(`/${pluginId}/facebook/${query}`, {
            method: "GET"
        });
        return response;
    } catch (error) {
        return null
    }
}

export const updateFacebookConnection = async (data) => {
    try {
        const response = await request(`/${pluginId}/facebook/${data.id}`, {
            method: "POST",
            body: {
                data: data
            }
        });
        return response;
    } catch (error) {
        return null
    }
}

export const createFaceBookConnection = async (data) => {
    try {
        const response = await request(`/${pluginId}/facebook/`, {
            method: "POST",
            body: {
                data: data
            }
        });
        return response;
    } catch (error) {
        return null
    }
}

export const deleteFacebookConnection = async (page_id) => {
    try {
        const response = await request(`/${pluginId}/facebook/${page_id}`, {
            method: "DELETE",
        });
        return response;
    } catch (error) {
        return null
    }
}

/* Lấy mã truy cập người dùng dài hạn */
export const getUserLongTermToken = (user_token) => {
    const response = axios.get(`${ENV.CLIENT_FB_URL}/oauth/access_token`, {
        params: {
            grant_type: 'fb_exchange_token',
            client_id: ENV.CLIENT_FB_APP_ID,
            client_secret: ENV.CLIENT_FB_APP_SECRECT,
            fb_exchange_token: user_token
        }
    }).then((res) => res.data).catch((err) => null);
    return response
}

/* Lấy danh sách tất cả các trang */
export const getListPages = (user_id, access_token) => {
    const response = axios.get(`${ENV.CLIENT_FB_URL}/${user_id}/accounts`, {
        params: {
            fields: 'name,access_token',
            access_token: access_token
        }
    }).then((res) => res.data).catch((err) => null);
    return response
}
