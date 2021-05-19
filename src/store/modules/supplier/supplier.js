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
    pagesSupplier(state) {
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
        state.suppliers.push(supplier)
    },

};

const actions = {
    async addNewSupplier({ commit }, credential) {
        try {
            const response = await SupplierService.createNewSupplier(credential);
            if (response.status === 200) {
                await commit(ADD_SUPPLIER, response.data);
                return await response.status
            } else {
                return await response.status
            }
        } catch (error) {
            console.log(error);
            return await error.response.status;
        }
    },
    async getSuppliers({ commit }, credential) {
        try {
            const response = await SupplierService.getSuppliers(credential.txtSearchSupplier, credential.currentPage);
            if (response.status === 200) {
                await commit(SET_SUPPLIERS, response.data.content);
                await commit(SET_PAGES, response.data);
                return await response.status;
            } else {
                return await response.status
            }
        } catch (error) {
            await commit(SET_SUPPLIERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },
};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}