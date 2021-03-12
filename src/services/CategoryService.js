import { post } from "../utils/apiCaller"

class CategoryService {
    createNewCategory(credential) {
        return post(`/categories`, {}, credential, {});
    }
}

export default new CategoryService();