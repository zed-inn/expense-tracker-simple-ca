import { ExpenseQuery } from "expense-tracker-core";
import { ExpenseModel, JSONExpenseData } from "./expense-repo.interface";

export class JSONExpenseQuery implements ExpenseQuery {
  async getAll(): Promise<ExpenseModel[]> {
    const _data = await JSONExpenseData.getData();

    return _data;
  }

  async getBetweenInclusive(
    after: Date,
    before: Date,
  ): Promise<ExpenseModel[]> {
    const _data = await JSONExpenseData.getData();

    const filteredData = _data.filter(
      (d) => d.createdAt >= after && d.updatedAt <= before,
    );

    return filteredData;
  }
}
