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
						<form @submit.prevent="login()">
							<h1 class="mb-4">Hello There...</h1>
							<div class="form-outline mb-4">
								<input v-model="username" type="text" id="username" class="form-control form-control"
								placeholder="Username" />
								<label class="form-label text-sm" for="username">Your Username</label>
								<small v-if="usernameError.length > 0" class="d-block text-danger">{{usernameError}}</small>
							</div>

							<div class="form-outline mb-3">
								<input v-model="password" type="password" id="password" class="form-control form-control"
								placeholder="Password" />
								<label class="form-label text-sm" for="password">Enter Your Password</label>
								<small v-if="passwordError.length > 0" class="d-block text-danger">{{passwordError}}</small>
							</div>

							<div class="text-center text-lg-start mt-4 pt-2">
								<button type="submit" class="btn btn-primary px-4">Login</button>
								<p class="small mt-2 pt-1 mb-0">Don't have an account? 
									<RouterLink to="/register" class="text-white">
										Register
									</RouterLink>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { login as loginUsers } from '../api/auth';
	import router from '../router';
	import session from '../stores/session';

	const sessionStores = session();
	const username = ref('');
	const password = ref('');
	const passwordError = ref('');
	const usernameError = ref('');

	async function login() {
		try {
			passwordError.value = '';
			usernameError.value = '';

			if(username.value.length === 0) {
				usernameError.value = 'Username Cant Be Empty';
				return;
			}

			if(password.value.length < 6) {
				passwordError.value = 'Password At Least 6 Characters';
				return;
			}

			const getUser = await loginUsers({username: username.value, password: password.value});
			sessionStores.name = getUser.data.data.name;
			sessionStores.photo = getUser.data.data.photo;
			sessionStores.username = getUser.data.data.username;
			sessionStores.userId = getUser.data.data.userId;
			localStorage.setItem('accessToken', getUser.data.data.accessToken);
			localStorage.setItem('role', getUser.data.data.role);
			localStorage.setItem('refreshToken', getUser.data.data.refreshToken);
			await router.push({name: 'home'});
		} catch (error) {
			if(error.response.status === 404) {
				usernameError.value = 'No Account Found';
			} else if(error.response.status === 500) {
				usernameError.value = 'An Error Has Occured';
			}
			return;
		}
	}

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