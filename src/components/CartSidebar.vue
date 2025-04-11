<template>
  <div class="cart-sidebar" :class="{ 'is-open': isOpen }">
    <div class="cart-header">
      <h3>Giỏ hàng của bạn</h3>
      <button class="close-btn" @click="closeCart">×</button>
    </div>

    <div class="cart-content">
      <div v-if="items.length === 0" class="empty-cart">
        <p>Giỏ hàng trống</p>
        <router-link to="/products" @click="closeCart">Tiếp tục mua sắm</router-link>
      </div>

      <div v-else>
        <div v-for="item in items" :key="item.id" class="cart-item">
          <img :src="item.book.image" :alt="item.book.title" class="item-image">
          
          <div class="item-info">
            <h4>{{ item.book.title }}</h4>
            <p>{{ formatPrice(item.book.price) }}</p>
            
            <div class="quantity-controls">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >-</button>
              <input 
                type="number" 
                v-model.number="item.quantity" 
                min="1"
                @change="updateQuantity(item.id, item.quantity)"
              >
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
          </div>

          <div class="item-actions">
            <button @click="removeItem(item.id)" class="remove-btn">×</button>
            <p class="item-total">
              {{ formatPrice(item.book.price * item.quantity) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-footer" v-if="items.length > 0">
      <div class="total-section">
        <div class="total-row">
          <span>Tạm tính:</span>
          <span>{{ formatPrice(totalPrice) }}</span>
        </div>
        <div class="total-row">
          <span>Phí vận chuyển:</span>
          <span>{{ formatPrice(shippingFee) }}</span>
        </div>
        <div class="total-row grand-total">
          <span>Tổng cộng:</span>
          <span>{{ formatPrice(totalPrice + shippingFee) }}</span>
        </div>
      </div>

      <router-link 
        to="/checkout" 
        class="checkout-btn"
        @click="closeCart"
      >
        Thanh toán
      </router-link>
    </div>
  </div>
  <div class="cart-overlay" v-if="isOpen" @click="closeCart"></div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const shippingFee = 20000 // Phí vận chuyển

const isOpen = computed(() => cartStore.isCartOpen)
const items = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)


const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(price)
}

const closeCart = () => cartStore.toggleCart()
const removeItem = (id) => cartStore.removeItem(id)
const updateQuantity = (id, quantity) => cartStore.updateQuantity(id, quantity)
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-sidebar.is-open {
  right: 0;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 80px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #e74c3c;
  cursor: pointer;
  padding: 0;
}

.item-total {
  font-weight: bold;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.total-section {
  margin-bottom: 1rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.grand-total {
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  background: #2ecc71;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.checkout-btn:hover {
  background: #27ae60;
}

@media (max-width: 480px) {
  .cart-sidebar {
    max-width: 100%;
  }
}
</style>