import { post, put } from "../utils/apiCaller";
import { get } from "../utils/apiCaller"
class AuthenticationService {


    // login 
    login(credentials) {
        return post("/login", {}, credentials, {})
    }
    logout(username) {
        return post("/users/" + username + "/logout");
    }

    register(credentials) {
        return post("/users/register", {}, credentials, {})
    }


    getUser(username) {
        return get("/users/" + username, {}, {})
    }

    getUsers(index, pageSize = 5) {
        return get(`/users?pageIndex=${index}&pageSize=${pageSize}`, {}, {})
    }

    getCarts(username) {
        return get("/carts/users/" + username, {}, {});
    }
    // cart
    createNewCart(username, newCarts) {
        return post("/carts/users/" + username, {}, newCarts, {});
    }


    getCartDetails(cardId, username) {
        return get("/carts/" + cardId + "/users/" + username + "/cartDetails", {}, {});
    }

    addProductInCartDetails(cartId, username, productId, cartSize, cartQuantity) {
        return post("/carts/" + cartId + "/users/" + username + "/cartDetails?productId=" + productId + "&cartSize=" + cartSize + "&cartQuantity=" + cartQuantity, {}, {}, {});
    }

    banAccount(username) {
        return put(`/users/${username}/ban_account`);
    }

    activeAccount(username) {
        return put(`/users/${username}/active_account`);
    }

    searchAccountByQ(txtSearch, index, pageSize = 5) {
        return get(`/users?q=${txtSearch}&pageSize=${pageSize}&pageIndex=${index}`, {}, {});
    }

    searchAccountByStatus(status, index, pageSize = 5) {
        return get(`/users?status=${status}&pageSize=${pageSize}&pageIndex=${index}`, {}, {});
    }
}

export default new AuthenticationService();