
import {get} from "../utils/apiCaller"
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
}


export default new ProductService();