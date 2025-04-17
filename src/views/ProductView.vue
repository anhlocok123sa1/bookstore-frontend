<template>
  <div class="product-view">
    <div class="container">
      <div v-if="product" class="product-detail">
        <div class="product-images">
          <img :src="product.image" :alt="product.title" class="main-image" />
        </div>

        <div class="product-info">
          <h1>{{ product.title }}</h1>
          <p class="author">Tác giả: {{ product.author }}</p>
          <div class="price-section">
            <span class="price">{{ formatPrice(itemTotal) }}</span>
            <span v-if="product.originalPrice" class="original-price">
              {{ formatPrice(product.originalPrice) }}
            </span>
          </div>

          <div class="quantity-selector">
            <label>Số lượng:</label>
            <div class="quantity-controls">
              <button @click="decrementQuantity">-</button>
              <input type="number" v-model.number="quantity" min="1" />
              <button @click="incrementQuantity">+</button>
            </div>
          </div>

          <button class="add-to-cart-btn" @click="addToCart">Thêm vào giỏ hàng</button>

          <div class="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Sản phẩm không tồn tại</h2>
        <router-link to="/" class="back-to-home"> Quay lại trang chủ </router-link>
      </div>

      <section class="related-products" v-if="relatedProducts.length > 0">
        <h2>Sản phẩm liên quan</h2>
        <div class="related-grid">
          <BookCard
            v-for="book in relatedProducts"
            :key="book.id"
            :book="book"
            @add-to-cart="addToCart"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import api from '@/plugins/axios'
import { useCartStore } from '@/stores/cart'

export default {
  components: {
    BookCard,
  },
  data() {
    return {
      quantity: 1,
      product: null,
      relatedProducts: [],
    }
  },
  computed: {
    itemTotal() {
      return this.product ? this.product.price * this.quantity : 0
    },
  },
  created() {
    this.loadProduct()
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    async loadProduct() {
      const productId = parseInt(this.$route.params.id)
      try {
        // Lấy chi tiết sản phẩm từ API
        const response = await api.get(`/books/${productId}`)
        this.product = response.data

        // Lấy sản phẩm liên quan từ API
        this.loadRelatedProducts(this.product.categoryId)
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error)
      }
    },
    async loadRelatedProducts(categoryId) {
      try {
        const response = await api.get(`/books?category_id=${categoryId}`)
        this.relatedProducts = response.data.filter(p => p.id !== this.product.id).slice(0, 4)
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm liên quan:', error)
      }
    },
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    addToCart() {
      const cartStore = useCartStore()
      for (let i = 0; i < this.quantity; i++) {
        cartStore.addItem(this.product)
      }
      this.quantity = 1
    },
  },
}
</script>

<style scoped>
.product-view {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.product-images {
  position: sticky;
  top: 1rem;
}

.main-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-info h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.author {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.price-section {
  margin: 1.5rem 0;
}

.price {
  font-size: 1.5rem;
  color: #e74c3c;
  font-weight: bold;
  margin-right: 1rem;
}

.original-price {
  font-size: 1.1rem;
  color: #95a5a6;
  text-decoration: line-through;
}

.quantity-selector {
  margin: 2rem 0;
}

.quantity-selector label {
  display: block;
  margin-bottom: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 4px;
}

.quantity-controls input {
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.product-description {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.related-products {
  margin-top: 3rem;
}

.related-products h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.back-to-home {
  display: inline-block;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>
