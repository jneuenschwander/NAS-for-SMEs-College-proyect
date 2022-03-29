/* eslint-disable class-methods-use-this */
import { ICrud, IPayLoad, IToken, IUser } from '../interfaces';
import { ResourceUserRepository,TokenRepository } from '../repository';
import { ResourceUser, Token } from '../models';
import nodemailer from 'nodemailer';
import '../config/dotenv';
import {encodeUser, tokenType, sendMail, hashPassword} from '../utils';

/**
 *
 * The resource service,layer of repository pattern
 * @category Services
 * @class ResourceService
 * @implements {ICrud<IUser, string>}
 */
class ResourceService implements ICrud<IUser, string> {
  /**
   *
   * Create a resource
   * @param {IUser} resource - The resource to create
   * @return {Promise<IUser>}  A resource created
   * @memberof ResourceService
   */
  async create(resource: IUser): Promise<IUser> {
    return ResourceUserRepository.create(resource);
  }

  /**
   *
   * List all resources
   * @return {Promise<Array<IUser>>}  A list of tasks
   * @memberof ResourceService
   */
  async list(): Promise<Array<IUser>> {
    return ResourceUserRepository.list();
  }

  /**
   *
   * Find by id a resource
   * @param {string} id - The id to find
   * @return {Promise<IUser>}  A resource
   * @memberof ResourceService
   */
  async getById(id: string): Promise<IUser | null> {
    return ResourceUserRepository.getById(id);
  }
  /**
   * 
   * @param {string} username 
   * @return {Promise<IUser>}
   * @memberof ResourceService
   */
  async getByUsername(username: string): Promise<IUser | null> {
    return ResourceUserRepository.getByUsername(username);
  }

  /**
   * 
   * @param {string} email 
   * @return {Promise<boolean>}
   * @memberof ResourceService
   */
  async forgotPassword(email: string): Promise<boolean| null> {
    try {
      const user = await ResourceUserRepository.getByEmail(email);
      if(user){
        const expire = Date.now();
        const hashKey = hashPassword(email + '-' + expire);
        const saveToken:IToken = new Token({
          email:email,
          hashKey:hashKey,
          createdAt:expire
        });

        const oldToken = await TokenRepository.getByEmail(email);
        if(oldToken) await TokenRepository.removeById(oldToken._id);

        const newToken = await TokenRepository.create(saveToken);
        if(!newToken) return false;
        const token = encodeUser({
          username: user.username,
          type_user: user.type_user,
          token_type:tokenType.Restore,
          exp: expire/1000 + 60 * 60,
          createdAt:expire
        });
        
        const res = await sendMail(
          email,
          "Restore password",
          `http://nass.bucaramanga.upb.edu.co/forgot/${token}`,
          "");

        return res;
      }
      else{
        return false;
      }


    } catch (error) {
      return false;
    }
  }

  /**
   *
   * Remove a resource
   * @param {IUser} resource - The resource to remove
   * @return {Promise<IUser>}  A resource removed
   * @memberof ResourceService
   */
  async remove(resource: IUser): Promise<IUser> {
    return ResourceUserRepository.remove(resource);
  }

  /**
   *
   * Remove by id a resource
   * @param {string} id - The id to find
   * @return {Promise<IUser>}  A resource removed
   * @memberof ResourceService
   */
  async removeById(id: string): Promise<IUser | null> {
    const taskToDelete = await this.getById(id);
    if (taskToDelete) await taskToDelete.remove();
    return taskToDelete;
  }

  /**
   *
   * Update a resource
   * @param {IUser} resource - The resource to updated
   * @return {Promise<IUser>}  A resource updated
   * @memberof ResourceService
   */
  async update(resource: IUser): Promise<IUser> {
    return ResourceUserRepository.update(resource);
  }

  /**
   *
   * Update by id a resource
   * @param {string} id - The id to find
   * @param {IUser} resource - The resource to updated
   * @return {Promise<IUser>} A resource updated
   * @memberof ResourceService
   */
  async updateById(id: string, body: Object): Promise<IUser | null > {
    // eslint-disable-next-line no-unused-vars
    return new Promise<IUser | null>((resolve, _) => {
      ResourceUser.findOneAndUpdate({ _id: id}, { ...body }, { new: true },
        (error, task: IUser | null) => {
          if(error) console.log(error)
          resolve(task)});
    });
  }
}

export default new ResourceService();
