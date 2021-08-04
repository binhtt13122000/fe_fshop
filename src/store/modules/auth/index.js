import getters from './getters'
import mutations from './mutations';
import actions from './actions';

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            user: {},
            userInfo: {
                isLoggedIn: false,
                isSignedUp: false
            },
            users: [],
            cart: [],
            carts: [],
            cartDetail: [],
            status: null,
            pages: [],
            page: [],
            totalCart: "",
        };
    },
    getters,
    mutations,
    actions,
}