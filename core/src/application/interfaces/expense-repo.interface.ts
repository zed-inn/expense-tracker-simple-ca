import { Expense } from "@entity/expense";

export interface ExpenseRepository {
  getOldest(): Promise<Expense | null>;
  getLatest(): Promise<Expense | null>;
  getById(id: number): Promise<Expense>;
  save(expense: Expense): Promise<void>;
  remove(expense: Expense): Promise<void>;
}
