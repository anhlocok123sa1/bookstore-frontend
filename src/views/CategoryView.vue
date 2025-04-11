<template>
    <div class="category-view">
      <div class="container">
        <div class="category-header">
          <h1>{{ categoryName }}</h1>
          <p>{{ filteredBooks.length }} sách</p>
        </div>
  
        <div class="category-content">
          <aside class="sidebar">
            <h3>Danh mục khác</h3>
            <ul class="category-list">
              <li v-for="cat in categories" :key="cat.id">
                <router-link 
                  :to="`/category/${cat.id}`" 
                  :class="{ active: cat.id === currentCategoryId }"
                >
                  {{ cat.name }}
                </router-link>
              </li>
            </ul>
          </aside>
  
          <main class="main-content">
            <div class="book-grid">
              <BookCard 
                v-for="book in filteredBooks" 
                :key="book.id" 
                :book="book"
                @add-to-cart="addToCart"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BookCard from '@/components/BookCard.vue'
  import { books, categories } from '@/data/books'
  import { useCartStore } from '@/stores/cart'
  
  export default {
    components: {
      BookCard
    },
    data() {
      return {
        categories,
      books
      }
    },
    computed: {
      currentCategoryId() {
        return parseInt(this.$route.params.id)
      },
      categoryName() {
        const category = this.categories.find(cat => cat.id === this.currentCategoryId)
        return category ? category.name : 'Danh mục không tồn tại'
      },
      filteredBooks() {
        return this.books.filter(book => 
          book.categoryId === this.currentCategoryId
        )
      }
    },
    methods: {
      addToCart(book) {
        const cartStore = useCartStore()
        cartStore.addItem(book)
      }
    }
  }
  </script>
  
  <style scoped>
  .category-view {
    padding: 2rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .category-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .category-header h1 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .category-content {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }
  
  .sidebar {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
  }
  
  .sidebar h3 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .category-list li {
    margin-bottom: 0.5rem;
  }
  
  .category-list a {
    color: #34495e;
    text-decoration: none;
    padding: 0.5rem;
    display: block;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .category-list a:hover {
    background-color: #3498db;
    color: white;
  }
  
  .category-list a.active {
    background-color: #3498db;
    color: white;
  }
  
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .category-content {
      grid-template-columns: 1fr;
    }
    
    .sidebar {
      order: 2;
    }
  }
  </style>