import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // hoặc URL backend thực tế
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
