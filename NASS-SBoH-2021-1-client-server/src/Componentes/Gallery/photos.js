import File from '../../Request/files';

async function processImages(setLoaded){
  var photos = []
  await File.getImages()
  .then((res)=>{ return res.data.images}) // traigo el json de la peticion
  .then(async (data)=>{
    let arr = [];
    
    for (let i = 0; i < data.length; i++) {
      
      // let res = await File.getImg(data[i].url);
      const res = File.loadImg(data[i].url);

      // console.log('Prueba: ',prueba)
      // var im = new Image();
      // im.src = res.objectUrl;
      // console.log(im.width)
      //En este lugar crea la estructura con la que va a trabajar
      // en los componentes
      let img = {
        url:res,
        load:false,
        // width: im.width, 
        // height: im.height,
        title:data[i].name,
        modified:data[i].modified,
        //startIndex:i
      }
      res.then(imgData => {
         
        img.url = imgData;
        img.load = true
        setLoaded(i)
        
      })
      arr.push(img)
    }
    photos = arr
  })
  
  
  return photos;
}


export default processImages;

