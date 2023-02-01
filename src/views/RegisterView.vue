<template>
	<div class="container text-white">
		<section class="vh-100">
			<div class="container-fluid h-custom">
				<div class="row d-flex justify-content-center align-items-center h-100">
					<div class="tab-content w-50">
						<div class="">
							<form action="#" @submit.prevent="register()">
								<h1 class="mb-4">Welcome To Our Library</h1>
								<div class="form-outline mb-4">
									<input type="email" id="email" class="form-control" />
									<label class="form-label" for="email">Username</label>
								</div>

								<div class="form-outline mb-4">
									<input type="password" id="password" class="form-control" />
									<label class="form-label" for="password">Password</label>
								</div>

								<div class="form-outline mb-4">
									<input type="password" id="password-repeat" class="form-control" />
									<label class="form-label" for="password-repeat">Repeat Password</label>
								</div>

								<button type="submit" class="btn btn-primary btn-block mb-4 px-3">Sign Up</button>

								<div class="text-center">
									<p>Already Have An Account? <a href="#!" class="text-white">Register</a></p>
								</div>
							</form>
						</div>
						<div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
							<form>
							<div class="text-center mb-3">
								<p>Sign up with:</p>
								<button type="button" class="btn btn-secondary btn-floating mx-1">
								<i class="fab fa-facebook-f"></i>
								</button>

								<button type="button" class="btn btn-secondary btn-floating mx-1">
								<i class="fab fa-google"></i>
								</button>

								<button type="button" class="btn btn-secondary btn-floating mx-1">
								<i class="fab fa-twitter"></i>
								</button>

								<button type="button" class="btn btn-secondary btn-floating mx-1">
								<i class="fab fa-github"></i>
								</button>
							</div>

							<p class="text-center">or:</p>

							<!-- Name input -->
							<div class="form-outline mb-4">
								<input type="text" id="registerName" class="form-control" />
								<label class="form-label" for="registerName">Name</label>
							</div>

							<!-- Username input -->
							<div class="form-outline mb-4">
								<input type="text" id="registerUsername" class="form-control" />
								<label class="form-label" for="registerUsername">Username</label>
							</div>

							<!-- Email input -->
							<div class="form-outline mb-4">
								<input type="email" id="registerEmail" class="form-control" />
								<label class="form-label" for="registerEmail">Email</label>
							</div>

							<!-- Password input -->
							<div class="form-outline mb-4">
								<input type="password" id="registerPassword" class="form-control" />
								<label class="form-label" for="registerPassword">Password</label>
							</div>

							<!-- Repeat Password input -->
							<div class="form-outline mb-4">
								<input type="password" id="registerRepeatPassword" class="form-control" />
								<label class="form-label" for="registerRepeatPassword">Repeat password</label>
							</div>

							<!-- Checkbox -->
							<div class="form-check d-flex justify-content-center mb-4">
								<input
								class="form-check-input me-2"
								type="checkbox"
								value=""
								id="registerCheck"
								checked
								aria-describedby="registerCheckHelpText"
								/>
								<label class="form-check-label" for="registerCheck">
								I have read and agree to the terms
								</label>
							</div>

							<!-- Submit button -->
							<button type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
							</form>
						</div>
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