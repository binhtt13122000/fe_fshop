import SupplierService from "../../../services/SupplierService";
import { SET_PAGES, SET_SUPPLIERS, ADD_SUPPLIER } from './mutation-type'

export default {
    async addNewSupplier({ commit }, credential) {
        try {
            const response = await SupplierService.createNewSupplier(credential);
            if (response.status === 200) {
                await commit(ADD_SUPPLIER, response.data);
                return await response.status
            } else {
                return await response.status
            }
        } catch (error) {
            console.log(error);
            return await error.response.status;
        }
    },
    async getSuppliers({ commit }, credential) {
        try {
            const response = await SupplierService.getSuppliers(credential.txtSearchSupplier, credential.currentPage);
            if (response.status === 200) {
                await commit(SET_SUPPLIERS, response.data.content);
                await commit(SET_PAGES, response.data);
                return await response.status;
            } else {
                return await response.status
            }
        } catch (error) {
            await commit(SET_SUPPLIERS, []);
            await commit(SET_PAGES, []);
            return await error.response.status;
        }
    },
};