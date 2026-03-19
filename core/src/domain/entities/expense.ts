import { ValidationError } from "@errors/validation.error";

export class Expense {
  private readonly _id: number;
  private _description: string;
  private _amount: number;
  private readonly _createdAt: Date;

  private static readonly validate = {
    id: (id: number) => {
      if (typeof id !== "number" || isNaN(id))
        throw new ValidationError(
          "INVALID_TYPE_EXPENSE_ID",
          "Expense Id must be a valid number.",
        );
      if (!Number.isInteger(id) || id <= 0)
        throw new ValidationError(
          "INVALID_VALUE_EXPENSE_ID",
          "Expense Id must be a positive integer.",
        );
      return id;
    },
    description: (description: string) => {
      if (typeof description !== "string")
        throw new ValidationError(
          "INVALID_TYPE_EXPENSE_DESCRIPTION",
          "Expense description must be a string.",
        );
      const trimmedDesc = description.trim();
      if (trimmedDesc.length < 1)
        throw new ValidationError(
          "EMPTY_EXPENSE_DESCRIPTION",
          "Expense description cannot be empty.",
        );
      return trimmedDesc;
    },
    amount: (amount: number) => {
      if (typeof amount !== "number" || isNaN(amount))
        throw new ValidationError(
          "INVALID_TYPE_EXPENSE_AMOUNT",
          "Expense amount must be a valid number.",
        );
      if (amount <= 0)
        throw new ValidationError(
          "INVALID_VALUE_EXPENSE_AMOUNT",
          "Expense amount must be a positive number.",
        );
      return amount;
    },
    date: (date: string | Date) => {
      const dt = new Date(date);
      if (isNaN(dt.getTime()))
        throw new ValidationError("INVALID_DATE_OBJECT", "Invalid date given.");
      return dt;
    },
  };

  constructor(params: {
    id: number;
    description: string;
    amount: number;
    createdAt: string | Date;
    updatedAt: string | Date;
  }) {
    this._id = Expense.validate.id(params.id);
    this._description = Expense.validate.description(params.description);
    this._amount = Expense.validate.amount(params.amount);
    this._createdAt = Expense.validate.date(params.createdAt);
  }

  get id() {
    return this._id;
  }
  get description() {
    return this._description;
  }
  get amount() {
    return this._amount;
  }
  get createdAt() {
    return this._createdAt;
  }

  redescribe(description: string) {
    const validatedDesc = Expense.validate.description(description);
    this._description = validatedDesc;
  }

  changeAmount(amount: number) {
    const validatedAmount = Expense.validate.amount(amount);
    this._amount = validatedAmount;
  }
}
