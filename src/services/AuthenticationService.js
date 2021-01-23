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

    getCartDetails(cardId, username) {
        return get("/carts/"+cardId +"/users/"+ username +"/cartDetails", {}, {});
    }
    
    addProductInCartDetails(cartId, username, productId,cartSize, cartQuantity){
        return post("/carts/"+cartId+"/users/"+username+"/cartDetails?productId="+productId+"&cartSize="+cartSize+"&cartQuantity="+cartQuantity, {}, {}, {});
    }

}

export default new AuthenticationService();