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
        </v-row>
      </v-container>
    </template>
    <template #item.door_size="{ item }">
      {{ item.door_size }} / {{ item.door_direction }}
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
        { text: "Примечание Руководителя", value: "prim_rukvod" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      sales: "zakaz/GET_SALES",
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
          const date_mont = moment(sale.date_mont).format("DD/MM/YYYY");
          if (date_mont === this.dateFormated) {
            return sale;
          }
        });
      }
    },
  },

  methods: {
    ...mapActions({
      fetchDoors: "zakaz/getDoors",
    }),
  },

  async created() {
    await this.fetchDoors();
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
  },
};
</script>
