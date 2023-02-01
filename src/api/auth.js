import axios from "axios";
import { API_URL } from "../const.js";

export async function registerUser({username, password}) {
    return await axios.put(`${API_URL}auth/user/register`, {
        username,
        password
    });
}

export async function logout() {
    const refreshToken = localStorage.getItem('refreshToken');
    return await axios.delete(`${API_URL}auth/logout`, {
        refreshToken
    });
}

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if(localStorage.getItem('role') === 'ADMIN') {
        return await axios.put(`${API_URL}auth/admin/refresh`, {
            refreshToken
        });
    } else if(localStorage.getItem('role') === 'USER') {
        return await axios.put(`${API_URL}auth/user/refresh`, {
            refreshToken
        });
    } else {
        localStorage.clear();
    }
}

export async function login({username, password}) {
    return await axios.post(`${API_URL}auth/login`, {
        username,
        password
    });
}