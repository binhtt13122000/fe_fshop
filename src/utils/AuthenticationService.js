import  api  from "../utils/apiCaller";

class AuthenticationService {
    login(){
        // return api("/users/login", {}, {
        
        // }, {})
        return api().post('/users/login')
    }

    register(){
        return api().post('/users/register')
    }
}

export default new AuthenticationService();