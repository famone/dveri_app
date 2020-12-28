import axios from 'axios'

const zakaz = {
  namespaced: true,
  state: {
    doors: [],
    loadDoors: true,
    models: [],
    loadModels: true,
    teams: [],
    zamershiki: [],
    chosenZakaz: null,
    chosenModel: null,
    loadTeams: true
  },

  getters: {
    GET_MODELS: state => brand => {
      return state.models.filter(item => {
        return item.category.name === brand.name
      })
    },

    getDoorEdit: (state) => (id) => {
      return state.doors.find(item => item.id == id)
    },
    getModelEdit: (state) => (id) => {
      return state.models.find(item => item.id == id)
    },
    GET_TEAMS(state) {
      return state.teams
    },
    GET_ZAMERSHIKI(state) {
      return state.zamershiki
    },

    GET_CHOSEN_ZAKAZ(state) {
      return state.chosenZakaz
    },

    GET_CHOSEN_MODEL(state) {
      return state.chosenModel
    }
  },

  mutations: {
    SET_DOORS(state, payload) {
      state.doors = payload
      state.loadDoors = false
    },

    SET_MODELS(state, payload) {
      state.models = payload
      state.loadModels = false
    },

    START_LOADER(state) {
      state.loadDoors = true
    },

    SET_TEAMS(state, teams) {
      state.teams = teams
      state.loadTeams = false
    },

    SET_ZAMERSHIKI(state, zamershiki) {
      state.zamershiki = zamershiki
    },

    SET_CHOSEN_ZAKAZ(state, zakaz) {
      state.chosenZakaz = zakaz
    },

    SET_CHOSEN_MODEL(state, model) {
      state.chosenModel = model
    }
  },

  actions: {
    getDoors({ commit, rootGetters }) {

      const userRoleId = rootGetters["auth/getUser"].id;

      axios
        .get("https://door.webink.site/wp-json/door/v1/get/sales?user_id=" + userRoleId)
        .then((response) => {
          commit("SET_DOORS", response.data)
        });
    },
    loadModels({ commit }) {
      axios
        .get('https://door.webink.site/wp-json/door/v1/get/models')
        .then(response => {
          commit("SET_MODELS", response.data)
        })
    },
    startLoader({ commit }) {
      commit("START_LOADER")
    },

    async EDIT_ZAKAZ({ commit }, zakaz) {

      console.log(zakaz);

      await axios.post("https://door.webink.site/wp-json/door/v1/edit/sales?order_id=" + zakaz.id, zakaz)
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err);
        })
    },

    EDIT_MODELS({ commit }, model) {
      axios.post("https://door.webink.site/wp-json/door/v1/edit/models?door_id=" + model.id, model)
    },

    deliteZakaz({ commit, rootGetters }, payload) {
      const userRoleId = rootGetters["auth/getUser"].id;


      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/sales?order_id=" + payload)
        .then((response) => {
          if (response.data.status === 'OK') {
            axios
              .get("https://door.webink.site/wp-json/door/v1/get/sales?user_id=" + userRoleId)
              .then((response) => {
                commit("SET_DOORS", response.data)

              });
          }
        });
    },

    deliteModel({ commit, state }, id) {
      state.loadModels = true
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/models?id=" + id)
        .then((response) => {


          if (response.data.status == 200) {
            axios
              .get('https://door.webink.site/wp-json/door/v1/get/models')
              .then(response => {
                commit("SET_MODELS", response.data)
              })
          }
        });
    },

    UPDATE_TEAMS({ commit }) {
      axios.get("https://door.webink.site/wp-json/door/v1/get/teams")
        .then(({ data }) => {
          commit("SET_TEAMS", data)
        })
    },

    deliteTeam({ commit, state }, id) {
      state.loadTeams = true
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/teams?id=" + id)
        .then((response) => {


          if (response.data.status == 200) {
            axios
              .get('https://door.webink.site/wp-json/door/v1/get/teams')
              .then(response => {
                commit("SET_TEAMS", response.data)
              })
          }
        });
    },

    addTeam({ commit, state }, name) {
      state.loadTeams = true

      let team = {
        name: name.title
      }

      axios
        .post('https://door.webink.site/wp-json/door/v1/create/teams', team)
        .then((response) => {

          if (response.data.status == 200) {
            axios
              .get('https://door.webink.site/wp-json/door/v1/get/teams')
              .then(response => {
                commit("SET_TEAMS", response.data)
              })

          }


        })

    },

    UPDATE_ZAMERSHIKI({ commit }) {
      axios
        .get("https://door.webink.site/wp-json/door/v1/get/users?type=zamershik")
        .then(({ data }) => {
          commit("SET_ZAMERSHIKI", data)
        });
    },
  },

}

export default zakaz
