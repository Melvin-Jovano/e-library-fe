import axios from "axios"
import { API_URL } from "../const.js"

export async function getOrderCount({userId}) {
    const userIdFilter = (userId !== undefined)
        ? {
            user_id: userId
        }
        : {};

    return await axios.get(`${API_URL}order/count`, {
        params: {
            ...userIdFilter
        }
    });
}

export async function getOrderByUserIdAndBookId({bookId}) {
    return await axios.get(`${API_URL}order/book/${bookId}`);
}

export async function getOrderByUserId({limit = 10, lastId, userId}) {
    const lastIdFilter = (lastId !== undefined)
        ? {
            last_id: lastId
        }
        : {};

    const userIdFilter = (userId !== undefined)
        ? {
            user_id: userId
        }
        : {};

    return await axios.get(`${API_URL}order`, {
        params: {
            ...lastIdFilter,
            ...userIdFilter,
            limit
        }
    });
}