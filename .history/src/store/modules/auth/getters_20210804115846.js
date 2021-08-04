export default {
    user(state) {
        return state.user;
    },
    users(state) {
        return state.users;
    },
    isUserLoggedIn: state => {
        return state.userInfo.isLoggedIn;
    },
    carts(state) {
        return state.carts
    },
    cart(state) {
        return state.cart
    },
    cartDetail(state) {
        return state.cartDetail
    },
    pages(state) {
        return state.pages
    },
    page(state) {
        return state.page
    },
    status: state => {
        return state.status;
    },
    totalCart(state) {
        state.cartDetail.forEach(el => {
            state.totalCart = el.cart.cartTotal;
            return state.totalCart;
        });
    },
};