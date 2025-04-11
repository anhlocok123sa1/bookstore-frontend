import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    addItem(book) {
      const existingItem = this.items.find(item => item.book.id === book.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ id: Date.now(), book, quantity: 1 })
      }
    },
    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },
    clearCart() {
      this.items = []
    },
    updateQuantity(itemId, newQuantity) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.quantity = Math.max(1, newQuantity)
      }
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.book.price * item.quantity), 0)
  }
})