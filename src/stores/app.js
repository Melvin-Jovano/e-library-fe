import { ref } from 'vue';
import { defineStore } from 'pinia';

const app = defineStore('app', () => {
  const orderCount = ref(0);

  return { 
    orderCount,
  }
}, {
  persist: true
});

export default app;