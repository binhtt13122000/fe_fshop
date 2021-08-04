export default {
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