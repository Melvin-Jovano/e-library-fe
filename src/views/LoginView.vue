<template>
	<div class="container text-white">
		<section class="vh-100">
			<div class="container-fluid h-custom">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="col-md-9 col-lg-6 col-xl-5">
						<img src="../assets/images/login.webp"
						class="img-fluid" alt="Sample image">
					</div>
					<div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<form>
							<h1 class="mb-4">Hello There...</h1>
							<div class="form-outline mb-4">
								<input type="email" id="username" class="form-control form-control"
								placeholder="Username" />
								<label class="form-label text-sm" for="username">Your Username</label>
							</div>

							<div class="form-outline mb-3">
								<input type="password" id="password" class="form-control form-control"
								placeholder="Password" />
								<label class="form-label text-sm" for="password">Enter Your Password</label>
							</div>

							<div class="text-center text-lg-start mt-4 pt-2">
								<button type="submit" class="btn btn-primary px-4">Login</button>
								<p class="small mt-2 pt-1 mb-0">Don't have an account? <a href="#!" class="text-white text-sm">Register</a></p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';

	onMounted(() => {
		console.log(1);
	});
</script>

<style scoped>
	.h-custom {
		height: calc(100% - 73px);
	}
	@media (max-width: 450px) {
		.h-custom {
			height: 100%;
		}
	}
</style>