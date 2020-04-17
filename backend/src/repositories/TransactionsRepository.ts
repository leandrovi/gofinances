import { EntityRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public async getBalance(): Promise<Balance> {
    const income = this.totalBalanceTypeValue('income');

    const outcome = this.totalBalanceTypeValue('outcome');

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  private totalBalanceTypeValue(type: 'income' | 'outcome'): number {
    const initialValue = 0;

    return this.transactions.reduce((total, currentTransaction) => {
      return currentTransaction.type === type
        ? total + currentTransaction.value
        : total;
    }, initialValue);
  }
}

export default TransactionsRepository;
