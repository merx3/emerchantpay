import axios from 'axios';
import { SECURE_API } from "../constants";

const api = axios.create({
    baseURL: SECURE_API,
    timeout: 10000,
    withCredentials: true,
    transformRequest: [data => JSON.stringify(data.data)],
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
    const response = await api.post( 'admin/logout', {}, {withCredentials: true});

    if (response.data.error) {
        throw new Error(response.data.error);
    }
}