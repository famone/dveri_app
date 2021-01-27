<template>
  <section>
    <div class="container">
      <div class="col-lg-12">
        <v-btn depressed color="primary" @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
          Назад</v-btn
        >
        <h2>Редактирование заказа № {{ routeId }}</h2>
      </div>

      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        width="100%"
        type="card"
      >
      </v-skeleton-loader>
      <br /><br />
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        width="100%"
        type="card"
      >
      </v-skeleton-loader>
      <br /><br />
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto"
        width="100%"
        type="card"
      >
      </v-skeleton-loader>

      <div class="row" v-else>
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
              v-model="EditingOrder.adress"
              id="suggest"
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
            <p>Часть города:</p>
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
              @change="changeModel"
              return-object
            ></v-select>
          </div>
          <div class="col-lg-3">
            <v-select
              :items="doorsModels"
              v-model="EditingOrder.model_saler"
              item-text="name"
              @change="changeSize"
              return-object
              label="Модель двери продавца"
            ></v-select>
          </div>
          <div class="col-lg-3">
            <v-select
              :items="doorsCategory"
              v-model="EditingOrder.category_ruk"
              item-text="name"
              label="Группа двери руководителя"
              @change="changeModelRuk"
              return-object
            ></v-select>
          </div>
          <div class="col-lg-3">
            <v-select
              :items="modelsRuk"
              item-text="name"
              item-value="id"
              label="Модель двери руководителя"
              v-model="EditingOrder.model_ruk"
            ></v-select>
          </div>

          <div class="col-lg-3">
            <v-select
              :items="doorSizes"
              v-model="EditingOrder.door_size"
              item-text="size"
              label="Размер двери"
              @change="showPrice"
              return-object
            ></v-select>
          </div>
          <div class="col-lg-3">
            <p>Сторона открывания:</p>
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

        <!--  -->

        <div class="row shad-box" v-if="getUser.id !== 6">
          <div class="col-lg-12">
            <h2>
              <span class="mdi mdi-bookmark-plus-outline"></span> Замер и
              монтаж:
            </h2>
          </div>

          <div class="col-lg-3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="EditingOrder.data_zamera"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="EditingOrder.data_zamera"
                  label="Желаемая дата замера"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="EditingOrder.data_zamera"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Отмена</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(EditingOrder.data_zamera)"
                  >Ок</v-btn
                >
              </v-date-picker>
            </v-menu>
          </div>
          <!-- TODO замерщик не отображается в склккте -->
          <div class="col-lg-3">
            <v-select
              label="Замерщик"
              :items="zamershiks"
              v-model="EditingOrder.zamershik"
              item-text="name"
              item-value="id"
            ></v-select>
          </div>

          <div class="col-lg-3">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="EditingOrder.date_mont"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="EditingOrder.date_mont"
                  label="Желаемая дата монтажа"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="EditingOrder.date_mont"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false"
                  >Отмена</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu2.save(EditingOrder.date_mont)"
                  >Ок</v-btn
                >
              </v-date-picker>
            </v-menu>
          </div>

          <div class="col-lg-3">
            <v-select
              :items="brigadi"
              label="Бригада"
              v-model="EditingOrder.team"
              item-text="title"
              item-value="id"
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
            ></v-select>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Цена продавца со скидкой"
              v-model="EditingOrder.cost_zdi"
            ></v-text-field>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Цена двери руководителя"
              v-model="EditingOrder.cost_diler"
            ></v-text-field>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Стоимость замера, доставки и установки"
              v-model="EditingOrder.total"
            ></v-text-field>
          </div>

          <div class="col-lg-2">
            <v-text-field
              label="Предоплата"
              v-model="EditingOrder.avans"
            ></v-text-field>
          </div>

          <div class="col-lg-2">
            <v-text-field
              label="Скидка"
              v-model="EditingOrder.discount"
            ></v-text-field>
          </div>
          <!-- TODO поситать -->
          <!-- <div class="col-lg-2">
            <v-text-field label="Итого" v-model=""></v-text-field>
          </div> -->
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
                v-model="EditingOrder.sum_premia"
              ></v-text-field>
            </div>
            <div class="col-lg-4">
              <v-select
                :items="status_premii"
                label="Статус премии"
                v-model="EditingOrder.status_premia"
              ></v-select>
            </div>
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
            >НАЗАД</v-btn
          >
          <v-btn
            depressed
            x-large
            color="primary"
            class="m-15"
            :loading="loadBtn"
            @click="updateOrder"
            >Обновить ЗАКАЗ</v-btn
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

// Для селектов надо предварительно проитись помассиву и подставить в :value (в data добавить свойство) то что у нас есть уже в заказе, но при изменении добавлять в данные новое значение

