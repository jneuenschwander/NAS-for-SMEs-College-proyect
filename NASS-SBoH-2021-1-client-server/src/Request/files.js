import axios from 'axios';
import Auth from './auth';
import URL_p from '../configuration/enviroment';
class File{
    constructor(){
        this.URL = URL_p.base + URL_p.file;
    }
    async getImages(){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:this.URL + 'images',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
        }
           return axios(
                opt
            )
    }
    async getVideos(){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:this.URL + 'videos',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
        }
        
           return axios(
                opt
            )
    }
    async getDirectory(){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:this.URL + 'files',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
        }
        
           return axios(
                opt
            )
    }

    fetchImg(url){
        
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:url,
            // responseType: 'blob',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`,
            },
        }
        return new Promise((resolve, reject) => {
            axios(opt)
            .then(res => {
                var objectUrl = `data:image/png;base64,${res.data}`;
                // var url = URL.createObjectURL(objectUrl);
                resolve({objectUrl});
            })
            .catch(err => reject(err)); 
        })
    }

    async getImg(url){
        let img = await this.fetchImg(url);
        return img
        
    }
    async loadImg(url){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:url,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.access_token}`,
            },
        }
        const img = (await axios(opt)).data;
        return new Promise((resolve, reject) => {
            const dataImg = `data:image/png;base64,${img}`;
            resolve(dataImg)
          });
    }
    async upload(file,path){
        const formData = new FormData();
        formData.append('file',file,file.name);
        formData.append('url',path);
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:this.URL + 'upload',
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:formData
        }
        
           return axios(
                opt
            )
    }
    async delete(_id){
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:this.URL + 'remove',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                _id
            }
        }
        
           return axios(
                opt
            )
    }
    async deleteFolder(folder){
        const user = Auth.getUser();
        const opt = {
            method:'DELETE',
            url:this.URL + 'folder',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                folder
            }
        }
        
           return axios(
                opt
            )
    }
    async renameFile(_id, name, url){
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:this.URL + 'move',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                _id,
                name,
                url
            }
        }
        
           return axios(
                opt
            )
    }
    async renameFolder(oldFolder,newFolder){
        const user = Auth.getUser();
        const opt = {
            method:'PUT',
            url:this.URL + 'folder',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                oldFolder,
                newFolder
            }
        }
        
           return axios(
                opt
            )
    }
    async download(_id){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:`${this.URL}/download/${_id}` ,
            responseType: 'blob',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
        }
        
           return axios(
                opt
            )  
    }
    async donwloadFolder(folder){
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:`${this.URL}/folder` ,
            responseType: 'blob',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                folder
            }
        }
        
           return axios(
                opt
            )  
    }

    async getUserToShare(){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url:`${this.URL}/users` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            }
        }
        
           return axios(
                opt
            )   
    }

    async shareFile(username, id_file, write){
        const user = Auth.getUser();
        const opt = {
            method:'POST',
            url:`${this.URL}share` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                username,
                id_file,
                write
            }
        }
        
           return axios(
                opt
            )  
    }
    async unShareFile(username, id_file){
        const user = Auth.getUser();
        const opt = {
            method:'PUT',
            url:`${this.URL}share` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                username,
                id_file
            }
        }
        
           return axios(
                opt
            )  
    }
    async getSharedFiles(){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url: `${this.URL}shared` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            }
        }
        
           return axios(
                opt
            )    
    }
    async downloadSharedFile(ud, id){
        const user = Auth.getUser();
        const opt = {
            method:'GET',
            url: `${this.URL}shared/${ud}/${id}` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            }
        }
        
           return axios(
                opt
            )    
    
    }
    async deleteSharedFile(ud, id){
        const user = Auth.getUser();
        const opt = {
            method:'DELETE',
            url: `${this.URL}shared/${ud}/${id}` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            }
        }
        
           return axios(
                opt
            )    
    
    }
    async renameSharedFile(ud, id, name){
        const user = Auth.getUser();
        const opt = {
            method:'PUT',
            url: `${this.URL}shared` ,
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.access_token}`
            },
            data:{
                ud:ud,
                _id:id,
                name: name
            }
        }
        
           return axios(
                opt
            )    
    
    }
}

export default new File();