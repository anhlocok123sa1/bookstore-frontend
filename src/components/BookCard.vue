<template>
    <div class="book-card">
      <router-link :to="`/product/${book.id}`" class="book-link">
        <div class="book-image">
          <img :src="book.image" :alt="book.title">
        </div>
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">{{ book.author }}</p>
          <div class="price-section">
            <span class="price">{{ formatPrice(book.price) }}</span>
            <span v-if="book.originalPrice" class="original-price">{{ formatPrice(book.originalPrice) }}</span>
          </div>
          <button class="add-to-cart" @click.prevent="addToCart">Thêm vào giỏ</button>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cart'
  export default {
    props: {
      book: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
      },
      addToCart() {
        // this.$emit('add-to-cart', this.book)
        // console.log(this); 
        const cartStore = useCartStore()
        cartStore.addItem(this.book)
      }
    }
  }
  </script>
  
  <style scoped>
  .book-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .book-link {
    text-decoration: none;
    color: inherit;
  }
  
  .book-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .book-info {
    padding: 1rem;
  }
  
  .book-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .author {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 0.5rem 0;
  }
  
  .price-section {
    margin: 0.5rem 0;
  }
  
  .price {
    font-weight: bold;
    color: #e74c3c;
    font-size: 1.1rem;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #999;
    font-size: 0.9rem;
    margin-left: 0.5rem;
  }
  
  .add-to-cart {
    width: 100%;
    padding: 0.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  
  .add-to-cart:hover {
    background-color: #2980b9;
  }
  </style>