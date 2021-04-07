import { get, post } from "../utils/apiCaller"

class VoucherService {
    createNewSupplier(credential) {
        return post(`/suppliers`, {}, credential, {});
    }

    getVouchers(username) {
        return get(`/users/${username}/promotions`, {}, {});
    }
    getVoucherById(username, voucherId) {
        return get(`/users/${username}/promotions/${voucherId}`, {}, {});
    }
}

export default new VoucherService();