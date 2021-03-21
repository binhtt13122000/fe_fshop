import 'es6-promise/auto'
// import router from '../../router/index.js';
import AuthServices from "../../services/AuthenticationService"
import {
    AUTH_REQUEST, ADD_NEW_CART, SET_USER, SET_USERS, IS_LOGGED_IN, IS_SIGNED_UP,
    SET_CARTS, SET_CART, SET_CART_DETAIL, DELETE_CART_DETAIL, AUTH_ERROR, LOGOUT, REMOVE_FAVORITE, SET_PAGES, SET_PAGE,
    BAN_USER, ACTIVE_USER, ADD_PRODUCT_IN_CART
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
    pages: [],
    page: [],
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
        console.log(state.users)
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
    },
    [DELETE_CART_DETAIL]: (state) => {
        state.cartDetail = ''
    },
    [ADD_PRODUCT_IN_CART]: (state, credential) => {
        const carts = state.carts;
        console.log(carts);
        const index = carts.findIndex(cart => credential.cartId === cart.cartId);
        if (index != -1) {
            // const ind = carts[index].findIndex(cartDetail => cartDetail.productId === credential.productId && cartDetail.proQuantity === credential.cartQuantity);
            // if (ind != -1) {
            console.log(123)
            // }
        }
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    [LOGOUT]: (state) => {
        state.user = ''
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
    }
};
const actions = {

    async logout({ commit, state }) {
        const username = state.user.userName
        const response = await AuthServices.logout(username);
        if (response.status === 200) {
            await commit(IS_LOGGED_IN, true);
            return await commit(LOGOUT)
        }
        throw new Error(response.status)
    },

    async login({ commit }, credential) {
        await AuthServices.login(credential);
        const response = await AuthServices.getUser(credential.username);
        if (response.status === 200) {
            return await commit(SET_USER, response.data);
        }
        throw new Error(response.status);

    },

    async banAccount({ commit }, credential) {
        const response = await AuthServices.banAccount(credential);
        if (response.status === 200) {
            return await commit(BAN_USER, response.data);
        }
        throw new Error(response.status);
    },

    async activeAccount({ commit }, credential) {
        const response = await AuthServices.activeAccount(credential);
        if (response.status === 200) {
            return await commit(ACTIVE_USER, response.data);
        }
        throw new Error(response.status);
    },

    async getUsers({ commit }, index = 1) {
        try {
            const response = await AuthServices.getUsers(index);
            console.log(response.data)
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                return await commit(SET_USERS, response.data.content);
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
        }
    },

    async searchUserByQ({ commit }, credentail) {
        try {
            const response = await AuthServices.searchAccountByQ(credentail.txtSearchAccount, credentail.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                return await commit(SET_USERS, response.data.content);
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
        }

    },
    async searchUserByStatus({ commit }, credentials) {
        try {
            const response = await AuthServices.searchAccountByStatus(credentials.status, credentials.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                return await commit(SET_USERS, response.data.content);
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
        }
    },

    async getCart({ commit }, username) {
        const response = await AuthServices.getCarts(username);
        console.log(response);
        if (response.status === 200) {
            await commit(IS_LOGGED_IN, true);
            return await commit(SET_CARTS, response.data.content);
        }
        throw new Error(response.status)
    },
    async getCartDetail({ commit }, credential) {
        try {
            const response = await AuthServices.getCartDetails(credential.idCart, credential.userName)
            console.log(response);
            if (response.status === 200) {
                return await commit(SET_CART_DETAIL, response.data);
            }
        }
        catch (error) {
            return await commit(SET_CART_DETAIL, []);
        }
    },

    async createNewCart({ commit, state }, newCart) {
        const name = state.user.userName
        const response = await AuthServices.createNewCart(name, newCart)
        if (response.status === 200) {
            return await commit(ADD_NEW_CART, newCart)
        }
    },

    async addProductInCartDetail({ commit }, credential) {
        console.log(credential);
        const response = await AuthServices.addProductInCartDetail(credential);
        if (response.status === 200) {
            await commit(ADD_PRODUCT_IN_CART, credential);
        }
        throw new Error(response.status);
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
    }

};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    getters,
    mutations,
    actions,
    state,
}

