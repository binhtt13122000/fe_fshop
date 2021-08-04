import {
    SET_PAGE,
    SET_PAGES,
    SET_PRODUCT_DETAILS,
    UPDATE_PRODUCT_DETAILS,
    ADD_PRODUCT_DETAILS,
    REMOVE_PRODUCT_DETAILS,
    ACTIVE_PRODUCT_DETAILS,
} from './mutation-type'
export default {
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