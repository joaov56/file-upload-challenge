import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const balance = await transactionsRepository.getBalance();

  const transactions = await transactionsRepository.find();

  const object = {
    transactions,
    balance,
  };
  return response.json(object);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, type, value, category } = request.body;
  const transaction = new CreateTransactionService();

  const create = await transaction.execute({
    title,
    type,
    value,
    category,
  });

  return response.json(create);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const transaction = new DeleteTransactionService();

  const deleted = await transaction.execute(id);

  return response.json(deleted);
});

// transactionsRouter.post('/import', async (request, response) => {
//   // TODO
// });

export default transactionsRouter;
