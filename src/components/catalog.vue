<template>
  <section>
    <div class="container">
      <div class="col-lg-12">
        <h2>Модели дверей:</h2>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <v-data-table
            :headers="headers"
            :items="filteredItems"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat class="pl-0">
                <v-container
                  ><v-row justify="space-between" align="center">
                    <v-col cols="4" class="pl-0">
                      <v-select
                        label="Производитель"
                        :items="categorys"
                        v-model="brand"
                        clearable
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>

                    <router-link to="/new_door">
                      <v-btn depressed color="primary"
                        ><v-icon>mdi-playlist-plus</v-icon>Создать</v-btn
                      >
                    </router-link>
                  </v-row></v-container
                >

                <v-dialog v-model="dialogModel" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Вы точно хотите удалить модель?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Отмена</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteModelConfirm(delitingModel)"
                        >Удалить</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template #item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >

              <v-icon small @click="deleteModel(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      brand: "",
      load: true,
      categorys: [],
      dialogModel: false,
      delitingModel: null,
      headers: [
        {
          text: "Производитель двери",
          align: "start",
          sortable: false,
          value: "category.name",
        },
        { text: "Модель двери", sortable: false, value: "name" },
        { text: "Редактировать", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      loading: "zakaz/GET_LOADING",
    }),

    filteredItems() {
      if (this.brand === "Все") {
        return this.models;
      } else {
        return this.models.filter((i) => {
          return !this.brand || i.category.name === this.brand;
        });
      }
    },
    ...mapState("zakaz", ["models"]),
  },
  created() {
    // категории

    axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        response.data.forEach((item) => {
          this.categorys.push(item.name);
        });
        this.categorys.push("Все");
      });

    // модели
    this.LOAD_MODELS();
  },
  methods: {
    ...mapMutations({
      SET_CHOSEN_MODEL: "zakaz/SET_CHOSEN_MODEL",
    }),

    ...mapActions({
      LOAD_MODELS: "zakaz/LOAD_MODELS",
      DELETE_MODEL: "zakaz/DELETE_MODEL",
    }),

    editItem(item) {
      this.SET_CHOSEN_MODEL(item);
      this.$router.push("/edit_model/" + item.id);
    },
    deleteModel(item) {
      this.dialogModel = true;
      this.delitingModel = item.id;
    },
    closeDelete() {
      this.dialogModel = false;
      this.delitingModel = null;
    },
    deleteModelConfirm(item) {
      this.DELETE_MODEL(item);
      this.dialogModel = false;
      this.delitingModel = "";
    },
  },
};
</script>