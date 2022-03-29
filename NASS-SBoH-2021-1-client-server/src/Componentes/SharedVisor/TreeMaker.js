//Busca si el folder ya existe en el array
//array - childrens del folder actual
//key - el parametro a comparar
//value - el folder a buscar
function findWhere(array, key, value) {
    let t = 0; // contador
    //Recorre hasta encontrar el archivo en el folder
    while (t < array.length && array[t][key] !== value) { t++; }; 
    //Si lo encontro retorna el folder, si no, retorna falso
    if (t < array.length) {
        return array[t]
    } else {
        return false;
    }
}



export default function makeTree(_array){
    //root de la estructura
    let tree = []
    //Recorre todos los archivos
    for (let i = 0; i < _array.length; i++) {
        //genera un arreglo en base al path del archivo(url)
        let path = _array[i].url.split('/');
        if(_array[i].url == ""){
            path = [];
            tree.push(_array[i]);
        }
        //Indica el nivel actual en root
        let currentLevel = tree;
        //El padre del nivel actual
        let parent = null
        //Recorre el arreglo del path
        for (let j = 0; j < path.length; j++) {
            //Obtiene el nombre del folder
            let part = path[j];
            //Busca si el folder ya existe en el nivel actual
            let tmpPart = findWhere(currentLevel, 'name', part);
            //Si existe el nivel actual ahora es el folder actual, si no
            //Crea un nuevo folder y el nivel actual es ese folder
            if (tmpPart) {
                currentLevel = tmpPart.children;
                
            } else {
                tmpPart = {
                    name: part,
                    children: [],
                    // files:[],
                    parent: null
                }
                currentLevel.push(tmpPart);
                currentLevel = tmpPart.children;
                tmpPart.parent = parent;
                
            }
            //Si llegamos al final del path guardamos el archivo en el nivel actual
            if(j == path.length - 1){
                tmpPart.children.push(_array[i]);
            }
            //Padre del nivel actual
            parent = tmpPart;
        }
        
    }
    //Retornamos el root en un nodo inicial de nombre home con la estructura,
    //la cual es el tree
    return {
        name: "Home",
        children: tree
    };
}
