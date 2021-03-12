import { post } from "../utils/apiCaller"

class SupplierService {
    createNewSupplier(credential) {
        return post(`/suppliers`, {}, credential, {});
    }
}

export default new SupplierService();