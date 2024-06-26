import { request } from '@strapi/helper-plugin'

export const findManyResponse = async (app_id) => {
    try {
        return await request(`/kanbot/response/?kanbot_witais=${app_id}`, {
            method: "GET"
        });
    } catch (error) {
        return false;
    }
}

export const findOneResponse = async (id) => {
    try {
        return await request(`/kanbot/response/${id}`, {
            method: "GET"
        });
    } catch (error) {
        return false;
    }
}


export const createResponse = async (data) => {
    try {
        return await request('/kanbot/response/', {
            method: "POST",
            body: {
                data: data
            }
        });
    } catch (error) {
        
    }
}

export const updateResponse = async (id, data) => {
    try {
        return await request('/kanbot/response/', {
            method: "PUT",
            body: {
                data: {
                    id: id,
                    data: data
                }
            }
        });
    } catch (error) {
        return false
    }
}

export const deleteResponse = async (id) => {
    try {
        return await request(`/kanbot/response/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        return false
    }
}