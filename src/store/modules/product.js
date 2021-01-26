// import { reject, resolve } from "core-js/fn/promise";
// import { reject } from 'core-js/fn/promise';
import 'es6-promise/auto'
import ProductServices from "../../services/ProductService"

const state = {
    products: [],
    product: [],
    pages: [],
    page: [],
};

const getters = {
    products(state) {
        return state.products
    },
    product(state) {
        return state.product
    },
    pages(state) {
        return state.pages
    },
    page(state) {
        return state.page
    }

};


const mutations = {
    setProducts: (state, val) => {
        state.products = val
    },
    setProduct: (state, val) => {
        state.product = val
    },
    setPages: (state, val) => {
        state.pages = val
    },

    setpage: (state, val) => {
        state.page = val
    }
    
};

const actions = {

    getProducts({ commit }, index) {
        return new Promise((resolve, reject) => {
            ProductServices.getProducts(index).then((resp) => {
                commit("setProducts", resp.data.content)
                commit("setPages", resp.data)
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
            ProductServices.getProductsByProductId(id).then((response) => {
                commit("setProduct", response.data)
                resolve(response)
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations, 
    actions
}