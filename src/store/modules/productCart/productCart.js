import ProductCartService from "../../../services/ProductCartService"
import {
    SET_PAGE,
    SET_PAGES,
    SET_PRODUCT_DETAILS,
    UPDATE_PRODUCT_DETAILS,
    ADD_PRODUCT_DETAILS,
    REMOVE_PRODUCT_DETAILS,
    ACTIVE_PRODUCT_DETAILS,
} from './mutation-type'

const state = {
    productsDetails: [],
    productDetails: [],
    pages: [],
    page: [],
};

const getters = {
    productsDetails(state) {
        return state.productDetails
    },
    productDetails(state) {
        return state.productDetails
    },
    pages(state) {
        return state.pages
    },
    page(state) {
        return state.page
    },
};


const mutations = {
    [SET_PRODUCT_DETAILS]: (state, val) => {
        state.productDetails = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },

    [ADD_PRODUCT_DETAILS]: (state, productD) => {
        state.productDetails.push(productD)
    },

    [REMOVE_PRODUCT_DETAILS]: (state, productDetailSelected) => {
        const productDetails = state.productsDetails;
        const index = productDetails.findIndex(productsDetails => productsDetails.proItemId === productDetailSelected.proItemId);
        if (index != -1) {
            productDetails[index].status = -1;
        } else {
            productDetailSelected.status = -1;
            productDetails.push(productDetailSelected);
        }
    },

    [ACTIVE_PRODUCT_DETAILS]: (state, productDetailSelected) => {
        const productDetails = state.productsDetails;
        const index = productDetails.findIndex(productDetails => productDetails.proItemId === productDetailSelected.proItemId);
        if (index != -1) {
            if (productDetailSelected.proQuantity > 0) {
                productDetails[index].status = 1;
            } else {
                productDetails[index].status = 0;
            }
        } else {
            if (productDetailSelected.proQuantity > 0) {
                productDetailSelected.status = 1;
            } else {
                productDetailSelected.status = 0;
            }
            productDetails.push(productDetailSelected);
        }
    },
    [UPDATE_PRODUCT_DETAILS]: (state, newProduct) => {
        const productDetails = [...state.productDetails];
        const index = productDetails.findIndex(productDetails => {
            return productDetails.proItemId === newProduct.proItemId;
        })
        state.productDetails[index] = newProduct;

    },


};

const actions = {

    async deleteProductDetail({ commit }, productDetailSelected) {
        try {
            const response = await ProductCartService.deleteProductDetails(productDetailSelected.proItemId);
            if (response.status === 200) {
                await commit(REMOVE_PRODUCT_DETAILS, productDetailSelected);
                return await response.status
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

};

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}