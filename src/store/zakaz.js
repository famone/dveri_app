import axios from 'axios'

const zakaz = {
  namespaced: true,
  state: {
    sales: [],
    doorCategories: [],
    models: [],
    teams: [],
    zamershiki: [],
    services: [],
    chosenZakaz: null,
    chosenModel: null,
    loading: false
  },

  getters: {
    GET_SALES(state) {
      return state.sales
    },

    GET_MODELS: state => brand => {
      return state.models.filter(item => {
        return item.category.name === brand.name
      })
    },

    getDoorEdit: (state) => (id) => {
      return state.sales.find(item => item.id == id)
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

    GET_SERVICES(state) {
      return state.services
    },

    GET_DOOR_CATEGORIES(state) {
      return state.doorCategories
    },

    GET_CHOSEN_ZAKAZ(state) {
      return state.chosenZakaz
    },

    GET_CHOSEN_MODEL(state) {
      return state.chosenModel
    },

    GET_LOADING(state) {
      return state.loading
    }
  },

  mutations: {
    SET_SALES(state, payload) {
      state.sales = payload
    },

    SET_MODELS(state, payload) {
      state.models = payload
    },

    SET_TEAMS(state, teams) {
      state.teams = teams
    },

    SET_ZAMERSHIKI(state, zamershiki) {
      state.zamershiki = zamershiki
    },

    SET_SERVICES(state, services) {
      state.services = services
    },

    SET_DOOR_CATEGORIES(state, payload) {
      state.doorCategories = payload
    },

    SET_CHOSEN_ZAKAZ(state, zakaz) {
      state.chosenZakaz = zakaz
    },

    SET_CHOSEN_MODEL(state, model) {
      state.chosenModel = model
    },

    SET_LOADING(state, bool) {
      state.loading = bool
    }
  },

  actions: {
    LOAD_SALES({ commit, rootGetters }) {

      const userRoleId = rootGetters["auth/getUser"].id;

      commit("SET_LOADING", true);

      axios
        .get("https://door.webink.site/wp-json/door/v1/get/sales?user_id=" + userRoleId)
        .then((response) => {
          commit("SET_SALES", response.data)
        })
        .catch(err => console.log(err))
        .finally(() => commit("SET_LOADING", false))
    },

    LOAD_MODELS({ commit }) {
      commit("SET_LOADING", true);

      axios
        .get('https://door.webink.site/wp-json/door/v1/get/models')
        .then(response => {
          commit("SET_MODELS", response.data)
        })
        .finally(() => commit("SET_LOADING", false));
    },

    LOAD_DOOR_CATEGORIES({ commit }) {
      commit("SET_LOADING", true);

      axios
        .get('https://door.webink.site/wp-json/door/v1/get/categorys')
        .then(({ data }) => {
          commit("SET_DOOR_CATEGORIES", data)
        })
        .finally(() => commit("SET_LOADING", false));
    },

    async EDIT_ZAKAZ({ commit }, zakaz) {

      const requestPayload = {
        ...zakaz,
        category_saler: zakaz.category_saler.id,
        model_saler: zakaz.model_saler.id,
        category_ruk: zakaz.category_ruk.id,
        model_ruk: zakaz.model_ruk.id,
      };

      await axios.post("https://door.webink.site/wp-json/door/v1/edit/sales?order_id=" + zakaz.id, requestPayload)
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

    DELETE_SALE({ commit, dispatch, rootGetters }, payload) {
      const userRoleId = rootGetters["auth/getUser"].id;
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/sales?order_id=" + payload)
        .then(() => dispatch("LOAD_SALES"))
    },

    DELETE_MODEL({ commit, dispatch }, id) {
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/models?id=" + id)
        .then(() => dispatch("LOAD_MODELS"))
    },

    UPDATE_TEAMS({ commit }) {
      commit("SET_LOADING", true);

      axios.get("https://door.webink.site/wp-json/door/v1/get/teams")
        .then(({ data }) => {
          commit("SET_TEAMS", data)
        })
        .finally(() => {
          commit("SET_LOADING", false);
        })
    },

    DELETE_TEAM({ commit, dispatch }, id) {
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/teams?id=" + id)
        .then(() => dispatch("UPDATE_TEAMS"));
    },

    ADD_TEAM({ commit, dispatch }, name) {
      let team = {
        name: name.title
      }

      axios
        .post('https://door.webink.site/wp-json/door/v1/create/teams', team)
        .then(() => dispatch("UPDATE_TEAMS"))
    },

    UPDATE_ZAMERSHIKI({ commit }) {
      axios
        .get("https://door.webink.site/wp-json/door/v1/get/users?type=zamershik")
        .then(({ data }) => {
          commit("SET_ZAMERSHIKI", data)
        });
    },

    LOAD_SERVICES({ commit }) {
      commit("SET_LOADING", true);
      axios
        .get("https://door.webink.site/wp-json/door/v1/get/dopserv")
        .then(({ data }) => {
          commit("SET_SERVICES", data)
        })
        .finally(() => {
          commit("SET_LOADING", false);
        })
    },

    DELETE_SERVICE({ commit, dispatch }, id) {
      axios
        .get("https://door.webink.site/wp-json/door/v1/delete/dopserv?id=" + id)
        .then(() => dispatch("LOAD_SERVICES"));
    },

    EDIT_SERVICE({ commit, dispatch }, payload) {
      axios
        .post("https://door.webink.site/wp-json/door/v1/set/dopserv", payload)
        .then(() => dispatch("LOAD_SERVICES"))
    },
  },

}

export default zakaz
