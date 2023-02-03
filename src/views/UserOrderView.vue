<template>
    <NavbarComponent />
    
    <div class="container py-3">
        <form class="row" action="" @submit.prevent="">
            <div class="col">
                <div class="input-group mb-3">
                    <input @keyup="isLoad=true;findUserByUsername()" v-model="user" type="text" class="form-control form-control-sm" placeholder="Username">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle small" type="button" data-bs-toggle="dropdown">
                        <div v-if="isLoad" class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                        <span v-else>
                            <span>{{ users.length }}</span> Found
                        </span>
                    </button>
                    <ul class="dropdown-menu bg-dark">
                        <li v-for="user in users" @click="findOrder(user.id, user.username)"><a class="dropdown-item bg-dark text-white" href="#">{{user.username}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-6 text-end">
                <button @click="finishOrder()" :disabled="!(orders.length > 0)" class="btn btn-sm btn-primary">
                    Mark As Finished ({{ totalOrders }})
                </button>
            </div>
        </form>

        <hr>

        <main class="d-flex vh-70 justify-content-center overflow-auto" @scroll="scrolledToTop($event.target)">
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

    </div>
</template>

<script setup>
    import NavbarComponent from '../components/NavbarComponent.vue';
    import { API_URL } from '../const';
    import { ref } from 'vue';
    import { getOrderByUserId, getOrderCount } from '../api/order';
    import {debounce} from '../utils/utils';
    import {findUsername} from '../api/auth';
import { orderSocket } from '../main';

    const user = ref('');
    const users = ref([]);
    const orders = ref([]);
    const lastId = ref(null);
    const isLoad = ref(false);
    const limit = 25;
    const totalOrders = ref(0);
    const selectedUser = ref(null);

    async function findOrder(userId, username) {
        user.value = username;
        selectedUser.value = userId;
        const getOrders = await getOrderByUserId({limit, userId: selectedUser.value});
        if(getOrders.data.message === 'SUCCESS') {
            orders.value = getOrders.data.data.data;
            lastId.value = getOrders.data.data.lastId;
            const totalOrder = await getOrderCount({userId: selectedUser.value});
            if(totalOrder.data.message === 'SUCCESS') {
                totalOrders.value = totalOrder.data.data;
            }
        }
    }

    async function finishOrder() {
        orderSocket.socket.emit('delete-order-by-user-id', selectedUser.value);
    }

    async function scrolledToTop(div) {
        if(div.scrollTop + div.clientHeight >= div.scrollHeight && lastId.value !== null) {
            const userOrders = await getOrderByUserId({limit, lastId: lastId.value, userId: selectedUser.value});
            if(userOrders.data.message === 'SUCCESS') {
                orders.value.push(...userOrders.data.data.data);
                lastId.value = userOrders.data.data.lastId;
                const totalOrder = await getOrderCount({userId: selectedUser.value});
                if(totalOrder.data.message === 'SUCCESS') {
                    totalOrders.value = totalOrder.data.data;
                }
            }
        }
    }

    const findUserByUsername = debounce(async () => {
        const usernames = await findUsername({username: user.value});
        if(usernames.data.message === 'SUCCESS') {
            users.value = usernames.data.data;
        }
        isLoad.value = false;
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