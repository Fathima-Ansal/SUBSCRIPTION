import { errorResponse } from '../utils/response.js';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    // Replace with sanitized/parsed values
    if (validated.body) req.body = validated.body;
    if (validated.query) req.query = validated.query;
    if (validated.params) req.params = validated.params;
    next();
  } catch (err) {
    if (err.errors) {
      const formattedErrors = err.errors.map(e => ({
        field: e.path.slice(1).join('.'),
        message: e.message,
      }));
      return errorResponse(res, 'Validation failed', formattedErrors, 422);
    }
    return errorResponse(res, err.message || 'Validation error', null, 400);
  }
};
