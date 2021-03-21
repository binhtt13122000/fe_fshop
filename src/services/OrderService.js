import { post } from "../utils/apiCaller"

class OrderService {
    createNewOrderByProduct(productId, productSize, productQuantity, username, credential) {
        return post(`/orders/products/${productId}/${productSize}/${productQuantity}?username=${username}`,
            {}, credential);
    }

    createNewOrderByCart(cartId, username, credential) {
        return post(`/orders/carts/${cartId}?username=${username}`, {}, credential);
    }
}


export default new OrderService();