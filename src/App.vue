<template>
  <div id="app">
    <Navbar 
      :categories="categories"
      @toggle-cart="cartStore.toggleCart" 
    />
    <CartSidebar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useCartStore } from '@/stores/cart'
import Navbar from '@/components/Navbar.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import Footer from '@/components/Footer.vue'

const cartStore = useCartStore()
const categories = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/categories')
    categories.value = response.data
  } catch (error) {
    console.error('Lỗi khi load categories:', error)
  }
})
</script>