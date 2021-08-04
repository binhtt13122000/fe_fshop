export default {
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