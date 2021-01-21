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
            console.log("Nhanle");
            ProductServices.getProducts(index).then((resp) => {
                // console.log(resp)
                // console.log(resp.data.content)
                console.log(resp.data)
                commit("setProducts", resp.data.content)
                commit("setPages", resp.data)
                console.log(state.pages.totalPages);
                // console.log(state.pages);
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
            ProductServices.getProductsByProductId(id).then((response) => {
                console.log(response.data)
                console.log(response)
                console.log(id)
                commit("setProduct", response.data)
                console.log(state.product);
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