import { request } from '@strapi/helper-plugin';

export const findAll = async () => {
    try {
        const response = await request('/kanbot/intent/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOne = async (id) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const create = async (data) => {
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

export const update = async (id, data) => {
    try {
        const response = await request(`/kanbot/intent/`, {
            method: "POST",
            body: {
                id: id,
                data: data
            }
        })
        return response;
    } catch (error) {
        return false
    }
}