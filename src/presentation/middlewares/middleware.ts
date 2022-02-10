interface IMiddleware<I, O> {
  handle: (httpRequest: I) => Promise<O>;
}

export { IMiddleware };
