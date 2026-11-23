import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    console.log('Payload enviado:', error.config?.data)
    console.log('Resposta:', JSON.stringify(error.response?.data, null, 2))

    console.groupEnd()

    return Promise.reject(error)
  }
)

export default api