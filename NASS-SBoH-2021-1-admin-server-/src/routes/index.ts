import { Router } from 'express';
import UserRouter from './user.route';
/**
 * @module routers/admin
 */
const router = Router();
const prefix: string = '/api';
/**
 * @namespace adminRouter
 */
router.use(`${prefix}/admin`, UserRouter);

export default router;
