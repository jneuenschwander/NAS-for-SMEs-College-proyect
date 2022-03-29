import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute } from '../interfaces';
import { ResourceUserController } from '../controller';
import { isDefinedParamMiddleware, validationMiddleware, isRole } from '../middlewares';
import { ExampleDTO, UserDTO } from '../dtos';
import passport from 'passport';
import {ROLES} from '../utils'
/**
 *
 * Managament the routes of resource
 * @category Routes
 * @class ExampleRouter
 * @implements {IRoute}
 */
class UserRouter implements IRoute {
  public router = Router();

  public pathIdParam = '/:id';

  constructor() {
    this.createRoutes();
  }
  /**
     * @name admin/users
     * @category Routes
     * @function
     * @description admin user list of users
     * @memberof module:routers/admin~adminRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} passport - validation of req.body
     * @param {callback} isRole - controller of login
     */
  createRoutes(): void {
    this.router.get(
      "/users",
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController.list(req,res, next)
    );
    /**
     * @name admin/user
     * @category Routes
     * @function
     * @description admin user change maxsize field from database
     * @memberof module:routers/admin~adminRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} passport - validation of req.body
     * @param {callback} isRole - controller of login
     */
    this.router.put(
      `/user${this.pathIdParam}`,
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController.updateById(req,res, next)
    );
    /**
     * @name admin/deleteuser
     * @category Routes
     * @function
     * @description admin user delete user from database
     * @memberof module:routers/admin~adminRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} passport - validation of req.body
     * @param {callback} isRole - controller of login
     */
     this.router.delete(
      `/deleteuser${this.pathIdParam}`,
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController.removeById(req,res, next)
    );

     /**
     * @name auth/forgot
     * @category Routes
     * @function
     * @description create user by admin
     * @memberof module:routers/auth~userRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} validationMiddleware - validation of req.body
     * @param {callback} authenticate - authenticate auth JWT
     * @param {callback} isRole- validate role of user
     * @param {callback} Controller - controller of create user
     */
      this.router.post(
        '/createuser',
        validationMiddleware(UserDTO),
        passport.authenticate('jwt',{session:false}),
        isRole([ROLES.Admin]),
        (req: Request, res: Response, next: NextFunction) => ResourceUserController
          .create(req, res, next)
      );

  }
}
export default new UserRouter().router;
