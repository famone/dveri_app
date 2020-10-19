<template>
	<div>
		<catalog />
		<teams />
	</div>
</template>

<script>
import catalog from '../components/catalog.vue'
import teams from '../components/teams.vue'

export default{
	components: {catalog, teams}
}	
</script>