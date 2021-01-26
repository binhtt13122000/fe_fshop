import { post } from "../utils/apiCaller";
import { get } from "../utils/apiCaller"
class AuthenticationService {


    // login 
    login(credentials) {
        return post("/login", {}, credentials, {})
    }
    logout(username){
        return post("/users/"+username+"/logout");
    }

    register(credentials) {
        return post("/users/register", {}, credentials, {})
    }


    getUser(username) {
        return get("/users/" + username, {}, {})
    }
    getCarts(username) {
        return get("/carts/users/" + username, {}, {});
    }
    // cart
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