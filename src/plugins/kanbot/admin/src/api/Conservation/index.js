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

export const findOneConservationByIntent = async (intent_name) => {
    try {
        const response = await request(`/kanbot/conservation/intent/${intent_name}`, {
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

export const clearConservation = async (conservation) => {
    try {
        const response = await request(`/kanbot/conservation/messaging/?clear=${conservation}`, {
            method: "POST",
            body: {
                message: message,
                nodes: nodes
            }
        })
        return response;
    } catch (error) {
        return false
    }
}
export const postMessageConservation = async (message, nodes, appInfo) => {
    try {
        const response = await request(`/kanbot/conservation/messaging/${appInfo.id}`, {
            method: "POST",
            body: {
                message: message,
                nodes: nodes
            }
        })
        return response;
    } catch (error) {
        return false
    }
}