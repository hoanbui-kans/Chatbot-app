import { request } from '@strapi/helper-plugin';

export const findManyEntity = async (app_id) => {
    try {
        const response = await request(`/kanbot/entity/?kanbot_witais=${app_id}`, {
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
        await request(`/kanbot/entity/`,{
            method: "POST",
            body: {
                data: data
            }
        })
    } catch (error) {
        return false
    }
}

export const updateEntity = async (entity) => {
    try {
        await request(`/kanbot/entity/${entity.id}`, {
            method: "PUT",
            body: {
                data: entity
            }
        });
    } catch (error) {
        return false
    } 
}

export const deleteEntity = async (token, entity) => {
    try {
        await request(`/kanbot/entity/${entity.id}`, {
            method: "DELETE",
        })
        await request(`https://api.wit.ai/entities/${entity.name}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch (error) {
        return false
    }
}