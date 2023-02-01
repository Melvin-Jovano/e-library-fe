<template>
	<div class="container text-white">
		<section class="vh-100">
			<div class="container-fluid h-custom">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="tab-content w-50">
						<div class="">
							<form action="#" @submit.prevent="register()">
								<h1 class="mb-4">Join Our Library Today</h1>
								<div class="form-outline mb-4">
									<input v-model="username" type="text" id="username" class="form-control" />
									<label class="form-label" for="username">Username</label>
									<small v-if="usernameError.length > 0" class="d-block text-danger">{{usernameError}}</small>
								</div>
								
								<div class="form-outline mb-4">
									<input v-model="password" type="password" id="password" class="form-control" />
									<label class="form-label" for="password">Password</label>
									<small v-if="passwordError.length > 0" class="d-block text-danger">{{passwordError}}</small>
								</div>

								<div class="form-outline mb-4">
									<input v-model="passwordRepeat" type="password" id="password-repeat" class="form-control" />
									<label class="form-label" for="password-repeat">Repeat Password</label>
									<small v-if="passwordRepeatError.length > 0" class="d-block text-danger">{{passwordRepeatError}}</small>
								</div>

								<button type="submit" class="btn btn-primary btn-block mb-4 px-3">Sign Up</button>

								<div class="text-center small">
									<p>Already Have An Account? 
										<RouterLink to="login" class="text-white">
											Login
										</RouterLink>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {registerUser} from '../api/auth';
	import router from '../router';

	const username = ref('');
	const password = ref('');
	const passwordRepeat = ref('');
	const passwordRepeatError = ref('');
	const passwordError = ref('');
	const usernameError = ref('');

	async function register() {
		try {
			passwordRepeatError.value = '';
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

			if(password.value !== passwordRepeat.value) {
				passwordRepeatError.value = 'Password Not Match';
				return;
			}
			await registerUser({username: username.value, password: password.value});
			await router.push({name: 'login'});
		} catch (error) {
			if(error.response.status === 403) {
				usernameError.value = 'Invalid Username (No Spaces And All Lowercase)';
			} else if(error.response.status === 409) {
				usernameError.value = 'Username Already Taken';
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