import { errorResponse } from '../utils/response.js';

/**
 * Middleware to restrict access based on user role
 * @param  {...string} allowedRoles - 'ADMIN', 'STAFF', 'CUSTOMER'
 */
export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized. Please login to access this resource.', null, 401);
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return errorResponse(
        res,
        `Access denied. Role '${userRole}' is not authorized to access this resource. Required: [${allowedRoles.join(', ')}]`,
        null,
        403
      );
    }

    next();
  };
};

export const requireAdmin = requireRoles('ADMIN');
export const requireStaffOrAdmin = requireRoles('ADMIN', 'STAFF');
export const requireCustomer = requireRoles('CUSTOMER');
