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

      <SalesDataTable
        :filterTag="filterTag"
        :selectFilterTag="selectFilterTag"
      />
    </div>
  </section>
</template>

<script>
export default {
  components: {
    SalesDataTable: () => import("../components/SalesDataTable"),
  },
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
        "Выплачено",
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