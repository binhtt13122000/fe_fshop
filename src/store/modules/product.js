// import { reject, resolve } from "core-js/fn/promise";
import 'es6-promise/auto'
import ProductServices from "../../services/ProductService"

const state = {
    products: [],
    product: [],
    productPro: [],
    cart: [],
};

const getters = {
    products(state) {
        return state.products
    },
    product(state) {
        return state.product
    },
    productPro(state) {
        return state.productPro
    },
    cart(state) {
        return state.cart
    }
};


const mutations = {
    setProducts: (state, val) => {
        state.products = val
    },
    setProduct: (state, val) => {
        state.product = val
    },
    setActiveProduct(state, product) {
        state.activeProduct = product
        },
    setPro: (state, val) => {
        state.productPro = val
    },
    setCart: (state, val) => {
        state.cart = val
    }
};

const actions = {

    getProducts({ commit }) {
        return new Promise((resolve, reject) => {
            console.log("Nhanle");
            ProductServices.getProducts().then((resp) => {
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

    productDetails({ commit }, id) {
        return new Promise((resolve, reject) => {
            console.log(id)
            ProductServices.getProDetails(id).then((response) => {
                console.log(response.data[0])
                console.log(response.data[1])
                console.log(response.data[2])
                console.log(response.data[3])
                console.log(id)
                commit("setProduct", [])
                console.log(state.product)
                commit("setProduct", response.data[0])
                console.log(state.product)
                resolve(response)
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }


};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}