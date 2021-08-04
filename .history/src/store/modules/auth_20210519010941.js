import 'es6-promise/auto'
// import router from '../../router/index.js';
import AuthServices from "../../services/AuthenticationService"
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
const state = {
    user: {},
    userInfo: {
        isLoggedIn: false,
        isSignedUp: false
    },
    users: [],
    cart: [],
    carts: [],
    cartDetail: [],
    status: null,
    pages: [],
    page: [],
    totalCart: "",
};
const getters = {
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
const mutations = {
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
const actions = {

    async logout({ commit, state }) {
        try {
            const username = state.user.userName
            const response = await AuthServices.logout(username);
            if (response.status === 200) {
                await commit(IS_LOGGED_IN, true);
                await commit(LOGOUT);
                return await response.status
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async login({ commit }, credential) {
        try {
            await AuthServices.login(credential);
            const response = await AuthServices.getUser(credential.username);
            if (response.status === 200) {
                await commit(SET_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }

    },

    async banAccount({ commit }, credential) {
        try {
            const response = await AuthServices.banAccount(credential);
            if (response.status === 200) {
                await commit(BAN_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async activeAccount({ commit }, credential) {
        try {
            const response = await AuthServices.activeAccount(credential);
            if (response.status === 200) {
                await commit(ACTIVE_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async getUsers({ commit }, index = 1) {
        try {
            const response = await AuthServices.getUsers(index);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },

    async searchUserByQ({ commit }, credentail) {
        try {
            const response = await AuthServices.searchAccountByQ(credentail.txtSearchAccount, credentail.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }

    },
    async searchUserByStatus({ commit }, credentials) {
        try {
            const response = await AuthServices.searchAccountByStatus(credentials.status, credentials.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },

    async getCart({ commit }, username) {
        try {
            const response = await AuthServices.getCarts(username);
            if (response.status === 200) {
                await commit(IS_LOGGED_IN, true);
                await commit(SET_CARTS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },
    async getCartDetail({ commit }, credential) {
        try {
            const response = await AuthServices.getCartDetails(credential.idCart, credential.userName)
            if (response.status === 200) {
                await commit(SET_CART_DETAIL, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_CART_DETAIL, []);
            return await error.response.status;
        }
    },

    async createNewCart({ commit, state }, newCart) {
        try {
            const name = state.user.userName
            const response = await AuthServices.createNewCart(name, newCart)
            if (response.status === 200) {
                await commit(ADD_NEW_CART, newCart)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async addProductInCartDetail({ commit }, credential) {
        try {
            const response = await AuthServices.addProductInCartDetail(credential);
            if (response.status === 200) {
                await commit(ADD_PRODUCT_IN_CART, credential);
                await commit('setStatus', response.status);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (err) {
            await commit('setStatus', 400);
            return await err.response.status;
        }
    },

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            AuthServices.register(user).then(resp => {
                    const user = resp.data.user
                    commit(SET_USER, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit(AUTH_ERROR)
                    reject(err)
                })
        })
    },

    async changeQuantityProductInCartDetails({ commit }, credential) {
        try {
            const response = await AuthServices.changeQuantityProductInCartDetail(credential.cartDetailId, credential.productId, credential.productSize,
                credential.quantity, credential.username);
            if (response.status === 200) {
                await commit(CHANGE_QUANTITY_PRODUCT_IN_CART_DETAIL, credential);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },


};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    getters,
    mutations,
    actions,
    state,
}