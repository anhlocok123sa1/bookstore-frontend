<template>
    <div class="auth-container">
      <div class="auth-form">
        <h2 class="form-title">Quên mật khẩu</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Nhập email đã đăng ký"
            >
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
  
          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="!loading">Gửi yêu cầu</span>
            <span v-else>Đang gửi...</span>
          </button>
  
          <div class="auth-link">
            <router-link to="/login">Quay lại đăng nhập</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        loading: false,
        errors: {
          email: ''
        }
      }
    },
    methods: {
      validateForm() {
        this.errors = {}
        let isValid = true
  
        if (!this.email) {
          this.errors.email = 'Vui lòng nhập email'
          isValid = false
        } else if (!/\S+@\S+\.\S+/.test(this.email)) {
          this.errors.email = 'Email không hợp lệ'
          isValid = false
        }
  
        return isValid
      },
      async handleSubmit() {
        if (!this.validateForm()) return
  
        this.loading = true
        
        try {
          // Giả lập API call
          await new Promise(resolve => setTimeout(resolve, 1500))
          alert('Hướng dẫn reset mật khẩu đã được gửi đến email của bạn!')
          this.$router.push('/login')
        } catch (error) {
          console.error('Gửi yêu cầu thất bại:', error)
          alert('Gửi yêu cầu thất bại! Vui lòng thử lại.')
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Sử dụng chung style với trang login */
  @import '../assets/auth-styles.css';
  </style>