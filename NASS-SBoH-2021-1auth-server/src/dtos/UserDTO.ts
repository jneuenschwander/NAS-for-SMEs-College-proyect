/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */

import { IsString, IsNotEmpty,IsNumber } from 'class-validator';


class UserDTO {
    @IsNotEmpty()
    @IsString()
    public username: string;
    @IsNotEmpty()
    @IsString()
    public email: string;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsString()
    public type_user: string;
    @IsNotEmpty()
    @IsNumber()
    public maxsize: number;



    constructor(username: string,  email:string, name:string,type_user: string, maxsize: number) {
      this.username = username;
      this.email = email;
      this.name = name
      this.type_user = type_user;
      this.maxsize = maxsize;
    }
}

export default UserDTO;
