import { request } from '@strapi/helper-plugin';

export const findManyConservation = async () => {
    try {
        const response = await request('/kanbot/conservation/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneConservation = async (id) => {
    try {
        const response = await request(`/kanbot/conservation/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createConservation = async (data) => {
    try {
        const response = await request(`/kanbot/conservation/`, {
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

export const updateConservation = async (id, data) => {
    try {
        const response = await request(`/kanbot/conservation/${id}`, {
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

export const deleteConservation = async (id) => {
    try {
        const response = await request(`/kanbot/conservation/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}