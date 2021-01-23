import {post} from "../utils/apiCaller";
import {get} from "../utils/apiCaller"
class AuthenticationService {
    login(credentials){
        return post("/login", {}, credentials, {})
    }

    getUser(username){
        console.log("api: " + username);
        return get("/users/" + username, {}, {})
    }
    register(credentials) {
        return post("/users/register",{}, credentials, {})
    }
        
    getCarts(username){
        return get("/carts/users/"+username,{},{});
    }


    //http://localhost:8082/v1/api/carts/USER_0019_CART_0020/users/nhanltse140784/cartDetails
    getCartDetails(cardId, username) {
        return get("/carts/"+cardId +"/users/"+ username +"/cartDetails", {}, {});
    }

}

export default new AuthenticationService();