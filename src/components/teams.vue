<template>
  <section>
    <div class="container">
      <div class="col-lg-12">
        <h2>Бригады:</h2>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <v-data-table
            :headers="headers"
            :items="teams"
            sort-by="calories"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      color="primary"
                      class="mb-2"
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
                              v-model="editedItem.title"
                              label="Название"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.kolZakazov"
                              label="Кол-во заказов"
                              type="number"
                            ></v-text-field>
                          </v-col> -->
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
                        @click="deleteItemConfirm(deliting)"
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      deliting: "",
      load: true,
      dialogDelete: false,
      headers: [
        {
          text: "Бригада",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Количество заказов бригады",
          sortable: false,
          value: "kolZakazov",
        },
        { text: "Редактировать", value: "actions", sortable: false },
      ],
      models: [],
      editedIndex: -1,
      editedItem: {
        title: "",
        kolZakazov: 0,
      },
      defaultItem: {
        title: "",
        kolZakazov: 0,
      },
    };
  },

  computed: {
    ...mapGetters({
      loading: "zakaz/GET_LOADING",
      teams: "zakaz/GET_TEAMS",
    }),

    formTitle() {
      return this.editedIndex === -1
        ? "Создать бригаду"
        : "Редактировать бригаду";
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

  methods: {
    ...mapActions({
      DELETE_TEAM: "zakaz/DELETE_TEAM",
      ADD_TEAM: "zakaz/ADD_TEAM",
    }),

    editItem(item) {
      this.editedIndex = this.teams.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.dialogDelete = true;
      this.deliting = item.id;
      console.log(this.deliting);
    },

    deleteItemConfirm(item) {
      this.DELETE_TEAM(item);
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
      this.deliting = "";
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.teams[this.editedIndex], this.editedItem);
      } else {
        this.ADD_TEAM(this.editedItem);
      }
      this.close();
    },
  },
};
</script>