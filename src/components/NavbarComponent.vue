<template>
    <nav class="w-100 shadow navbar navbar-expand-lg position-fixed bg-navbar px-5 nav">
        <a class="bg-navbar navbar-brand text-white fw-bold" href="#">INSOMNIA</a>
        <button class="shadow border-dark navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav text-white w-100 d-flex justify-content-between">
                <div class="d-flex">
                    <li class="nav-item">
                        <RouterLink class="nav-link text-white fw-bold" to="/">Books</RouterLink>
                    </li>
                    <!-- ADMIN / USER MENUS GOES HERE -->
                    <li class="nav-item" v-if="isAdmin">
                        <RouterLink class="nav-link text-white fw-bold" to="/user-order">Orders</RouterLink>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <RouterLink class="nav-link text-white fw-bold" to="/insertbook">
                            Input Book
                        </RouterLink>
                    </li>
                    <!-- ADMIN / USER MENUS GOES HERE -->
                </div>

                <!-- DIVIDER -->
                <div class="d-flex">
                    <li class="nav-item">
                        <div class="nav-link text-white cursor-pointer">
                            <img :src="API_URL + sessionStores.photo" width="25" class="rounded-circle" alt="">
                        </div>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link text-white cursor-pointer">
                            <small>
                                {{ sessionStores.username }}
                            </small>
                        </span>
                    </li>
                    <li class="nav-item mx-3" v-if="!isAdmin">
                        <RouterLink to="/order">
                            <span class="nav-link text-white position-relative">
                                <CartIcon />
                                <span v-if="appStores.orderCount > 0"
                                    class="badge bg-info rounded px-1 position-absolute text-xxs">
                                    {{ appStores.orderCount }}
                                </span>
                            </span>
                        </RouterLink>
                    </li>
                    <li class="nav-item mx-3">
                        <span class="nav-link text-white fw-bold cursor-pointer" @click="logout()">Logout</span>
                    </li>
                </div>
            </ul>
        </div>
    </nav>
    <div class="mb-5">&nbsp;</div>
</template>

<script setup>
import session from '../stores/session';
import { API_URL } from '../const';
import CartIcon from '../assets/icons/Cart.vue';
import { logout as logoutAPI } from '../api/auth';
import app from '../stores/app';
import router from '../router';
import { ref } from 'vue';

const appStores = app();
const sessionStores = session();
const isAdmin = ref(localStorage.getItem('role') === 'ADMIN');

async function logout() {
    try {
        await logoutAPI();
        localStorage.clear();
        await router.push({ name: 'login' });
    } catch (error) {
        return;
    }
}
</script>

<style scoped>
.nav {
    z-index: 1;
}

* {
    background-color: #082032;
}
</style>