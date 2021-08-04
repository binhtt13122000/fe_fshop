import Vue from 'vue'
import Vuex from 'vuex'

// import AuthStore from "./modules/auth"
// import ProStore from "./modules/auth"
import auth from "./modules/auth"
import product from "./modules/product/product"
import supplier from "./modules/supplier/supplier"
import createPersistedState from 'vuex-persistedstate';
import category from "./modules/category/index";
import productDetails from "./modules/productCart/productCart";
import order from "./modules/order/order";
import voucher from './modules/voucher/voucher';
import comment from "./modules/comment/index";
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        product,
        supplier,
        category,
        order,
        productDetails,
        voucher,
        comment,
    },
    plugins: [createPersistedState()]
})