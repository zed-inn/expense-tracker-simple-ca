import { JSONExpenseQuery } from "@interfaces/expense-query.interface";
import { JSONExpenseRepository } from "@interfaces/expense-repo.interface";
import { IncrementalExpenseIdGenerator } from "@interfaces/id-generator.interface";
import { ExpenseApplication } from "expense-tracker-core";

const idGenerator = new IncrementalExpenseIdGenerator();
const expenseQuery = new JSONExpenseQuery();
const expenseRepo = new JSONExpenseRepository();

export const core = new ExpenseApplication(
  idGenerator,
  expenseRepo,
  expenseQuery,
);
