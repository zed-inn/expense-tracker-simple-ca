import { Expense } from "@entity/expense";

export interface ExpenseRepository {
  getById(id: string): Promise<Expense>;
  save(expense: Expense): Promise<void>;
  remove(expense: Expense): Promise<void>;
}
