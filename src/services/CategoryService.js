import { get, post } from "../utils/apiCaller"

class CategoryService {
    createNewCategory(credential) {
        return post(`/categories`, {}, credential, {});
    }

    getCategories(searchName, pageIndex, pageSize = 5) {
        return get(`/categories?proTypeName=${searchName}&pageIndex=${pageIndex}&pageSize=${pageSize}`, {}, {});
    }
}

export default new CategoryService();