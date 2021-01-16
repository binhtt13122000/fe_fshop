import {post} from "../utils/apiCaller";
import {get} from "../utils/apiCaller"
class AuthenticationService {
    login(credentials){
        return post("/login", {}, credentials, {})
    }

    getUser(username){
        console.log("api: " + username);
        return get("/users/" + username, {}, {})
    }
    register(credentials) {
        return post("/users/register",{}, credentials, {})
    }

}

export default new AuthenticationService();