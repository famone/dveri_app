<template>
  <section>
    <!-- <pre>{{EditingOrder}}</pre> -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-btn depressed color="primary" @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
            Назад</v-btn
          >
          <h2>Редактирование заказа № {{ routeId }}</h2>
        </div>
      </div>

      <div class="row shad-box">
        <div class="col-lg-12">
          <h3>
            <span class="mdi mdi-account-multiple-outline"></span>
            Персональная информация:
          </h3>
        </div>
        <div class="col-lg-6">
          <v-text-field label="ФИО" v-model="EditingOrder.fio"></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Телефон"
            v-model="EditingOrder.phone"
            v-mask="'+7 (###) ###-##-##'"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Дополнительный телефон"
            v-model="EditingOrder.dop_phone"
            v-mask="'+7 (###) ###-##-##'"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Улица"
            :value="EditingOrder.adress"
            id="suggest1"
          ></v-text-field>
        </div>
        <div class="col-lg-1">
          <v-text-field
            label="Номер дома"
            v-model="EditingOrder.house"
          ></v-text-field>
        </div>

        <!--  -->
        <div class="col-lg-1">
          <v-text-field
            label="Корпус"
            v-model="EditingOrder.korpus"
          ></v-text-field>
        </div>
        <!--  -->

        <div class="col-lg-2">
          <v-text-field
            label="Квартира"
            v-model="EditingOrder.flat"
          ></v-text-field>
        </div>

        <div class="col-lg-2">
          <v-text-field
            label="Этаж"
            v-model="EditingOrder.floor"
          ></v-text-field>
        </div>

        <div class="col-lg-3">
          <p>
            Часть города:
            <span
              class="uncheck"
              v-if="EditingOrder.part_city"
              @click="EditingOrder.part_city = ''"
            >
              <strong>✕</strong>
              Очистить
            </span>
          </p>
          <v-radio-group v-model="EditingOrder.part_city" row>
            <v-radio label="Север" value="Север"></v-radio>
            <v-radio label="Юг" value="Юг"></v-radio>
          </v-radio-group>
        </div>
      </div>

      <!--  -->

      <div class="row shad-box">
        <div class="col-lg-12">
          <h3>
            <span class="mdi mdi-cart-outline"></span> Информация о товаре:
          </h3>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="doorsCategory"
            v-model="EditingOrder.category_saler"
            item-text="name"
            label="Группа двери продавца"
            @change="changeDoorCategory"
            return-object
            clearable
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="doorsModels"
            v-model="EditingOrder.model_saler"
            item-text="name"
            @change="changeModelSaler"
            return-object
            label="Модель двери продавца"
            clearable
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="doorsCategory"
            v-model="EditingOrder.category_ruk"
            item-text="name"
            label="Группа двери руководителя"
            @change="changeCategoryRuk"
            return-object
            clearable
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="modelsRuk"
            item-text="name"
            return-object
            label="Модель двери руководителя"
            v-model="EditingOrder.model_ruk"
            clearable
          ></v-select>
        </div>

        <div class="col-lg-3">
          <v-select
            :items="doorSizes"
            v-model="EditingOrder.door_size"
            label="Размер двери"
            clearable
          ></v-select>
          <!-- item-text="size"
              @change="showPrice"
              return-object -->
        </div>
        <div class="col-lg-3">
          <p>
            Сторона открывания:
            <span
              class="uncheck"
              v-if="EditingOrder.door_direction"
              @click="EditingOrder.door_direction = ''"
            >
              <strong>✕</strong>
              Очистить
            </span>
          </p>
          <v-radio-group v-model="EditingOrder.door_direction" row>
            <v-radio label="Лево" value="Лево"></v-radio>
            <v-radio label="Право" value="Право"></v-radio>
          </v-radio-group>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Размер проема"
            v-model="EditingOrder.proem_size"
          ></v-text-field>
        </div>

        <div class="col-lg-3">
          <v-text-field
            label="Номер двери"
            v-model="EditingOrder.door_number"
          ></v-text-field>
        </div>

        <div class="col-lg-6">
          <v-textarea
            label="Примечание продавца:"
            rows="1"
            prepend-icon="mdi-comment"
            v-model="EditingOrder.prim_saler"
          >
          </v-textarea>
        </div>
        <div class="col-lg-6">
          <v-textarea
            label="Примечание руководителя:"
            rows="1"
            prepend-icon="mdi-comment"
            v-model="EditingOrder.prim_rukvod"
          >
          </v-textarea>
        </div>
      </div>

      <div class="row shad-box">
        <div class="col-lg-12">
          <h2>
            <span class="mdi mdi-bookmark-plus-outline"></span> Дополнительные
            работы:
          </h2>
        </div>
        <div class="col-lg-12">
          <div
            class="row repeater"
            v-for="(dop, index) in EditingOrder.dopServ"
            :key="index"
          >
            <div class="col-lg-12">
              <div class="col-lg-4">
                <v-combobox
                  :items="dopServArray"
                  :label="dop.type"
                  item-text="name"
                  item-value="name"
                  :value="dop.name"
                  @change="atInput('dopServ', index, 'name', $event)"
                  @click:clear="clearDopServ('dopServ', index)"
                  clearable
                ></v-combobox>
              </div>
              <div class="col-lg-2">
                <v-text-field
                  type="number"
                  label="Количество"
                  :value="dop.count"
                  @change="atInput('dopServ', index, 'count', $event)"
                  clearable
                ></v-text-field>
              </div>
              <div class="col-lg-3">
                <v-text-field
                  label="Стоимость руб."
                  :value="dop.price"
                  @change="atInput('dopServ', index, 'price', $event)"
                  clearable
                ></v-text-field>
              </div>
              <div class="col-lg-2">
                <v-btn
                  depressed
                  color="error"
                  class="m-15"
                  @click="deliteDop('dopServ', index)"
                >
                  <v-icon left>mdi-delete</v-icon>Удалить</v-btn
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <v-btn
            depressed
            color="primary"
            @click="addDop('dopServ', 'Услуга')"
            class="mr-4"
          >
            <v-icon left>mdi-cart-plus</v-icon>
            Добавить
          </v-btn>
        </div>
        <div class="col-lg-6">
          <h4 v-if="EditingOrder">Итого доп. работ: {{ getTotalDop }}</h4>
        </div>

        <!-- <v-btn
            depressed
            color="secondary"
            @click="addDop('dopServ', 'Доп услуга')"
          >
            <v-icon left>mdi-plus</v-icon>Добавить другое
          </v-btn> -->
      </div>

      <div class="row shad-box" v-if="getUser.id !== 6">
        <div class="col-lg-12">
          <h2>
            <span class="mdi mdi-bookmark-plus-outline"></span> Замер и монтаж:
          </h2>
        </div>

        <div class="col-lg-3">
          <!-- data_zamera -->
          <!-- vremya_zamera -->
          <!-- Желаемая дата замера -->
          <v-datetime-picker
            label="Желаемая дата замера"
            :value="zamerDateTime"
            @input="changeDateTime('data_zamera', 'vremya_zamera', $event)"
            :datetime="zamerDateTime"
            dateFormat="dd.MM.yyyy"
            timeFormat="HH:mm:ss"
            clearText="отмена"
            okText="выбрать"
            :timePickerProps="{
              format: '24hr',
              'use-seconds': true,
            }"
          >
            <template #dateIcon>
              <v-icon> mdi-calendar </v-icon>
            </template>
            <template #timeIcon>
              <v-icon> mdi-clock </v-icon>
            </template>
          </v-datetime-picker>
        </div>
        <div class="col-lg-3">
          <v-select
            label="Замерщик"
            :items="zamershiks"
            v-model="EditingOrder.zamershik"
            item-text="name"
            return-object
            clearable
          ></v-select>
        </div>

        <div class="col-lg-3" v-if="getUser.roles[0] !== 'zamershik'">
          <v-datetime-picker
            label="Выберите дату монтажа"
            :value="montDateTime"
            @input="changeDateTime('date_mont', 'time_mont', $event)"
            :datetime="montDateTime"
            dateFormat="dd.MM.yyyy"
            timeFormat="HH:mm:ss"
            clearText="отмена"
            okText="выбрать"
            :timePickerProps="{
              format: '24hr',
              'use-seconds': true,
            }"
          >
            <template #dateIcon>
              <v-icon> mdi-calendar </v-icon>
            </template>
            <template #timeIcon>
              <v-icon> mdi-clock </v-icon>
            </template>
          </v-datetime-picker>
        </div>

        <div class="col-lg-3" v-if="getUser.roles[0] !== 'zamershik'">
          <v-select
            :items="teams"
            label="Бригада"
            v-model="EditingOrder.team"
            item-text="title"
            item-value="id"
            clearable
          ></v-select>
        </div>
      </div>

      <div class="row shad-box" v-if="getUser.id !== 6">
        <div class="col-lg-12">
          <h2><span class="mdi mdi-sale"></span> Итого:</h2>
        </div>

        <div class="col-lg-3">
          <v-select
            :items="payments_metod"
            v-model="EditingOrder.payments_metod"
            label="Тип расчета"
            clearable
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Цена продавца со скидкой"
            v-model.number="EditingOrder.cost_saler"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Цена двери руководителя"
            v-model.number="EditingOrder.cost_diler"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Стоимость замера, доставки и установки"
            v-model.number="EditingOrder.cost_zdi"
          ></v-text-field>
        </div>

        <div class="col-lg-2">
          <v-text-field
            label="Предоплата"
            v-model.number="EditingOrder.avans"
          ></v-text-field>
        </div>

        <div class="col-lg-2">
          <v-text-field
            label="Скидка"
            v-model.number="EditingOrder.discount"
          ></v-text-field>
        </div>
        <!-- TODO поситать -->
        <div class="col-lg-2">
          <v-text-field label="Итого" v-model="totalSum"></v-text-field>
        </div>
        <!-- <div class="col-lg-2">
            <v-text-field
              label="Остаток"
              v-model="EditingOrder."
            ></v-text-field>
          </div> -->
      </div>

      <div class="row shad-box" v-if="getUser.id !== 6">
        <div class="col-lg-3">
          <div class="col-lg-12">
            <h2><span class="mdi mdi-bookmark-outline"></span> Заявка:</h2>
          </div>
          <div class="col-lg-12">
            <v-select
              :items="statuses"
              v-model="EditingOrder.status"
              item-text="title"
              item-value="value"
              label="Статус заявки"
              clearable
            ></v-select>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="col-lg-12">
            <h2><span class="mdi mdi-sale"></span> Премия:</h2>
          </div>
          <div class="col-lg-4">
            <v-text-field
              label="Сумма премии"
              v-model="EditingOrder.sum_premia"
            ></v-text-field>
          </div>
          <div class="col-lg-4">
            <v-select
              :items="status_premii"
              label="Статус премии"
              v-model="EditingOrder.status_premia"
              clearable
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="row">
          <v-btn
            depressed
            x-large
            dark
            color="grey"
            class="m-15"
            @click="$router.go(-1)"
          >
            НАЗАД
          </v-btn>
          <v-btn
            depressed
            x-large
            color="primary"
            class="m-15"
            :loading="loadBtn"
            @click="updateOrder"
          >
            Обновить ЗАКАЗ
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

