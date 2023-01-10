import { request } from '@strapi/helper-plugin';

export const findManyEntity = async () => {
    try {
        const response = await request('/kanbot/entity/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneEntity = async (id) => {
    try {
        const response = await request(`/kanbot/entity/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createEntity = async (data) => {
    try {
        const response = await request(`/kanbot/entity/`, {
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

export const updateEntity = async (id, data) => {
    try {
        const response = await request(`/kanbot/entity/${id}`, {
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

export const deleteEntity = async (id) => {
    try {
        const response = await request(`/kanbot/entity/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}