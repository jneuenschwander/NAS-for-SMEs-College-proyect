import { Router } from 'express';
import userRouter from './user.route';
/**
 * @description The base url of all routers
 * @module routers/auth
 */
const router = Router();
const prefix: string = '/api';
/**
 * @description The auth routes
 * @namespace userRouter
 */
router.use(`${prefix}/auth`, userRouter);

export default router;
