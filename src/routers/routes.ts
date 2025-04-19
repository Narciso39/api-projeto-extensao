import { Router } from 'express';
import { UserRoutes } from './UserRoutes';
// import {ExpenseRoutes} from './ExpenseRoutes';


const router = Router();
const userRoutes = new UserRoutes();
// const expenseRoutes = new ExpenseRoutes();
router.use('/api/users', userRoutes.router);
// router.use('/api/expenses', expenseRoutes.router);
export default router;