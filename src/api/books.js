import axios from "axios"
import { API_URL } from "../const.js"

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
    const book = await axios.put(`${API_URL}updatebook`,{
        bookId : id,
        stock : val
    })
    return book
}

export async function deleteBook(id){
    return await axios.delete(`${API_URL}deletebook/${id}`)
}