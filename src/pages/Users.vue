<template>
	<section>
		<div class="container">
			<div class="col-lg-12">
				<h1>Пользователи</h1>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<usertable />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import usertable from '../components/usertable.vue'
	export default{
		components: {usertable}
	}
</script>