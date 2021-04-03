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

    getCarts(username, index = 1, pageSize = 10) {
        return get(`/carts/users/${username}?pageIndex=${index}&pageSize=${pageSize}`, {}, {});
    }
    // cart
    createNewCart(username, newCarts) {
        return post("/carts/users/" + username, {}, newCarts, {});
    }


    getCartDetails(cardId, username) {
        return get("/carts/" + cardId + "/users/" + username + "/cartDetails", {}, {});
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

    addProductInCartDetail(credential) {
        return post(`/carts/${credential.cartId}/users/${credential.username}/cartDetails?productId=${credential.productId}&cartSize=${credential.cartSize}
        &cartQuantity=${credential.cartQuantity}`, {}, {});
    }

    changeQuantityProductInCartDetail(cartDetailId, productId, productSize, quantity, username) {
        return put(`/cartDetails/${cartDetailId}/products/${productId}/${productSize}/${quantity}/users/${username}`)
    }
}

export default new AuthenticationService();