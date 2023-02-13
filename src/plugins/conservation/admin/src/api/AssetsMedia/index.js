import { request } from '@strapi/helper-plugin';

export const getFolders = async () => {
    const response = await request('/upload/folders', {
        method: 'GET'
    });
    return response;
}

export const getFiles = async () => {
    const response = await request('/upload/files', {
        method: 'GET'
    });
    return response;
}

export const uploadFile = async (files) => {

    const formData = new FormData();

    Array.from(files).forEach((file, index) => {
        formData.append(`file_${index}`, file);
    });


    const response = await request('/upload', {
        method: 'POST',
        body: formData
    });
    return response;
}

export const deleteFile = async (id) => {
    const response = await request(`/upload/files/${id}`, {
        method: 'DELETE'
    });
    return response;
}