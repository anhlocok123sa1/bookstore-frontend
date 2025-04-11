<template>
    <div class="auth-container">
      <div class="auth-form">
        <h2 class="form-title">Đăng ký tài khoản</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              v-model="form.fullName"
              required
              placeholder="Nhập họ tên đầy đủ"
            >
            <span class="error-message" v-if="errors.fullName">{{ errors.fullName }}</span>
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              placeholder="Nhập email của bạn"
            >
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
  
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
            >
            <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          </div>
  
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              required
              placeholder="Nhập lại mật khẩu"
            >
            <span class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          </div>
  
          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="!loading">Đăng ký</span>
            <span v-else>Đang xử lý...</span>
          </button>
  
          <div class="auth-link">
            Đã có tài khoản? 
            <router-link to="/login">Đăng nhập ngay</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        loading: false,
        errors: {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      validateForm() {
        this.errors = {}
        let isValid = true
  
        if (!this.form.fullName.trim()) {
          this.errors.fullName = 'Vui lòng nhập họ tên'
          isValid = false
        }
  
        if (!this.form.email) {
          this.errors.email = 'Vui lòng nhập email'
          isValid = false
        } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
          this.errors.email = 'Email không hợp lệ'
          isValid = false
        }
  
        if (!this.form.password) {
          this.errors.password = 'Vui lòng nhập mật khẩu'
          isValid = false
        } else if (this.form.password.length < 6) {
          this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
          isValid = false
        }
  
        if (this.form.password !== this.form.confirmPassword) {
          this.errors.confirmPassword = 'Mật khẩu không khớp'
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
          this.$router.push('/login')
          alert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.')
        } catch (error) {
          console.error('Đăng ký thất bại:', error)
          alert('Đăng ký thất bại! Vui lòng thử lại.')
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
  
  .password-strength {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .terms-checkbox {
    margin: 1rem 0;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: #4a5568;
  }
  </style>