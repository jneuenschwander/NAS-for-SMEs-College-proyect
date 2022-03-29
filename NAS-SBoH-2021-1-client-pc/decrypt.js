const fs = require('fs');
const crypto = require('crypto');
const decryptBuffer = (buffereEncrypted, key, iv) => {
    let decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key, "base64"),
      Buffer.from(iv, "base64")
    );
    let decrypted = decipher.update(buffereEncrypted);
  
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }
const file = fs.readFileSync('./tmp/server/users/604305a999536a12341a54cd/prueba101/101.json');

const result = decryptBuffer(
    file,
    '8BZ3pCTp71LX5I//QsBYdz7w4JHXNVehSBXuXnScdqg=',
    'AAAAAAAAAAAAAAAAAAAAAA=='
    );
console.log(result.toString());