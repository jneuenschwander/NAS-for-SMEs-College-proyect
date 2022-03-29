import {
    NextFunction, RequestHandler, Response, Request,
  } from 'express';
import { IUser,IPayLoad } from 'interfaces';
import { HttpException } from '../exceptions';

/**
 *
 * Valid of token type
 * @category Middlewares
 * @param {any[]} type - types of tokens
 * @return {*}  {RequestHandler}
 */
const isTokenTypeMiddleware = (types:any[]):RequestHandler => (req: Request, res: Response, next: NextFunction) =>
{
    try {
        if(!req.user) next(new HttpException(403, 'Forbidden'))
        else{
            const token = <IPayLoad>req.user
            const hasToken = types.find(type => {
                
                return token.token_type == type})
            
            if(hasToken) next()
            else{
                next(new HttpException(403, 'Forbidden'))
            }
        }
        
    } catch (error) {
        next(new HttpException(error.status || 500, error.message))
    }
}

export {
    isTokenTypeMiddleware
}