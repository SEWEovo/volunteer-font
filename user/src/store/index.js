import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  login: {
    loginVisible: false,
    activeIndex:"1",
    username: window.sessionStorage.getItem("username"),
    // userId: "",
    userId:window.sessionStorage.getItem("userId"),
    phone: window.sessionStorage.getItem("phone"),
    type: window.sessionStorage.getItem("type"),
    college: window.sessionStorage.getItem("college"),
    profession: window.sessionStorage.getItem("profession"),
    classNum: window.sessionStorage.getItem("classNum"),
  }

}

const mutations = {
  activeIndex(state, str) {
    state.login.activeIndex = str;
    window.sessionStorage.setItem("activeIndex",str)
  },
  loginVisible(state, str) {
    state.login.loginVisible = str;
  },
  username(state, str) {
    state.login.username = str;
    window.sessionStorage.setItem("username",str)
  },
  userId(state, str) {
    state.login.userId = str;
    window.sessionStorage.setItem("userId",str)
  },
  phone(state, str) {
    state.login.phone = str;
    window.sessionStorage.setItem("phone",str)
  },
  type(state, str) {
    state.login.type = str;
    window.sessionStorage.setItem("type",str)
  },
  college(state, str) {
    state.login.college = str;
    window.sessionStorage.setItem("college",str)
  },
  profession(state, str) {
    state.login.profession = str;
    window.sessionStorage.setItem("profession",str)
  },
  classNum(state, str) {
    state.login.classNum = str;
    window.sessionStorage.setItem("classNum",str)
  },
}
const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;
