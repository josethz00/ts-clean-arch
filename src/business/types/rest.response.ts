interface IRestResponse<P> {
  payload: P;
  statusCode?: number;
}

export { IRestResponse };
