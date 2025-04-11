<template>
  <div id="app">
    <Navbar @toggle-cart="cartStore.toggleCart" />
    <CartSidebar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import Navbar from '@/components/Navbar.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import Footer from '@/components/Footer.vue'

const cartStore = useCartStore()
</script>