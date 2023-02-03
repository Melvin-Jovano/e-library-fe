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

export async function inputBook(data){
    const formData = new FormData()
    formData.append("Cover", data.coverFile)
    formData.append("title", data.bookTitle)
    formData.append("published", data.publishYear)
    formData.append("pages", data.bookPages)
    formData.append("stock", data.bookStocks)
    formData.append("description", data.description)
    formData.append("authorId", data.authorId)
    const newBook = await axios.post(`${API_URL}book`, formData, {
        headers:{
            'Content-Type' : 'multipart/form-data'
        }
    })
    return newBook
}

export async function updateBook(id, val){
    return await axios.put(`${API_URL}updatebook`,{
        bookId : id,
        stock : val
    });
}

export async function deleteBook(id){
    return await axios.delete(`${API_URL}deletebook/${id}`)
}