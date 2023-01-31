<template>
    <main class="d-flex justify-content-center">
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/book" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h6 class="card-title text-center">Godzilla vs Kong</h6>
                <p class="card-title-author text-center">Author</p>
            </div>
        </a>
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/movie" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h6 class="card-title text-center">Godzilla vs Kong</h6>
                <p class="card-title-author text-center">Author</p>
            </div>
        </a>
        <a href="#" class="card-wrap text-decoration-none" v-for="card in 10" :key="card">
            <div class="card">
                <img src="https://api.lorem.space/image/game" class="card-img card-cover" alt="...">
            </div>
            <div class="title mt-2">
                <h6 class="card-title text-center">Godzilla vs Kong</h6>
                <p class="card-title-author text-center">Author</p>
            </div>
        </a>
    </main>
</template>

<style scoped>
main {
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.card-wrap:hover {
    color: #ECB365;
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
    color: #fff;
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