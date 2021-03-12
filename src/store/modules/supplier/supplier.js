import SupplierService from "../../../services/SupplierService";
import { SET_PAGE, SET_PAGES, SET_SUPPLIERS, ADD_SUPPLIER } from './mutation-type'

const state = {
    suppliers: [],
    pages: [],
    page: [],
};

const getters = {
    suppliers(state) {
        return state.suppliers
    },
    pages(state) {
        return state.pages
    },
    page(state) {
        return state.page
    }

};


const mutations = {
    [SET_SUPPLIERS]: (state, val) => {
        state.suppliers = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },

    [ADD_SUPPLIER]: (state, supplier) => {
        state.products.push(supplier)
    },

};

const actions = {
    async createNewSupplier({ commit }, credential) {
        console.log("abc")
        const response = await SupplierService.createNewSupplier(credential);
        if (response.status === 200) {
            await commit([ADD_SUPPLIER], response.data.content);
            return await commit([SET_PAGES], response.data);
        }
        throw new Error(response);
    }
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}