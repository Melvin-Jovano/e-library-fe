<template>
	<NavbarComponent />
	<div class="container-fluid">
		<main>
			<div class="mt-4 container">
				<CardBook />
			</div>
		</main>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import CardBook from "../components/CardBook.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import app from '../stores/app';
import { getOrderCount } from '../api/order';
import { orderSocket } from "../main";

const appStores = app();

onMounted(async () => {
	try {
		const orderCount = await getOrderCount({});
		appStores.orderCount = orderCount.data.data;
		orderSocket.connect();
	} catch (error) {
		console.error(error);
		return;
	}
});
</script>