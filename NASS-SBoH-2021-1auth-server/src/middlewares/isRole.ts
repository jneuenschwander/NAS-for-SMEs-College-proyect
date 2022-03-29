import {
    NextFunction, RequestHandler, Response, Request,
  } from 'express';
import { IUser,IPayLoad } from 'interfaces';
import { HttpException } from '../exceptions';

/**
 *
 * Validate the role that can acces in end point
 * @category Middlewares
 * @param {any[]} roles Roles of the route
 * @return {*}  {RequestHandler}
 */
const isRole = (roles:any[]):RequestHandler => (req: Request, res: Response, next: NextFunction) =>
{
    try {
        if(!req.user) next(new HttpException(403, 'Forbidden'))
        else{
            const token = <IPayLoad>req.user
            const user = <IUser>token.user
            const hasRole = roles.find(role => {
                
                return user.type_user == role})
            
            if(hasRole) next()
            else{
                next(new HttpException(403, 'Forbidden'))
            }
        }
        
    } catch (error) {
        next(new HttpException(error.status || 500, error.message))
    }
}

export {
    isRole
}