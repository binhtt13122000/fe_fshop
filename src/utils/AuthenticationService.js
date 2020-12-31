import {post} from "../utils/apiCaller";
// import API from "../utils/apiCaller";
class AuthenticationService {
    login(credentials){
        return post("/users/login", {}, credentials, {})
    }

    // login(credentials){
    //     return API.post("/users/login", credentials)
    // }
    register(data) {
        return post("/users/register",{}, data, {})
    }


    // login(credentials){
    //     return post("/users/login/", "POST",{}, credentials, {})
    // }

    // register(){
    //     return api().post('/users/register')
    // }
}

export default new AuthenticationService();