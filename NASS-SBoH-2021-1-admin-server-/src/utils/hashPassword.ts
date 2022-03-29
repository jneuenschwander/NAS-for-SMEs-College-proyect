import bycrypt from 'bcrypt';
import '../config/dotenv';
/**
 * @description hash a password
 * @param {string} password 
 * @return {string} return a hash string
 */
const hashPassword = (password:String) => {
    const saltRound = parseInt(process.env.SALT_ROUND || '10',10);
    return bycrypt.hashSync(password, saltRound);
}

export default hashPassword;