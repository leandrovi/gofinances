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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
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

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
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
