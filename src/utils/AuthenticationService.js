import  {post}  from "../utils/apiCaller";

class AuthenticationService {
    // login(credentials){
    //     return post("/users/login/", "POST",{}, {username: credentials.username, password: credentials.password}, {})
    // }

    login(credentials){
        return post("/users/login/", "POST",{}, credentials, {})
    }

    // register(){
    //     return api().post('/users/register')
    // }
}

export default new AuthenticationService();