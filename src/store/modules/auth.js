// import { reject, resolve } from "core-js/fn/promise";
// import { resolve } from 'core-js/fn/promise';
// import 'es6-promise/auto'
import AuthServices from "../../services/AuthenticationService"
// import axios from 'axios';
const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
};
const getters = {};
const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, user) {
        state.status = 'success'
        state.user = user
    },
    auth_error(state) {
        state.status = 'error'
    },
    logout(state) {
        state.status = ''
        state.token = ''
    },
    DO_SOMETHING() {
        console.log("baby oi")
    }
};
const actions = {
    login({commit}, credentials){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            AuthServices.login(credentials).then(resp => {
                const user = resp.data.credentials
                commit('auth_success', user)
                console.log(resp)
                resolve(resp)
            })
            .catch(err => {
                commit('auth_error')
                reject(err)
            })
        })
    },

    register({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            AuthServices.register(user).then(resp => {
                const user = resp.data.user
                commit('auth_success', user)
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
    state,
    getters,
    mutations,
    actions
}

