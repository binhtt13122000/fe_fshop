// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from 'core-js/fn/promise';
import 'es6-promise/auto'
import AuthServices from "../../services/AuthenticationService"
// import ProductServices from "../../services/ProductService"
// import axios from 'axios';
const state = {
    user: {},
    cart: [],
    carts: [],
    cartDetail: []
};
const getters = {
    user(state) {
        return state.user;
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
    setCarts: (state, val) => {
        state.carts = val
    },
    setCart: (state, val) => {
        state.cart = val
    },
    setCartDetail: (state, val) => {
        state.cartDetail = val
    },
    auth_error: (state) => {
        state.status = 'error'
    },
    logout: (state) => {
        state.status = ''
    },
    removeFromFavourite: (state, id) => {
        state.products.forEach(el => {
            //   if (id === el.id) {
            //     el.isFavourite = false;
            //   }
            if (id) {
                el.isFavourite = false;
            }
        });
    },
};
const actions = {
    // login({ commit }, credentials) {
    //     AuthServices.login(credentials)
    //         .then(res => {
    //             console.log(res.status);
    //             if (res.status === 200) {
    //                 //get user detail
    //                 AuthServices.getUser(credentials.username)
    //                     .then(response => {
    //                         console.log("Oke");
    //                         console.log(response.data);

    //                         commit('setUser', response.data)
    //                         console.log(state.user.userName);
    //                         // get Cart

    //                         AuthServices.getCarts(credentials.username)
    //                             .then(res1 => {
    //                                 commit("setCarts", res1.data.content)
    //                                 // localStorage.setItem('setCarts', res1.data.content)
    //                                 console.log(res1.data.content);
    //                                 console.log(state.user.userName);
    //                             }).catch(ex => {
    //                                 console.log(ex)
    //                             })
    //                     })
    //                     .catch(ex => {
    //                         console.log(ex)
    //                     })
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // },

    async login({ commit }, credential) {
        await AuthServices.login(credential);
        const response = await AuthServices.getUser(credential.username);
        if (response.status === 200) {
            console.log(response.data)
            await commit("setUser", response.data);
            const responseforCart = await AuthServices.getCarts(credential.username);
            if (responseforCart.status === 200) {
                console.log(responseforCart);
                console.log("cart respon");
                console.log(responseforCart.data.content);
                return await commit("setCarts", responseforCart.data.content);

                // const responseForCartDetail = await AuthServices.getCartDetails()
            }
            throw new Error(responseforCart.status)
        }
        throw new Error(response.status);

    },
    // async getCartDetail({ commit }, cardId) {

    //     const response = await AuthServices.getCartDetails(cardId, username)
    //     if(response.status === 200){
    //         console.log(response.data.content)
            
    //         response.data.content.forEach(e => {
    //             console.log(e);
    //         });
    //         return await commit("setCartDetail", response.data.content);
    //     }
        
    //     throw new Error(response.status);

    // },
    // async getCartDetail1({ commit }, cardId, userName) {
    //     const response = await AuthServices.getCartDetails(cardId, userName)
    //     if(response.status === 200){
    //         console.log(response.data.content)
            
    //         response.data.content.forEach(e => {
    //             console.log(e);
    //         });
    //         return await commit("setCartDetail", response.data.content);
    //     }
        
    //     throw new Error(response.status);

    // },

    getCartDetail({ commit }) {
        return new Promise((resolve, reject) => {
            AuthServices.getCartDetails('CART_0020', 'nhanltse140784').then(resp => {
                commit("setCartDetail", resp.data.content);
                console.log(resp.data.content)
                resolve(resp)
            })
                .catch(err => {
                    reject(err)
                })
        })
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

