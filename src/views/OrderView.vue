<template>
    <NavbarComponent />
    
    <div v-if="orders.length === 0" class="text-center container text-white h1">
        ~ No Orders Found ~
    </div>

    <main v-else class="d-flex justify-content-center">
        <div class="card-wrap mx-2" v-for="order in orders" :key="order.id">
            <RouterLink class="text-decoration-none" :to="{ name: 'details', params: { bookId: order.book.id } }">
                <div class="card">
                    <img :src="API_URL + order.book.cover" class="card-img card-cover" alt="...">
                </div>
                <div class="title mt-3">
                    <h6 class="card-title text-center">{{ order.book.title }}</h6>
                    <p class="card-title-author text-center">{{ order.book.author.name }}</p>
                </div>
            </RouterLink>
        </div>
    </main>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { API_URL } from '../const';
    import NavbarComponent from '../components/NavbarComponent.vue';
    import { getOrderByUserId } from '../api/order';

    const orders = ref([]);

    onMounted(async () => {
        try {
            const userOrders = await getOrderByUserId({limit: 20, lastId: null});
            if(userOrders.data.message === 'SUCCESS') {
                orders.value = userOrders.data.data.data;
            }
        } catch (error) {
            console.error(error);
            return;
        }
    });
</script>

<style scoped>
    main {
        margin: auto;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
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
        max-width: 250px;
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