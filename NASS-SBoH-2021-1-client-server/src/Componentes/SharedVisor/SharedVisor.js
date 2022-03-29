import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import makeTree from './TreeMaker';
import TableFiles from './TableFiles';
import NavFiles from './NavFiles';
import {File} from '../../Request';
import FileDownload  from 'js-file-download'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import Path from './Path';


export default function SharedVisor(props){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [directory, setDirectory] = useState(null);
    
    useEffect(() => {
        reload()
        
    },[]);
    let reload = () => {
        File.getSharedFiles()
        .then((res) => {
            const sharedFiles = res.data.sharedFiles;
            const sharedDirectory = sharedFiles.map((userShared, k) =>{
                let userDirectory = makeTree(userShared.directory);
                userDirectory.name =  userShared.username;
                userDirectory['username'] = userShared.username;
                userDirectory['_id'] = userShared._id;
                return userDirectory
            });
            setDirectory([{name:'Shared',children:sharedDirectory}]);
        })
        .catch((error) => {
            setDirectory([{name:'Shared',children:[]}]);
        });
    }

;
    const onClickPath = (index) => {
        
        const tmp = [...directory];
        tmp.splice(index + 1,tmp.length - index + 1);
        setDirectory(tmp);
    } 
    const onClick = (index, file) => {
        var tmp = [...directory];
        if(file.children){
            tmp.push(file);
        }

        setDirectory(tmp);

    }

    
    let downloadFile = (file) => {
        if(file._id){
            File.downloadSharedFile(directory[1].username,file._id)
            .then(res => {
                const realName = file.name.split('.')
                FileDownload(res.data, `${realName[0]}.zip`)
            })
            .catch(error => console.log(error));
        }
    }

    let deleteFile = (index, _id) => {
        
        var tmp = [...directory];
        var currentFolder = {...tmp[tmp.length-1]}; 
        var tmpFile = {...currentFolder.children[index]};
        

        if(tmpFile.write === 'true'){
            File.deleteSharedFile(directory[1].username, _id);
        }
        currentFolder.children.splice(index,1);
        tmp[tmp.length-1] = currentFolder;
        setDirectory(tmp)

    }

    let renameFile = (index, _id, new_name) => {
        var tmp = [...directory];
        var currentFolder = {...tmp[tmp.length-1]}; 
        var tmpFile = {...currentFolder.children[index]};
        let path = [];
        if(tmpFile.write === 'true'){
            tmpFile.name = new_name;
            tmpFile.modified = new Date(Date.now());
            File.renameSharedFile(directory[1].username,_id, new_name);
        }
        currentFolder.children[index] = tmpFile
        tmp[tmp.length-1] = currentFolder;
        setDirectory(tmp)
    }

    
    return(
        <>
            
           
                <NavFiles 
                    onSyncClick={reload}/>
            
            
            {   directory &&
                <>
                    <Path path={directory} onClickPath={onClickPath}/>
                    
                    <TableFiles 
                        deleteFile={deleteFile}
                        renameFile={renameFile}
                        onClick={onClick}
                        downloadFile={downloadFile}
                        files={directory[directory.length - 1].children} 
                        titles={['name',"size","modified"]}/>
                    
                </>
            }
        </>
    );
}