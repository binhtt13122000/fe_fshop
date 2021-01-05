
import Vue from 'vue'
import Vuex from 'vuex'

// import AuthStore from "./modules/auth"
// import ProductStore from "./modules/auth"
// import auth from "./modules/auth"
import product from "./modules/product"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      // AUTH: AuthStore,
      // PRODUCT: ProductStore,
      // auth,
      product,
  },
})
