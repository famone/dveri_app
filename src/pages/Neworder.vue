<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-btn depressed color="primary" @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
            Назад</v-btn
          >
          <h2>Создание заказа</h2>
        </div>
      </div>

      <div class="row shad-box">
        <div class="col-lg-12">
          <h3>
            <span style="color: red">*</span
            ><span class="mdi mdi-account-multiple-outline"></span>Персональная
            информация:
          </h3>
        </div>
        <div class="col-lg-6">
          <v-text-field label="ФИО" v-model="zakaz.fio"></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Телефон"
            v-model="zakaz.phone"
            v-mask="'+7 (###) ###-##-##'"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Дополнительный телефон"
            v-model="zakaz.dop_phone"
            v-mask="'+7 (###) ###-##-##'"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Улица"
            v-model="zakaz.street"
            id="suggest"
          ></v-text-field>
        </div>
        <div class="col-lg-2">
          <v-text-field label="Номер дома" v-model="zakaz.house"></v-text-field>
        </div>
        <div class="col-lg-1">
          <v-text-field label="Корпус" v-model="zakaz.korpus"></v-text-field>
        </div>
        <div class="col-lg-2">
          <v-text-field label="Квартира" v-model="zakaz.flat"></v-text-field>
        </div>
        <!--  -->
        <div class="col-lg-1">
          <v-text-field label="Этаж" v-model="zakaz.floor"></v-text-field>
        </div>

        <div class="col-lg-3">
          <p>Часть города:</p>
          <v-radio-group v-model="zakaz.part_city" row>
            <v-radio label="Север" value="Север"></v-radio>
            <v-radio label="Юг" value="Юг"></v-radio>
          </v-radio-group>
        </div>
      </div>

      <div class="row shad-box">
        <div class="col-lg-12">
          <h3>
            <span class="mdi mdi-cart-outline"></span> Информация о товаре:
          </h3>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="doorsCategory"
            item-text="name"
            label="Группа двери продавца"
            @change="changeDoorCategory"
            return-object
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            :items="doorsModels"
            item-text="name"
            @change="changeDoorModel"
            return-object
            label="Модель двери продавца"
          ></v-select>
        </div>
        <div class="col-lg-3" v-if="getUser.roles[0] !== 'shop_manager'">
          <v-select
            :items="doorsCategory"
            item-text="name"
            label="Группа двери руководителя"
            return-object
            @change="changeModelRuk"
          ></v-select>
        </div>
        <div class="col-lg-3" v-if="getUser.roles[0] !== 'shop_manager'">
          <v-select
            :items="modelsRuk"
            item-text="name"
            item-value="id"
            label="Модель двери руководителя"
            v-model="zakaz.model_ruk"
          ></v-select>
        </div>
        <!--  -->

        <div class="col-lg-3">
          <v-select
            :items="doorSizes"
            label="Размер двери"
            @change="showPrice"
            return-object
          ></v-select>
        </div>
        <div class="col-lg-3">
          <p>Сторона открывания:</p>
          <v-radio-group v-model="zakaz.door_direction" row>
            <v-radio label="Лево" value="Лево"></v-radio>
            <v-radio label="Право" value="Право"></v-radio>
          </v-radio-group>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Размер проема"
            v-model="zakaz.proem_size"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Номер двери"
            v-model="zakaz.door_number"
          ></v-text-field>
        </div>

        <div class="col-lg-6">
          <v-textarea
            label="Примечание продавца:"
            rows="1"
            prepend-icon="mdi-comment"
            v-model="zakaz.prim_saler"
          >
          </v-textarea>
        </div>
        <div class="col-lg-6" v-if="getUser.roles[0] !== 'shop_manager'">
          <v-textarea
            label="Примечание руководителя:"
            rows="1"
            prepend-icon="mdi-comment"
            v-model="zakaz.prim_rukvod"
          >
          </v-textarea>
        </div>
      </div>
      <!--  -->

      <!-- v-if="getUser.roles[0] === 'shop_manager'" -->

      <div class="row shad-box">
        <div class="col-lg-10">
          <h2>
            <span class="mdi mdi-bookmark-plus-outline"></span>
            Дополнительные работы:
          </h2>
        </div>
        <div class="col-lg-2">
          <v-checkbox v-model="noZamer" label="Без замера"></v-checkbox>
        </div>
        <div class="col-lg-12">
          <div
            class="row repeater"
            v-for="(dop, index) in zakaz.dopServ"
            :key="index"
          >
            <div v-if="dop.type === 'Услуга'" class="col-lg-12">
              <div class="col-lg-4">
                <v-combobox
                  :items="dopServArray"
                  :label="dop.type"
                  item-text="name"
                  item-value="name"
                  @change="atInput('dopServ', index, 'name', $event)"
                >
                </v-combobox>
              </div>
              <div class="col-lg-2">
                <v-text-field
                  type="number"
                  label="Количество"
                  @change="atInput('dopServ', index, 'count', $event)"
                ></v-text-field>
              </div>
              <div class="col-lg-3">
                <v-text-field
                  label="Стоимость руб."
                  @change="atInput('dopServ', index, 'price', $event)"
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

              <div class="col-lg-11 pa-0"></div>
            </div>
            <!-- <div v-else class="col-lg-12">
              <div class="col-lg-4">
                <v-text-field v-model="zakaz.dop.additionalName" label="Услуга">
                </v-text-field>
              </div>
              <div class="col-lg-2">
                <v-text-field
                  type="number"
                  v-model="zakaz.dop.additionalCount"
                  label="Количество"
                >
                </v-text-field>
              </div>
              <div class="col-lg-3">
                <v-text-field
                  v-model="zakaz.dop.additionalPrice"
                  label="Стоимость руб."
                >
                </v-text-field>
              </div>
              <div class="col-lg-2">
                <v-btn
                  depressed
                  color="error"
                  class="m-15"
                  @click="deliteDop('dopolnServ', index)"
                >
                  <v-icon left>mdi-delete</v-icon>Удалить</v-btn
                >
              </div>
            </div> -->
          </div>
        </div>

        <v-btn
          v-if="noZamer"
          depressed
          color="primary"
          @click="addDop('dopServ', 'Услуга')"
          class="mr-4"
        >
          <v-icon left>mdi-cart-plus</v-icon>Добавить
        </v-btn>
        <!-- <v-btn
          depressed
          color="secondary"
          @click="addDop('dopolnServ', 'Услуга')"
        >
          <v-icon left>mdi-plus</v-icon>Добавить другое
        </v-btn> -->
      </div>

      <!--  -->

      <div class="row shad-box" v-show="bossAdditionalWorksCard">
        <div class="col-lg-12">
          <h2>
            <span class="mdi mdi-bookmark-plus-outline"></span> Дополнительные
            работы руководителя:
          </h2>
        </div>
        <div class="col-lg-12">
          <div
            class="row repeater"
            v-for="(bossDop, index) in zakaz.bossDop"
            :key="index"
          >
            <div class="col-lg-4">
              <v-combobox
                :items="dopServArray"
                :label="bossDop.type"
                item-text="name"
                item-value="name"
                @change="atInput('bossDop', index, 'name', $event)"
              >
              </v-combobox>
            </div>
            <div class="col-lg-2">
              <v-text-field
                type="number"
                label="Количество"
                @change="atInput('bossDop', index, 'count', $event)"
              ></v-text-field>
            </div>
            <div class="col-lg-3">
              <v-text-field
                label="Стоимость руб."
                @change="atInput('bossDop', index, 'price', $event)"
              ></v-text-field>
            </div>
            <div class="col-lg-2">
              <v-btn
                depressed
                color="error"
                class="m-15"
                @click="deliteDop('bossDop', index)"
              >
                <v-icon left>mdi-delete</v-icon>Удалить</v-btn
              >
            </div>
          </div>
          <v-btn
            depressed
            color="primary"
            @click="addDop('bossDop', 'Доп услуга')"
            class="mt-7"
          >
            <v-icon left>mdi-cart-plus</v-icon>Добавить
          </v-btn>
        </div>
      </div>

      <!--  -->

      <div class="row shad-box" v-if="getUser.roles[0] !== 'shop_manager'">
        <div class="col-lg-12">
          <h2>
            <span class="mdi mdi-bookmark-plus-outline"></span> Замер и монтаж:
          </h2>
        </div>

        <div class="col-lg-2">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="zakaz.data_zamera"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="zakaz.data_zamera"
                label="Желаемая дата замера"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="zakaz.data_zamera" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(zakaz.data_zamera)"
                >Ок</v-btn
              >
            </v-date-picker>
          </v-menu>
        </div>

        <div class="col-lg-2">
          <v-menu
            ref="menu3"
            v-model="menu3"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="zakaz.vremya_zamera"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="zakaz.vremya_zamera"
                label="Время замера"
                prepend-icon="mdi-calendar-clock"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="menu3"
              v-model="zakaz.vremya_zamera"
              full-width
              @click:minute="$refs.menu3.save(zakaz.vremya_zamera)"
            ></v-time-picker>
          </v-menu>
        </div>

        <div class="col-lg-2">
          <v-select
            label="Замерщик"
            :items="zamershiks"
            item-text="fname"
            return-object
            v-model="zakaz.zamershik"
          ></v-select>
        </div>

        <div class="col-lg-2">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="zakaz.date_mont"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="zakaz.date_mont"
                label="Желаемая дата монтажа"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="zakaz.date_mont" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Отмена</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(zakaz.date_mont)"
                >Ок</v-btn
              >
            </v-date-picker>
          </v-menu>
        </div>

        <div class="col-lg-2">
          <v-menu
            ref="menu4"
            v-model="menu4"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="zakaz.time_mont"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="zakaz.time_mont"
                label="Время монтажа"
                prepend-icon="mdi-calendar-clock"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="menu4"
              v-model="zakaz.time_mont"
              full-width
              @click:minute="$refs.menu4.save(zakaz.time_mont)"
            ></v-time-picker>
          </v-menu>
        </div>

        <div class="col-lg-2">
          <v-select
            :items="brigadi"
            label="Бригада"
            item-text="title"
            return-object
            v-model="zakaz.team"
          ></v-select>
        </div>
      </div>

      <div class="row shad-box" v-if="getUser.roles[0] !== 'shop_manager'">
        <div class="col-lg-12">
          <h2><span class="mdi mdi-sale"></span> Итого:</h2>
        </div>

        <div class="col-lg-3">
          <v-select
            :items="payments_metod_list"
            v-model="zakaz.payments_metod"
            label="Тип расчета"
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Цена продавца со скидкой"
            v-model="zakaz.prod_sale"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Цена двери руководителя"
            v-model="zakaz.cost_diler"
          ></v-text-field>
        </div>
        <div class="col-lg-3">
          <v-text-field
            label="Стоимость замера, доставки и установки"
            v-model="zakaz.cost_zdi"
          ></v-text-field>
        </div>

        <div class="col-lg-2">
          <v-text-field label="Предоплата" v-model="zakaz.avans"></v-text-field>
        </div>

        <!-- <div class="col-lg-2">
          <v-text-field label="Скидка" v-model="sale"></v-text-field>
        </div> -->
        <div class="col-lg-2">
          <v-text-field label="Итого" v-model="zakaz.doorPrice"></v-text-field>
        </div>
      </div>

      <div class="row shad-box" v-if="getUser.roles[0] !== 'shop_manager'">
        <div class="col-lg-3">
          <div class="col-lg-12">
            <h2><span class="mdi mdi-bookmark-outline"></span> Заявка:</h2>
          </div>
          <div class="col-lg-12">
            <v-select
              :items="statuses"
              item-text="title"
              v-model="zakaz.status"
              label="Статус заявки"
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
              v-model="zakaz.sum_premii"
            ></v-text-field>
          </div>
          <div class="col-lg-4">
            <v-select
              :items="items"
              label="Статус премии"
              v-model="zakaz.status_premii"
            ></v-select>
          </div>
        </div>
      </div>

      <div class="row">
        <v-btn
          depressed
          x-large
          dark
          color="grey"
          class="m-15"
          @click="$router.go(-1)"
          >НАЗАД</v-btn
        >
        <v-btn
          depressed
          x-large
          color="primary"
          class="m-15"
          :loading="loadBtn"
          @click="addNewOrder"
          >ДОБАВИТЬ ЗАКАЗ</v-btn
        >
      </div>
    </div>
  </section>
