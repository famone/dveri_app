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
          <!-- <v-card-title class="pa-0">Выберите бригаду</v-card-title> -->
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
    </AddServiceDetailModal>

    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :loading="loadDoors"
      sort-by="id"
      single-line
      class="elevation-1 rounded-lg"
      @click:row="selectOrderRow"
    >
      <template v-slot:item.id="{ item }">
        <v-chip :color="getColor(item.status)" dark  :content="getTippyTittle(item.status)" 
        v-tippy="{ placement : 'right',  arrow: true }">
          {{ item.id }}
        </v-chip>
      </template>

      <template v-slot:item.date_mont="{ item }">
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

      <template #item.data_zamera="{ item }">
        <v-chip v-if="item.data_zamera">
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

      <template #item.brigada_mont.name="{ item }">
        <span v-if="item.brigada_mont.name">
          {{ item.brigada_mont.name }}
        </span>
        <div v-else class="popupBtn" @click="changeAddServiceDialog('brigada')">
          назначить бригаду
        </div>
      </template>

      <template #item.zamershik="{ item }">
        <span v-if="item.zamershik.name">{{ item.zamershik.name }}</span>
        <div
          v-else
          class="popupBtn"
          @click="changeAddServiceDialog('zamershiki')"
        >
          установить замерщика
        </div>
      </template>

      <template v-slot:item.adres="{ item }">
        <v-avatar :color="getPart(item.part_city)" size="15"></v-avatar>
        {{ item.adress }} {{ item.house }} {{ item.flat }}
      </template>

      <!-- <template v-slot:item.zamershik.name="{ item }"> -->
      <!-- TODO: если поле пустое должна быть надпись установить замерщика и выскакивать поп ап с выбором замерщика -->
      <!-- {{ item.zamershik.name }} -->
      <!-- </template> -->

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Заказы</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-toolbar-title>Сегодня: 18.10.2020</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-select
            label="Выберите город"
            style="margin-bottom: -15px"
            :items="cities"
            v-model="city"
          ></v-select>


          <v-spacer></v-spacer>

          <v-btn depressed color="primary ma-4"><v-icon>mdi-download</v-icon> Выгрузить EXEL</v-btn>

          <router-link tag="a" to="/neworder">
            <v-btn depressed color="primary"><v-icon>mdi-playlist-plus</v-icon> Новый заказ</v-btn>
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
                <v-btn
                  color="blue darken-1"
                  v-model="deliting"
                  text
                  @click="deleteItemConfirm(deliting)"
                  >Удалить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link tag="a" :to="'/edit_order/' + item.id">
          <v-icon small class="mr-2"> mdi-pencil </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>


	<script>
import axios from "axios";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import AddServiceDetailModal from "../components/AddServiceDetailModal";

export default {
  components: {
    AddServiceDetailModal,
  },

  data: () => ({
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
      { text: "Желаемая дата монтажа", value: "date_mont" },
      { text: "Желаемая дата замера", value: "data_zamera" },
      { text: "БР", value: "brigada_mont.name" },
      { text: "Адрес", value: "adres" },
      { text: "ФИО", value: "fio" },
      { text: "Телефон", value: "phone" },
      { text: "Продавец", sortable: true, value: "saler.name" },
      { text: "Дата", value: "date" },
      { text: "Модель двери продавца", value: "model_saler.name" },
      { text: "Модель двери рук", value: "" },
      { text: "Размер двери", value: "door_size" },
      { text: "Сторона откр", value: "door_direction" },
      { text: "Размер проема", value: "proem_size" },
      { text: "Замерщик", value: "zamershik" },
      { text: "Цена диллера", value: "cost_diler" },
      { text: "Сумма премии", value: "sum_premia" },
      { text: "Премия ВДЗ", value: "vdz_premia" },
      { text: "Примечание продавца", value: "prim_saler" },
      { text: "Примечание Руководителя", value: "prim_rukvod" },
    ],
    editedIndex: -1,
    team: "",
    date_mont: null,
    date_zamera: null,
    zamershik: null,
  }),

  computed: {
    ...mapState("zakaz", ["doors", "loadDoors"]),

    ...mapGetters({
      teams: "zakaz/GET_TEAMS",
      zamershiki: "zakaz/GET_ZAMERSHIKI",
      GET_CHOSEN_ZAKAZ: "zakaz/GET_CHOSEN_ZAKAZ",
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    filteredItems() {
      if (this.city === "Все") {
        return this.doors;
      } else {
        return this.doors.filter((i) => {
          return !this.city || i.city === this.city;
        });
      }
    },
  },
  mounted() {
    // api
    this.fetchTeams();
    this.fetchZamershiki();
    this.fetchDoors();
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

    selectOrderRow(item) {
      this.SET_CHOSEN_ZAKAZ(item);
    },

    setMont(n) {
      alert("asdas");
      console.log(n);
    },
    getColor(status) {
      if (status === "pending") return "red";
      else if (status === "processing") return "orange";
      else return "green";
    },
    getTippyTittle(status){
      if (status === "pending") return "Ожидает";
      else if (status === "processing") return "В процессе";
      else return "В работе";
    },
    getPart(part) {
      if (part === "Север") return "primary";
      else if (part === "Юг") return "orange";
      else return "grey";
    },
    deleteItem(item) {
      this.dialogDelete = true;
      this.deliting = item;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.deliting = "";
    },
    deleteItemConfirm(item) {
      this.$store.dispatch("zakaz/startLoader");
      this.$store.dispatch("zakaz/deliteZakaz", item);
      this.dialogDelete = false;
      this.deliting = "";
    },

    changeAddServiceDialog(slotName) {
      this.addServiceSlotName = slotName;
      this.addServiceDialog = !this.addServiceDialog;
    },

    submitChosenEdition(type) {
      if (type === "date_mont" || type === "date_zamera") {
        this[type] = this[type].toISOString();
      }

      this.EDIT_ZAKAZ({ ...this.GET_CHOSEN_ZAKAZ, [type]: this[type] }).then(
        () => {
          this.fetchDoors();
          this[type] = null;
        }
      );

      this.addServiceDialog = false;
    },
  },
};
</script>

<style>
table td {
  font-size: 14px !important;
  font-weight: 500;
}
table th {
  font-size: 14px !important;
}
.popupBtn {
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  color: #1976d2;
}
</style>