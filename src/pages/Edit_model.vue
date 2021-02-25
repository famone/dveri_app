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
                :items="doorsCategory"
                item-text="name"
                v-model="brand"
                return-object
                clearable
              ></v-select>
            </div>
            <div class="col-lg-4 pb-0">
              <v-select
                label="Модель двери"
                :items="doorModels"
                item-text="name"
                v-model="doorModel"
                clearable
              ></v-select>
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
                readonly
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
          @click="changeModels"
          >Сохранить изменения</v-btn
        >
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
  props: ["id"],

  data() {
    return {
      modelsArray: [],
      brand: "",
      doorModels: [],
      doorModel: "",
    };
  },
  computed: {
    ...mapGetters({
      getModelEdit: "zakaz/getModelEdit",
      doorsCategory: "zakaz/GET_DOOR_CATEGORIES",
      GET_MODELS: "zakaz/GET_MODELS",
      GET_CHOSEN_MODEL: "zakaz/GET_CHOSEN_MODEL",
    }),
  },

  mounted() {
    this.brand = this.getModelEdit(this.id).category;
    this.doorModels = this.GET_MODELS(this.brand);
    this.doorModel = this.getModelEdit(this.id).name;
    // модели
    this.LOAD_MODELS();

    let newKey = Object.keys(this.getModelEdit(this.id).price);
    let newVal = Object.values(this.getModelEdit(this.id).price);

    newKey.forEach((item) => {
      this.modelsArray.push({ size: item, price: "" });
    });

    for (let i = 0; i < newVal.length; i++) {
      this.modelsArray[i].price = newVal[i];
    }
  },
  methods: {
    ...mapActions({
      EDIT_MODELS: "zakaz/EDIT_MODELS",
      LOAD_MODELS: "zakaz/LOAD_MODELS",
    }),

    addModel() {
      this.modelsArray.push({ size: "", price: "" });
    },
    deliteModel(index) {
      this.modelsArray.splice(index, 1);
    },
    changeModels() {
      this.EDIT_MODELS({
        ...this.GET_CHOSEN_MODEL,
        name: this.doorModel,
        category: {
          name: this.brand.name,
          id: this.brand.term_id,
        },
      });
      this.$router.push("/directories");
    },
  },

  watch: {
    brand(newValue) {
      this.doorModels = this.GET_MODELS(newValue);
    },
  },
};
</script>