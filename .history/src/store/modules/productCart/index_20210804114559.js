export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            productsDetails: [],
            productDetails: [],
            pages: [],
            page: [],
        }
    },
    getters,
    mutations,
    actions
}