</template>	

<script>
import axios from "axios";
import { mapState, mapGetters } from "vuex";

export default {
  name: "NewOrder",

  data() {
    return {
      noZamer: false,
      loadBtn: false,
      doorsCategory: [],
      doorsModels: [],
      items: ["Тест 1", "Тест 2", "Тест 3", "Тест 4"],
      sideCity: "",
      menu: false,
      menu3: false,
      menu2: false,
      menu4: false,
      statuses: [
        { title: "Ожидает", value: "pending" },
        { title: "Ожидает монтаж", value: "waitmontazh" },
        { title: "Отменен", value: "cancelled" },
        { title: "Замер", value: "zamer" },
        { title: "Индивидуальный", value: "individual" },
        { title: "Выполнен", value: "completed" },
      ],
      payments_metod_list: [
        "Наличными",
        "Терминал",
        "Оплата по безналичному расчету",
      ],
      dopServArray: [],
      bossDopolnServ: [],
      selectedModel: {},
      doorSizes: [],
      zamershiks: [],
      brigadi: [],
      modelsRuk: [],
      // заказ
      zakaz: {
        fio: "",
        phone: "",
        dop_phone: "",
        street: "",
        house: "",
        korpus: "",
        flat: "",
        floor: "",
        part_city: "",
        category_saler: "",
        model_saler: "",
        door_size: "",
        category_ruk: "",
        model_ruk: "",
        door_direction: null,
        proem_size: null,
        door_number: null,
        prim_saler: "",
        prim_rukvod: "",
        data_zamera: null,
        vremya_zamera: null,
        date_mont: null,
        time_mont: null,
        // dopolnServ: [],
        // bossDopolnServ: [],
        zamershik: "",
        team: "",
        doorPrice: "",
        status: "",
        prod_sale: "",
        cost_diler: "",
        cost_zdi: "",
        avans: "",
        sale: "",
        sum_premii: "",
        status_premii: "",
        payments_metod: "",
        dopServ: [],
        bossDop: [],
      },
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters({
      getUser: "auth/getUser",
    }),

    bossAdditionalWorksCard() {
      if (this.zakaz.category_ruk && this.zakaz.category_saler) {
        if (this.zakaz.category_ruk !== this.zakaz.category_saler) {
          return true;
        } else {
          return false;
        }
      } else if (!this.zakaz.category_ruk) {
        return false;
      } else {
        return false;
      }
    },
  },
  created() {
    // дополнительные услуги
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/dopserv")
      .then((response) => {
        this.dopServArray = response.data;
      });

    // категории дверей
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        this.doorsCategory = response.data;
      });

    // замерщики
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/users?type=zamershik")
      .then((response) => {
        this.zamershiks = response.data;
      });

    // ,бригады
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/teams")
      .then((response) => {
        this.brigadi = response.data;
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
  },
  methods: {
    yaMapInit2() {
      var suggestView1 = new ymaps.SuggestView("suggest", {
        provider: {
          suggest: function (request, options) {
            return ymaps.suggest("Россия" + ", " + request);
          },
        },
      });

      suggestView1.events.add("select", (e) => {
        // select event
        this.street = e.get("item").value;

        let porez1 = this.street.replace("Россия,", "");
        this.street = porez1;

        if (this.street.includes("Санкт-Петербург,")) {
          let porez2 = this.street.replace("Санкт-Петербург,", "");
          this.street = porez2;
        } else {
          let porez3 = this.street.replace("Москва,", "");
          this.street = porez3;
        }
      });
    },
    addDop(type, category) {
      if (category === "Услуга") {
        this.zakaz[type].push({
          name: "",
          count: 1,
          price: 0,
          type: category,
        });
      } else {
        this.zakaz[type].push({
          name: "",
          count: 1,
          price: 0,
          type: category,
        });
      }
    },

    // addOther() {
    //   this.additionalInfo.push({
    //     additionalName: "",
    //     additionalCount: 0,
    //     additionalPrice: 0,
    //   });
    // },

    deliteDop(type, index) {
      this.zakaz[type].splice(index, 1);
    },

    // deliteAddDop(index) {
    //   this.additionalInfo.splice(index, 1);
    // },

    atInput(type, index, fieldName, event) {
      console.log(event);
      this.zakaz[type][index][fieldName] = event;
      // this.zakaz[type][index].count = event.count;
      // this.zakaz[type][index].price = event.price;
    },

    changeDoorCategory(category) {
      this.zakaz.category_saler = category.term_id;

      //получение доп услуг по производителю двери
      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${category.term_id}`
        )
        .then((response) => {
          this.doorsModels = response.data;
        });

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/dopserv?proizvoditel=${category.term_id}`
        )
        .then((response) => {
          this.dopServArray = response.data;
        });
    },

    changeModelRuk(param) {
      console.log(param);
      this.zakaz.category_ruk = param.term_id;

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param.term_id}`
        )
        .then((response) => {
          this.modelsRuk = response.data;
        });
    },

    changeDoorModel(model) {
      console.log(model);
      this.zakaz.model_saler = model.id;
      this.selectedModel = model;
      this.doorSizes = Object.keys(model.price);
    },

    showPrice(num) {
      this.zakaz.doorPrice = this.selectedModel.price[num];
      this.zakaz.door_size = num;
    },

    addNewOrder() {
      this.loadBtn = true;

      //отправить новый заказ
      axios
        .post("https://door.webink.site/wp-json/door/v1/add/sales", {
          ...this.zakaz,
          user_id: this.getUser.id,
        })
        .then((response) => {
          console.log(response);
          this.loadBtn = false;
          this.$router.push("/");
        });
    },
  },
};
</script>

<style>
.v-input--selection-controls {
  margin-top: 5px !important;
}
.m-15 {
  margin: 15px;
}
</style>