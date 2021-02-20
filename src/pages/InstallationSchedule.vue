<template>
  <v-data-table
    :headers="headers"
    :items.sync="items"
    single-line
    must-sort
    class="elevation-1 rounded-lg ma-4 px-4"
  >
    <template #top>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-select
              placeholder="Выберите бригаду"
              :disabled="!teams.length"
              :items="teams"
              v-model="team"
              item-text="title"
              return-object
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="dateFormated"
                  @click:clear="date = null"
                  label="Выберите дату"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  clearable
                  :disabled="datePickerDisabled"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>

          <downloadExcel
            :data="excelJsonData"
            v-if="getUser.roles[0] !== 'shop_manager'"
          >
            <v-btn depressed color="primary ma-2">
              <v-icon>mdi-download</v-icon>
              Выгрузить EXСEL
            </v-btn>
          </downloadExcel>
        </v-row>
      </v-container>
    </template>
    <template #item.door_size="{ item }">
      {{ item.door_size }} / {{ item.door_direction }}
    </template>
    <template #item.payment_rest="{ item }">
      {{ item.total }}
    </template>
    <template #item.dopServ="{ item }">
      <div v-for="dop in item.dopServ" :key="dop.id">
        {{ dop.name }}
      </div>
    </template>
    <template #item.model_ruk.name="{ item }">
      <td v-if="!item.model_ruk.name">{{ item.model_saler.name }}</td>
      <td v-else>{{ item.model_ruk.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

import moment from "moment";

export default {
  name: "InstallationSchedule",

  data() {
    return {
      menu: false,
      teams: [],
      excelJsonData: "",
      team: {},
      date: null,
      headers: [
        //  доп работы (массив в строку перегнать), остаток денег(посчитать), примечание

        { text: "Время", value: "time_mont" },
        { text: "№", value: "id" },
        { text: "Адрес", value: "adress" },
        { text: "Телефон", value: "phone" },
        { text: "Модель двери", value: "model_ruk.name" },
        { text: "Размер / Сторона", value: "door_size" },
        { text: "Размер проема", value: "proem_size" },
        { text: "Примечание Руководителя", value: "prim_rukvod" },
        { text: "Доп. работы", value: "dopServ" },
        { text: "Тип оплаты", value: "payments_metod" },
        { text: "Остаток платежа", value: "payment_rest" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      sales: "zakaz/GET_SALES",
      getUser: "auth/getUser",
    }),

    dateFormated() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : null;
    },

    datePickerDisabled() {
      if (this.sales.length) {
        const chosenTeamSales = this.sales.filter((sale) => {
          return sale.team.id === this.team.id;
        });

        if (!this.team || !chosenTeamSales.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },

    items() {
      const chosenTeamData = this.sales.filter((sale) => {
        return sale.team.id === this.team.id;
      });

      if (!this.team) {
        return [];
      } else if (this.team && !this.date) {
        return chosenTeamData;
      } else if (this.team && this.date) {
        return chosenTeamData.filter((sale) => {
          return sale.date_mont === this.dateFormated;
        });
      }
    },
  },

  methods: {
    ...mapActions({
      fetchSales: "zakaz/UPDATE_SALES",
    }),
  },

  async created() {
    await this.fetchSales();
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/teams")
      .then((response) => {
        this.teams = response.data;
      });
  },

  watch: {
    team() {
      this.date = null;
    },

    items(newVal) {
      this.excelJsonData = newVal.map((el) => {
        const dopServ = el.dopServ.map((item) => item.name).join(",");
        return {
          "Номер заказа": el.id,
          Адрес: el.adress,
          "Номер телефона": el.phone,
          "Модель двери": el.model_ruk.name,
          "Размер двери": el.door_size,
          "Размер проема": el.proem_size,
          Примечание: el.prim_rukvod,
          "Доп. работы": dopServ,
          "Способ оплаты": el.payments_metod,
          Остаток: el.payment_rest,
        };
      });
    },
  },
};
</script>
