import {
    SET_PAGES,
    SET_PAGE,
    SET_ORDERS,
    CREATE_ORDERS,
    REMOVE_ORDERS,
    DELETE_ORDER,
    CONFIRM_ORDER,
    GET_ORDER_DETAILS,
    SET_MAX_QUANTITY
} from './mutation-type'
export default {
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