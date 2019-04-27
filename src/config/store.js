import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    token: ''
  },
  getters: { //添加getters 相当于computed 计算属性
    login_status: (state) => {
      console.log("login_status触发")
      return state.isLogin
    },
  },
  mutations: { //添加mutations 相当于methods 组件使用commit触发
    login_in: (state, payload) => {
      state.isLogin = payload;
      console.log("登录",state.isLogin);
    },
    login_out: (state, payload) => {
      state.isLogin = payload;
      console.log("退出登录",state.isLogin);
    },
    set_login_status: (state, payload) => {
      state.isLogin = payload;
      console.log("设置登录状态",state.isLogin);
    }
  },
  actions: { //添加actions 组件使用dispatch触发
    set_login_status_Async(context, payload) {
      setTimeout(() => {
        context.commit('set_login_status', payload); //context提交
      }, 2000)
    }
  }
})

export default store
