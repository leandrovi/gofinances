import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const income = await this.totalBalanceTypeValue('income');

    const outcome = await this.totalBalanceTypeValue('outcome');

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  private async totalBalanceTypeValue(
    type: 'income' | 'outcome',
  ): Promise<number> {
    const initialValue = 0;

    const transactions = await this.find();

    if (!transactions) {
      return 0;
    }

    return transactions.reduce((total, currentTransaction) => {
      return currentTransaction.type === type
        ? total + currentTransaction.value
        : total;
    }, initialValue);
  }
}

export default TransactionsRepository;
