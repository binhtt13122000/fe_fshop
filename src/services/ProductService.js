
import {get} from "../utils/apiCaller"
class ProductService {
    getProducts(){
        return get("/products",{},{})
    }

    getProductsByProductId(id){
        return get("/products/"+id, {}, {});
    }
    
    getCart(username){
        return get("/carts/"+username,{},{});
    }
}

export default new ProductService();