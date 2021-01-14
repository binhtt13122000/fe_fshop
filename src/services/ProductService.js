
import {get} from "../utils/apiCaller"
class ProductService {
    getProducts(){
        return get("/products",{},{})
    }

    getProductsByProductId(id){
        return get("/products/"+id, {}, {});
    }
    
    getCart(username){
        return get("/carts/users/"+username,{},{});
    }
}

export default new ProductService();