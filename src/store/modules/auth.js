import AuthServices from "../../utils/AuthenticationService"

const state = {};
const getters = {};
const mutations = {
    DO_SOMETHING(){
        console.log('function from muatations')
    }
};
const actions = {
    async login({commit}, credentials) {
        // AuthServices.login()
        try {
        console.log("Response 123123......");
        const response = await AuthServices.login(credentials)
        console.log("Response......");
        console.log(response);
        console.log(credentials.username, credentials.password);
        commit("DO_SOMETHING")
        } catch(e){
            console.log(e.response)
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