import { IsString, IsNotEmpty} from 'class-validator';

/**
 *
 * @description Class to validate fields of an restore password request
 * @category DTOs
 * @class EmailDTO
 * @param {string} email Email of the user
 */
class EmailDTO {
    @IsString()
    @IsNotEmpty()
    public email: string;

    /**
     * 
     * @param email Email of the user
     * @memberof EmailDTO
     */
    constructor(email:string){
        this.email = email;
    }
}

export default EmailDTO