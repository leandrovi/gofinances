import { Router } from 'express';

import transactionsRouter from './transaction.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);

export default routes;
