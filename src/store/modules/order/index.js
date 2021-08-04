import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            orders: [],
            maxQuantity: 1,
            pages: [],
            page: [],
            order: [],
            status: null,
            orderDetails: [],
        }
    },
    getters,
    mutations,
    actions
}