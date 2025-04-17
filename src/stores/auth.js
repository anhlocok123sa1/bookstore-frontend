import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    token: null
  }),
  actions: {
    setUser(user) {
      this.currentUser = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      this.token = token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    },
    logout() {
      this.currentUser = null
      this.token = null
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    initialize() {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (token && user) {
        this.token = token
        this.currentUser = user
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: state => state.currentUser?.role === 'admin'
  },
})
