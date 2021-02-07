import ProductServices from "../../services/ProductService"
import { SET_PAGE, SET_PAGES, SET_PRODUCT, SET_PRODUCTS } from './product/mutation-type'

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
    [SET_PRODUCTS]: (state, val) => {
        state.products = val
    },
    [SET_PRODUCT]: (state, val) => {
        state.product = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    }

};

const actions = {

    async getProducts({ commit }, index) {
            const response = await ProductServices.getProducts(index);
            if (response.status === 200) {
                await commit(SET_PRODUCTS, response.data.content);
                return await commit(SET_PAGES, response.data)
            }
            throw new Error(response.status);
        // return new Promise((resolve, reject) => {
        //     ProductServices.getProducts(index).then((resp) => {
        //         commit("setProducts", resp.data.content)
        //         commit("setPages", resp.data)
        //         resolve(resp)
        //     })
        //         .catch(err => {
        //             console.log(err)
        //             reject(err)
        //         })
        // })
    },

    async productDetails({ commit }, id) {
        const response = await ProductServices.getProductsByProductId(id);
        if(response.status === 200){
            return commit(SET_PRODUCT, response.data);
        }
        throw new Error(response.status);
        // return new Promise((resolve, reject) => {
        //     ProductServices.getProductsByProductId(id).then((response) => {
        //         commit("setProduct", response.data)
        //         resolve(response)
        //     })
        //         .catch(err => {
        //             console.log(err)
        //             reject(err)
        //         })
        // })
    },
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}