import axios from 'axios'
import { Navigate } from 'react-router-dom'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response && error.response.status === 401){
        <Navigate to="/login" />
    }
})

export default api;