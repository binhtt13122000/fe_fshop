import CategoryService from "../../../services/CategoryService";
import { SET_PAGE, SET_PAGES, SET_CATEGORIES, ADD_CATEGORY } from './mutation-type'

const state = {
    categories: [],
    pages: [],
    page: [],
};

const getters = {
    categories(state) {
        return state.categories
    },
    pagesCategory(state) {
        return state.pages
    },
    page(state) {
        return state.page
    }

};


const mutations = {
    [SET_CATEGORIES]: (state, val) => {
        state.categories = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },

    [ADD_CATEGORY]: (state, category) => {
        state.categories.push(category)
    },

};

const actions = {
    async createNewCategory({ commit }, credential) {
        try {
            const response = await CategoryService.createNewCategory(credential);
            if (response.status === 200) {
                await commit(ADD_CATEGORY, response.data.content);
                await commit(SET_PAGES, response.data);
                return response.status
            } else {
                return response.status;
            }
        } catch (error) {
            return error.response.status;
        }
    },

    async getCategories({ commit }, credential) {
        try {
            const response = await CategoryService.getCategories(credential.txtSearchCategory, credential.currentPage);
            if (response.status === 200) {
                await commit(SET_CATEGORIES, response.data.content);
                await commit(SET_PAGES, response.data);
                return response.status;
            } else {
                return response.status;
            }
        } catch (error) {
            await commit(SET_CATEGORIES, []);
            await commit(SET_PAGES, []);
            return error.response.status;
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