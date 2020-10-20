<template>
	 <section>
   <div class="container-fluid">

 		<v-chip-group active-class="primary--text" column>
            <v-chip v-for="tag in tags" :key="tag" class="ma-2" @click="showFiltered(tag)">
              {{ tag }}
            </v-chip>
         </v-chip-group>

      	<datatable />


   </div>
 </section>
</template>

<script>
import datatable from '../components/datatable.vue'

export default{
	components: {datatable},
	data(){
		return{
			tags: [
        		'Фильтр 1',
        		'Фильтр 2',
        		'Фильтр 3',
        		'Фильтр 4',
      		],
		}
	},
	methods: {
		showFiltered(tag){
			console.log(tag)
		}
	}
}
</script>