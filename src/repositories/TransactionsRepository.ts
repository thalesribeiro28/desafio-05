import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value  : number;
  type : 'income'  |  'outcome';
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
    const {income, outcome} = this.transactions.reduce(
      (acumulador: Balance,  transaction: Transaction) => {
      switch (transaction.type){
        case "income":  
            acumulador.income += transaction.value;
            break;
        case "outcome":
            acumulador.outcome += transaction.value;
            break;
        default: 
          break;
      }
   
      return acumulador;
      
    },{
       income : 0,
       outcome: 0,
       total : 0
    });

    const total  = income - outcome;

    return {income, outcome, total};
  }

  public create({ title, value, type} : CreateTransactionDTO): Transaction {
    const transactions = new Transaction({
      title, 
      value,
      type
    });

    this.transactions.push(transactions);
    return transactions;
  }
}

export default TransactionsRepository;
