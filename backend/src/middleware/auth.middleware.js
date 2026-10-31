import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { errorResponse } from '../utils/response.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token missing or invalid format', null, 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'brightloop_fallback_secret_change_me';

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 'Token has expired. Please login again.', null, 401);
      }
      return errorResponse(res, 'Invalid authentication token', null, 401);
    }

    // Attach decoded user
    // We can also fetch the latest user from DB if connected
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId || decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
        },
      });

      if (!user) {
        return errorResponse(res, 'User no longer exists', null, 401);
      }

      if (!user.isActive) {
        return errorResponse(res, 'Your account is deactivated. Contact an administrator.', null, 403);
      }

      req.user = user;
    } catch (dbErr) {
      // If DB is temporarily unreachable, fallback to verified token claims
      req.user = {
        id: decoded.userId || decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        isActive: true,
      };
    }

    next();
  } catch (error) {
    return errorResponse(res, 'Authentication failed', error.message, 500);
  }
};
