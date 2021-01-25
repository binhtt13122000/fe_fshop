import { post } from "../utils/apiCaller";
import { get } from "../utils/apiCaller"
class AuthenticationService {


    // login 
    login(credentials) {
        return post("/login", {}, credentials, {})
    }
    //http://localhost:8082/v1/api/users/danhpv/logout
    logout(username){
        return post("/users/"+username+"/logout");
    }

    register(credentials) {
        return post("/users/register", {}, credentials, {})
    }


    getUser(username) {
        console.log("api: " + username);
        return get("/users/" + username, {}, {})
    }
    getCarts(username) {
        return get("/carts/users/" + username, {}, {});
    }
    // cart
    //"http://localhost:8082/v1/api/carts/users/nhanltse140784"
    createNewCart(username, newCarts) {
        return post("/carts/users/"+username,{},newCarts,{});
    }


    getCartDetails(cardId, username) {
        return get("/carts/" + cardId + "/users/" + username + "/cartDetails", {}, {});
    }

    addProductInCartDetails(cartId, username, productId, cartSize, cartQuantity) {
        return post("/carts/" + cartId + "/users/" + username + "/cartDetails?productId=" + productId + "&cartSize=" + cartSize + "&cartQuantity=" + cartQuantity, {}, {}, {});
    }

}

export default new AuthenticationService();