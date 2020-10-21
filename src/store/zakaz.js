import axios from 'axios'

const zakaz = {
    namespaced: true,
    state: {
        doors: [],
        loadDoors: true
    },

    getters: {
        getDoorEdit: (state) => (id) => {
          return state.doors.find(item => item.id == id)
        },
    },

    mutations: {
       SET_DOORS(state, payload){
            state.doors = payload
             state.loadDoors = false
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