import axios from "axios";

export default {
  name: "EditOrder",

  data() {
    return {
      sales: [],
      loadBtn: false,
      routeId: "",
      menu: false,
      menu2: false,
      statuses: [
        { title: "Ожидает", value: "pending" },
        { title: "Ожидает монтаж", value: "waitmontazh" },
        { title: "Отменен", value: "cancelled" },
        { title: "Замер", value: "zamer" },
        { title: "Индивидуальный", value: "individual" },
        { title: "Выполнен", value: "completed" },
      ],
      payments_metod: [
        "Наличными",
        "Терминал",
        "Оплата по безналичному расчету",
      ],
      EditingOrder: {},
      doorsModels: [],
      selectedModel: {},
      doorSizes: ["78", "80", "85", "86", "88", "90", "96", "98", "99", "105"],
      doorSize: "",
      modelsRuk: [],
      spayments_metod: "",
      dopServArray: [],

      predoplata: "",
      doorPrice: "",
      sale: "",
      status_zayavka: "",
      sum_premii: "",
      status_premii: "",
      status_premii: ["Выплачена", "Ожидается", "Ожидается выплата", "Отмена"],
    };
  },

  computed: {
    ...mapGetters({
      GET_SALES: "zakaz/GET_SALES",
      teams: "zakaz/GET_TEAMS",
      getUser: "auth/getUser",
      GET_ZAMERSHIKI: "zakaz/GET_ZAMERSHIKI",
      doorsCategory: "zakaz/GET_DOOR_CATEGORIES",
    }),

    montDateTime() {
      return `${moment(this.EditingOrder.date_mont).format("DD.MM.YYYY")} ${
        this.EditingOrder.time_mont
      }`;
    },
    
    zamerDateTime() {
      
      return `${moment(this.EditingOrder.data_zamera).format("DD.MM.YYYY")} ${
        this.EditingOrder.vremya_zamera
      }`;
    },

    getTotalDop() {
      if (this.EditingOrder.dopServ) {
        let prices = [];
        let total = 0;

        this.EditingOrder.dopServ.forEach((item) => {
          if (item.service) {
            prices.push(item.price);
          } else {
            let single = item.price * item.count;
            prices.push(single);
          }
        });

        prices.forEach((item) => {
          total += parseInt(item);
        });
        this.EditingOrder.cost_zdi = total;

        return total;
      }
    },

    zamershiks() {
      return this.GET_ZAMERSHIKI.map((el) => {
        return { ...el, name: el.fname, fname: el.name };
      });
    },

    totalSum() {
      const { cost_saler, cost_diler, cost_zdi, discount, avans } =
        this.EditingOrder;

      return (
        (cost_diler ? cost_diler : cost_saler) + cost_zdi - discount - avans
      );
    },
  },

  methods: {
    ...mapActions({
      LOAD_SALES: "zakaz/LOAD_SALES",
    }),

    changeDateTime(dateType, timeType, newVal) {
      const dateTimeArr = moment(newVal)
        .format("YYYY-MM-DD HH:mm:ss")
        .split(" ");

      this.EditingOrder[dateType] = dateTimeArr[0];
      this.EditingOrder[timeType] = dateTimeArr[1];
    },

    yaMapInit2() {
      var suggestView1 = new ymaps.SuggestView("suggest1", {
        provider: {
          suggest: function (request, options) {
            return ymaps.suggest("Россия" + ", " + request);
          },
        },
      });

      suggestView1.events.add("select", (e) => {
        // select event
        this.EditingOrder.adress = e.get("item").value;

        let porez1 = this.EditingOrder.adress.replace("Россия,", "");
        this.EditingOrder.adress = porez1;

        if (this.EditingOrder.adress.includes("Санкт-Петербург,")) {
          let porez2 = this.EditingOrder.adress.replace("Санкт-Петербург,", "");
          this.EditingOrder.adress = porez2;
        } else {
          let porez3 = this.EditingOrder.adress.replace("Москва,", "");
          this.EditingOrder.adress = porez3;
        }
      });
    },

    addDop(type, category) {
      if (!this.EditingOrder[type]) {
        this.EditingOrder[type] = [];
      }
      this.EditingOrder[type].push({
        name: "",
        count: 1,
        price: 0,
        type: category,
      });
    },

    deliteDop(type, index) {
      this.EditingOrder[type].splice(index, 1);
    },

    atInput(type, index, fieldName, event) {
      if (typeof event === "object" && event !== null) {
        this.EditingOrder[type][index].service = event;
        this.EditingOrder[type][index].name = event.name;
        this.EditingOrder[type][index].count = 1;
        this.EditingOrder[type][index].price =
          event.price * this.EditingOrder[type][index].count;
      } else {
        this.EditingOrder[type][index][fieldName] = event;
        if (fieldName === "count") {
          this.EditingOrder[type][index].price =
            this.EditingOrder[type][index].service.price *
            this.EditingOrder[type][index].count;
        }
      }
    },

    clearDopServ(type, index) {
      this.EditingOrder[type][index].service = null;
      this.EditingOrder[type][index].name = null;
      this.EditingOrder[type][index].count = 1;
      this.EditingOrder[type][index].price = 0;
    },

    changeDoorCategory(param) {
      this.EditingOrder.category_saler = param;

      //получение доп услуг по производителю двери
      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param.term_id}`
        )
        .then((response) => {
          this.doorsModels = response.data;
          // const chosenDoor = this.doorsModels.find((door) => {
          //   return door.name === this.EditingOrder.model_saler.name;
          // });

          // const chosenDoorSizes = chosenDoor.price;

          // for (const key in chosenDoorSizes) {
          //   this.doorSizes.push({ size: key, price: chosenDoorSizes[key] });
          // }
        });

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/dopserv?proizvoditel=${param.term_id}`
        )
        .then((response) => {
          this.dopServArray = response.data;
        });
    },

    changeCategoryRuk(param) {
      this.EditingOrder.category_ruk = param;

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param.term_id}`
        )
        .then((response) => {
          this.modelsRuk = response.data;
        });
    },

    changeModelSaler(model) {
      this.selectedModel = model;
      // this.doorSizes = Object.keys(model.price);
    },

    // showPrice(num) {
    //   this.doorPrice = this.selectedModel.price[num];
    //   this.doorSize = num;
    //   this.EditingOrder.door_size = num.size;
    // },

    updateOrder() {
      this.loadBtn = true;
      //отправить новый заказ

      const data_zamera = this.EditingOrder.data_zamera
        ? moment(this.EditingOrder.data_zamera).format("YYYY-MM-DD")
        : this.EditingOrder.data_zamera;
      const date_mont = this.EditingOrder.date_mont
        ? moment(this.EditingOrder.date_mont).format("YYYY-MM-DD")
        : this.EditingOrder.date_mont;

      const reqestBody = {
        ...this.EditingOrder,
        total: this.totalSum,
        category_saler: this.EditingOrder.category_saler.term_id,
        model_saler: this.EditingOrder.model_saler.id,
        category_ruk: this.EditingOrder.category_ruk.term_id,
        model_ruk: this.EditingOrder.model_ruk.id,
        data_zamera,
        date_mont,
      };

      axios
        .post(
          "https://door.webink.site/wp-json/door/v1/edit/sales?order_id=" +
            reqestBody.id,
          reqestBody
        )
        .then(() => {
          this.loadBtn = false;
          this.$router.push("/");
        });
    },
  },

  mounted() {
    this.LOAD_SALES();

    this.sales = [...this.GET_SALES];
    // .map((el) => {
    //   const data_zamera = el.data_zamera
    //     ? moment(el.data_zamera, "YYYY-MM-DD").format("YYYY-MM-DD")
    //     : el.data_zamera;
    //   const date_mont = el.date_mont
    //     ? moment(el.date_mont, "YYYY-MM-DD").format("YYYY-MM-DD")
    //     : el.date_mont;

    //   return { ...el, data_zamera, date_mont };
    // });

    axios
      .get("https://door.webink.site/wp-json/door/v1/get/dopserv")
      .then((response) => {
        this.dopServArray = response.data;
      });

    //инициализируем и подключаем карты

    const script = document.createElement("script");

    script.onload = () => {
      ymaps.ready(() => this.yaMapInit2());
    };

    script.id = "ymaps";
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=8c4059db-3b8d-4535-a15e-569ee80fc827&lang=ru_RU";
    document.head.append(script);

    //инициализируем и подключаем карты

    this.routeId = this.$route.params.id;

    this.EditingOrder = this.sales.find((item) => {
      return item.id == this.routeId;
    });

    console.log(
      "this.EditingOrder.date_mont :>> ",
      this.EditingOrder.date_mont
    );

    const category_saler = this.doorsCategory.find((category) => {
      return category.term_id === this.EditingOrder.category_saler.id;
    });

    const category_ruk = this.doorsCategory.find((category) => {
      return category.term_id === this.EditingOrder.category_ruk.id;
    });

    if (category_saler) this.changeDoorCategory(category_saler);
    if (category_ruk) this.changeCategoryRuk(category_ruk);
  },
};
</script>

<style>
.m-15 {
  margin: 15px;
}
</style>