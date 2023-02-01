import axios from "axios"
import { API_URL } from "../const.js"

export async function getBookById(id){
    const book = await axios.get(`${API_URL}book/${id}`)
    return book
}