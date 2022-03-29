/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { NextFunction, Response, Request } from 'express';
import { IPayLoad, IUser } from '../interfaces';
import { ResourceUser } from '../models';
import { HttpException } from '../exceptions';
import { ResourceService, TokenService } from '../services';
import {encodeUser, hashPassword,tokenType, sendMail} from '../utils'

/**
 *
 * The controller of user resource
 * @category Controllers
 * @class ResourceUserController
 */
class ResourceUserController {
  

  /**
   *
   * create a new resource
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A resource creted
   * @memberof ResourceUserController
   */
  public static async create(req: Request, res: Response, next: NextFunction) {
    
    try {
      
      const property = req.body;
      property.password = Math.random().toString(36).slice(-8);
      const resource:IUser = new ResourceUser(property);
      const resourceSaved: IUser = await ResourceService.create(resource);
      sendMail(<string>resourceSaved.email,"NASS - New user",
      "New user: "+resourceSaved.username+" with password: "+property.password,
      ""
      );
      res.json({username:resourceSaved.username});
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }
  /**
   *
   * Get resource by id
   * @static
   * @description auth user
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A JWT
   * @memberof ResourceUserController
   */
  public static async login(req: Request, res:Response, next: NextFunction){
    try {
      const property = req.body;
      const user: IUser | null = await ResourceService.getByUsername(property.username);
      if(!user) throw new HttpException(401, "Not Authorized");
      const isValid = await user.isValidPassword(property.password)
      if(isValid){
        res.json ({
          access_token: encodeUser({
            username: property.username,
            type_user: user.type_user,
            token_type:tokenType.Auth
          }),
          _id:user._id,
          username: property.username,
          directory: user.directory,
          maxsize: user.maxsize,
          type_user: user.type_user
        })
      }
      else {
        return next(new HttpException(401, "Not Authorized"));
      }
      
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }
  /**
   *
   * 
   * @static
   * @description send mail to restore password
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A email
   * @memberof ResourceUserController
   */
  public static async forgotPassword(req: Request, res: Response, next: NextFunction){
    const {email} = req.body
    try {
      const send = await ResourceService.forgotPassword(email);
      if(!send) return next(new HttpException(404, 'Error mail'));
      res.json({email});
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  /**
   * @description if token of restore password is valid return a email
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A email
   * @memberof ResourceUserController
   */
  public static async restorePassword(req: Request, res: Response, next: NextFunction){
    try {
      const token = <IPayLoad>req.user
      const user = <IUser>token.user;
      const update = req.body;
      update.password = hashPassword(update.password);
      const isValid =await TokenService.validToke(<string>user.email,token.createdAt);
      if(!isValid) throw new HttpException(401, "Not Authorized");
      const resourceUpdated: IUser | null = await ResourceService
      .updateById(user._id,update);
      if (!resourceUpdated) throw new HttpException(404, 'resource not found');
      res.json({
        email: resourceUpdated.email
      });
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }

  

  /**
   *
   * Update password by user
   * @static
   * @param {Request} req - The request
   * @param {Response} res - The response
   * @param {NextFunction} next - The next middleware in queue
   * @return {JSON} - A list of resources
   * @memberof ResourceUserController
   */
  public static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token = <IPayLoad>req.user
      const user = <IUser>token.user;
      const update = req.body;
      update.password = hashPassword(update.password);
      const resourceUpdated: IUser | null = await ResourceService
        .updateById(user._id, update);
      if (!resourceUpdated) throw new HttpException(404, 'resource not found');
      res.json({username:resourceUpdated.username});
    } catch (error) {
      return next(new HttpException(error.status || 500, error.message));
    }
  }
}
export default ResourceUserController;
