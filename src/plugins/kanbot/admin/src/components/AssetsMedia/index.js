import { request } from '@strapi/helper-plugin';
import { getToken, messageCofig, urlEncodeJson } from '../Helper';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useQueryParams } from '@strapi/helper-plugin';

export const getFolders = async () => {
    const response = await request('/upload/folders', {
        method: 'GET',
    });
    return response;
}

export const getFiles = async (query) => {
    const queryParams = urlEncodeJson(query);
    const response = await request(`/upload/files?${queryParams}`, {
        method: 'GET',
    });
    return response;
}

export const uploadFile = async (files) => {

    let data = new FormData();

    Array.from(files).forEach( async (file) => {
        data.append('files', file);
    });

    const token = getToken();

    const config = {
        url: CLIENT_FRONTEND_URL + '/upload',
        method: 'POST',
        headers:  {
            "Authorization": `Bearer ${token}`,
        },
        data: data
    }
    
    const response = await axios(config).then((res) => {
        toast.success("Tải ảnh lên thành công", messageCofig);
        return res.data;
    }).catch((err) => {
        toast.success("Đã có lỗi xảy ra khi tải ảnh lên", messageCofig);
        return null
    });

    return response;
};

export const deleteFile = async (id) => {
    const response = await request(`/upload/files/${id}`, {
        method: 'DELETE'
    });
    return response;
}