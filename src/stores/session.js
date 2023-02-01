import { ref } from 'vue';
import { defineStore } from 'pinia';

const session = defineStore('session', () => {
  const userId = ref(null);
  const username = ref(null);
  const name = ref(null);
  const photo = ref(null);

  return { 
    name,
    photo,
    userId,
    username
  }
}, {
  persist: true
});

export default session;