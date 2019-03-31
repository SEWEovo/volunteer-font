import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
  login: {
    username: "",
    userId:"",
    phone:"",
    type:"",
  }
}
const mutations = {
  username(state, str) {
    state.login.username = str;
  },
  userId(state, str) {
    state.login.userId = str;
  },
  phone(state, str) {
    state.login.phone = str;
  },
  type(state, str) {
    state.login.type = str;
  },
}
const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
