<template>
    <main class="d-flex justify-content-center">
        <div class="card-wrap" v-for="book in bookData" :key="book">
            <router-link class="text-decoration-none" :to="{ name: 'details', params: { bookId: book.id } }">
                <div class="card">
                    <img :src="API_URL + book.cover" class="card-img card-cover" alt="...">
                </div>
                <div class="title mt-2">
                    <h6 class="card-title text-center">{{ book.title }}</h6>
                    <p class="card-title-author text-center">{{ book.author.name }}</p>
                </div>
            </router-link>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllBook } from '../api/books.js';
import { API_URL } from '../const.js';

const lastPostId = ref(null);
const limit = ref();
const bookData = ref([])

console.log(bookData);

async function getAllBookData() {
    try {
        const allBook = await getAllBook({ limit: limit.value })
        if (allBook.data.message === 'SUCCESS') {
            bookData.value = allBook.data.data.data;
            lastPostId.value = getContents.data.data.lastId;
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(async () => {
    await getAllBookData();
});
</script>

<style scoped>
main {
    margin: auto;
    max-width: 1700px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.title {
    width: 150px;
}

.text-decoration-none:hover {
    color: #fbc100;
}

.text-decoration-none {
    color: #fff;
}

.card-title-author {
    color: #fff;
    font-weight: 100;
    font-size: 13px;
}

.card-wrap {
    padding: 5px;
    float: none;
    margin-bottom: 10px;
}

.card {
    width: 9rem;
    border: none;
    margin: 0 auto;
    transition: transform 250ms;
}

.card-cover {
    width: 100%;
}

.card:hover {
    transform: translateY(-10px);
}
</style>