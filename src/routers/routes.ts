import { Router } from 'express';
import { UserRoutes } from './UserRoutes';


const router = Router();
const userRoutes = new UserRoutes();

router.use('/api/users', userRoutes.router);

export default router;