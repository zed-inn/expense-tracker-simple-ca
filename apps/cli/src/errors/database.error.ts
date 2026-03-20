import { DomainError } from "expense-tracker-core";

export class DataCorruptedError extends DomainError {
  constructor() {
    super({
      error: "database_error",
      code: "DATA_CORRUPTED",
      message:
        "Database has been corrupted or is not in proper required format.",
    });
  }
}
