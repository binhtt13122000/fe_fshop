
import {get, post, put} from "../utils/apiCaller"
class ProductService {
    // getProducts(index){
    //     return get("/products?pageIndex="+ index +"&pageSize=9",{},{})
    // }

    getProducts(index, pageSize = 9){
        return get("/products?pageIndex="+ index +`&pageSize=${pageSize}`,{},{})
    }

    getProductsByProductId(id){
        return get("/products/"+id, {}, {});
    }

    addProduct(newProduct){
        return post();
    }

    updateProduct(updateProduct){
        return put();
    }

    deleteProduct(id){
        put();
    }
}


export default new ProductService();