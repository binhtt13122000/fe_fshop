import 'es6-promise/auto'
import {
    AUTH_REQUEST,
    ADD_NEW_CART,
    SET_USER,
    SET_USERS,
    IS_LOGGED_IN,
    IS_SIGNED_UP,
    SET_CARTS,
    SET_CART,
    SET_CART_DETAIL,
    DELETE_CART_DETAIL,
    AUTH_ERROR,
    LOGOUT,
    REMOVE_FAVORITE,
    SET_PAGES,
    SET_PAGE,
    BAN_USER,
    ACTIVE_USER,
    ADD_PRODUCT_IN_CART,
    CHANGE_QUANTITY_PRODUCT_IN_CART_DETAIL,
} from './mutation-type';
export default {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [ADD_NEW_CART]: (state, val) => {
        state.carts.push(val)
    },
    [SET_USER]: (state, val) => {
        state.user = val
    },
    [SET_USERS]: (state, val) => {
        state.users = val
    },
    [IS_LOGGED_IN]: (state, isUserLoggedIn) => {
        state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    [IS_SIGNED_UP]: (state, isSignedUp) => {
        state.userInfo.isSignedUp = isSignedUp;
    },

    [SET_CARTS]: (state, val) => {
        state.carts = val
    },
    [SET_CART]: (state, val) => {
        state.cart = val
    },
    [SET_CART_DETAIL]: (state, val) => {
        state.cartDetail = val
        val.forEach(el => {
            state.totalCart = el.cart.cartTotal;
            return state.totalCart;
        });
    },
    [DELETE_CART_DETAIL]: (state) => {
        state.cartDetail = ''
    },
    [ADD_PRODUCT_IN_CART]: (state, credential) => {
        const carts = state.carts;
        const index = carts.findIndex(cart => credential.cartId === cart.cartId);
        if (index != -1) {
            console.log(123)
        }
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    [LOGOUT]: (state) => {
        state.user = '';
        state.cart = '';
        state.cartDetail = '';
        state.carts = '';
    },
    [REMOVE_FAVORITE]: (state, id) => {
        state.products.forEach(el => {
            if (id) {
                el.isFavourite = false;
            }
        });
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },
    [BAN_USER]: (state, response) => {
        const users = state.users;
        const index = users.findIndex(user => user.userId === response.userId);
        users[index].status = 0;
    },
    [ACTIVE_USER]: (state, response) => {
        const users = state.users;
        const index = users.findIndex(user => user.userId === response.userId);
        users[index].status = 1;
    },
    [CHANGE_QUANTITY_PRODUCT_IN_CART_DETAIL]: (state, credential) => {
        const cartDetails = state.cartDetail;
        const index = cartDetails.findIndex(cartDetail => cartDetail.cartItemId === credential.cartDetailId);
        if (index != -1) {
            const totalBefore = cartDetails[index].cart.cartTotal;
            const priceBofore = cartDetails[index].cartQuantity * cartDetails[index].cartItemPrice;
            cartDetails[index].cartQuantity = credential.quantity;
            const priceAfter = cartDetails[index].cartQuantity * cartDetails[index].cartItemPrice;
            const totalAfter = totalBefore - priceBofore + priceAfter;
            state.totalCart = totalAfter;
            cartDetails.forEach(el => {
                el.cart.cartTotal = totalAfter;
            })
        }
    },
    setStatus(state, status) {
        state.status = status;
    },
    clearStatus(state) {
        state.status = null;
    },
};