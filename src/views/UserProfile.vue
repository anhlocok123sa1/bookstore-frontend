<template>
    <div class="user-profile">
      <h1>Trang cá nhân</h1>
      <div class="profile-content">
        <div class="profile-info">
          <p>Xin chào {{ authStore.currentUser?.name }}</p>
          <p>Email: {{ authStore.currentUser?.email }}</p>
          <button @click="authStore.logout">Đăng xuất</button>
        </div>
        <div class="user-orders">
          <h2>Đơn hàng của bạn</h2>
          <!-- Thêm danh sách đơn hàng -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth'
  
  const authStore = useAuthStore()
  </script>
  
  <style scoped>
  .user-profile {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .profile-info {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
  }
  </style>