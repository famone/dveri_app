<template>
	<div>
		<catalog />
		<teams />
		<services />
	</div>
</template>

<script>
import catalog from '../components/catalog.vue'
import teams from '../components/teams.vue'
import services from '../components/services.vue'

export default{
	components: {catalog, teams, services}
}	
</script>