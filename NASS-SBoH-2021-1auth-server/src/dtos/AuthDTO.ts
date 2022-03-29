import { IsString, IsNotEmpty} from 'class-validator';


/**
 *
 * @description Class to validate fields of an auth request
 * @category DTOs
 * @class AuthDTO
 * @param {string} username The username
 * @param {string} password The password
 */
class AuthDTO {
    @IsString()
    @IsNotEmpty()
    public username: string;
    @IsNotEmpty()
    @IsString()
    public password: string;

    /**
     * 
     * @param username Username of user
     * @param password Password of user
     * @memberof AuthDTO
     */
    constructor(username:string, password:string){
        this.username = username;
        this.password = password;
    }
}

export default AuthDTO