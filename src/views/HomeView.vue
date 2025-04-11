<template>
    <div class="home">
      <section class="banner">
        <!-- <img src="@/assets/banner.jpg" alt="Bookstore Banner"> -->
      </section>

      <section class="categories">
        <h2>Danh mục sách</h2>
        <div class="category-list">
          <router-link 
            v-for="category in categories" 
            :key="category.id" 
            :to="`/category/${category.id}`"
            class="category-card"
          >
            {{ category.name }}
          </router-link>
        </div>
      </section>
      
      <section class="featured-books">
        <h2>Sách nổi bật</h2>
        <div class="book-list">
          <BookCard 
            v-for="book in featuredBooks" 
            :key="book.id" 
            :book="book"
            @add-to-cart="addToCart"
          />
        </div>
      </section>
      
    </div>
  </template>
  
  <script>
  import BookCard from '@/components/BookCard.vue'
  import { books, categories } from '@/data/books'
  
  export default {
    components: {
      BookCard
    },
    data() {
      return {
        featuredBooks: books.slice(0, 6), // Hiển thị 6 sách nổi bật
      categories
      }
    },
    methods: {
      addToCart(book) {
        // Xử lý thêm vào giỏ hàng
        this.$emit('toggle-cart')
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    padding: 2rem 0;
  }
  
  .banner img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  section {
    margin: 2rem 0;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
  
  .book-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .category-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .category-card {
    background-color: #3498db;
    color: white;
    padding: 1.5rem 1rem;
    text-align: center;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .category-card:hover {
    background-color: #2980b9;
  }
  </style>