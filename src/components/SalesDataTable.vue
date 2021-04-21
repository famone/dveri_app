<template>
  <div>

    <v-dialog v-model="dialogDopServ" width="500px">
      <v-card class="pa-4">
        <v-container fluid>
          <v-row v-for="item in chosenItem.dopServ" :key="item.name">
            {{ item.name }}
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogDopServ = false" color="primary">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      single-line
      must-sort
      class="elevation-1 rounded-lg"
      :footer-props="{'items-per-page-options': [20, 40, 60, -1]}"
      @click:row="selectOrderRow"
    >
      <template #top>
        <v-toolbar flat>
          <!-- <v-toolbar-title>Заказы</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider> -->
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
            clearable
          ></v-select>

          <v-divider class="mx-4" inset vertical></v-divider>


<!-- date range from -->
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date_start"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date_start"
              label="Дата с-по:"
              prepend-icon="mdi-calendar"
              style="margin-bottom: -15px"
              readonly
              v-bind="attrs"
              v-on="on">
            </v-text-field>
        </template>
        <v-date-picker v-model="date_start" no-title scrollable range>
            <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">
            Отмена
          </v-btn>
          <v-btn text color="primary" @click="filterByDate">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

<!-- date picker range end -->




          <v-spacer></v-spacer>



          <router-link
            tag="a"
            to="/installation-shedule"
            v-if="getUser.roles[0] !== 'shop_manager'"
          >
            <v-btn depressed color="primary ma-2"
              ><v-icon>mdi-calendar</v-icon> График монтажа</v-btn
            >
          </router-link>

          <downloadExcel
            :data="json_data"
            :fields="json_fields"
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

      <template #item.fio="{ item }">
        <v-tooltip top v-if="item.fio.length > 8" color="#212121">
          <template v-slot:activator="{ on }">
            <span v-on="on">
              {{ item.fio.substring(0, 8) + "..." }}
            </span>
          </template>
          <div style="max-width: 270px">{{ item.fio }}</div>
        </v-tooltip>
        <span v-else>
          {{ item.fio }}
        </span>
      </template>

      <template #item.data_zamera="{ item }" v-if="getUser.id !== 6">
        <v-edit-dialog
          :return-value.sync="item.data_zamera"
          @save="saveDataZamera(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          <v-chip v-if="item.data_zamera">
            <span>{{ item.data_zamera | dateWithoutYear }}</span>
            <span v-if="item.vremya_zamera">, {{ item.vremya_zamera }}</span>
          </v-chip>
          <div v-else class="popupBtn text-center">назначить дату</div>
          <template #input>
            <v-datetime-picker
              label="Выберите дату замера"
              v-model="data_zamera"
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
          </template>
        </v-edit-dialog>
      </template>

      <template #item.date_mont="{ item }" v-if="getUser.id !== 6">
        <v-edit-dialog
          :return-value.sync="item.date_mont"
          @save="saveDateMontaz(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          <v-chip v-if="item.date_mont">
            <span>{{ item.date_mont | dateWithoutYear }}</span>
            <span v-if="item.time_mont">, {{ item.time_mont }}</span>
          </v-chip>
          <div v-else class="popupBtn text-center">назначить монтаж</div>

          <template #input>
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
          </template>
        </v-edit-dialog>
      </template>

      <template #item.date="{ item }">
        {{ item.date | formatDate("DD/MM") }}
      </template>

      <template #item.zamershik.name="{ item }" v-if="getUser.id !== 6">
        <v-edit-dialog
          :return-value.sync="item.zamershik"
          @save="saveZamershik(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          <span v-if="item.zamershik.name">{{ item.zamershik.name }}</span>
          <div v-else class="popupBtn text-center">установить замерщика</div>

          <template #input>
            <v-select
              :items="zamershiki"
              v-model="zamershik"
              return-object
              item-text="fname"
              label="установить замерщика"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.brigada_mont.name="{ item }" v-if="getUser.id !== 6">
        <v-edit-dialog
          :return-value.sync="item.brigada_mont"
          @save="saveBrigadaMont(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          <span v-if="item.brigada_mont.name">
            {{ item.brigada_mont.name }}
          </span>
          <div v-else class="popupBtn text-center">назначить бригаду</div>

          <template #input>
            <v-select
              :items="teams"
              v-model="team"
              return-object
              item-text="title"
              label="Выберите бригаду"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.id="{ item }">
        <v-edit-dialog
          :return-value.sync="item.status"
          @save="saveZakazStatus(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          <v-chip
            :color="getColor(item.status)"
            dark
            :content="getTippyTittle(item.status)"
            v-tippy="{ placement: 'right', arrow: true }"
            :outlined="item.status === 'processing'"
            :class="getChipTextColor(item.status)"
          >
            <span :class="getChipTextColor(item.status)">{{ item.id }}</span>
          </v-chip>

          <template #input>
            <v-select
              :items="statusesOnRole"
              v-model="status"
              item-text="title"
              label="установить статуc"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>






