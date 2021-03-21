import OrderService from "../../../services/OrderService"
import {
    CREATE_ORDERS, REMOVE_ORDERS
} from './mutation-type'

const state = {
    products: [],
    product: [],
    pages: [],
    page: [],
    orders: [],
    status: null,
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
    },
    orders(state) {
        return state.orders
    },
    status: state => {
        return state.status;
    },
};


const mutations = {
    [CREATE_ORDERS]: (state, credential) => {
        const order = state.orders;
        order.push(credential);
    },
    [REMOVE_ORDERS]: (state) => {
        state.orders = [];
    },
    setStatus(state, status) {
        state.status = status;
    },
    clearStatus(state) {
        state.status = null;
    },
};

const actions = {

    async createOrders({ commit }, credential) {
        try {
            const credentials = {
                name: credential.name,
                phoneNumber: credential.phoneNumber,
                email: credential.email,
                country: credential.country,
                address: credential.address,
            };
            const response = await OrderService.createNewOrderByProduct(credential.productId, credential.productSize, credential.productQuantity,
                credential.username, credentials);
            console.log(response);
            if (response.status === 200) {
                await commit(CREATE_ORDERS, credentials);
                await commit('setStatus', response.status);
            }
        } catch (err) {
            await commit('setStatus', 400);
        }
    },

    async createOrdersByCart({ commit }, credential) {
        try {
            const credentials = {
                name: credential.name,
                phoneNumber: credential.phoneNumber,
                email: credential.email,
                country: credential.country,
                address: credential.address,
            };
            const response = await OrderService.createNewOrderByCart(credential.cartId,
                credential.username, credentials);
            console.log(response);
            if (response.status === 200) {
                await commit(REMOVE_ORDERS, credentials);
                await commit('setStatus', response.status);
            }
        } catch (err) {
            await commit('setStatus', 400);
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