<template>
  <section>
    <div class="container-fluid">
      <v-chip-group active-class="primary--text" column>
        <v-chip
          v-for="tag in tags"
          :key="tag"
          class="ma-2"
          @click="selectFilterTag(tag)"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>

      <datatable :filterTag="filterTag" :selectFilterTag="selectFilterTag" />
    </div>
  </section>
</template>

<script>
// TODO edit 
import datatable from "../components/datatable.vue";

export default {
  components: { datatable },
  data() {
    return {
      tags: [
        "Все",
        "Заявки за сегодня",
        "Необработанные заявки",
        "Передано замерщику",
        "Монтаж завтра",
        "Монтаж сегодня",
        "Ожидают монтаж",
        "Ожидают прибытия",
        "В исполнении",
        
      ],
      filterTag: "",
    };
  },
  methods: {
    selectFilterTag(tag) {
      this.filterTag = tag;
    },
  },
};
</script>