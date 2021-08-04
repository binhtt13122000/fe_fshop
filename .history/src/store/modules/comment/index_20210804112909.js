export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state() {
        return {
            comments: [],
            comment: [],
            pages: [],
            page: [],
        }
    },
    getters,
    mutations,
    actions
}