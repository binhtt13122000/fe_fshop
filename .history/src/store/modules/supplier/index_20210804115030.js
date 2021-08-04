export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            suppliers: [],
            pages: [],
            page: [],
        };
    },
    getters,
    mutations,
    actions
}