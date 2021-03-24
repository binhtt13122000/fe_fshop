import { get, post, put, remove } from "../utils/apiCaller"

class OrderService {
    createNewOrderByProduct(productId, productSize, productQuantity, username, credential) {
        return post(`/orders/products/${productId}/${productSize}/${productQuantity}?username=${username}`,
            {}, credential);
    }

    createNewOrderByCart(cartId, username, credential) {
        return post(`/orders/carts/${cartId}?username=${username}`, {}, credential);
    }

    getOrders(username, priceFrom, priceTo, dateFrom, dateTo, pageIndex, pageSize = 8) {
        return get(`/orders?username=${username}&dateFrom=${dateFrom}&dateTo=${dateTo}&priceFrom=${priceFrom}&priceTo=${priceTo}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }

    deleteOrder(username, orderId) {
        return remove(`/users/${username}/orders/${orderId}`);
    }

    confirmOrder(username, orderId) {
        return put(`/users/${username}/orders/${orderId}`);
    }

    getOrderDetailsByOrderId(username, orderId) {
        return get(`/orders/${orderId}/orderDetails?userName=${username}`);
    }
}


export default new OrderService();