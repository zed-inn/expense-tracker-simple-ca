import { Expense } from "@entity/expense";

export interface ExpenseRepository {
  save(expense: Expense): Promise<void>;
}
