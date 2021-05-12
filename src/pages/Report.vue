<template>
    <div>
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
                    :items.sync="sales"
                    :loading="!sales.length"
                    single-line
                    must-sort
                    class="elevation-1 rounded-lg"
                    :footer-props="{'items-per-page-options': [20, 40, 60, -1]}"
                    >



                            <template #top >
                                <v-toolbar flat>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Поиск"
                                        single-line
                                        hide-details></v-text-field>
                                         <v-spacer></v-spacer>
                                                    <downloadExcel
                                                        :data="sales"
                                                        :fields="json_fields"
                                                        :name="excelFileName"
                                                        :header="excelHeader"
                                                        v-if="sales.length">
                                                        <v-btn depressed color="primary ma-2">
                                                        <v-icon>mdi-download</v-icon>
                                                        Выгрузить EXСEL
                                                        </v-btn>
                                                    </downloadExcel>
                                            </v-toolbar>
                            </template>




                    <template #item.date="{ item }">
                        {{ item.date | formatDate("DD/MM") }}
                    </template>

                    <template #item.adress="{ item }">
                        <v-avatar :color="getPart(item.part_city)" size="14"></v-avatar>
                        {{ item.adress }} {{ item.house }} {{ item.flat }}
                    </template>


                    <template #item.door_model="{ item }">
                        <span v-if="item.model_ruk.name" style="color: red">
                        {{ item.model_ruk.name }}
                        </span>
                        <span v-else>
                        {{ item.model_saler.name }}
                        </span>
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

                    <template #item.status="{ item }">
                        {{getTippyTittle(item.status)}}
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
        props: ["id"],
        computed:{
            ...mapGetters({
                getUser: "auth/getUser"
            }),
            excelFileName() {
                if(!this.users){
                    return
                }
                const date = this.date
                let userName = this.users.find(item =>{
                    return item.id == this.id
                })
                this.userFileName = userName.email
            
                return `${userName.email}_${moment().format("DD.MM.YYYY")}.xls`;
            },
            excelHeader(){
                if(!this.users){
                    return
                }
                const date = this.date
                let userName = this.users.find(item =>{
                    return item.id == this.id
                })
                this.userFileName = userName.email
            
                return `${userName.email}_${moment().format("DD.MM.YYYY")}.xls`;
            }
        },
        data(){
            return{
                users: null,
                search: '',
                dialogDopServ: false,
                chosenItem: {},
                sales: [],
                adminHeaders: [
                    { text: "№", value: "id" },
                    { text: "Дата продажи", value: "date" },
                    { text: "Адрес", value: "adress" },
                    { text: "Модель двери", value: "door_model" },
                    { text: "Примечание продавца", value: "prim_saler" },
                    { text: "Примечание Руководителя", value: "prim_rukvod" },
                    { text: "Статус заявки", value: "status" },
                    { text: "Цена диллера", value: "cost_saler" },
                    { text: "Сумма премии", value: "sum_premia" },
                ],
                json_data: null,
                json_fields: null,
                date: new Date,
                userFileName: ''
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
            .get(`https://door.webink.site/wp-json/door/v1/get/sales?user_id=${this.id}`)
            .then(res =>{
                this.sales = res.data  
            })

            axios
			.get('https://door.webink.site/wp-json/door/v1/get/users')
			.then(res =>{
				this.users = res.data
			})
        },
        watch: {
            items(newVal) {

                this.json_fields = {
                    "Номер заказа": "id",
                    "Адрес": {
                    callback: (newVal) => {
                        return newVal.adress + ' ' + newVal.house + ' ' + newVal.flat
                    },
                    },
                    "Модель двери": {
                    callback: (item) => {
                        if (!item.model_ruk.name){
                            return item.model_saler.name ;
                        }else{
                            return item.model_ruk.name;
                        }
                    },
                    },
                    "Примечание:": "prim_rukvod",
                };
                
                let sortData = newVal.sort((a, b) => {
                    if (a["time_mont"] < b["time_mont"]) {
                        return -1;
                    }
                    if (a["time_mont"] > b["time_mont"]) {
                        return 1;
                    }
                    return 0;
                });

                this.json_data = [...newVal];
                },
            },
    }
</script>

<style scoped>
.v-data-table__wrapper td:nth-child(3){
	white-space: inherit!important;
    background: red!important;
    max-width: 200px!important;
}
</style>