<template #item.payments_metod="{ item }">
        <v-edit-dialog
          :return-value.sync="item.payments_metod"
          @save="saveZakazPayment(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
          save-text=" Выбрать"
          cancel-text="Закрыть"
          large
          persistent
        >
          
          {{item.payments_metod}}

          <template #input>
            <v-select
              :items="payments_metod_list"
              v-model="payments_metod"
              item-text="title"
              label="Тип оплаты"
              clearable
            ></v-select>
          </template>
        </v-edit-dialog>
      </template>








      <template #item.door_model="{ item }">
        <span v-if="item.model_ruk.name" style="color: red">
          {{ item.model_ruk.name }}
        </span>
        <span v-else>
          {{ item.model_saler.name }}
        </span>
      </template>

      <template #item.door_size="{ item }">
        {{ item.door_size }} / {{ item.door_direction }}
      </template>

      <template #item.adress="{ item }">
        <v-avatar :color="getPart(item.part_city)" size="14"></v-avatar>
        {{ item.adress }} {{ item.house }} {{ item.flat }}
      </template>

      <template #item.phone="{ item }">
        <a :href="'tel:' + item.phone">{{ item.phone }}</a>
      </template>

      <template #item.dopServ="{ item }">
        <v-icon v-if="item.dopServ" @click="openDopServDialog(item)">
          mdi-file
        </v-icon>
        <span v-else>Не заявлено доп.услуг</span>
      </template>

      <template #item.payment_rest="{ item }">
        {{ item.total }}
        <!-- {{ item.total - item.avans }} -->
      </template>

      <template
        #item.actions="{ item }"
        v-if="getUser.roles[0] !== 'shop_manager'"
      >
        <router-link tag="a" :to="'/edit_order/' + item.id" class="bigger-on-mobile">
          <v-icon small class="mr-2"> mdi-pencil </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>

      <template #no-data>
        <v-btn color="primary" @click="searchByColumn('reset')">
          сбросить
        </v-btn>
      </template>
    </v-data-table>


    

      <v-snackbar :value="userAlert" @input="userAlert = false">
       <span v-if="messages">Пользователь: {{messages.user_id}} просматривает заказы</span>

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="userAlert = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>



  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

Pusher.logToConsole = true;
var pusher = new Pusher('0cecb9eb64fb72e940ee', {
      cluster: 'us2'
});

var channel = pusher.subscribe('door-update');


