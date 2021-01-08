
import {get} from "../utils/apiCaller"
import axios from 'axios';
class ProductService {
    getProducts(){
        return get("/products",{},{})
    }

    getProductsByProductId(id){
        return get("/products", {}, {id});
    }

    getProDetails(id){
        return axios.get('/products/', {
            params: {
              id
            }
          })   
    }
}

export default new ProductService();