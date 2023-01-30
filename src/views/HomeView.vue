<script setup>
import CardBook from "../components/CardBook.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
</script>

<template>
	<div class="container-fluid">
		<header>
			<NavbarComponent />
		</header>
		<main>
			<div class="mt-4">
				<CardBook />
			</div>
		</main>
	</div>
</template>
