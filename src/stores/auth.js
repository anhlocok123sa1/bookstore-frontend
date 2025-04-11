import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [
      {
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
        token: 'fake-admin-token'
      },
      {
        id: 2,
        email: 'user@example.com',
        password: 'user123',
        name: 'Regular User',
        role: 'user',
        token: 'fake-user-token'
      }
    ],
    currentUser: null
  }),
  actions: {
    login(email, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = this.users.find(u => 
            u.email === email && u.password === password
          )
          
          if (user) {
            this.currentUser = user
            localStorage.setItem('auth_token', user.token)
            resolve(user)
          } else {
            reject(new Error('Thông tin đăng nhập không chính xác'))
          }
        }, 1000) // Giả lập delay API
      })
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('auth_token')
    },
    initialize() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.currentUser = this.users.find(u => u.token === token) || null
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    isAdmin: (state) => state.currentUser?.role === 'admin'
  }
})