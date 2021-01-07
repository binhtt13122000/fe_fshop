// import { reject, resolve } from "core-js/fn/promise";
import 'es6-promise/auto'
import ProductServices from "../../services/ProductService"

const state = {
    products: [],
    product: [],
    // cart: [],
};

const getters = {
    products(state) {
        return state.products
    },
    product(state) {
        return state.product
    },
    // cart(state) {
    //     return state.cart
    // }
};


const mutations = {
    setProducts: (state, val) => {
        return state.products = val
    },
    setProduct: (state, val) => {
        return state.product = val
    },
    // setCart: (state, val) => {
    //     return state.cart = val
    // }
};

const actions = {

    getProducts({commit}) {
        return new Promise((resolve, reject) => {
            console.log("Nhanle");
            ProductServices.getProducts().then(resp => {
                console.log(resp)
                console.log("Nhanle123");
                commit("setProducts", resp.data)
                console.log("Nhanle11");
                resolve(resp)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },

    // productDetails({commit}, id) {
    //     return new Promise((resolve, reject) => {
    //         ProductServices.getProductsById(id).then(resp => {
    //             console.log(resp)
    //             commit("setProducts", resp.data[0])
    //             resolve(resp)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             reject(err)
    //         })
    //     })
    // }
    

};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}