import { get, remove, patch } from "../utils/apiCaller"

class ProductService {
    // getProducts(index){
    //     return get("/products?pageIndex="+ index +"&pageSize=9",{},{})
    // }

    getProducts(index, pageSize = 9) {
        return get("/products?pageIndex=" + index + `&pageSize=${pageSize}`, {}, {})
    }

    getProductsByProductId(id) {
        return get("/products/" + id, {}, {});
    }

    searchProductsByQ(txtSearch, index, pageSize = 5) {
        return get(`/products?q=${txtSearch}&pageSize=${pageSize}&pageIndex=${index}`, {}, {});
    }

    searchProductsByStatus(status, index, pageSize = 5) {
        return get(`/products?status=${status}&pageSize=${pageSize}&pageIndex=${index}`, {}, {});
    }

    deleteProduct(productId) {
        return remove(`/products/${productId}`, {}, {})
    }

    activeProduct(productId) {
        return patch(`/products/${productId}`, {}, {})
    }


}


export default new ProductService();