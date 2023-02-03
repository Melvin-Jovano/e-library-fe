import axios from "axios"
import { API_URL } from "../const.js"

export async function getAllAuthors(){
    const authors = await axios.get(`${API_URL}authors`)
    return authors
}

export async function addNewAuthor(name){
    const author = await axios.post(`${API_URL}author`, {
        authorName: name
    })
    if(author.status === 200){
        return author
    }
    else{
        return author.response
    }
}