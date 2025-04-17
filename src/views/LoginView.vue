<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="form-title">Đăng nhập</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Nhập email của bạn"
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Nhập mật khẩu"
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            Ghi nhớ đăng nhập
          </label>
          <router-link to="/forgot-password" class="forgot-password"> Quên mật khẩu? </router-link>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Đăng nhập</span>
          <span v-else>Đang xử lý...</span>
        </button>

        <div class="register-link">
          Chưa có tài khoản?
          <router-link to="/register">Đăng ký ngay</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: '',
      errors: {},
    }
  },
  methods: {
  async handleSubmit() {
    this.loading = true
    this.error = ''
    this.errors = {}

    try {
      const response = await axios.post('/login', {
        email: this.email,
        password: this.password
      })
      
      
      // const { user, access_token } = response.data
      const user = response.data.user
      const token = response.data.access_token
      
      // Lưu vào Pinia authStore
      const authStore = useAuthStore()
      authStore.setUser(user)
      authStore.setToken(token)

      // Chuyển hướng theo vai trò
      const redirectPath = user.is_admin ? '/admin/dashboard' : '/user/profile'
      this.$router.push(redirectPath)

    } catch (error) {
      if (error.response?.data?.errors) {
        this.errors = error.response.data.errors
      } else {
        this.error = error.response?.data?.message || 'Đã xảy ra lỗi'
      }
    } finally {
      this.loading = false
    }
  }
}

}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2rem;
}

.login-form {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input[type='email']:focus,
input[type='password']:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-size: 0.875rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #4a5568;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-form {
    padding: 1.5rem;
  }
}
</style>
