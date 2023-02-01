import axios from "axios";
import { API_URL } from "../const.js";

export async function registerUser({username, password}) {
    return await axios.put(`${API_URL}auth/user/register`, {
        username,
        password
    });
}

export async function login({username, password}) {
    return await axios.post(`${API_URL}auth/login`, {
        username,
        password
    });
}