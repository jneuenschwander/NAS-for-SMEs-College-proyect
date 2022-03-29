import {
  NextFunction, Request, Response, Router,
} from 'express';
import { IRoute, IUser } from '../interfaces';
import { ResourceUserController } from '../controller';
import { 
  isDefinedParamMiddleware, 
  validationMiddleware, 
  isRole,
  isTokenTypeMiddleware
} from '../middlewares';
import { AuthDTO, EmailDTO, UserDTO, PasswdDTO } from '../dtos';
import passport from 'passport';
import {ROLES,tokenType} from '../utils'

/**
 *
 * Managament the routes of resource
 * @category Routes
 * @class User routes
 * @implements {IRoute}
 */
class UserRouter implements IRoute {
  
  public router = Router();

  

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
    

    /**
     * @name auth/forgot
     * @function
     * @memberof module:routers/auth~userRouter
     * @description Send email to restore password
     * @inner
     * @param {string} path - Express path
     * @param {callback} validationMiddleware - validation of req.body
     * @param {callback} Controller - controller of forgot password
     */
    this.router.post(
      '/forgot',
      validationMiddleware(EmailDTO),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .forgotPassword(req, res, next)

    )

    /**
     * @name auth/restore
     * @category Routes
     * @function
     * @description Change forgot password
     * @memberof module:routers/auth~userRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} authenticate - authenticate restore JWT
     * @param {callback} isTokenTypeMiddleware - validate restore JWT
     * @param {callback} Controller - controller of restore password
     */
    this.router.put(
      '/restore',
      passport.authenticate('jwt',{session:false}),
      isTokenTypeMiddleware([tokenType.Restore]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .restorePassword(req, res, next)
    )

    /**
     * @name auth/forgot
     * @category Routes
     * @function
     * @description Create user by admin
     * @memberof module:routers/auth~userRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} validationMiddleware - validation of req.body
     * @param {callback} authenticate - authenticate auth JWT
     * @param {callback} isRole- validate role of user
     * @param {callback} Controller - controller of create user
     */
    this.router.post(
      '/',
      validationMiddleware(UserDTO),
      passport.authenticate('jwt',{session:false}),
      isRole([ROLES.Admin]),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .create(req, res, next)
    );

    /**
     * @name auth/login
     * @category Routes
     * @function
     * @description Auth user
     * @memberof module:routers/auth~userRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} validationMiddleware - validation of req.body
     * @param {callback} Controller - controller of login
     */
    this.router.post(
      '/login',
      validationMiddleware(AuthDTO),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
      .login(req, res, next)
    );

    /**
     * @name auth/changepasswd
     * @category Routes
     * @function
     * @description Change password
     * @memberof module:routers/auth~userRouter
     * @inner
     * @param {string} path - Express path
     * @param {callback} validationMiddleware - validation of req.body
     * @param {callback} authenticate - authenticate auth JWT
     * @param {callback} Controller - controller of change password
     */
    this.router.put(
      '/changepasswd',
      validationMiddleware(PasswdDTO),
      passport.authenticate('jwt',{session:false}),
      (req: Request, res: Response, next: NextFunction) => ResourceUserController
        .changePassword(req, res, next)
    );

    

  }
}
export default new UserRouter().router;
