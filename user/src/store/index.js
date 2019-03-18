import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  login: {
    loginVisible: false,
    username: "",
  }

}

const mutations = {
  loginVisible(state, str) {
    state.login.loginVisible = str;
  },
  username(state, str) {
    state.login.username = str;
  },
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
