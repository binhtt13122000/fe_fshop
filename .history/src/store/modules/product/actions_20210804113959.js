export default {

    async deleteProductDetail({ commit }, productDetailSelected) {
        try {
            const response = await ProductCartService.deleteProductDetails(productDetailSelected.proItemId);
            if (response.status === 200) {
                await commit(REMOVE_PRODUCT_DETAILS, productDetailSelected);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async activeProductDetailFromList({ commit }, productDetailSelected) {
        try {
            const response = await ProductCartService.activeProductDetails(productDetailSelected.proItemId);
            if (response.status === 200) {
                await commit(ACTIVE_PRODUCT_DETAILS, productDetailSelected);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async getProducts({ commit }, index) {
        try {
            const response = await ProductServices.getProducts(index);
            if (response.status === 200) {
                await commit(SET_PRODUCTS, response.data.content);
                await commit(SET_PAGES, response.data)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async productDetails({ commit }, id) {
        try {
            const response = await ProductServices.getProductsByProductId(id);
            if (response.status === 200) {
                commit(SET_PRODUCT, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async addProductToList({ commit }, newProduct) {
        try {
            const response = await ProductServices.addProduct(newProduct);
            if (response.status === 200) {
                commit(ADD_PRODUCT, newProduct);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async deleteProductFromList({ commit }, id) {
        try {
            const response = await ProductServices.deleteProduct(id);
            if (response.status === 200) {
                await commit(REMOVE_PRODUCT, id);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async activeProductFromList({ commit }, id) {
        try {
            const response = await ProductServices.activeProduct(id);
            if (response.status === 200) {
                await commit(ACTIVE_PRODUCT, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async updateProductOfList({ commit }, newProduct) {
        try {
            const response = await ProductServices.updateProduct(newProduct);
            if (response.status === 200) {
                commit(UPDATE_PRODUCT, newProduct);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },
    async searchProductsByQ({ commit }, credential) {
        try {
            const response = await ProductServices.searchProductsByQ(credential.txtSearch, credential.currentPage);
            if (response.status === 200) {
                await commit(SET_PRODUCTS, response.data.content);
                await commit(SET_PAGES, response.data)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_PAGES, []);
            await commit(SET_PRODUCTS, []);
            return await error.response.status;
        }
    },
    async searchProductsByStatus({ commit }, credential) {
        try {
            const response = await ProductServices.searchProductsByStatus(credential.status, credential.currentPage);
            if (response.status === 200) {
                await commit(SET_PRODUCTS, response.data.content);
                await commit(SET_PAGES, response.data)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_PAGES, []);
            await commit(SET_PRODUCTS, []);
            return await error.response.status;
        }
    },

    async addQuantityProductDetail({ commit }, credential) {
        try {
            const response = await ProductCartService.addQuantityProductDetails(credential.productId, credential.productSize, credential.quantity);
            if (response.status === 200) {
                await commit(ADD_QUANTITY_PRODUCT_DETAILS, credential);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async createProductDetail({ commit }, credential) {
        try {
            const response = await ProductCartService.createProductDetails(credential.productId, credential);
            if (response.status === 200) {
                await commit(CREATE_PRODUCT_DETAILS, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },


};