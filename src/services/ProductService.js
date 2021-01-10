
import {get} from "../utils/apiCaller"
class ProductService {
    getProducts(){
        return get("/products",{},{})
    }

    getProductsByProductId(id){
        return get("/products/"+id, {}, {});
    }
}

export default new ProductService();