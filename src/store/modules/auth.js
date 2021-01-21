// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from 'core-js/fn/promise';
import 'es6-promise/auto'
import AuthServices from "../../services/AuthenticationService"
// import ProductServices from "../../services/ProductService"
// import axios from 'axios';
const state = {
    user: [],
    cart: [],
    carts: [    {
        "cartId": "USER_0019_CART_0020",
        "cartDescription": "Cart Pant6",
        "cartTotal": 0,
        "createTime": "2021-11-03T13:26:27.273+00:00",
        "status": 1,
        "userId": "USER_0019"
      },
      {
        "cartId": "USER_0019_CART_0021",
        "cartDescription": "Cart Pant8",
        "cartTotal": 1236,
        "createTime": "2021-10-03T13:26:32.583+00:00",
        "status": 1,
        "userId": "USER_0019"
      },
      {
        "cartId": "USER_0019_CART_0022",
        "cartDescription": "Cart Pant98",
        "cartTotal": 1235,
        "createTime": "2021-09-03T13:26:37.793+00:00",
        "status": 1,
        "userId": "USER_0019"
      },
      {
        "cartId": "USER_0019_CART_0023",
        "cartDescription": "Cart Pant981",
        "cartTotal": 1234,
        "createTime": "2021-08-03T13:27:38.990+00:00",
        "status": 1,
        "userId": "USER_0019"
      }]
    
};
const getters = {
    user(state) {
        return state.user;
    },
    carts(state) {
        return state.carts
    },
    cart(state) {
        return state.cart
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
    login({ commit }, credentials) {
        AuthServices.login(credentials)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    console.log()
                    console.log(res.data.token);
                    let d = new Date();
                    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                    let expires = "expires=" + d.toUTCString();
                    document.cookie =
                      "Token=" + res.data.token + ";" + expires + ";path=/";
                    console.log(document.cookie);
                    AuthServices.getUser(credentials.username)
                        .then(response => {
                            console.log("Oke");
                            console.log(response.data);

                            commit('setUser', response.data)
                            console.log(state.user.userName);
                            // ProductServices.getCarts(state.user.userName)
                            // .then(res1 => {
                            //     commit("setCarts", res1.data.content)
                            //     localStorage.setItem('setCarts', res1.data.content)
                            //     console.log(res1.data.content);
                            //     console.log(state.carts.length);
                            // }).catch(ex => {
                            //     console.log(ex)
                            // })
                        })
                        .catch(ex => {
                            console.log(ex)
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    // getCarts({commit}) {
    //     return new Promise((resolve, reject) => {
    //         ProductServices.getCarts(state.user.userName).then((response)=> {
    //             console.log("Cart")
    //             console.log(response.data.content)
    //             commit("setCarts", response.data.content)
    //             resolve(response)
    //         }) .catch(err => {
    //             console.log(err)
    //             reject(err)
    //         })
    //     })
    // },
    // getUser({ commit }, username) {
    //     return new Promise((resolve, reject) => {
    //         AuthServices.getUser(username).then(resp => {
    //             console.log("get user");
    //             // console.log(resp.data);
    //             commit('setUser', resp.data)
    //             resolve(resp)
    //         }).catch(err => {
    //             commit('auth_error')
    //             reject(err)
    //         })
    //     })
    // },

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

