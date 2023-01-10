import { request } from '@strapi/helper-plugin';

export const findManyIntent = async () => {
    try {
        const response = await request('/kanbot/intent/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneIntent = async (id) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createIntent = async (data) => {
    try {
        const response = await request(`/kanbot/intent/`, {
            method: "POST",
            body: {
                data: data
            }
        })
        return response;
    } catch (error) {
        return false
    }
}

export const updateIntent = async (id, data) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
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

export const deleteIntent = async (id) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}