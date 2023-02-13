import { request } from '@strapi/helper-plugin';

export const findManyUtterance = async (app_id) => {
    try {
        const response = await request(`/kanbot/utterance/?kanbot_witais=${app_id}`, {
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

export const createUtterance = async (data) => {
    try {
        const response = await request(`/kanbot/utterance/`, {
            method: "POST",
            body: {
                data: data
            }
        });
        return response
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