// import { reject, resolve } from "core-js/fn/promise";
// import { reject } from 'core-js/fn/promise';
import 'es6-promise/auto'
import ProductServices from "../../services/ProductService"

const state = {
    products: [],
    product: [],
    pages: [],
    cart: [],
};

const getters = {
    products(state) {
        return state.products
    },
    product(state) {
        return state.product
    },
    cart(state) {
        return state.cart
    },
    pages(state) {
        return state.pages
    }

};


const mutations = {
    setProducts: (state, val) => {
        state.products = val
    },
    setProduct: (state, val) => {
        state.product = val
    },
    setCart: (state, val) => {
        state.cart = val
    },
    setPages: (state, val) => {
        state.pages = val
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

    getCarts({commit}, id) {
        return new Promise((resolve, reject) => {
            console.log(id)
            ProductServices.getCart(id).then((response)=> {
                console.log(response.data)
                commit("setCart", response.data.content)
                resolve(response)
            }) .catch(err => {
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