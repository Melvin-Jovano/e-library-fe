import axios from "axios"
import { API_URL } from "../const.js"

export async function getAllBook({limit, lastId}) {
    let lastIdFilter = {};
    if(lastId !== undefined) {
        lastIdFilter = {
            last_id: lastId
        }
    }

    return await axios.get(`${API_URL}books`, {
        params: {
            limit: limit || 100,
            ...lastIdFilter
        }
    })
}

export async function getBookById(id){
    const book = await axios.get(`${API_URL}book/${id}`)
    return book
}