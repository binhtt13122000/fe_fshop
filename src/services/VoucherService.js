import { get, post } from "../utils/apiCaller"

class VoucherService {
    createVoucher(username, credential) {
        return post(`/users/${username}/promotions`, {}, credential, {});
    }

    getVouchers(username) {
        return get(`/users/${username}/promotions`, {}, {});
    }
    getVoucherById(username, voucherId) {
        return get(`/users/${username}/promotions/${voucherId}`, {}, {});
    }
}

export default new VoucherService();