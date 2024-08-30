import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost/laravel8/laravel8/public/api"
})

const imageBlog = "https://localhost/laravel8/laravel8/public/upload/blog/image/"

export {api, imageBlog};