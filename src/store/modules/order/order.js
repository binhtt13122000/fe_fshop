import OrderService from "../../../services/OrderService"
import {
    SET_PAGES, SET_PAGE, SET_ORDERS, CREATE_ORDERS, REMOVE_ORDERS, DELETE_ORDER, CONFIRM_ORDER, GET_ORDER_DETAILS, SET_MAX_QUANTITY
} from './mutation-type'

const state = {
    orders: [],
    maxQuantity: 1,
    pages: [],
    page: [],
    order: [],
    status: null,
    orderDetails: [],
};

const getters = {
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
    orderDetails: state => {
        return state.orderDetails;
    },
    maxQuantity: state => {
        return state.maxQuantity;
    }
};


const mutations = {
    [SET_MAX_QUANTITY]: (state, val) => {
        state.maxQuantity = val;
    },

    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },

    [CREATE_ORDERS]: (state, credential) => {
        const order = state.orders;
        order.push(credential);
    },
    [REMOVE_ORDERS]: (state) => {
        state.orders = [];
    },
    [SET_ORDERS]: (state, val) => {
        state.orders = val;
    },

    [DELETE_ORDER]: (state, credential) => {
        const orders = state.orders;
        let index = orders.findIndex(order => order.orderId === credential.orderId);
        if (index != -1) {
            orders[index].status = -1;
        }
    },

    [CONFIRM_ORDER]: (state, credential) => {
        const orders = state.orders;
        let index = orders.findIndex(order => order.orderId === credential.orderId);
        if (index != -1) {
            orders[index].status = 1;
        }
    },

    [GET_ORDER_DETAILS]: (state, val) => {
        state.orderDetails = val;
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
    },

    async getOrders({ commit }, credential) {
        try {
            const response = await OrderService.getOrders(credential.username, credential.status, credential.dateFrom,
                credential.dateTo, credential.pageIndex);
            console.log(response);
            if (response.status === 200) {
                await commit(SET_ORDERS, response.data.content);
                return await commit(SET_PAGES, response.data);
            }
        } catch (error) {
            await commit(SET_ORDERS, []);
            await commit(SET_PAGES, []);
        }
    },

    async removeOrderByOrderId({ commit }, credential) {
        const response = await OrderService.deleteOrder(credential.username, credential.orderId);
        if (response.status === 200) {
            await commit(DELETE_ORDER, credential);
        }
        throw new Error(response.status);
    },

    async confirmOrder({ commit }, credential) {
        const response = await OrderService.confirmOrder(credential.username, credential.orderId);
        if (response.status === 200) {
            await commit(CONFIRM_ORDER, credential);
            await commit(GET_ORDER_DETAILS, []);
        }
        throw new Error(response.status);
    },

    async getOrderDetailByOrderId({ commit }, credential) {
        try {
            const response = await OrderService.getOrderDetailsByOrderId(credential.username, credential.orderId);
            if (response.status === 200) {
                return await commit(GET_ORDER_DETAILS, response.data);
            }
        } catch (error) {
            await commit(GET_ORDER_DETAILS, []);
        }
    },
    async setMaxQuantity({ commit }, value) {
        await commit(SET_MAX_QUANTITY, value);
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}