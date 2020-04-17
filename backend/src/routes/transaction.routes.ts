import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

// const transactionsRepository = new TransactionsRepository();

// transactionsRouter.get('/', (request, response) => {
//   try {
//     const transactions = transactionsRepository.all();
//     const balance = transactionsRepository.getBalance();

//     const data = {
//       transactions,
//       balance,
//     };

//     return response.json(data);
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   }
// });

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

// transactionsRouter.delete('/:id', async (request, response) => {
//   // TODO
// });

// transactionsRouter.post('/import', async (request, response) => {
//   // TODO
// });

export default transactionsRouter;
