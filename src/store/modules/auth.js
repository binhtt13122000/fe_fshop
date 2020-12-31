import AuthServices from "../../utils/AuthenticationService"
// import axios from 'axios';
const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
};
const getters = {};
const mutations = {
    auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
    DO_SOMETHING() {
        console.log("baby oi")
    }
};
const actions = {
    async login({commit}, credentials) {
        try {
            const response = await AuthServices.login(credentials)
            console.log(response)
            commit("DO_SOMETHING")
        } catch (error) {
               console.log(error.response)
        }
    },
    async register({commit}, credentials) {
        try {
            const response = await AuthServices.register(credentials)
            console.log(response)
            commit("DO_SOMETHING")
        } catch(error){
            console.log(error.response)
        }
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}