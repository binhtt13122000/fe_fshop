
import {get} from "../utils/apiCaller"
// import api from "../utils/apiCaller"
class ProductService {
    getProducts(){
        return get("/products",{},{})
    }
    getProductsById(id){
        return get("/products/",{},id)
    }
    // getProduction(){
    //     return api.get("/products",{},{},{})
    // }

}

export default new ProductService();