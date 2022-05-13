import Vue from 'vue'
import Vuex from 'vuex'
import user from './store/modules/user'
import cart from './store/modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    user,
    cart
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
