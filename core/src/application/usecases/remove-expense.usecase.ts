import { ExpenseRepository } from "@interface/expense-repo.interface";

type RemoveExpenseParameters = {
  id: number;
};

export class RemoveExpense {
  constructor(private expenseRepo: ExpenseRepository) {}

  async execute(params: RemoveExpenseParameters) {
    const expense = await this.expenseRepo.getById(params.id);

    await this.expenseRepo.remove(expense);
  }
}
