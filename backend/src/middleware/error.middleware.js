import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  return errorResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, null, 404);
};

export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // Prisma Unique Constraint Violation
  if (err.code === 'P2002') {
    const target = err.meta?.target ? ` (${err.meta.target.join(', ')})` : '';
    return errorResponse(res, `A record with this unique field already exists${target}.`, null, 409);
  }

  // Prisma Record Not Found
  if (err.code === 'P2025') {
    return errorResponse(res, err.meta?.cause || 'Requested record was not found.', null, 404);
  }

  // Syntax or Parsing Error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 'Malformed JSON payload in request body', null, 400);
  }

  // Default Internal Server Error
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected internal server error occurred';

  return errorResponse(
    res,
    message,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : null,
    statusCode
  );
};
