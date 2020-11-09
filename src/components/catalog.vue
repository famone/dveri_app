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
            :loading="loadModels"
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

                <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Вы уверены?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Ок</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
              </v-toolbar>
            </template>

            <template #item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >

              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    brand: "",
    load: true,
    categorys: [],
    dialogDelete: false,
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
  }),

  computed: {
    filteredItems() {
      if (this.brand === "Все") {
        return this.models;
      } else {
        return this.models.filter((i) => {
          return !this.brand || i.category.name === this.brand;
        });
      }
    },
    ...mapState("zakaz", ["models", "loadModels"]),
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
    this.$store.dispatch("zakaz/loadModels");
  },
  methods: {
    ...mapMutations({
      SET_CHOSEN_MODEL: "zakaz/SET_CHOSEN_MODEL",
    }),

    editItem(item) {
      console.log(item);
      this.SET_CHOSEN_MODEL(item);
      this.$router.push("/edit_model/" + item.id);
    },
  },
};
</script>