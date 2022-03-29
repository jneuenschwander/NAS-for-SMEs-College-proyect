import axios from 'axios';
import Auth from './auth';
import URL_p from '../configuration/enviroment';

class Admin{
    constructor(){
        this.URL = URL_p.base + URL_p.admin;
    }
    async getUser(){
        const user = Auth.getUser();
        
        const opt = {
            method:'GET',
            url:this.URL + 'users',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
        }
        
        return axios(
            opt 
            
    
        )
    }
    async CreateUser(username, email, name, type_user, maxsize){
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:this.URL+ 'createuser',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`

            },
            data:{
                username,
                email,
                name,
                type_user,
                maxsize
            }
            
        }
        return axios(
            opt 
            
    
        )
    }
    async DeleteUser(Id){
        const user = Auth.getUser();
        const opt = {
            method:'DELETE',
            url:this.URL+ 'deleteuser/'+Id,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            }
            
            
        }
        return axios(
            opt 
            
    
        )
    }
    async EditUser(Id,maxsize){
        const user = Auth.getUser();
        const opt = {
            method:'PUT',
            url:this.URL+ 'user/'+Id,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                maxsize
            }
            
            
        }
        return axios(
            opt 
            
    
        )
    }


}

export default new Admin();