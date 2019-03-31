import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  login: {
    loginVisible: false,
    username: "",
    userId: "",
    phone: "",
    type: "",
    college: '',
    profession: '',
    classNum: ""
  }

}

const mutations = {
  loginVisible(state, str) {
    state.login.loginVisible = str;
  },
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
  college(state, str) {
    state.login.college = str;
  },
  profession(state, str) {
    state.login.profession = str;
  },
  classNum(state, str) {
    state.login.classNum = str;
  },
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
