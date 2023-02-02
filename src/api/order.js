import axios from "axios"
import { API_URL } from "../const.js"

export async function getOrderCount() {
    return await axios.get(`${API_URL}order/count`);
}

export async function getOrderByUserIdAndBookId({bookId}) {
    return await axios.get(`${API_URL}order/book/${bookId}`);
}

export async function getOrderByUserId({limit = 10, lastId}) {
    const lastIdFilter = (lastId !== undefined)
        ? {
            lastId
        }
        : {};

    return await axios.get(`${API_URL}order`, {
        params: {
            ...lastIdFilter,
            limit
        }
    });
}