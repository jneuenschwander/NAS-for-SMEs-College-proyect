import axios from 'axios';
import URL from '../configuration/enviroment';
class Auth {
    constructor(){
        this.URL = URL.base + URL.auth;
    }
    async Login(username, password) {
        const opt = {
            method:'POST',
            url:this.URL + 'login',
            headers:{'Content-Type':'application/json'},
            data:{
                username:username,
                password:password
            }
        }
    
        
           return axios(
                opt
            )
        
        
    }

    async CreateUser(username, email, name, type_user, maxsize, access_token){

        const opt = {
            method:'POST',
            url:this.URL,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${access_token}`

            },
            data:{
                username,
                email,
                name,
                type_user,
                maxsize
            }
        }
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    whoIAm(){
        const loggedIn = localStorage.getItem('user');
        return loggedIn ? JSON.parse(loggedIn).type_user : null;
    }

    isRol(rol){ 
        const loggedIn = localStorage.getItem('user');
        return loggedIn ? JSON.parse(loggedIn).type_user == rol: null;

    }
    async changePasswd(password){
        const user = this.getUser();
        const opt = {
            method:'PUT',
            url:this.URL + 'changepasswd',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                password:password
            }
        }
    
        
           return axios(
                opt
            )
    }

    async forgotPasswd(email){
        const opt = {
            method:'POST',
            url:this.URL + 'forgot',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                email:email
            }
        }
    
        
           return axios(
                opt
            )
    }

    async restorePasswd(token, password){
        const opt = {
            method:'PUT',
            url:this.URL + 'restore',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            data:{
                password:password
            }
        }
    
        
           return axios(
                opt
            )
    }
}

export default new Auth();
