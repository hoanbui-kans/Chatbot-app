import { request } from '@strapi/helper-plugin';

export const findManyConnection = async () => {
    try {
        const response = await request('/connection/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneConnection = async (id) => {
    try {
        const response = await request(`/connection/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createConnection = async (data) => {
    try {
        const response = await request(`/connection/`, {
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

export const updateConnection = async (id, data) => {
    try {
        const response = await request(`/connection/${id}`, {
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

export const deleteConnection = async (id) => {
    try {
        const response = await request(`/connection/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}