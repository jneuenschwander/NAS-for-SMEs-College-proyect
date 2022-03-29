import IUser from './IUser'

/**
 * @description Structure of payload token from passport
 * @category Interfaces
 * @description payload of auth
 * @interface IPayLoad
 */
interface IPayLoad {
    user:IUser,
    token_type:string,
    createdAt:Date
};

export default  IPayLoad;