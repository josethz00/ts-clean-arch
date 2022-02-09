interface IErrorBody {
  code: string;
  message: string | string[];
  shortMessage: string;
}

class IError {
  public statusCode: number;
  public body: IErrorBody;

  constructor({ statusCode, body }: { statusCode: number; body: IErrorBody }) {
    this.statusCode = statusCode;
    this.body = body;
  }
}

export { IError, IErrorBody };
