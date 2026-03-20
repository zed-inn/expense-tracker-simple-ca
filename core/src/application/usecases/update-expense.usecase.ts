import { DomainError } from "@error/domain.error";
import { ExpenseRepository } from "@interface/expense-repo.interface";

type UpdateExpenseParameters = {
  id: number;
  description?: string;
  amount?: number;
};

export class UpdateExpense {
  constructor(private expenseRepo: ExpenseRepository) {}

  async execute(params: UpdateExpenseParameters) {
    if (!params.description && !params.amount)
      throw new UpdateExpenseParametersInsufficientError();

    const expense = await this.expenseRepo.getById(params.id);

    if (params.description) expense.redescribe(params.description);
    if (params.amount) expense.changeAmount(params.amount);

    await this.expenseRepo.save(expense);
  }
}

export class UpdateExpenseParametersInsufficientError extends DomainError {
  constructor() {
    super({
      error: "invalid_action",
      code: "PARAMETERS_INSUFFICIENT",
      message:
        "Either description or amount or both are required to update an expense.",
    });
  }
}
