<template>
  <v-data-table :headers="headers" :items="users" :loading="load">
    <template v-slot:item.name="{ item }">
      <v-avatar color="primary" size="25">
        <span class="white--text">{{ item.name }}</span>
      </v-avatar>
      <strong>{{ item.fname }}</strong>
    </template>

    <template v-slot:item.role="{ item }">
      <v-chip :color="getColor(item.role)" dark>
        {{ getName(item.role) }}
      </v-chip>
    </template>

    <template v-slot:item.premia="{ item }">
      <v-chip
        class="ma-2"
        :color="getPremia(item.premia)"
        label
        text-color="white"
      >
        <v-icon left>mdi-label</v-icon>
        {{ item.premia }}%
      </v-chip>
    </template>

    <template #item.lenter="{ item }">
      {{ item.lenter | formatDate("DD.MM.YYYY hh:mm:ss") }}
    </template>
  </v-data-table>
</template>		



<script>
export default {
  props: {
    users: {
      required: true,
      type: Array,
    },
    load: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      headers: [
        { text: "Пользователи", value: "fname" },
        { text: "Роль", value: "role" },
        { text: "Почта", value: "email" },
        { text: "Кол-во заказов", value: "zakaz" },
        { text: "Процент премии", value: "premia" },
        { text: "Последний визит", value: "lenter" },
      ],
    };
  },
  methods: {
    getColor(role) {
      if (role === "administrator") return "red";
      else if (role === "zamershik") return "orange";
      else return "green";
    },
    getPremia(protein) {
      if (protein > 15) return "green";
      else if (protein > 9) return "orange";
      else return "primary";
    },
    getName(role) {
      if (role === "administrator") return "Администратор";
      else if (role === "zamershik") return "Замерщик";
      else return "Менеджер";
    },
  },
};
</script>