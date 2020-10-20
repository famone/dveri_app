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
       }
    },

    actions: {
       getDoors({commit}){
        
          axios
          .get("https://door.webink.site/wp-json/door/v1/get/sales")
          .then((response) => {
            commit("SET_DOORS", response.data)

          });
       }
    },
}

export default zakaz
