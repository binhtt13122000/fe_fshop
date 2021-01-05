import {post} from "../utils/apiCaller";
class AuthenticationService {
    login(credentials){
        return post("/login", {}, credentials, {})
    }
    register(credentials) {
        return post("/users/register",{}, credentials, {})
    }

}

export default new AuthenticationService();