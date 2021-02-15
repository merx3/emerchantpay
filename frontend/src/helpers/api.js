import axios from 'axios';
import { SECURE_API } from "../constants";

const api = axios.create({
    baseURL: SECURE_API,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export async function login(username, password) {
    const response = await api.post('admin/login', {}, {
        auth: { username, password }
    });

    if (response.data.error) {
        throw new Error(response.data.error);
    }
}

export async function logout(username, password) {
    const response = await api.post( 'admin/logout', {}, { withCredentials: true });

    if (response.data.error) {
        throw new Error(response.data.error);
    }
}

export async function getPosts(page, perPage) {
    return await api.get( '/posts', {
        params: {page, perPage},
    });
}

export async function getPost(postId) {
    return await api.get( '/posts/' + postId);
}

export async function savePost(data) {
    const formData = new FormData();
    for (const param in data) {
        formData.append(param, data[param]);
    }
    return await api.post( 'admin/posts',  formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
}

export async function deletePost(postId) {
    return await api.delete( '/admin/posts/' + postId);
}