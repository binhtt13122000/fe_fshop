export default {

    async createOrders({ commit }, credential) {
        try {
            const credentials = {
                name: credential.name,
                phoneNumber: credential.phoneNumber,
                email: credential.email,
                country: credential.country,
                address: credential.address,
            };
            const response = await OrderService.createNewOrderByProduct(credential.productId, credential.productSize, credential.productQuantity,
                credential.username, credential.promotionId, credentials);
            if (response.status === 200) {
                await commit(CREATE_ORDERS, credentials);
                await commit('setStatus', response.status);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (err) {
            await commit('setStatus', 400);
            return await err.response.status;
        }
    },

    async createOrdersByCart({ commit }, credential) {
        try {
            const credentials = {
                name: credential.name,
                phoneNumber: credential.phoneNumber,
                email: credential.email,
                country: credential.country,
                address: credential.address,
                promotionId: credential.promotionId,
            };
            const response = await OrderService.createNewOrderByCart(credential.cartId,
                credential.username, credentials);
            if (response.status === 200) {
                await commit(REMOVE_ORDERS, credentials);
                await commit('setStatus', response.status);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (err) {
            await commit('setStatus', 400);
            return await err.response.status;
        }
    },

    async getOrders({ commit }, credential) {
        try {
            const response = await OrderService.getOrders(credential.username, credential.status, credential.dateFrom,
                credential.dateTo, credential.pageIndex);
            if (response.status === 200) {
                await commit(SET_ORDERS, response.data.content);
                await commit('setStatus', response.status);
                await commit(SET_PAGES, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_ORDERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },

    async removeOrderByOrderId({ commit }, credential) {
        try {
            const response = await OrderService.deleteOrder(credential.username, credential.orderId);
            if (response.status === 200) {
                await commit(DELETE_ORDER, credential);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async confirmOrder({ commit }, credential) {
        try {
            const response = await OrderService.confirmOrder(credential.username, credential.orderId);
            if (response.status === 200) {
                await commit(CONFIRM_ORDER, credential);
                await commit(GET_ORDER_DETAILS, []);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async getOrderDetailByOrderId({ commit }, credential) {
        try {
            const response = await OrderService.getOrderDetailsByOrderId(credential.username, credential.orderId);
            if (response.status === 200) {
                await commit(GET_ORDER_DETAILS, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(GET_ORDER_DETAILS, []);
            return await error.response.status;
        }
    },
    async setMaxQuantity({ commit }, value) {
        await commit(SET_MAX_QUANTITY, value);
    }
};