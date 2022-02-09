/**
 * Factory for AuthMiddleware
 * @returns {AuthMiddleware}
 */
const authMiddlewareFactory = (): Middleware => {
  return new AuthMiddleware(findUserByTokenUseCaseFactory());
};

export { authMiddlewareFactory };
