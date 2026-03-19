export abstract class DomainError<T extends unknown = unknown> extends Error {
  readonly error: string;
  readonly code: string;
  readonly ctx?: T;

  constructor(params: {
    error: string;
    code: string;
    message: string;
    ctx?: T;
    options?: ErrorOptions;
  }) {
    if (typeof params.error !== "string" || typeof params.code !== "string")
      throw new Error("Invalid Type Error.");

    const trimmedError = params.error.trim();
    const trimmedCode = params.code.trim();

    if (trimmedError.length < 1 || trimmedCode.length < 1)
      throw new Error("Empty Error.");

    super(params.message, params.options);

    this.error = trimmedError;
    this.code = trimmedCode;

    if (params.ctx) this.ctx = params.ctx;
  }
}
