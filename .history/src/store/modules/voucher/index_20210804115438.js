import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            vouchers: [],
            pages: "",
        };
    },
    getters,
    mutations,
    actions
}