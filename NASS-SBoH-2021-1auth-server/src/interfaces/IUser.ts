import { Document } from 'mongoose';

/**
 * Define a interface of user
 * @category Interfaces
 * @interface IUser
 * @extends {Document}
 */
interface IUser extends Document{
    username: String,
    password: String,
    email: String,
    type_user: String,
    maxsize: Number,
    directory: [],
    share_out: [],
    share_in: [],
    isValidPassword: Function
}
export default IUser;
