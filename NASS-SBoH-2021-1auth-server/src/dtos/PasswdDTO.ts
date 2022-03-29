import { IsString, IsNotEmpty} from 'class-validator';

/**
 *
 * @description Class to validate fields of an change password request
 * @category DTOs
 * @class PasswdDTO
 * @param {string} password Password of user
 */
class PasswdDTO {
    @IsString()
    @IsNotEmpty()
    public password: string;

    /**
     * 
     * @param password Password of user
     * @memberof PasswdDTO
     */
    constructor(password:string){
        this.password = password;
    }
}

export default PasswdDTO;