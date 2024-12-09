import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:`https://todo-backend-ewne.onrender.com/api`,
    headers:{"Content-Type" : "application/json"},
    withCredentials:true,
})