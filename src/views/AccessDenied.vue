<template>
    <div class="access-denied">
      <h1>403 - Truy cập bị từ chối</h1>
      <p>Bạn không có quyền truy cập trang này</p>
      <router-link to="/">Quay về trang chủ</router-link>
    </div>
  </template>
  
  <style scoped>
  .access-denied {
    text-align: center;
    padding: 4rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  h1 {
    color: #e74c3c;
    margin-bottom: 1rem;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    margin-top: 1rem;
  }
  </style>