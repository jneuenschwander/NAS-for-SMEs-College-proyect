const { createServer } = require('sync-files-cipher')// require('../syncProyect/dist/index');
createServer(
    '8BZ3pCTp71LX5I//QsBYdz7w4JHXNVehSBXuXnScdqg=',
    'AAAAAAAAAAAAAAAAAAAAAA==',
    () => { console.log("Server listening");}
)