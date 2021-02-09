import ProductServices from "../../../services/ProductService"
import { SET_PAGE, SET_PAGES, SET_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT } from './mutation-type'

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
    },

    [ADD_PRODUCT]: (state, product) => {
        state.products.push(product)
    },

    [REMOVE_PRODUCT]: (state, id) => {
        const products = [...state.products];
        const deletedProducts = products.filter(product => {
            return product.productId !== id; 
        })
        state.products = deletedProducts;
    },

    [UPDATE_PRODUCT]: (state, newProduct) => {
        const products = [...state.products];
        const index = products.findIndex(product => {
            return product.productId === newProduct.productId; 
        })
        state.products[index] = newProduct;
        
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

    async addProductToList({commit}, newProduct){
        const response = await ProductServices.addProduct(newProduct);
        if(response.status === 200){
            commit(ADD_PRODUCT, newProduct);
        }
        throw new Error(response.status)
    },

    async deleteProductFromList({commit}, id){
        const response = await ProductServices.deleteProduct(id);
        if(response.status === 200){
            commit(REMOVE_PRODUCT, id);
        }
        throw new Error(response.status)
    },

    async updateProductOfList({commit}, newProduct){
        const response = await ProductServices.updateProduct(newProduct);
        if(response.status === 200){
            commit(UPDATE_PRODUCT, newProduct);
        }
        throw new Error(response.status)
    },
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}