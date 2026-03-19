import { Expense } from "@entity/expense";
import { ExpenseRepository } from "@interface/expense-repo.interface";
import { IdGenerator } from "@interface/id-generator.interface";

type AddExpenseParams = {
  description: string;
  amount: number;
};

export class AddExpense {
  constructor(
    private idGen: IdGenerator,
    private expenseRepo: ExpenseRepository,
  ) {}

  async execute(params: AddExpenseParams) {
    const id = await this.idGen.generateIncremental();
    const expense = new Expense({
      id,
      description: params.description,
      amount: params.amount,
      createdAt: new Date(),
    });

    await this.expenseRepo.save(expense);
  }
}
