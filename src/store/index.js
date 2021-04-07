
import Vue from 'vue'
import Vuex from 'vuex'

// import AuthStore from "./modules/auth"
// import ProStore from "./modules/auth"
import auth from "./modules/auth"
import product from "./modules/product/product"
import supplier from "./modules/supplier/supplier"
import createPersistedState from 'vuex-persistedstate';
import category from "./modules/category/category";
import productDetails from "./modules/productCart/productCart";
import order from "./modules/order/order";
import comment from "./modules/comment/comment";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    product,
    supplier,
    category,
    order,
    productDetails,
    comment,
  },
  plugins: [createPersistedState()]
})
