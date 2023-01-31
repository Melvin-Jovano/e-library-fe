<script setup>
import CardBook from "../components/CardBook.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
</script>

<template>
	<div class="header">
		<NavbarComponent />
	</div>
	<div class="container-fluid">
		<main>
			<div class="mt-4">
				<CardBook />
			</div>
		</main>
	</div>
</template>

<style scoped>
.container-fluid {
	max-width: 1650px;
}
</style>