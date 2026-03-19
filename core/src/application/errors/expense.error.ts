import { DomainError } from "@error/domain.error";

export class NoExpenseError extends DomainError {
  constructor() {
    super({
      error: "not_found",
      code: "NO_EXPENSE",
      message: "No expense found.",
    });
  }
}
