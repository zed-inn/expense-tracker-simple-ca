import { ValidationError } from "@error/validation.error";
import { ExpenseQuery } from "@interface/expense-query.interface";

type ViewAllExpensesSummaryByMonthParameters = {
  month: Month;
  year: number;
};

export class ViewAllExpensesSummaryByMonth {
  constructor(private expenseQuery: ExpenseQuery) {}

  async execute(params: ViewAllExpensesSummaryByMonthParameters) {
    const monthNumber = months[params.month];
    if (typeof monthNumber !== "number" || isNaN(monthNumber))
      throw new ValidationError("INVALID_MONTH", "Month must be valid months.");

    const startDate = new Date(params.year, monthNumber - 1, 1);
    const endDate = new Date(params.year, monthNumber, 0, 23, 59, 59, 999);

    const expenses = await this.expenseQuery.getBetweenInclusive(
      startDate,
      endDate,
    );
    const totalExpenseAmount = expenses.reduce((x, y) => x + y.amount, 0);

    return { total: totalExpenseAmount };
  }
}

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "Novemeber"
  | "December";

const months: Record<Month, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  Novemeber: 11,
  December: 12,
};
