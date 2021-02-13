import axios from 'axios';
import { API_URL } from "../constants";

export async function login(username, password) {
    const response = await axios.post(API_URL + '/admin/login', {
        auth: { username, password }
    });

    if (response.data.error) {
        throw new Error(response.data.error);
    }
}