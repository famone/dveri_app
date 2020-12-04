<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <v-btn depressed color="primary" @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
            Назад</v-btn
          >
        </div>
      </div>

      <div class="row shad-box">
        <div class="col-lg-12 py-0">
          <div class="row">
            <div class="col-lg-4 pb-0">
              <v-select
                label="Производитель"
                :items="manufacturers"
                item-text="name"
                v-model="manufacturer"
                return-object
              ></v-select>
            </div>
            <div class="col-lg-4 pb-0">
              <v-text-field v-model="modelName" label="Название модели">
              </v-text-field>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <h2><span class="mdi mdi-arrow-all"></span> Размеры:</h2>
        </div>

        <div class="col-lg-12">
          <div
            class="row repeater"
            v-for="(model, index) in modelsArray"
            :key="model.id"
          >
            <div class="col-lg-3">
              <v-text-field
                type="number"
                v-model="model.size"
                label="Размер"
              ></v-text-field>
            </div>
            <div class="col-lg-3">
              <v-text-field
                type="number"
                v-model="model.price"
                label="Цена"
              ></v-text-field>
            </div>
            <div class="col-lg-3">
              <v-btn
                depressed
                color="error"
                class="m-15"
                @click="deliteModel(index)"
              >
                <v-icon left>mdi-delete</v-icon>Удалить
              </v-btn>
            </div>
          </div>
          <!-- <v-btn depressed color="primary" @click="addModel">
            <v-icon left>mdi-cart-plus</v-icon>Добавить
          </v-btn> -->
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
          @click="createDoor"
          >Сохранить изменения</v-btn
        >
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewDoor",

  props: ["id"],

  data() {
    return {
      manufacturer: null,
      manufacturers: [],
      modelName: "",
      doorModels: [],
      modelsArray: [
        { size: 78, price: null },
        { size: 80, price: null },
        { size: 85, price: null },
        { size: 86, price: null },
        { size: 88, price: null },
        { size: 90, price: null },
        { size: 96, price: null },
        { size: 98, price: null },
        { size: 99, price: null },
        { size: 105, price: null },
      ],
    };
  },
  computed: {},

  mounted() {
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        this.manufacturers = response.data;
      });
  },

  methods: {
    // addModel() {
    //   this.modelsArray.push({ size: "", price: "" });
    // },
    deliteModel(index) {
      this.modelsArray.splice(index, 1);
    },
    createDoor() {
      axios.post("https://door.webink.site/wp-json/door/v1/set/models", {
        name: this.modelName,
        manufacturer_id: this.manufacturer.term_id,
        sizes: this.modelsArray,
      });
      this.$router.push("/directories");
    },
  },
};
</script>
