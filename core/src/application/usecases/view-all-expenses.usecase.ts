import { ExpenseQuery } from "@interface/expense-query.interface";

export class ViewAllExpenses {
  constructor(private expenseQuery: ExpenseQuery) {}

  async execute() {
    return await this.expenseQuery.getAll();
  }
}
