import { request } from '@strapi/helper-plugin';

export const findManyProduct = async () => {
    try {
        const response = await request('/product/', {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const findOneProduct = async (id) => {
    try {
        const response = await request(`/product/${id}`, {
            method: "GET"
        })
        return response;
    } catch (error) {
        return false
    }
}

export const createProduct = async (data) => {
    try {
        const response = await request(`/product/`, {
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

export const updateProduct = async (id, data) => {
    try {
        const response = await request(`/product/${id}`, {
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

export const deleteProduct = async (id) => {
    try {
        const response = await request(`/product/${id}`, {
            method: "DELETE",
        })
        return response;
    } catch (error) {
        return false
    }
}