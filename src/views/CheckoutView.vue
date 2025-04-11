<template>
    <div class="checkout-view">
      <div v-if="cartItems.length > 0">

        <div class="container">
          <h1>Thanh toán</h1>
          
          <div class="checkout-grid">
            <!-- Thông tin giao hàng -->
            <section class="shipping-info">
              <h2>Thông tin giao hàng</h2>
              <form @submit.prevent="submitOrder">
                <div class="form-group">
                  <label for="name">Họ và tên</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="shippingInfo.name" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="shippingInfo.email" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="phone">Số điện thoại</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="shippingInfo.phone" 
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="address">Địa chỉ</label>
                  <textarea 
                    id="address" 
                    v-model="shippingInfo.address" 
                    required
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="note">Ghi chú (tùy chọn)</label>
                  <textarea 
                    id="note" 
                    v-model="shippingInfo.note"
                  ></textarea>
                </div>
              </form>
            </section>
            
            <!-- Tóm tắt đơn hàng -->
            <section class="order-summary">
              <h2>Tóm tắt đơn hàng</h2>
              <div class="order-items">
                <div 
                  v-for="item in cartItems" 
                  :key="item.id" 
                  class="order-item"
                >
                  <div class="item-info">
                    <h4>{{ item.book.title }}</h4>
                    <p>{{ formatPrice(item.book.price) }} × {{ item.quantity }}</p>
                  </div>
                  <div class="item-total">
                    {{ formatPrice(item.book.price * item.quantity) }}
                  </div>
                </div>
              </div>
              
              <div class="order-totals">
                <div class="total-row">
                  <span>Tạm tính:</span>
                  <span>{{ formatPrice(subtotal) }}</span>
                </div>
                <div class="total-row">
                  <span>Phí vận chuyển:</span>
                  <span>{{ formatPrice(shippingFee) }}</span>
                </div>
                <div class="total-row grand-total">
                  <span>Tổng cộng:</span>
                  <span>{{ formatPrice(total) }}</span>
                </div>
              </div>
              
              <div class="payment-methods">
                <h3>Phương thức thanh toán</h3>
                <div class="payment-options">
                  <label 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    :class="{ active: paymentMethod === method.id }"
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      :value="method.id" 
                      v-model="paymentMethod"
                    >
                    <div class="payment-option">
                      <img 
                        v-if="method.icon" 
                        :src="method.icon" 
                        :alt="method.name"
                      >
                      <span>{{ method.name }}</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <button 
                class="place-order-btn" 
                @click="submitOrder"
                :disabled="isProcessing"
              >
                <span v-if="!isProcessing">Đặt hàng</span>
                <span v-else>Đang xử lý...</span>
              </button>
            </section>
          </div>
        </div>
      </div>
      <div v-else class="empty-cart">
        <h2>Giỏ hàng trống</h2>
        <router-link to="/products">Quay lại mua sắm</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cart'
  import { mapState, mapActions } from 'pinia'
  
  export default {
    data() {
      return {
        shippingInfo: {
          name: '',
          email: '',
          phone: '',
          address: '',
          note: ''
        },
        paymentMethod: 'cod',
        paymentMethods: [
          { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: new URL('../assets/cod.png', import.meta.url).href },
          { id: 'momo', name: 'Ví MoMo', icon: new URL('../assets/momo.png', import.meta.url).href },
          { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: new URL('../assets/bank.png', import.meta.url).href }
        ],
        isProcessing: false,
        shippingFee: 20000 // Phí vận chuyển cố định
      }
    },
    computed: {
      ...mapState(useCartStore, ['items', 'totalPrice']),
      cartItems() {
        return this.items
      },
      subtotal() {
        return this.totalPrice
      },
      total() {
        return this.subtotal + this.shippingFee
      }
    },
    methods: {
      ...mapActions(useCartStore, ['clearCart']),
      
      formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
      },
      
      async submitOrder() {
        this.isProcessing = true
        
        try {
          // Giả lập gửi đơn hàng đến server
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          const orderData = {
            customer: this.shippingInfo,
            items: this.cartItems,
            paymentMethod: this.paymentMethod,
            total: this.total,
            shippingFee: this.shippingFee,
            orderDate: new Date().toISOString(),
            orderId: 'OD' + Date.now().toString().slice(-6)
          }
          
          // Lưu đơn hàng vào localStorage (hoặc gửi lên server thực tế)
          this.saveOrderToLocalStorage(orderData)
          
          // Xóa giỏ hàng
          this.clearCart()
          
          // Chuyển đến trang cảm ơn
          this.$router.push({
            name: 'thank-you',
            params: { orderId: orderData.orderId }
          })
        } catch (error) {
          console.error('Lỗi khi đặt hàng:', error)
          alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.')
        } finally {
          this.isProcessing = false
        }
      },
      
      saveOrderToLocalStorage(order) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]')
        orders.push(order)
        localStorage.setItem('orders', JSON.stringify(orders))
      }
    }
  }
  </script>
  
  <style scoped>
  .checkout-view {
    padding: 2rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .checkout-grid {
      grid-template-columns: 1fr;
    }
  }
  
  section {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    font-size: 1.3rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .order-items {
    margin-bottom: 1.5rem;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .item-info h4 {
    margin: 0;
    font-size: 1rem;
  }
  
  .item-info p {
    margin: 0.25rem 0 0 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  .item-total {
    font-weight: 500;
  }
  
  .order-totals {
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-bottom: 1.5rem;
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
  
  .payment-methods h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .payment-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .payment-options label {
    position: relative;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .payment-options label.active {
    border-color: #3498db;
    background-color: #f0f8ff;
  }
  
  .payment-options input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
  
  .payment-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .payment-option img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  
  .place-order-btn {
    width: 100%;
    padding: 1rem;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 1rem;
  }
  
  .place-order-btn:hover:not(:disabled) {
    background-color: #27ae60;
  }
  
  .place-order-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }

  .empty-cart {
    text-align: center;
    padding: 4rem 0;
  }
  
  .empty-cart h2 {
    color: #e74c3c;
    margin-bottom: 1rem;
  }
  
  .empty-cart a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
  }
  </style>