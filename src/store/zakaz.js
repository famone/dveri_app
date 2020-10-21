import axios from 'axios'

const zakaz = {
    namespaced: true,
    state: {
        doors: [],
        loadDoors: true,
        models: [],
        loadModels: true
    },

    getters: {
        getDoorEdit: (state) => (id) => {
          return state.doors.find(item => item.id == id)
        },
        getModelEdit: (state) => (id) => {
          return state.models.find(item => item.id == id)
        },
    },

    mutations: {
       SET_DOORS(state, payload){
            state.doors = payload
             state.loadDoors = false
       },
       SET_MODELS(state, payload){
        state.models = payload
             state.loadModels = false
       },
       START_LOADER(state){
        state.loadDoors = true
       }
    },

    actions: {
       getDoors({commit}){
        
          axios
          .get("https://door.webink.site/wp-json/door/v1/get/sales")
          .then((response) => {
            console.log(response.data)
            commit("SET_DOORS", response.data)

          });
       },
       loadModels({commit}){
            axios 
            .get('https://door.webink.site/wp-json/door/v1/get/models')
            .then(response =>{
              commit("SET_MODELS", response.data)
            })
       },
       startLoader({commit}){
        commit("START_LOADER")
       },
       deliteZakaz({commit}, payload){

          axios
          .get("https://door.webink.site/wp-json/door/v1/delete/sales?order_id=" + payload)
          .then((response) => {
            if(response.data.status === 'OK'){
              axios
              .get("https://door.webink.site/wp-json/door/v1/get/sales")
              .then((response) => {
                commit("SET_DOORS", response.data)

              });
            }
          });
       }
    },
}

export default zakaz