export default {
  name: "EditOrder",

  data() {
    return {
      loadBtn: false,
      loading: true,
      routeId: "",
      menu: false,
      menu2: false,
      zamershiks: [],
      brigadi: [],
      // TODO создать обьект с name и value(то что приходит в данных)
      statuses: [
        "В обработке",
        "Замер",
        "Индивидуальный",
        "Ожидает монтаж",
        "Отменен",
      ],
      payments_metod: [
        "Наличными",
        "Терминал",
        "Оплата по безналичному расчету",
      ],

      EditingOrder: {
        dateMont: "",
        dateZamer: "",
        cost_zdi: "",
        doorGroup: "",
        doorNumber: "",
        doorPrice: "",
        doorSize: "",
        dop_phone: "",
        dopolnServ: [],
        fio: "",
        flat: "",
        floor: "",
        house: "",
        korpus: "",
        modelRuk: "",
        part_city: "",
        payments_metod: "",
        phone: "",
        predoplata: "",
        primecProd: "",
        primecRuk: "",
        prod_sale: "",
        proemSize: "",
        ruk_cena: "",
        sale: "",
        sideOpen: "",
        status_zayavka: "",
        street: "",
        sum_premii: "",
        team: "",
        user_id: "",
        zamershik: {},
      },
      // ----------------------------------------------------------------------------

      doorsModels: [],
      selectedModel: {},
      doorSizes: [],
      doorSize: "",
      modelsRuk: [],
      doorModel: "",
      groopRuk: "",
      spayments_metod: "",
      ruk_cena: "",

      predoplata: "",
      doorPrice: "",
      sale: "",
      status_zayavka: "",
      sum_premii: "",
      status_premii: "",
      doorsCategory: [],
      status_premii: ["Выплачена", "Ожидается", "Ожидается выплата", "Отмена"],
    };
  },

  async created() {
    this.routeId = this.$route.params.id;
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/sales")
      .then((response) => {
        this.EditingOrder = response.data.find((item) => {
          return item.id == this.routeId;
        });

        if (this.EditingOrder.date_mont && this.EditingOrder.data_zamera) {
          const splitedDate_mont = this.EditingOrder.date_mont.split("/");
          const splitedData_zamera = this.EditingOrder.data_zamera.split("/");
          const date_mont = `${splitedDate_mont[2]}-${splitedDate_mont[1]}-${splitedDate_mont[0]}`;
          const data_zamera = `${splitedData_zamera[2]}-${splitedData_zamera[1]}-${splitedData_zamera[0]}`;

          this.EditingOrder = { ...this.EditingOrder, date_mont, data_zamera };
        }

        this.loading = false;
      });

    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        this.doorsCategory = response.data;
        this.changeModel(this.EditingOrder.category_saler);
        this.changeModelRuk(this.EditingOrder.category_ruk.id);
      });

    // замерщики
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/users?type=zamershik")
      .then((response) => {
        this.zamershiks = response.data;
      });

    // ,бригады
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/teams")
      .then((response) => {
        this.brigadi = response.data;
      });
  },

  computed: {
    ...mapGetters({
      getUser: "auth/getUser",
    }),
  },
  mounted() {
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

        console.log(this.EditingOrder.street);
      });
    },
    changeModel(param) {
      this.doorGroup = param.term_id;

      this.doorModel = "";
      //получение доп услуг по производителю двери
      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param}`
        )
        .then((response) => {
          this.doorsModels = response.data;
          const chosenDoor = this.doorsModels.find((door) => {
            return door.name === this.EditingOrder.model_saler.name;
          });

          const chosenDoorSizes = chosenDoor.price;

          for (const key in chosenDoorSizes) {
            this.doorSizes.push({ size: key, price: chosenDoorSizes[key] });
          }
        });

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/dopserv?proizvoditel=${param}`
        )
        .then((response) => {
          this.dopServArray = response.data;
        });
    },
    changeModelRuk(param) {
      this.modelRuk = "";

      axios
        .get(
          `https://door.webink.site/wp-json/door/v1/get/models?proizvoditel=${param}`
        )
        .then((response) => {
          this.modelsRuk = response.data;
        });
    },

    changeSize(sizes) {
      this.selectedModel = sizes;
      this.doorSizes = Object.keys(sizes.price);
    },

    showPrice(num) {
      // this.doorPrice = this.selectedModel.price[num];
      // this.doorSize = num;
      this.EditingOrder.door_size = num.size;
    },

    updateOrder() {
      this.loadBtn = true;
      //отправить новый заказ

      axios
        .post(
          "https://door.webink.site/wp-json/door/v1/edit/sales?order_id=" +
            this.EditingOrder.id,
          { ...this.EditingOrder }
        )
        .then((response) => {
          this.loadBtn = false;
          this.$router.push("/");
        });
      // axios
      //   .post("https://door.webink.site/wp-json/door/v1/add/sales", {
      //     ...this.EditingOrder,
      //   })
      //   .then((response) => {
      //     this.loadBtn = false;
      //     this.$router.push("/");
      //   });
    },
  },
};
</script>