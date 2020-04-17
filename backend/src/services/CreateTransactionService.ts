import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category: categoryTitle,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const category = await categoriesRepository.findByTitle(categoryTitle);

    if (!category) {
      throw new AppError('This category does not exists');
    }

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError(
        'An outcome higher than total balance is not permitted',
      );
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category_id: category.id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
