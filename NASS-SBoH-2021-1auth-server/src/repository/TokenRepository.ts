/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { ICrud, IToken } from '../interfaces';
import { Token } from '../models';

/**
 *
 * The repository of resources
 * @category Repositorys
 * @class TokenRepository
 * @implements {ICrud<IToken, string>}
 */
class TokenRepository implements ICrud<IToken, string> {
  /**
   *
   * @description Create new token
   * @param {IToken} task - The resource to create
   * @return {Promise<IToken>}  A resource created
   * @memberof TokenRepository
   */
  async create(task: IToken): Promise<IToken> {
    return task.save();
  }

  /**
   *
   * @description List all token
   * @return {Promise<Array<IToken>>}  A list of resourceS
   * @memberof ResourceRepository
   */
  async list(): Promise<Array<IToken>> {
    return Token.find({});
  }

  /**
   *
   * @description Get token by id
   * @param {string} id - The id to find
   * @return {Promise<IToken>}  A resource
   * @memberof Resourceepository
   */
  async getById(id: string): Promise<IToken | null> {
    return Token.findById(id);
  }
  
 

  /**
   * @description Get token by email
   * @param {string} email
   * @return {Promise<IToken>} reource user
   * @memberof Resourceepository 
   */
  async getByEmail(email: string): Promise<IToken | null> {
    return await Token.findOne({email});
  }

  /**
   *
   * @description Remove token
   * @param {IToken} resource - The resource to remove
   * @return {Promise<IToken>}  A resource removed
   * @memberof ResourceRepository
   */
  async remove(resource: IToken): Promise<IToken> {
    if (resource._id) await resource.remove();
    return resource;
  }

  /**
   *
   * @description Remove token by id
   * @param {string} id - The id to find
   * @return {Promise<IToken>}  A resource removed
   * @memberof ResourceRepository
   */
  async removeById(id: string): Promise<IToken | null> {
    const resourceToDelete = await this.getById(id);
    if (resourceToDelete) await resourceToDelete.remove();
    return resourceToDelete;
  }

  /**
   *
   * @description Update token
   * @param {IToken} resource - The resource to updated
   * @return {Promise<IToken>}  A resource updated
   * @memberof ResourceRepository
   */
  async update(resource: IToken): Promise<IToken> {
    if (resource._id) await resource.update();
    return resource;
  }

  /**
   *
   * @description Update token by id
   * @param {string} id - The id to find
   * @param {IToken} resource - The resource to updated
   * @return {Promise<IToken>} A resource updated
   * @memberof ResourceRepository
   */
  async updateById(id: string, resource: IToken):
  Promise<IToken | null > {
    const resourceToUpdate = await this.getById(id);
    if (resourceToUpdate) {
      await resourceToUpdate.update();
    }
    return resourceToUpdate;
  }
}
export default new TokenRepository();
