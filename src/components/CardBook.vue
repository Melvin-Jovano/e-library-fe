<template>
    <main class="d-flex justify-content-center">
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/book" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h5 class="card-title">Godzilla vs Kong</h5>
                <p class="card-title-author">Author</p>
            </div>
        </a>
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/movie" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h5 class="card-title">Godzilla vs Kong</h5>
                <p class="card-title-author">Author</p>
            </div>
        </a>
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/game" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h5 class="card-title">Godzilla vs Kong</h5>
                <p class="card-title-author">Author</p>
            </div>
        </a>
    </main>
</template>

<script>
// import { ref, onMounted } from 'vue'
// import axios from "axios";

// const img = ref("")

// function randomImg() {
//     axios.get('https://api.lorem.space/image/book', {
//         headers: { "Access-Control-Allow-Origin": "*" }
//     }).then(res => img.value = res.data)
// }

// randomImg();

</script>

<style scoped>
main {
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1884px;
}

.card-wrap:hover {
    color: #ECB365;
}

.card-title-author {
    color: #fff;
    font-weight: 100;
}

.card-wrap {
    padding: 5px;
    float: none;
    margin-bottom: 10px;
    color: #fff;
}

.card {
    width: 11rem;
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