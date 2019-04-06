import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
  login: {
    username: window.sessionStorage.getItem("Ausername"),
    userId:window.sessionStorage.getItem("AuserId"),
    phone:window.sessionStorage.getItem("Aphone"),
    type:window.sessionStorage.getItem("Atype"),
  }
}
const mutations = {
  username(state, str) {
    state.login.username = str;
    window.sessionStorage.setItem("Ausername",str)
  },
  userId(state, str) {
    state.login.userId = str;
    window.sessionStorage.setItem("AuserId",str)
  },
  phone(state, str) {
    state.login.phone = str;
    window.sessionStorage.setItem("Aphone",str)
  },
  type(state, str) {
    state.login.type = str;
    window.sessionStorage.setItem("Atype",str)
  },
}
const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
