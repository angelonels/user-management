export type AppErrorOptions = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
};

export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);
    this.statusCode = options.statusCode;
    this.code = options.code;
    this.details = options.details;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: unknown) {
    super({ statusCode: 400, code: "BAD_REQUEST", message, details });
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super({ statusCode: 404, code, message });
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string, details?: unknown) {
    super({ statusCode: 409, code, message, details });
  }
}

