import { ExpenseQuery } from "@interface/expense-query.interface";
import { ExpenseRepository } from "@interface/expense-repo.interface";

export class ViewAllExpensesSummary {
  constructor(
    private expenseQuery: ExpenseQuery,
    private expenseRepo: ExpenseRepository,
  ) {}

  async execute(): Promise<{
    total: number;
  }> {
    const oldest = await this.expenseRepo.getOldest();
    const latest = await this.expenseRepo.getLatest();
    if (!oldest || !latest) return { total: 0 };

    const expenses = await this.expenseQuery.getBetweenInclusive(
      oldest.createdAt,
      latest.createdAt,
    );
    const totalExpenseAmount = expenses.reduce((x, y) => x + y.amount, 0);

    return { total: totalExpenseAmount };
  }
}
