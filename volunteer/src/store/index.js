import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
  login: {
    username: "",
  }
}
const mutations = {
  username(state, str) {
    state.login.username = str;
  },
}
const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
