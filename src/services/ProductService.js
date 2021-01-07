
import {get} from "../utils/apiCaller"

class ProductService {
    getProducts(){
        return get("/products",{},{})
    }

}

export default new ProductService();