import { request } from '@strapi/helper-plugin';

export const findManyIntent = async (appId) => {
    try {
        const response = await request(`/kanbot/intent/?kanbot_witais=${appId}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneIntent = async(id) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createIntent = async ( token, data ) => {
    try {
        const response = await request(`/kanbot/intent/`, {
            method: "POST",
            body: {
                data: data
            }
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const updateIntent = async ( id, data ) => {
    try {
        const response = await request(`/kanbot/intent/${id}`, {
            method: "PUT",
            body: {
                data: data
            }
        })
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteIntent = async(data) => {
    try {
        const response = await request(`/kanbot/intent/${data.id}/`, {
            method: "POST",
            body: {
                data: data
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}