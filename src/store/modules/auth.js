import 'es6-promise/auto'
// import router from '../../router/index.js';
import AuthServices from "../../services/AuthenticationService"
const state = {
    user: {},
    userInfo: {
        isLoggedIn: false,
        isSignedUp: false
    },
    cart: [],
    carts: [],
    cartDetail: []
};
const getters = {
    user(state) {
        return state.user;
    },
    isUserLoggedIn: state => {
        return state.userInfo.isLoggedIn;
    },
    carts(state) {
        console.log(state.carts);
        return state.carts
    },
    cart(state) {
        return state.cart
    },
    cartDetail(state) {
        return state.cartDetail
    }
};
const mutations = {
    auth_request: (state) => {
        state.status = 'loading'
    },
    addNewCart: (state, val) => {
        state.carts.push(val)
    },
    setUser: (state, val) => {
        state.user = val
    },
    isUserLoggedIn: (state, isUserLoggedIn) => {
        state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
        state.userInfo.isSignedUp = isSignedUp;
    },
    setCarts: (state, val) => {
        state.carts = val
    },
    setCart: (state, val) => {
        state.cart = val
    },
    setCartDetail: (state, val) => {
        state.cartDetail = val
    },
    delCartDetail: (state) => {
        state.cartDetail = ''
    },
    auth_error: (state) => {
        state.status = 'error'
    },
    logout: (state) => {
        state.user = ''
    },
    removeFromFavourite: (state, id) => {
        state.products.forEach(el => {
            if (id) {
                el.isFavourite = false;
            }
        });
    },
};
const actions = {

    async logout({ commit, state }) {
        const username = state.user.userName
        const response = await AuthServices.logout(username);
        if (response.status === 200) {
            await commit("isUserLoggedIn", true);
            return await commit("logout")
        }
        throw new Error(response.status)
    },

    async login({ commit }, credential) {
        await AuthServices.login(credential);
        const response = await AuthServices.getUser(credential.username);
        if (response.status === 200) {
            return await commit("setUser", response.data);
        }
        throw new Error(response.status);

    },

    // const responseforCart = await AuthServices.getCarts(credential.username);
    // if (responseforCart.status === 200) {
    //     console.log(responseforCart);
    //     console.log("cart respon");
    //     console.log(responseforCart.data.content);
    //     await commit("isUserLoggedIn", true);
    //     return await commit("setCarts", responseforCart.data.content);

    //     // const responseForCartDetail = await AuthServices.getCartDetails()
    // }
    // throw new Error(responseforCart.status)

    async getCart({ commit }, username) {
        const response = await AuthServices.getCarts(username);
        if (response.status === 200) {
            await commit("isUserLoggedIn", true);
            return await commit("setCarts", response.data.content);
        }
        throw new Error(response.status)
    },
    async getCartDetail({ commit }, cardId, username) {
        const response = await AuthServices.getCartDetails(cardId, username)
        if (response.status === 200) {
            return await commit("setCartDetail", response.data.content);
        }

        throw new Error(response.status);

    },

    async createNewCart({ commit, state }, newCart) {
        console.log("create new cart store vuex");
        const name = state.user.userName
        const response = await AuthServices.createNewCart(name, newCart)
        if (response.status === 200) {
            return await commit("addNewCart", newCart)
        }
    },

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            AuthServices.register(user).then(resp => {
                const user = resp.data.user
                commit('setUser', user)
                resolve(resp)
            })
                .catch(err => {
                    commit('auth_error')
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

