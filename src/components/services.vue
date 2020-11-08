<template>
  <section>
    <div class="container">
      <div class="col-lg-12">
        <h2>Дополнительные услуги:</h2>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <v-data-table
            :headers="headers"
            :items="filteredDopServices"
            :loading="loadServ"
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
                    <v-dialog v-model="dialog" max-width="600px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          depressed
                          color="primary"
                          class="mb-2 align-self-center"
                          v-bind="attrs"
                          v-on="on"
                          ><v-icon>mdi-playlist-plus</v-icon>Создать</v-btn
                        >
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="Название услуги"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="editedItem.price"
                                  label="Стоимость"
                                  type="number"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Отмена
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="save">
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row></v-container
                >
                <v-dialog v-model="dialogDelete" max-width="520px">
                  <v-card>
                    <v-card-title class="headline"
                      >Вы уверены, что хотите удалить запись ?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Отмена</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >Да</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template #item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data: () => ({
    dopServices: [],
    manufacturer: null,
    loadServ: true,
    dialog: false,
    dialogDelete: false,
    brand: "",
    load: true,
    categorys: [],
    headers: [
      { text: "Название услуги", align: "start", value: "name" },
      { text: "Стоимость", sortable: false, value: "price" },
      { text: "Редактировать", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0,
    },
    defaultItem: {
      name: "",
      price: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Создать доп. услугу"
        : "Редактировать доп. услугу";
    },

    filteredDopServices() {
      if (this.brand === "Все" || !this.brand) {
        return this.dopServices;
      } else {
        return this.dopServices.filter((item) => {
          return item.manufacturer === this.brand;
        });
      }
    },
  },
  created() {
    // дополнительные услуги
    axios
      .get("https://door.webink.site/wp-json/door/v1/get/dopserv")
      .then((response) => {
        this.dopServices = response.data;
        this.loadServ = false;
      });

    axios
      .get("https://door.webink.site/wp-json/door/v1/get/categorys")
      .then((response) => {
        response.data.forEach((item) => {
          this.categorys.push(item.name);
        });
        this.categorys.push("Все");
      });
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.dopServices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dopServices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dopServices.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dopServices[this.editedIndex], this.editedItem);
      } else {
        this.dopServices.push(this.editedItem);
      }
      this.close();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>