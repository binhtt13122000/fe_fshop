import Vue from 'vue'
import Vuex from 'vuex'

// import AuthStore from "./modules/auth"
// import ProStore from "./modules/auth"
import auth from "./modules/auth/index"
import product from "./modules/product/index"
import supplier from "./modules/supplier/index"
import createPersistedState from 'vuex-persistedstate';
import category from "./modules/category/index";
import productDetails from "./modules/productCart/index";
import order from "./modules/order/index";
import voucher from './modules/voucher/index';
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