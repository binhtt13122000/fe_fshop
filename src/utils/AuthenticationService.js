import { post } from "../utils/apiCaller";

class AuthenticationService {
    login(body){
        return post("/users/login", {}, body, {})
    }

    register(data){
        return post("/users/register", {}, data, {})
    }
}

export default new AuthenticationService();