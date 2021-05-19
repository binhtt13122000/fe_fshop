import ProductServices from "../../../services/ProductService"
import ProductCartService from "../../../services/ProductCartService"
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

const state = {
    products: [],
    product: [],
    pages: [],
    page: [],
};

const getters = {
    products(state) {
        return state.products
    },
    product(state) {
        return state.product
    },
    pages(state) {
        return state.pages
    },
    page(state) {
        return state.page
    },
};


const mutations = {
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

const actions = {

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

export default {
    namespaced: true, // giup nhan biet dispatch, phan biet den store nao
    state,
    getters,
    mutations,
    actions
}