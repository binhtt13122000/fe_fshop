import ProductService from "../../utils/ProductService"

const state = {
    products: [],
    product: [],
    cart: [],
};

const getters = {
    products: state => {
        return state.products
    },
    product: state => {
        return state.product
    },
    cart: state => {
        return state.cart
    }
};


const mutations = {
    setProducts: (state, val) => {
        return state.products = val
    },
    setProduct: (state, val) => {
        return state.product = val
    },
    setCart: (state, val) => {
        return state.cart = val
    }
};

const actions = {
    async getProducts({ commit }) {
        try {
            const response = await ProductService.getProducts()
            console.log(response)
            commit("setProducts", response.data)
        } catch (error) {
            console.log(error.response)
        }
    },

    async prodcutDetails({ commit }, id) {
        try {
            const response = await ProductService.getProductsById(id)
            console.log(response)
            commit("setProduct", response.data[0])
        } catch (error) {
            console.log(error.response)
        }
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}