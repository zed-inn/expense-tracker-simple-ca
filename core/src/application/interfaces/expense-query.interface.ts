import { Expense } from "@entity/expense";

type ExpenseReadModel = Expense["toJSON"] & Record<string, unknown>;

export interface ExpenseQuery {
  getAll(): Promise<ExpenseReadModel[]>;
  getBetweenInclusive(after: Date, before: Date): Promise<ExpenseReadModel[]>;
}
