import ProductCartService from "../../../services/ProductCartService"
import {
    REMOVE_PRODUCT_DETAILS,
    ACTIVE_PRODUCT_DETAILS,
} from './mutation-type'
export default {

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