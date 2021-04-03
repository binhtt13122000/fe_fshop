import { get, post } from "../utils/apiCaller"

class SupplierService {
    createNewSupplier(credential) {
        return post(`/suppliers`, {}, credential, {});
    }

    getSuppliers(searchSupplier, pageIndex, pageSize = 5) {
        return get(`/suppliers?supplierName=${searchSupplier}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {}, {});
    }
}

export default new SupplierService();