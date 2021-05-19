import {get, remove, patch, put, post } from "../utils/apiCaller"

class ProductService {

    getProductDetails(index, pageSize = 9) {
        return get("/products?pageIndex=" + index + `&pageSize=${pageSize}`, {}, {})
    }

    getProductsByProductId(id) {
        return get("/products/" + id, {}, {});
    }

    deleteProductDetails(productDetailId) {
        return remove(`/products/productDetails/${productDetailId}`, {}, {})
    }

    activeProductDetails(productDetailId) {
        return patch(`/products/productDetails/${productDetailId}`, {}, {})
    }

    addQuantityProductDetails(productId, productSize, quantity) {
        return put(`/products/${productId}/${productSize}/${quantity}`);
    }

    createProductDetails(productId, credential) {
        return post(`/products/${productId}/productDetails`, {}, credential, {});
    }
}


export default new ProductService();