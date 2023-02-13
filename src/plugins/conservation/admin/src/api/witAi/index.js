import { request } from '@strapi/helper-plugin';
import { v4 as uuidv4 } from 'uuid'

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

export const findOneWitaiByAppName = async (app_name) => {
    try {
        const response = await request(`/kanbot/witai/app/${app_name}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createWitai = async (data) => {
    try {
        const botsetting = await request('/kanbot/botsetting/1');
        if(botsetting){
            const botCreated = await request(`https://api.wit.ai/apps?v=20221114`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${botsetting.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "name": data.app_name ? data.app_name : uuidv4(),
                    "lang": "vi",
                    "private": false,
                    "timezone": "Asia/Saigon"
                }
            });
            if(botCreated){
                data.app_id = botCreated.app_id;
                data.server_access_token = botCreated.access_token;
                const response = await request(`/kanbot/witai/`, {
                    method: "POST",
                    body: {
                        data: data
                    }
                })
                return response;
            }
        }
        return false

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
    const App = await findOneWitai(id);
    if(App){
        const appId = App.app_id;
        const appToken = App.server_access_token;
        const botDeleted = await request(`https://api.wit.ai/apps/${appId}?v=20221114`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${ appToken }`,
            }
        });
        if(botDeleted){ 
            const response = await request(`/kanbot/witai/${id}`, {
                method: "DELETE",
            })
            return response;
        }
    }
    return false
}