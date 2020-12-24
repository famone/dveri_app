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
            ></v-text-field>
          </div>
          <div class="col-lg-2">
            <v-text-field
              label="Номер дома"
              v-model="EditingOrder.house"
            ></v-text-field>
          </div>
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

        <div class="row shad-box">
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

          <div class="col-lg-3">
            <v-select
              label="Замерщик"
              :items="zamershiks"
              item-text="fname"
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
                  v-model="EditingOrder.date"
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
              v-model="EditingOrder.brigada_mont"
              item-text="title"
              item-value="id"
            ></v-select>
          </div>
        </div>

        <div class="row shad-box">
          <div class="col-lg-12">
            <h2><span class="mdi mdi-sale"></span> Итого:</h2>
          </div>

          <div class="col-lg-3">
            <v-select
              :items="payments_metod"
              v-model="spayments_metod"
              label="Тип расчета"
            ></v-select>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Цена продавца со скидкой"
              v-model="EditingOrder.prod_sale"
            ></v-text-field>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Цена двери руководителя"
              v-model="ruk_cena"
            ></v-text-field>
          </div>
          <div class="col-lg-3">
            <v-text-field
              label="Стоимость замера, доставки и установки"
              v-model="delivery"
            ></v-text-field>
          </div>

          <div class="col-lg-2">
            <v-text-field
              label="Предоплата"
              v-model="predoplata"
            ></v-text-field>
          </div>

          <div class="col-lg-2">
            <v-text-field label="Скидка" v-model="sale"></v-text-field>
          </div>
          <div class="col-lg-2">
            <v-text-field label="Итого" v-model="doorPrice"></v-text-field>
          </div>
        </div>

        <div class="row shad-box">
          <div class="col-lg-3">
            <div class="col-lg-12">
              <h2><span class="mdi mdi-bookmark-outline"></span> Заявка:</h2>
            </div>
            <div class="col-lg-12">
              <v-select
                :items="statuses"
                v-model="status_zayavka"
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
                v-model="sum_premii"
              ></v-text-field>
            </div>
            <div class="col-lg-4">
              <v-select
                :items="status_premii"
                label="Статус премии"
                v-model="status_premii"
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

      // EditingOrder: {
      //   // fio: '',
      //   // phone: '',
      //   // dop_phone: '',
      //   // street: '',
      //   // house: '',
      //   // flat: '',
      //   // floor: '',
      //   // part_city: '',

      //   // door_direction: '',
      //   // proem_size: '',
      //   // prim_saler: '',
      //   // prim_rukvod: '',
      //   // date_mont: ''
      //   brigada_mont: "",
      //   groopRuk: "",
      // },
      //  -----------------------------------------------------------------------
      EditingOrder: {
        dateMont: "",
        dateZamer: "",
        delivery: "",
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
        status_premii: "",
        status_zayavka: "",
        street: "",
        sum_premii: "",
        team: "",
        user_id: "",
        vremya_montaja: null,
        vremya_zamera: null,
        zamershik: "",
      },
      // ----------------------------------------------------------------------------

      doorGroup: "",
      doorsModels: [],
      selectedModel: {},
      doorSizes: [],
      doorSize: "",
      modelsRuk: [],
      modelRuk: "",
      doorModel: "",
      groopRuk: "",
      spayments_metod: "",
      ruk_cena: "",
      delivery: "",
      predoplata: "",
      doorPrice: "",
      sale: "",
      status_zayavka: "",
      sum_premii: "",
      status_premii: "",
      doorsCategory: [],
    };
  },

  async created() {
    this.routeId = this.$route.params.id;
    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/sales")
      .then((response) => {
        this.EditingOrder = response.data.find(
          (item) => item.id == this.routeId
        );

        this.EditingOrder = {
          ...this.EditingOrder,
          data_zamera: this.EditingOrder.data_zamera + "T00:00:00",
        };
        console.log(this.EditingOrder);
        this.loading = false;
      });

    await axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        this.doorsCategory = response.data;
        this.changeModel(this.EditingOrder.category_saler.id);
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
  methods: {
    changeModel(param) {
      console.log(param);
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
            console.log(this.doorSizes.size != key);
            this.doorSizes.push({ size: key, price: chosenDoorSizes[key] });
          }
          console.log("this.doorSizes");
          console.log(this.doorSizes);
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
      let newOrder = {
        ...this.EditingOrder,
        // fio: this.fio,
        // phone: this.phone,
        // dop_phone: this.dop_phone,
        // street: this.street,
        // house: this.house,
        // flat: this.flat,
        // floor: this.floor,
        // part_city: this.part_city,
        // doorGroup: this.doorGroup,
        // doorModel: this.doorModel.id,
        // doorSize: this.doorSize,
        // groopRuk: this.groopRuk.term_id,
        // modelRuk: this.modelRuk,
        // sideOpen: this.sideOpen,
        // proemSize: this.proemSize,
        // doorNumber: this.doorNumber,
        // primecProd: this.primecProd,
        // primecRuk: this.primecRuk,
        // dopolnServ: this.dopolnServ,
        // dateZamer: this.dateZamer,
        // zamershik: this.zamershik,
        // dateMont: this.dateMont,
        // team: this.team,
        // status_zayavka: this.status_zayavka,
        // prod_sale: this.prod_sale,
        // ruk_cena: this.ruk_cena,
        // delivery: this.delivery,
        // predoplata: this.predoplata,
        // sale: this.sale,
        // payments_metod: this.spayments_metod,
        // sum_premii: this.sum_premii,
        // status_premii: this.status_premii,
        // doorPrice: this.doorPrice,
        // user_id: this.user.id,
        // vremya_zamera: this.time,
        // vremya_montaja: this.time2,
      };
      // ==========================================================================
      // dop_phone: (...),
      // fio: (...),
      // phone: (...),
      // adress: (...),
      // flat: (...),
      // floor: (...),
      // house: (...),
      // part_city: (...),
      // category_saler: (...),
      // model_saler: (...),
      // category_ruk: (...),
      // model_ruk: (...),
      // door_size: (...),
      // door_direction: (...),
      // door_number: (...),
      // prim_rukvod: (...),
      // prim_saler: (...),
      // proem_size: (...),

      // avans: (...),
      // brigada_mont: (...),
      // city: (...),
      // cost_diler: (...),
      // cost_saler: (...),
      // cost_zdi: (...),
      // data_zamera: (...),
      // date: (...),
      // date_mont: (...),
      // discount: (...),
      // dopServ: (...),
      // id: (...),
      // payments_metod: (...),
      // saler: (...),
      // status: (...),
      // status_premia: (...),
      // sum_premia: (...),
      // time_mont: (...),
      // total: (...),
      // vdz_premia: (...),
      // vremya_zamera: (...),
      // zamershik: (...),

      // ==========================================================================

      this.loadBtn = true;
      //отправить новый заказ
      axios
        .post("https://door.webink.site/wp-json/door/v1/add/sales", {
          ...newOrder,
        })
        .then((response) => {
          console.log(response);
          this.loadBtn = false;
          this.$router.push("/");
        });
    },
  },

  // watch: {
  //   doorsCategory() {

  //   },
  // },
};
</script>