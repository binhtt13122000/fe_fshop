// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from 'core-js/fn/promise';
import 'es6-promise/auto'
import AuthServices from "../../services/AuthenticationService"
// import ProductServices from "../../services/ProductService"
// import axios from 'axios';
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

    async logout({commit}, username){
        const response = await AuthServices.logout(username);
        if(response.status === 200) {
            console.log(response.data)
            await commit("isUserLoggedIn", true);
            return await commit("logout")
        }
        throw new Error(response.status)
    },

    async login({ commit }, credential) {
        await AuthServices.login(credential);
        const response = await AuthServices.getUser(credential.username);
        if (response.status === 200) {
            console.log(response.data)
            return await commit("setUser", response.data);
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
        }
        throw new Error(response.status);

    },

    async getCart({commit}, username){
        const response =  await AuthServices.getCarts(username);
        if(response.status === 200){
            console.log(response);
            console.log("cart response");
            console.log(response.data.content);
            await commit("isUserLoggedIn", true);
            return await commit("setCarts", response.data.content);

            // const responseForCartDetail = await AuthServices.getCartDetails()
        }
        throw new Error(response.status)
    },
    async getCartDetail({ commit }, cardId, username) {
        const respons1 = await commit("delCartDetail")
        console.log("cart detail ben auth"+ respons1);
        const response = await AuthServices.getCartDetails(cardId, username)
        if(response.status === 200){
            console.log(response.data.content)

            response.data.content.forEach(e => {
                console.log(e);
            });
            return await commit("setCartDetail", response.data.content);
        }

        throw new Error(response.status);

    },

    // getCartDetail({ commit }) {
    //     return new Promise((resolve, reject) => {
    //         AuthServices.getCartDetails('CART_0020', 'nhanltse140784').then(resp => {
    //             commit("setCartDetail", resp.data.content);
    //             console.log(resp.data.content)
    //             resolve(resp)
    //         })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //     })
    // },

    async createNewCart( username, newCart) {
        const response = await AuthServices.createNewCart(username, newCart)
        if(response.status === 200){
            console.log(response);
        }
    },

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            AuthServices.register(user).then(resp => {
                const user = resp.data.user
                commit('setUser', user)
                console.log(resp)
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

