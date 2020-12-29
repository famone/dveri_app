<template>
  <div>
    <AddServiceDetailModal
      :addServiceDialog="addServiceDialog"
      :changeAddServiceDialog="changeAddServiceDialog"
      :addServiceSlotName="addServiceSlotName"
    >
      <template #brigada>
        <v-card class="pa-4">
          <div>
            <v-select
              :items="teams"
              v-model="team"
              return-object
              item-text="title"
              label="Выберите бригаду"
            ></v-select>
          </div>
          <div class="d-flex justify-end mt-4">
            <v-btn
              @click="submitChosenEdition('team')"
              :disabled="!team"
              color="primary"
              small
              class="mr-2"
              >Выбрать</v-btn
            >
            <v-btn @click="changeAddServiceDialog" color="error" dark small
              >Закрыть</v-btn
            >
          </div>
        </v-card>
      </template>

      <template #date_mont>
        <v-card class="pa-4">
          <v-datetime-picker
            label="Выберите дату монтажа"
            v-model="date_mont"
            clearText="отмена"
            okText="выбрать"
            dateFormat="yyyy/MM/dd"
            timeFormat="HH:mm"
          >
            <template #dateIcon>
              <v-icon> mdi-calendar </v-icon>
            </template>
            <template #timeIcon>
              <v-icon> mdi-clock </v-icon>
            </template>
          </v-datetime-picker>
          <div class="d-flex justify-end">
            <v-btn
              @click="submitChosenEdition('date_mont')"
              color="primary"
              small
              class="mr-2"
              :disabled="!date_mont"
              >Выбрать</v-btn
            >
            <v-btn @click="changeAddServiceDialog" color="error" dark small
              >Закрыть</v-btn
            >
          </div>
        </v-card>
      </template>

      <template #date_zamera>
        <v-card class="pa-4">
          <v-datetime-picker
            label="Выберите дату замера"
            v-model="date_zamera"
            clearText="отмена"
            okText="выбрать"
            :timePickerProps="{
              format: '24hr',
            }"
          >
            <template #dateIcon>
              <v-icon> mdi-calendar </v-icon>
            </template>
            <template #timeIcon>
              <v-icon> mdi-clock </v-icon>
            </template>
          </v-datetime-picker>
          <div class="d-flex justify-end">
            <v-btn
              @click="submitChosenEdition('date_zamera')"
              color="primary"
              small
              class="mr-2"
              :disabled="!date_zamera"
              >Выбрать</v-btn
            >
            <v-btn @click="changeAddServiceDialog" color="error" dark small
              >Закрыть</v-btn
            >
          </div>
        </v-card>
      </template>

      <template #zamershiki>
        <v-card class="pa-4">
          <div>
            <v-select
              :items="zamershiki"
              v-model="zamershik"
              return-object
              item-text="fname"
              label="установить замерщика"
            ></v-select>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              @click="submitChosenEdition('zamershik')"
              color="primary"
              small
              class="mr-2"
              :disabled="!zamershik"
              >Выбрать</v-btn
            >
            <v-btn @click="changeAddServiceDialog" color="error" dark small
              >Закрыть</v-btn
            >
          </div>
        </v-card>
      </template>

      <template #id_zakaz>
        <v-card class="pa-4">
          <div>
            <v-select
              :items="statuses"
              v-model="status"
              return-object
              item-text="title"
              label="установить статуc"
            ></v-select>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              @click="submitChosenEdition('status')"
              color="primary"
              small
              class="mr-2"
              :disabled="!status"
              >Выбрать</v-btn
            >
            <v-btn @click="changeAddServiceDialog" color="error" dark small
              >Закрыть</v-btn
            >
          </div>
        </v-card>
      </template>
    </AddServiceDetailModal>

    <v-data-table
      v-if="items"
      :headers="headers"
      :items="items"
      :loading="loadDoors"
      sort-by="id"
      single-line
      must-sort
      class="elevation-1 rounded-lg"
      ч
      @click:row="selectOrderRow"
    >
      <template #body.prepend="{ headers }">
        <td
          class="px-4 hidden-xs"
          v-for="header in headers"
          :key="header.value"
        >
          <v-text-field
            dense
            @input="searchByColumn(header.value)"
            :value="columnSearchQueries[header.value]"
            clearable
          ></v-text-field>
        </td>
      </template>

      <template v-slot:item.id="{ item }">
        <v-chip
          :color="getColor(item.status)"
          dark
          :content="getTippyTittle(item.status)"
          v-tippy="{ placement: 'right', arrow: true }"
          :outlined="item.status === 'processing'"
          :class="getChipTextColor(item.status)"
          @click="changeAddServiceDialog('id_zakaz')"
        >
          <span :class="getChipTextColor(item.status)">{{ item.id }}</span>
        </v-chip>
      </template>

      <template #item.door_size="{ item }">
        {{ item.door_size }} / {{ item.door_direction }}
      </template>

      <template #item.date_mont="{ item }" v-if="getUser.id !== 6">
        <v-chip v-if="item.date_mont">
          <span>{{ item.date_mont }}</span>
          <span v-if="item.time_mont">, {{ item.time_mont }}</span>
        </v-chip>
        <div
          v-else
          class="popupBtn px-1"
          @click="changeAddServiceDialog('date_mont')"
        >
          <!-- <v-icon small class="mr-2">mdi-pencil</v-icon> -->
          назначить монтаж
        </div>
      </template>

      <template #item.data_zamera="{ item }" v-if="getUser.id !== 6">
        <v-chip
          v-if="item.data_zamera"
          @click="changeAddServiceDialog('date_zamera')"
        >
          <span>{{ item.data_zamera }}</span>
          <span v-if="item.vremya_zamera">, {{ item.vremya_zamera }}</span>
        </v-chip>
        <div
          v-else
          class="popupBtn px-1"
          @click="changeAddServiceDialog('date_zamera')"
        >
          назначить дату замера
        </div>
      </template>

      <template #item.brigada_mont.name="{ item }" v-if="getUser.id !== 6">
        <span v-if="item.brigada_mont.name">
          {{ item.brigada_mont.name }}
        </span>
        <div v-else class="popupBtn" @click="changeAddServiceDialog('brigada')">
          назначить бригаду
        </div>
      </template>

      <template #item.zamershik.name="{ item }" v-if="getUser.id !== 6">
        <span v-if="item.zamershik.name">{{ item.zamershik.name }}</span>
        <div
          v-else
          class="popupBtn"
          @click="changeAddServiceDialog('zamershiki')"
        >
          установить замерщика
        </div>
      </template>

      <template #item.phone="{ item }">
        <a :href="'tel:' + item.phone">{{ item.phone }}</a>
      </template>

      <template v-slot:item.adress="{ item }">
        <v-avatar :color="getPart(item.part_city)" size="15"></v-avatar>
        {{ item.adress }} {{ item.house }} {{ item.flat }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Заказы</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-toolbar-title
            >Сегодня: {{ now | moment("DD.MM.YY") }}</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-select
            v-if="getUser.roles[0] !== 'shop_manager'"
            label="Выберите город"
            style="margin-bottom: -15px"
            :items="cities"
            v-model="city"
            @change="filterByCity"
          ></v-select>

          <v-spacer></v-spacer>

          <router-link
            tag="a"
            to="/neworder"
            v-if="getUser.roles[0] !== 'shop_manager'"
          >
            <v-btn depressed color="primary ma-2"
              ><v-icon>mdi-calendar</v-icon> График монтажа</v-btn
            >
          </router-link>

          <downloadExcel
            :data="excelJsonData"
            v-if="getUser.roles[0] !== 'shop_manager'"
          >
            <v-btn depressed color="primary ma-2"
              ><v-icon>mdi-download</v-icon> Выгрузить EXСEL</v-btn
            >
          </downloadExcel>

          <router-link tag="a" to="/neworder">
            <v-btn depressed color="primary ma-2"
              ><v-icon>mdi-playlist-plus</v-icon> Новый заказ</v-btn
            >
          </router-link>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Вы точно хотите удалить этот заказ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Отмена</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Удалить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template
        v-slot:item.actions="{ item }"
        v-if="getUser.roles[0] !== 'shop_manager'"
      >
        <router-link tag="a" :to="'/edit_order/' + item.id">
          <v-icon small class="mr-2"> mdi-pencil </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="searchByColumn('reset')"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>


	<script>
import axios from "axios";

import moment from "moment";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import AddServiceDetailModal from "../components/AddServiceDetailModal";

export default {
  components: {
    AddServiceDetailModal,
  },

  props: {
    filterTag: {
      type: String,
    },
    selectFilterTag: {
      type: Function,
    },
  },

  data: () => ({
    now: new Date(),
    dialog: false,
    dialogDelete: false,
    addServiceDialog: false,
    addBrigadaDialog: false,
    addServiceSlotName: "",
    doMont: "",
    deliting: "",
    cities: ["Все", "Санкт-Петербург", "Москва"],
    city: "",
    headers: [
      { text: "Ред.", value: "actions", sortable: false },
      { text: "№", value: "id" },
      { text: "Адрес", value: "adress" },
      { text: "Телефон", value: "phone" },
      { text: "ФИО", value: "fio" },
      { text: "Модель двери продавца", value: "model_saler.name" },
      { text: "Модель двери рук", value: "" },
      { text: "Размер / Сторона", value: "door_size" },
      { text: "Проем", value: "proem_size" },
      { text: "Дата замера", value: "data_zamera" },
      { text: "Замерщик", value: "zamershik.name" },
      { text: "Дата монтажа", value: "date_mont" },
      { text: "Бригада", value: "brigada_mont.name" },
      { text: "Цена диллера", value: "cost_diler" },
      { text: "Примечание продавца", value: "prim_saler" },
      { text: "Примечание Руководителя", value: "prim_rukvod" },
      { text: "Дата продажи", value: "date" },
      { text: "Продавец", sortable: true, value: "saler.name" },
      { text: "Сумма премии", value: "sum_premia" },
      { text: "Премия ВДЗ", value: "vdz_premia" },
    ],
    editedIndex: -1,
    team: "",
    date_mont: null,
    date_zamera: null,
    zamershik: null,
    items: "",
    excelJsonData: "",
    columnSearchQueries: {
      id: "",
      adress: "",
      phone: "",
      fio: "",
      "model_saler.name": "",
      door_size: "",
      proem_size: "",
      data_zamera: "",
      "zamershik.name": "",
      date_mont: "",
      "brigada_mont.name": "",
      cost_diler: "",
      prim_saler: "",
      prim_rukvod: "",
      date: "",
      "saler.name": "",
      sum_premia: "",
      vdz_premia: "",
    },
    status: null,
    statuses: [
      { title: "Ожидает", value: "pending" },
      { title: "Ожидает монтаж", value: "waitmontazh" },
      { title: "Отменен", value: "cancelled" },
      { title: "Замер", value: "zamer" },
      { title: "Индивидуальный", value: "individual" },
      { title: "Выполнен", value: "completed" },
    ],
  }),

  computed: {
    ...mapState("zakaz", ["doors", "loadDoors"]),

    ...mapGetters({
      getUser: "auth/getUser",
      teams: "zakaz/GET_TEAMS",
      zamershiki: "zakaz/GET_ZAMERSHIKI",
      GET_CHOSEN_ZAKAZ: "zakaz/GET_CHOSEN_ZAKAZ",
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  methods: {
    ...mapMutations({
      SET_CHOSEN_ZAKAZ: "zakaz/SET_CHOSEN_ZAKAZ",
    }),

    ...mapActions({
      fetchTeams: "zakaz/UPDATE_TEAMS",
      fetchZamershiki: "zakaz/UPDATE_ZAMERSHIKI",
      fetchDoors: "zakaz/getDoors",
      EDIT_ZAKAZ: "zakaz/EDIT_ZAKAZ",
    }),

    filterByCity() {
      if (this.city === "Все") {
        this.items = [...this.doors];
      } else {
        this.items = this.doors.filter((i) => {
          return !this.city || i.city === this.city;
        });
      }
    },

    searchByColumn(headerValue) {
      this.columnSearchQueries[headerValue] = event.target.value;

      if (headerValue === "reset") {
        for (const objProp in this.columnSearchQueries) {
          this.columnSearchQueries[objProp] = "";
        }

        this.selectFilterTag("");

        this.items = [...this.doors];
      }

      let searchStr = (value) => {
        const arrHeaderValue = headerValue.split(".");
        let innerCount = arrHeaderValue.length;
        let resultValue = { ...value };

        function recurs(value2) {
          if (innerCount >= 1) {
            resultValue = resultValue[arrHeaderValue[0]];
            arrHeaderValue.splice(0, 1);
            innerCount--;

            return recurs(resultValue);
          } else {
            return resultValue;
          }
        }

        return recurs(value);
      };

      let searchVal = event.target.value;
      const toCommonCaseStr = (value) => value.toString().toLocaleLowerCase();

      if (searchVal) {
        for (const objProp in this.columnSearchQueries) {
          if (objProp !== headerValue) {
            this.columnSearchQueries[objProp] = "";
          }
        }
        // let copyDoors = this.doors.map((el) => searchStr(el));
        this.items = this.doors.filter((el) => {
          const comparedStr = searchStr(el) || false;
          return (
            comparedStr &&
            // comparedStr != null &&
            // searchVal != null &&
            toCommonCaseStr(comparedStr).includes(toCommonCaseStr(searchVal))
          );
        });
      } else this.items = [...this.doors];
    },

    selectOrderRow(item) {
      this.SET_CHOSEN_ZAKAZ(item);
    },

    getColor(status) {
      switch (status) {
        case "processing":
          return "black";
        case "waitmontazh":
          return "yellow";
        case "cancelled":
          return "red";
        case "individual":
          return "grey";
        case "zamer":
          return "#5E35B1";
        case "completed":
          return "green";
        case "pending":
          return "#5E35B1";
      }
    },
    getTippyTittle(status) {
      if (status === "pending") return "Ожидает";
      else if (status === "waitmontazh") return "Ожидает монтаж";
      else if (status === "cancelled") return "Отменен";
      else if (status === "zamer") return "Замер";
      else if (status === "individual") return "Индивидуальная";
      else if (status === "completed") return "Выполнен";
      else return "В работе";
    },
    getPart(part) {
      if (part === "Север") return "primary";
      else if (part === "Юг") return "orange";
      else return "grey";
    },

    getChipTextColor(status) {
      switch (status) {
        case "processing":
          return "chipColorBlack";
        case "waitmontazh":
          return "chipColorWhite";
        case "cancelled":
          return "chipColorWhite";
        case "individual":
          return "chipColorWhite";
        case "zamer":
          return "chipColorWhite";
        case "completed":
          return "chipColorWhite";
      }
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.deliting = id;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.deliting = "";
    },
    deleteItemConfirm() {
      this.$store.dispatch("zakaz/startLoader");
      this.$store.dispatch("zakaz/deliteZakaz", this.deliting);
      this.dialogDelete = false;
      this.deliting = "";
    },

    changeAddServiceDialog(slotName) {
      this.addServiceSlotName = slotName;
      this.addServiceDialog = !this.addServiceDialog;
    },

    submitChosenEdition(type) {
      if (type === "date_mont" || type === "date_zamera") {
        // this[type] = moment(this[type]).format("YYYY-MM-DDTHH:mm:ss");
        const dateZamer = moment(this[type]).format("YYYY/MM/DD");
        const vremya_zamera = moment(this[type]).format("HH:mm");

        this.EDIT_ZAKAZ({
          ...this.GET_CHOSEN_ZAKAZ,
          dateZamer,
          vremya_zamera,
        }).then(() => {
          this[type] = null;
          this.fetchDoors();
        });
      }

      // this.EDIT_ZAKAZ({ ...this.GET_CHOSEN_ZAKAZ, [type]: this[type] }).then(
      //   () => {
      //     this[type] = null;
      //     this.fetchDoors();
      //   }
      // );

      this.addServiceDialog = false;
    },
  },

  mounted() {
    // api
    this.fetchTeams();
    this.fetchZamershiki();
    this.fetchDoors();
  },

  watch: {
    doors(newVal) {
      this.items = newVal;
      this.excelJsonData = newVal.map((el) => {
        return {
          ...el,
          saler: el.saler.name,
          brigada_mont: el.brigada_mont.name,
          category_ruk: el.category_ruk.name,
          category_saler: el.category_saler.name,
          model_ruk: el.model_ruk.name,
          model_saler: el.model_saler.name,
          zamershik: el.zamershik.name,
        };
      });
    },

    filterTag: {
      handler(newVal) {
        switch (newVal) {
          case "Все":
            this.items = [...this.doors];
            break;
          case "Заявки за сегодня":
            this.items = this.doors.filter((el) => {
              return el.data_zamera === moment().format("DD/MM/YYYY");
            });
            break;
          case "Необработанные заявки":
            console.log("Необработанные заявки");
            break;
          case "Передано замерщику":
            this.items = this.doors.filter((el) => {
              return el.zamershik.name;
            });
            break;
          case "Монтаж завтра":
            this.items = this.doors.filter(
              (el) => el.date_mont === moment().add(1, "d").format("DD/MM/YYYY")
            );
            break;
          case "Монтаж сегодня":
            this.items = this.doors.filter(
              (el) => el.date_mont === moment().format("DD/MM/YYYY")
            );
            break;
          case "Ожидают монтаж":
            this.items = this.doors.filter((el) => !el.date_mont);
            break;
          case "Возврат дилеру":
            console.log("Возврат дилеру");
            break;
          case "Ожидают прибытия":
            console.log("Ожидают прибытия");
            break;
          case "В исполнении":
            console.log("В исполнении");
            break;
          case "Купоны":
            console.log("Купоны");
            break;
          case "Изменения продавцов":
            console.log("Изменения продавцов");
            break;

          default:
            this.items = [...this.doors];
            break;
        }
      },
    },
  },
};
</script>

<style>
table td {
  font-size: 12px !important;
  line-height: 16px;
  font-weight: 500;
}
table th {
  font-size: 12px !important;
  line-height: 16px;
}
.popupBtn {
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  color: #1976d2;
}

.chipColorWhite {
  color: white;
}

.chipColorBlack {
  color: black;
}
</style>