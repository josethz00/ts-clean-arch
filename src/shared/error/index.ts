interface IErrorBody {
  code: string;
  message: string;
  shortMessage: string;
  [index: string]: unknown;
}

class IError {
  public statusCode: number;
  public body: IErrorBody;

  constructor({ statusCode, body }: { statusCode: number; body: IErrorBody }) {
    this.statusCode = statusCode;
    this.body = body;
  }
}

export { IError };
