
import Vue from 'vue'
import Vuex from 'vuex'

// import AuthStore from "./modules/auth"
// import ProStore from "./modules/auth"
import auth from "./modules/auth"
import product from "./modules/product/product"
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      auth,
      product,
  },
  plugins: [createPersistedState()]
})
