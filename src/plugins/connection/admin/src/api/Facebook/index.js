import axios from "axios";
import { request } from '@strapi/helper-plugin';
import pluginId from "../../pluginId";
import { urlEncodeJson } from "../helper";
const ROOT_URL = 'https://graph.facebook.com';

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
        const response = await request(`/${pluginId}/facebook/delete/${page_id}`, {
            method: "DELETE",
        });
        return response;
    } catch (error) {
        return null
    }
}

/* Lấy danh sách tất cả các trang */
export const getListPages = (user_id, access_token) => {
    const response = axios.get(`${ROOT_URL}/${user_id}/accounts`, {
        params: {
            fields: 'name,access_token',
            access_token: access_token
        }
    }).then((res) => res.data).catch((err) => null);
    return response
}
