import { request } from '@strapi/helper-plugin';

export const findManyWitai = async () => {
    try {
        const response = await request('/kanbot/witai/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneWitai = async (id) => {
    try {
        const response = await request(`/kanbot/witai/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createWitai = async (data) => {
    try {
        const response = await request(`/kanbot/witai/`, {
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

export const updateWitai = async (id, data) => { 
    try {
        const response = await request(`/kanbot/witai/${id}`, {
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

export const deleteWitai = async (id) => {
    try {
        const response = await request(`/kanbot/witai/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}