import { Router } from 'express';
import { UserRoutes } from './UserRoutes';
import {ExpenseRoutes} from './ExpenseRoutes';
import { HelloWorldRoute } from './helloWorldRoute';


const router = Router();
const userRoutes = new UserRoutes();
const expenseRoutes = new ExpenseRoutes();
const hello = new HelloWorldRoute();
router.use('/', hello.router)
router.use('/api/users', userRoutes.router);
router.use('/api/expenses', expenseRoutes.router);

export default router;