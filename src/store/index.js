// import axios from 'axios'
// import { reject, resolve } from 'core-js/fn/promise'
// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     status: '',
//     token: localStorage.getItem('token') || '',
//     user: {}
//   },
//   mutations: {
//     auth_request(state){
//       state.status = 'loading'
//     },
//     auth_success(state, token, user){
//       state.status = 'success'
//       state.status = token
//       state.status = user
//     },
//     auth_error(state){
//       state.status = 'error'
//     },
//     logout(state){
//       state.status = ''
//       state.status = ''
//     }
//   },
//   actions: {
//     login({commit}, user){
//       return new Promise((resolve, reject) => {
//         commit('auth_request')
//         axios({url: 'http://localhost:8082/v1/api/user/login', data: user, method: 'POST'})
//         .then(resp => {
//           const token = resp.data.token
//           const user = resp.data.user
//           localStorage.setItem('token', token)
//           axios.defaults.headers.common['Authorization'] = token
//           commit('auth_success', token, user)
//           resolve(resp)
//         })
//         .catch(err => {
//           commit('auth_error')
//           localStorage.removeItem('token')
//           reject(err)
//         })
//       })
//     },
//     register({commit}, user){
//       return new Promist((resolve, reject) => {
//         commit('auth_request')
//         axios({url: 'http://localhost:8082/v1/api/users/register', data: user, method: 'POST'})
//         .then(resp => {
//           const token = resp.data.token
//           const user = resp.data.user
//           localStorage.setItem('token', token)
//           axios.defaults.headers.common['Authorization'] = token
//           commit('auth_success', token, user)
//           resolve(resp)
//         })
//         .catch(err => {
//           commit('auth_error', err)
//           localStorage.removeItem('token')
//           reject(err)
//         })
//       })
//     },
//     logout({commit}){
//       return new Promise((resolve, reject) => {
//         commit('logout')
//         localStorage.removeItem('token')
//         delete axios.defaults.headers.common['Authorization']
//         resolve()
//       })
//     }
//   },
//   modules: {
//   },
//   getters : {
//     isValid:  state =>  !!state.token,
//     authStatus: state => state.status,
//   }
// })
