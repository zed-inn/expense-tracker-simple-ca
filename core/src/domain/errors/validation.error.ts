import { DomainError } from "./domain.error";

export class ValidationError extends DomainError {
  constructor(code: string, message: string) {
    super({ error: "validation_error", code, message });
  }
}
