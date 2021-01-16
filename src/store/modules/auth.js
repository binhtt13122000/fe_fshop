// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from 'core-js/fn/promise';
import 'es6-promise/auto'
import AuthServices from "../../services/AuthenticationService"
// import axios from 'axios';
const state = {
    user: {}
};
const getters = {
    user(state) {
        console.log(state.user);
        return state.user;
    }
};
const mutations = {
    auth_request: (state) => {
        state.status = 'loading'
    },
    setUser: (state, val) => {
        state.user = val
    },
    auth_error: (state) =>{
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
    login({commit}, credentials){
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            AuthServices.login(credentials).then(resp => {
                console.log("Login");
                console.log(resp.status);
                console.log(resp.data);
                console.log(resp);
                // console.log(credentials);
                // actions.getUser(credentials.username)
                // console.log(resp.data);
                // console.log(state.user);
                resolve(resp)
            })
            .catch(err => {
                commit('auth_error')
                reject(err)
            })
        })
    },
    getUser({commit}, username){
        return new Promise((resolve, reject) => {
            AuthServices.getUser(username).then(resp => {
                console.log("get user");
                console.log(resp.data);
                commit('setUser', resp.data)
                resolve(resp)
            }). catch(err => {
                commit('auth_error')
                reject(err)
            })
        })
    },

    register({commit}, user){
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

