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
          <!-- <div class="col-lg-3">
					<v-select :items="doorsCategory" 
					item-text="name" 
					label="Группа двери продавца"
					v-model="doorGroup"
					@change="changeModel($event)"
					return-object></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="doorsModels" 
					item-text="name"
					v-model="doorModel"
					@change="changeSize($event)"
					return-object
					label="Модель двери продавца"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Группа двери руководителя" v-model="groopRuk"></v-select>
				</div>
				<div class="col-lg-3">
					<v-select :items="items" label="Модель двери руководителя" v-model="modelRuk"></v-select>
				</div> -->

          <!--  -->

          <!-- <div class="col-lg-3">
					<v-select :items="EditingOrder.door_size" 
					label="Размер двери"
					@change="showPrice($event)"
					return-object
					></v-select>
				</div> -->
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
                :items="items"
                label="Статус премии"
                v-model="status_premii"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row">
          <v-btn depressed x-large dark color="grey" class="m-15" @click="$router.go(-1)">НАЗАД</v-btn>
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

export default {
  data() {
    return {
      loading: true,
      routeId: "",
      menu: false,
      menu2: false,
      zamershiks: [],
      brigadi: [],
      statuses: ["В обработке", "Оплачено", "На складе"],
      payments_metod: [
        "Наличными",
        "Терминал",
        "Оплата по безналичному расчету",
      ],
      EditingOrder: {
        // fio: '',
        // phone: '',
        // dop_phone: '',
        // street: '',
        // house: '',
        // flat: '',
        // floor: '',
        // part_city: '',

        // door_direction: '',
        // proem_size: '',
        // prim_saler: '',
        // prim_rukvod: '',
        // date_mont: ''
        brigada_mont: "",
      },
    };
  },
  computed: {},
  created() {
    this.routeId = this.$route.params.id;

    axios
      .get("https://door.webink.site/wp-json/door/v1/get/sales")
      .then((response) => {
        this.EditingOrder = response.data.find(
          (item) => item.id == this.routeId
        );
        console.log(this.EditingOrder);
        this.loading = false;
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
  },
  methods: {
    updateOrder() {
      console.log("UPDATE_ORDER API");
    },
  },
};
</script>