export type { ExpenseRepository } from "@interface/expense-repo.interface";
export type { ExpenseQuery } from "@interface/expense-query.interface";
export type { IdGenerator } from "@interface/id-generator.interface";

export { DomainError } from "@error/domain.error";
export { ValidationError } from "@error/validation.error";
export { NoExpenseError } from "@error/expense.error";

import { ExpenseQuery } from "@interface/expense-query.interface";
import { ExpenseRepository } from "@interface/expense-repo.interface";
import { IdGenerator } from "@interface/id-generator.interface";
import { AddExpense } from "@usecases/add-expense.usecase";
import { RemoveExpense } from "@usecases/remove-expense.usecase";
import { UpdateExpense } from "@usecases/update-expense.usecase";
import { ViewAllExpensesSummaryByMonth } from "@usecases/view-all-expenses-summary-by-month.usecase";
import { ViewAllExpensesSummary } from "@usecases/view-all-expenses-summary.usecase";
import { ViewAllExpenses } from "@usecases/view-all-expenses.usecase";

export class ExpenseApplication {
  readonly addExpense: AddExpense;
  readonly removeExpense: RemoveExpense;
  readonly updateExpense: UpdateExpense;
  readonly viewAllExpenses: ViewAllExpenses;
  readonly viewAllExpensesSummary: ViewAllExpensesSummary;
  readonly viewAllExpensesSummaryByMonth: ViewAllExpensesSummaryByMonth;

  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly expenseRepo: ExpenseRepository,
    private readonly expenseQuery: ExpenseQuery,
  ) {
    this.addExpense = new AddExpense(this.idGenerator, this.expenseRepo);
    this.removeExpense = new RemoveExpense(this.expenseRepo);
    this.updateExpense = new UpdateExpense(this.expenseRepo);
    this.viewAllExpenses = new ViewAllExpenses(this.expenseQuery);
    this.viewAllExpensesSummary = new ViewAllExpensesSummary(
      this.expenseQuery,
      this.expenseRepo,
    );
    this.viewAllExpensesSummaryByMonth = new ViewAllExpensesSummaryByMonth(
      this.expenseQuery,
    );
  }
}
