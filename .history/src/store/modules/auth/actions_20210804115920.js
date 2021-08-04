export default {

    async logout({ commit, state }) {
        try {
            const username = state.user.userName
            const response = await AuthServices.logout(username);
            if (response.status === 200) {
                await commit(IS_LOGGED_IN, true);
                await commit(LOGOUT);
                return await response.status
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async login({ commit }, credential) {
        try {
            await AuthServices.login(credential);
            const response = await AuthServices.getUser(credential.username);
            if (response.status === 200) {
                await commit(SET_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }

    },

    async banAccount({ commit }, credential) {
        try {
            const response = await AuthServices.banAccount(credential);
            if (response.status === 200) {
                await commit(BAN_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async activeAccount({ commit }, credential) {
        try {
            const response = await AuthServices.activeAccount(credential);
            if (response.status === 200) {
                await commit(ACTIVE_USER, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async getUsers({ commit }, index = 1) {
        try {
            const response = await AuthServices.getUsers(index);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },

    async searchUserByQ({ commit }, credentail) {
        try {
            const response = await AuthServices.searchAccountByQ(credentail.txtSearchAccount, credentail.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }

    },
    async searchUserByStatus({ commit }, credentials) {
        try {
            const response = await AuthServices.searchAccountByStatus(credentials.status, credentials.currentPage);
            if (response.status === 200) {
                await commit(SET_PAGES, response.data);
                await commit(SET_USERS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_USERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },

    async getCart({ commit }, username) {
        try {
            const response = await AuthServices.getCarts(username);
            if (response.status === 200) {
                await commit(IS_LOGGED_IN, true);
                await commit(SET_CARTS, response.data.content);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },
    async getCartDetail({ commit }, credential) {
        try {
            const response = await AuthServices.getCartDetails(credential.idCart, credential.userName)
            if (response.status === 200) {
                await commit(SET_CART_DETAIL, response.data);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            await commit(SET_CART_DETAIL, []);
            return await error.response.status;
        }
    },

    async createNewCart({ commit, state }, newCart) {
        try {
            const name = state.user.userName
            const response = await AuthServices.createNewCart(name, newCart)
            if (response.status === 200) {
                await commit(ADD_NEW_CART, newCart)
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },

    async addProductInCartDetail({ commit }, credential) {
        try {
            const response = await AuthServices.addProductInCartDetail(credential);
            if (response.status === 200) {
                await commit(ADD_PRODUCT_IN_CART, credential);
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

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            AuthServices.register(user).then(resp => {
                    const user = resp.data.user
                    commit(SET_USER, user)
                    resolve(resp)
                })
                .catch(err => {
                    commit(AUTH_ERROR)
                    reject(err)
                })
        })
    },

    async changeQuantityProductInCartDetails({ commit }, credential) {
        try {
            const response = await AuthServices.changeQuantityProductInCartDetail(credential.cartDetailId, credential.productId, credential.productSize,
                credential.quantity, credential.username);
            if (response.status === 200) {
                await commit(CHANGE_QUANTITY_PRODUCT_IN_CART_DETAIL, credential);
                return await response.status;
            } else {
                return await response.status;
            }
        } catch (error) {
            return await error.response.status;
        }
    },


};