export default {
  props: {
    filterTag: {
      type: String,
    },
    selectFilterTag: {
      type: Function,
    },
  },

  data() {
    return {
      userAlert: false,
      messages: null,
      date_start: null,
      menu: false,
      filteredItems: [],
      now: new Date(),
      dialog: false,
      dialogDopServ: false,
      chosenItem: {},
      dialogDelete: false,
      addServiceDialog: false,
      addBrigadaDialog: false,
      addServiceSlotName: "",
      doMont: "",
      deliting: "",
      cities: ["Все", "Санкт-Петербург", "Москва"],
      payments_metod_list: [
        "Наличными",
        "Терминал",
        "Оплата по безналичному расчету",
      ],
      city: "",
      adminHeaders: [
        { text: "Ред.", value: "actions", sortable: false },
        { text: "№", value: "id" },
        { text: "Дата продажи", value: "date" },
        { text: "Адрес", value: "adress" },
        { text: "Телефон", value: "phone" },
        { text: "ФИО", value: "fio" },
        { text: "Модель двери", value: "door_model" },
        { text: "Размер/Сторона", value: "door_size" },
        { text: "Проем", value: "proem_size" },
        { text: "Дата замера", value: "data_zamera" },
        { text: "Замерщик", value: "zamershik.name" },
        { text: "Дата монтажа", value: "date_mont" },
        { text: "Бригада", value: "brigada_mont.name" },
        { text: "Цена диллера", value: "cost_diler" },
        { text: "Примечание продавца", value: "prim_saler" },
        { text: "Примечание Руководителя", value: "prim_rukvod" },
        { text: "Продавец", sortable: true, value: "saler.name" },
        { text: "Торговая точка", sortable: true, value: "tochka" },
        { text: "Дополнительные услуги", value: "dopServ" },
        { text: "Остаток платежа", value: "payment_rest" },
        { text: "Тип оплаты", value: "payments_metod" }
        // { text: "Сумма премии", value: "sum_premia" },
        // { text: "Премия ВДЗ", value: "vdz_premia" },
      ],
      zamershikHeaders: [
        { text: "Ред.", value: "actions", sortable: false },
        { text: "№", value: "id" },
        { text: "Дата продажи", value: "date" },
        { text: "Адрес", value: "adress" },
        { text: "Телефон", value: "phone" },
        { text: "ФИО", value: "fio" },
        { text: "Модель двери", value: "door_model" },
        { text: "Размер/Сторона", value: "door_size" },
        { text: "Проем", value: "proem_size" },
        { text: "Дата замера", value: "data_zamera" },
        { text: "Замерщик", value: "zamershik.name" },
        { text: "Цена диллера", value: "cost_diler" },
        { text: "Примечание продавца", value: "prim_saler" },
        { text: "Примечание Руководителя", value: "prim_rukvod" },
        { text: "Продавец", sortable: true, value: "saler.name" },
        { text: "Дополнительные услуги", value: "dopServ" },
        { text: "Остаток платежа", value: "payment_rest" },
        // { text: "Сумма премии", value: "sum_premia" },
        // { text: "Премия ВДЗ", value: "vdz_premia" },
      ],
      salesHeaders: [
        { text: "Ред.", value: "actions", sortable: false },
        { text: "№", value: "id" },
        { text: "Дата продажи", value: "date" },
        { text: "Адрес", value: "adress" },
        { text: "Телефон", value: "phone" },
        { text: "ФИО", value: "fio" },
        { text: "Модель двери", value: "door_model" },
        { text: "Размер/Сторона", value: "door_size" },
        { text: "Проем", value: "proem_size" },
        { text: "Дата замера", value: "data_zamera" },
        { text: "Замерщик", value: "zamershik.name" },
        { text: "Примечание продавца", value: "prim_saler" },
        { text: "Примечание Руководителя", value: "prim_rukvod" },
        // { text: "Дополнительные услуги", value: "dopServ" },
        // { text: "Остаток платежа", value: "payment_rest" },
        // { text: "Сумма премии", value: "sum_premia" },
        // { text: "Премия ВДЗ", value: "vdz_premia" },
      ],
      editedIndex: -1,
      team: "",
      date_mont: null,
      data_zamera: null,
      zamershik: null,
      items: [],
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
      payments_metod: null,
      statuses: [
        { title: "Ожидает", value: "pending" },
        { title: "Ожидает монтаж", value: "waitmontazh" },
        { title: "Отменен", value: "cancelled" },
        { title: "Замер", value: "zamer" },
        { title: "Индивидуальный", value: "individual" },
        { title: "Выполнен", value: "completed" },
      ],
      statusesSaler: [
        { title: "Ожидает", value: "pending" },
        { title: "Отменен", value: "cancelled" },
      ],
      json_data: null,
      json_fields: null,
    };
  },

  computed: {
    ...mapGetters({
      sales: "zakaz/GET_SALES",
      getUser: "auth/getUser",
      teams: "zakaz/GET_TEAMS",
      zamershiki: "zakaz/GET_ZAMERSHIKI",
      GET_CHOSEN_ZAKAZ: "zakaz/GET_CHOSEN_ZAKAZ",
      loading: "zakaz/GET_LOADING",
    }),

    headers() {
      const role = this.getUser.roles[0];

      if (role === "administrator") return this.adminHeaders;
      else if (role === "zamershik") return this.zamershikHeaders;
      else if (role === "shop_manager") return this.salesHeaders;
    },

    statusesOnRole() {
      const role = this.getUser.roles[0];
      return role === "administrator" ? this.statuses : this.statusesSaler;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  methods: {
    ...mapMutations({
      SET_CHOSEN_ZAKAZ: "zakaz/SET_CHOSEN_ZAKAZ",
    }),

    ...mapActions({
      fetchSales: "zakaz/LOAD_SALES",
      EDIT_ZAKAZ: "zakaz/EDIT_ZAKAZ",
      DELETE_SALE: "zakaz/DELETE_SALE",
    }),

    itemsOnRole() {
      if (this.getUser.roles[0] === "zamershik") {
        this.filteredItems = this.sales.filter(({ status }) => {
          return status === "zamer";
        });
      } else {
        this.filteredItems = [...this.sales];
      }
    },

    cancel() {},
    open() {},
    close() {},

    filterCategory(category) {
      switch (category) {
        case "Все":
          this.items = [...this.filteredItems];
          break;
        case "Заявки за сегодня":
          this.items = this.filteredItems.filter((el) => {
            return el.data_zamera === moment().format("DD/MM/YYYY");
          });
          break;
        case "Необработанные заявки":
          console.log("Необработанные заявки");
          break;
        case "Передано замерщику":
          this.items = this.filteredItems.filter((el) => {
            return el.zamershik.name;
          });
          break;
        case "Монтаж завтра":
          this.items = this.filteredItems.filter(
            (el) => el.date_mont === moment().add(1, "d").format("DD/MM/YYYY")
          );
          break;
        case "Монтаж сегодня":
          this.items = this.filteredItems.filter(
            (el) => el.date_mont === moment().format("DD/MM/YYYY")
          );
          break;
        case "Ожидают монтаж":
          this.items = this.filteredItems.filter((el) => !el.date_mont);
          break;
        case "Возврат дилеру":
          console.log("Возврат дилеру");
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
          this.items = [...this.filteredItems];
          break;
      }
    },

    openDopServDialog(item) {
      this.dialogDopServ = true;
      this.chosenItem = item;
    },

    saveDataZamera(item) {
      const data_zamera = moment(this.data_zamera).format("DD/MM/YYYY");
      const vremya_zamera = moment(this.data_zamera).format("HH:mm");

      this.EDIT_ZAKAZ({
        ...item,
        data_zamera,
        vremya_zamera,
      }).then(() => {
        this.data_zamera = null;
        this.fetchSales();
      });
    },

    saveDateMontaz(item) {
      console.log(item);
      const date_mont = moment(this.date_mont).format("DD/MM/YYYY");
      const time_mont = moment(this.date_mont).format("HH:mm");

      this.EDIT_ZAKAZ({
        ...item,
        date_mont,
        time_mont,
      }).then(() => {
        this.date_mont = null;
        this.fetchSales();
      });
    },

    saveZamershik(item) {
      this.EDIT_ZAKAZ({
        ...item,
        zamershik: this.zamershik,
      }).then(() => {
        this.zamershik = null;
        this.fetchSales();
      });
    },

    saveBrigadaMont(item) {
      this.EDIT_ZAKAZ({
        ...item,
        team: this.team,
      }).then(() => {
        this.team = null;
        this.fetchSales();
      });
    },

    saveZakazStatus(item) {
      this.EDIT_ZAKAZ({
        ...item,
        status: this.status,
      }).then(() => {
        this.status = null;
        this.fetchSales();
      });
    },

    saveZakazPayment(item){
      this.EDIT_ZAKAZ({
        ...item,
        payments_metod: this.payments_metod,
      }).then(() => {
        this.payments_metod = null;
        this.fetchSales();
      });
    },

    filterByCity() {
      if (this.city === "Все") {
        this.items = [...this.filteredItems];
      } else {
        this.items = this.filteredItems.filter((i) => {
          return !this.city || i.city === this.city;
        });
      }
    },
    filterByDate(){
      this.$refs.menu.save(this.date_start)

      this.items = this.filteredItems.filter((item) => item.date <= 
        this.date_start[1] && 
        item.date >= this.date_start[0]
      ) 

    },

    searchByColumn(headerValue) {
      this.columnSearchQueries[headerValue] = event.target.value;

      if (headerValue === "reset") {
        for (const objProp in this.columnSearchQueries) {
          this.columnSearchQueries[objProp] = "";
        }

        this.selectFilterTag("");

        this.items = [...this.filteredItems];
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
        // let copyDoors = this.sales.map((el) => searchStr(el));
        this.items = this.filteredItems.filter((el) => {
          const comparedStr = searchStr(el) || false;
          return (
            comparedStr &&
            // comparedStr != null &&
            // searchVal != null &&
            toCommonCaseStr(comparedStr).includes(toCommonCaseStr(searchVal))
          );
        });
      } else this.items = [...this.filteredItems];
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
      this.DELETE_SALE(this.deliting);
      this.dialogDelete = false;
      this.deliting = "";
    },
  },

  mounted() {
    this.itemsOnRole();
    this.fetchSales();

    let vm = this

    


    //добавление заказа
    channel.bind('createOrder', function(data) {
    // app.messages.push(JSON.stringify(data));
      vm.fetchSales();
      // console.log('ASDASDASDASDASDASDASDASD')
    });

    //изменение заказа
    channel.bind('updateOrder', function(data) {
    // app.messages.push(JSON.stringify(data));
      vm.fetchSales();
      // console.log('ASDASDASDASDASDASDASDASD')
    });

    //просмотр заказа
    channel.bind('viewOrder', function(data) {
      vm.userAlert = true;
     vm.messages = data;
    });




  },

  filters: {
    dateWithoutYear(date) {
      return date.split("/").slice(0, 2).join("/");
    },
  },

  watch: {
    sales(newVal) {
      if (this.filterTag) {
        this.filterCategory(this.filterTag);
      } else {
        this.itemsOnRole();
        this.items = [...this.filteredItems];
      }

      this.json_fields = {
        Адрес: "adress",
        Телефон: "phone",
        ФИО: "fio",
        "Модель двери": "door_model",
        "Размер/Сторона": "door_size",
        Проем: "proem_size",
        "Дата замера": "data_zamera",
        Замерщик: "zamershik.name",
        "Дата монтажа": "date_mont",
        Бригада: "brigada_mont.name",
        "Цена диллера": "cost_diler",
        "Примечание продавца": "prim_saler",
        "Примечание Руководителя": "prim_rukvod",
        "Дата продажи": "date",
        Продавец: "saler.name",
        "Доп. услуги": {
          field: "dopServ",
          callback: (value) => {
            if (value) {
              return value.map((item) => item.name).join(",\n");
            } else return "Не заявлено доп.услуг";
          },
        },
        "Остаток платежа": "total",
        "Сумма премии": "sum_premia",
        "Премия ВДЗ": "vdz_premia",
      };

      this.json_data = [...newVal];
    },

    filterTag: {
      handler(newVal) {
        this.filterCategory(newVal);
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