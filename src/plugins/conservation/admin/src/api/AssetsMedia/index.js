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
    console.log('files', files);
    Array.from(files).forEach(async (file, index) => {
        const formData = new FormData();
        formData.append(`files`, file);
        try {
            const response = await request('/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });
            return response;
    
        } catch (error) {
            console.log(error)
        }
    });
}

export const deleteFile = async (id) => {
    const response = await request(`/upload/files/${id}`, {
        method: 'DELETE'
    });
    return response;
}