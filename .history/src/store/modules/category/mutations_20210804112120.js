export default {
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