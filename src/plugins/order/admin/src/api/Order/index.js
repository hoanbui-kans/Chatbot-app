import { request } from '@strapi/helper-plugin';

export const findManyOrder = async () => {
    try {
        const response = await request('/order/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneOrder = async (id) => {
    try {
        const response = await request(`/order/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createOrder = async (data) => {
    try {
        const response = await request(`/order/`, {
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

export const updateOrder = async (id, data) => {
    try {
        const response = await request(`/order/${id}`, {
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

export const deleteOrder = async (id) => {
    try {
        const response = await request(`/order/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}