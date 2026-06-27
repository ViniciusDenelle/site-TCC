import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {

    console.group('Erro da API')

    console.log('URL:', error.config?.url)
    console.log('Método:', error.config?.method)
    console.log('Status:', error.response?.status)
    console.log('Resposta:', error.response?.data)

    console.groupEnd()

    return Promise.reject(error)
  }
)


export default api