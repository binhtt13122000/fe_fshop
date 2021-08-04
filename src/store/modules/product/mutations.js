import {
    SET_PAGE,
    SET_PAGES,
    SET_PRODUCT,
    SET_PRODUCTS,
    UPDATE_PRODUCT,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    ACTIVE_PRODUCT,
    ACTIVE_PRODUCT_DETAILS,
    REMOVE_PRODUCT_DETAILS,
    ADD_QUANTITY_PRODUCT_DETAILS,
    CREATE_PRODUCT_DETAILS
} from './mutation-type'
export default {
    [SET_PRODUCTS]: (state, val) => {
        state.products = val
    },
    [SET_PRODUCT]: (state, val) => {
        state.product = val
    },
    [SET_PAGES]: (state, val) => {
        state.pages = val
    },

    [SET_PAGE]: (state, val) => {
        state.page = val
    },

    [ADD_PRODUCT]: (state, product) => {
        state.products.push(product)
    },

    [REMOVE_PRODUCT]: (state, id) => {
        const products = state.products;
        const index = products.findIndex(product => product.productId === id);
        products[index].status = -1;
    },

    [ACTIVE_PRODUCT]: (state, pro) => {
        const products = state.products;
        const index = products.findIndex(product => product.productId === pro.productId);
        products[index].status = pro.status;
    },
    [UPDATE_PRODUCT]: (state, newProduct) => {
        const products = [...state.products];
        const index = products.findIndex(product => {
            return product.productId === newProduct.productId;
        })
        state.products[index] = newProduct;

    },
    [REMOVE_PRODUCT_DETAILS]: (state, productDetailSelected) => {
        const products = state.products;
        const index = products.findIndex(products => products.productId === productDetailSelected.proId);
        if (index != -1) {
            const ind = products[index].productDetails.findIndex(prod => prod.proItemId === productDetailSelected.proItemId);
            products[index].productDetails[ind].status = -1;
        }
    },

    [ACTIVE_PRODUCT_DETAILS]: (state, productDetailSelected) => {
        const products = state.products;
        const index = products.findIndex(products => products.productId === productDetailSelected.proId);
        if (index != -1) {
            const ind = products[index].productDetails.findIndex(prod => prod.proItemId === productDetailSelected.proItemId);
            if (productDetailSelected.proQuantity > 0) {
                products[index].productDetails[ind].status = 1;
            } else {
                products[index].productDetails[ind].status = 0;
            }
        }
    },

    [ADD_QUANTITY_PRODUCT_DETAILS]: (state, credential) => {
        const products = state.products;
        const index = products.findIndex(products => products.productId === credential.productId);
        if (index != -1) {
            const ind = products[index].productDetails.findIndex(prod => prod.proItemId === credential.productItemId);
            if (ind != -1) {
                if (products[index].productDetails[ind].proQuantity == 0) {
                    if (products[index].status == 0) {
                        products[index].status = 1;
                    }
                    products[index].productDetails[ind].status = 1;
                }
                products[index].productDetails[ind].proQuantity = Number.parseInt(products[index].productDetails[ind].proQuantity) + Number.parseInt(credential.quantity);
            }
        }
    },

    [CREATE_PRODUCT_DETAILS]: (state, credential) => {
        const products = state.products;
        const index = products.findIndex(products => products.productId === credential.proId);
        if (index != -1) {
            const ind = products[index].productDetails.findIndex(prod => prod.proId === credential.proId && prod.proSize === credential.proSize);
            if (ind != -1) {
                if (products[index].status == 0) {
                    products[index].status = 1;
                }
                products[index].productDetails[ind].status = 1;
                products[index].productDetails[ind].proQuantity = credential.proQuantity;
            } else {
                if (products[index].status == 0) {
                    products[index].status = 1;
                }
                products[index].productDetails.push(credential);
            }
        }
    }
};