/**
 * @description Returns a custom error response with the given message, status code and erro
 */
export class CustomError extends Error {
  status?: number; // Explicitly declaring the status property
  error?: string | object;

  constructor(message: string, status?: number, error?: string | object) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.error = error;
  }
}
