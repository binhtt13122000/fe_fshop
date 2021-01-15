
import {get} from "../utils/apiCaller"
class ProductService {
    getProducts(index){
        return get("/products?pageIndex="+ index +"&pageSize=9",{},{})
    }

    getProductsByProductId(id){
        return get("/products/"+id, {}, {});
    }
    
    getCart(username){
        return get("/carts/users/"+username,{},{});
    }
}

export default new ProductService();