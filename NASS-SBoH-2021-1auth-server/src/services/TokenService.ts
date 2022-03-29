/* eslint-disable class-methods-use-this */
import { ICrud, IPayLoad,  IToken } from '../interfaces';
import { TokenRepository} from '../repository';
import {  Token } from '../models';
import '../config/dotenv';
import { tokenType,  hashPassword} from '../utils';

/**
 *
 * The resource service,layer of repository pattern
 * @category Services
 * @class TokenService
 * @implements {ICrud<IToken, string>}
 */
class TokenService implements ICrud<IToken, string> {
  /**
   *
   * Create a resource
   * @param {IToken} resource - The resource to create
   * @return {Promise<IToken>}  A resource created
   * @memberof TokenService
   */
  async create(resource: IToken): Promise<IToken> {
    return TokenRepository.create(resource);
  }

  /**
   * @description valid hashKey of token restore
   * @param email 
   * @return {Promise<boolean>} true if token is valid
   * @memberof TokenService
   */
  async validToke(email: string,iat:Date): Promise<boolean>{
    const token = await TokenRepository.getByEmail(email);
    if(token){
      const isValid =await token.isValidToken(email,iat);
      if(isValid) token.remove();
      return isValid;
    }
    return false;
  }

  /**
   *
   * List all resources
   * @return {Promise<Array<IToken>>}  A list of tasks
   * @memberof TokenService
   */
  async list(): Promise<Array<IToken>> {
    return TokenRepository.list();
  }

  /**
   *
   * Find by id a resource
   * @param {string} id - The id to find
   * @return {Promise<IToken>}  A resource
   * @memberof TokenService
   */
  async getById(id: string): Promise<IToken | null> {
    return TokenRepository.getById(id);
  }
  /**
   * 
   * @param {string} email email of restore token
   * @return {Promise<IToken>}
   * @memberof TokenService
   */
  async getByEmail(email: string): Promise<IToken | null> {
    return TokenRepository.getByEmail(email);
  }

 

  /**
   *
   * Remove a resource
   * @param {IToken} resource - The resource to remove
   * @return {Promise<IToken>}  A resource removed
   * @memberof TokenService
   */
  async remove(resource: IToken): Promise<IToken> {
    return TokenRepository.remove(resource);
  }

  /**
   *
   * Remove by id a resource
   * @param {string} id - The id to find
   * @return {Promise<IToken>}  A resource removed
   * @memberof TokenService
   */
  async removeById(id: string): Promise<IToken | null> {
    const taskToDelete = await this.getById(id);
    if (taskToDelete) await taskToDelete.remove();
    return taskToDelete;
  }

  /**
   *
   * Update a resource
   * @param {IToken} resource - The resource to updated
   * @return {Promise<IToken>}  A resource updated
   * @memberof TokenService
   */
  async update(resource: IToken): Promise<IToken> {
    return TokenRepository.update(resource);
  }

  /**
   *
   * Update by id a resource
   * @param {string} id - The id to find
   * @param {IToken} resource - The resource to updated
   * @return {Promise<IToken>} A resource updated
   * @memberof TokenService
   */
  async updateById(id: string, body: Object): Promise<IToken | null > {
    // eslint-disable-next-line no-unused-vars
    return new Promise<IToken | null>((resolve, _) => {
      Token.findOneAndUpdate({ _id: id}, { ...body }, { new: true },
        (error, task: IToken | null) => {
          if(error) console.log(error)
          resolve(task)});
    });
  }
}

export default new TokenService();
