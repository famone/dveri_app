<template>
    <div>
        <!-- <pre>{{sales}}</pre> -->

        <v-dialog v-model="dialogDopServ" width="500px">
            <v-card class="pa-4">
                <v-container fluid>
                <v-row v-for="item in chosenItem.dopServ" :key="item.name">
                    {{ item.name }}
                </v-row>
                </v-container>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="dialogDopServ = false" color="primary">Закрыть</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <section>
            <div class="container-fluid">
                <v-data-table
                    :search="search"
                    disable-pagination
                    :hide-default-footer="true"
                    :headers="adminHeaders"
                    :items="sales"
                    :loading="!sales.length"
                    single-line
                    must-sort
                    class="elevation-1 rounded-lg"
                    :footer-props="{'items-per-page-options': [20, 40, 60, -1]}"
                    @click:row="selectOrderRow">



                            <template #top>
                                <v-toolbar flat>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Поиск"
                                        single-line
                                        hide-details></v-text-field>
                                         <v-spacer></v-spacer>
                                </v-toolbar>
                            </template>




                    <template #item.date="{ item }">
                        {{ item.date | formatDate("DD/MM") }}
                    </template>

                    <template #item.adress="{ item }">
                        <v-avatar :color="getPart(item.part_city)" size="14"></v-avatar>
                        {{ item.adress }} {{ item.house }} {{ item.flat }}
                    </template>


                    <template #item.id="{ item }">
                       
                        <v-chip
                            :color="getColor(item.status)"
                            dark
                            :content="getTippyTittle(item.status)"
                            v-tippy="{ placement: 'right', arrow: true }"
                            :outlined="item.status === 'processing'"
                            :class="getChipTextColor(item.status)"
                        >
                            <span :class="getChipTextColor(item.status)">{{ item.id }}</span>
                        </v-chip>
                    </template>


                     <template #item.dopServ="{ item }">
                        <v-icon v-if="item.dopServ" @click="openDopServDialog(item)">
                        mdi-file
                        </v-icon>
                        <span v-else>Не заявлено доп.услуг</span>
                    </template>

                </v-data-table>
            </div>
        </section>

    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import moment from "moment";

    export default{
        computed:{
            ...mapGetters({
                getUser: "auth/getUser",
            })
        },
        data(){
            return{
                search: '',
                dialogDopServ: false,
                chosenItem: {},
                sales: [],
                adminHeaders: [
                    { text: "№", value: "id" },
                    { text: "Дата продажи", value: "date" },
                    { text: "Телефон", value: "phone" },
                    { text: "Адрес", value: "adress" },
                    
                    { text: "ФИО", value: "fio" },
                    { text: "Модель двери", value: "door_model" },
                    { text: "Размер/Сторона", value: "door_size" },
                    { text: "Проем", value: "proem_size" },
                    { text: "Дата замера", value: "data_zamera" },
                    { text: "Замерщик", value: "zamershik.name" },
                    { text: "Дата монтажа", value: "date_mont" },
                    { text: "Бригада", value: "brigada_mont.name" },
                    { text: "Цена диллера", value: "cost_saler" },
                    { text: "Примечание продавца", value: "prim_saler" },
                    { text: "Примечание Руководителя", value: "prim_rukvod" },
                    { text: "Продавец", sortable: true, value: "saler.name" },
                    { text: "Торговая точка", sortable: true, value: "tochka" },
                    { text: "Дополнительные услуги", value: "dopServ" },
                    { text: "Остаток платежа", value: "payment_rest" },
                    { text: "Тип оплаты", value: "payments_metod" }
                ],
            }
        },
        methods: {
            openDopServDialog(item) {
                this.dialogDopServ = true;
                this.chosenItem = item;
            },
            getPart(part) {
                if (part === "Север") return "primary";
                else if (part === "Юг") return "orange";
                else return "grey";
            },
            getChipTextColor(status) {
                switch (status) {
                    case "processing":
                    return "chipColorBlack";
                    case "waitmontazh":
                    return "chipColorWhite";
                    case "cancelled":
                    return "chipColorWhite";
                    case "individual":
                    return "chipColorWhite";
                    case "zamer":
                    return "chipColorWhite";
                    case "completed":
                    return "chipColorWhite";
                }
                },
            getColor(status) {
                switch (status) {
                    case "processing":
                    return "black";
                    case "waitmontazh":
                    return "yellow";
                    case "cancelled":
                    return "red";
                    case "individual":
                    return "grey";
                    case "zamer":
                    return "#5E35B1";
                    case "completed":
                    return "green";
                    case "pending":
                    return "#5E35B1";
                    case "vyplachen":
                    return "#1976d2";
                }
                },

                getTippyTittle(status) {
                if (status === "pending") return "Ожидает";
                else if (status === "waitmontazh") return "Ожидает монтаж";
                else if (status === "cancelled") return "Отменен";
                else if (status === "zamer") return "Замер";
                else if (status === "individual") return "Индивидуальная";
                else if (status === "completed") return "Выполнен";
                else if (status === "vyplachen") return "Выплачено";
                else return "В работе";
                },
        },
        created(){
            axios
            .get(`https://door.webink.site/wp-json/door/v1/get/sales?user_id=${this.getUser.id}&type=archive`)
            .then(res =>{
                this.sales = res.data  
            })
        }
    }
</script>
