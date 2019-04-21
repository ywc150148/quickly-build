import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      products: [{
          name: '鼠标',
          price: 20
        },
        {
          name: '键盘',
          price: 40
        },
        {
          name: '耳机',
          price: 60
        },
        {
          name: '显示屏',
          price: 80
        }
      ]
    },
    getters: { //添加getters 相当于computed 计算属性
      saleProducts: (state) => {
        let saleProducts = state.products.map(product => {
          return {
            name: product.name,
            price: product.price / 2
          }
        })
        return saleProducts;
      },
    },
    mutations: { //添加mutations 相当于methods
      minusPrice(state, payload) {
        let newPrice = state.products.forEach(product => {
          product.price -= payload
        })
      }
    },
    actions: { //添加actions
      minusPriceAsync(context, payload) {
        setTimeout(() => {
          context.commit('minusPrice', payload); //context提交
        }, 2000)
      }
    }
  })
  
  export default store