import { SET_PAGE, SET_PAGES, SET_SUPPLIERS, ADD_SUPPLIER } from './mutation-type'

export default {
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