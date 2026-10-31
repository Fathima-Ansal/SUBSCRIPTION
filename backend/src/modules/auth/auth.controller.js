import * as authService from './auth.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const result = await authService.registerUser({ name, email, password, role, phone });

    return successResponse(
      res,
      'Registration successful',
      {
        user: result.user,
        token: result.token,
      },
      201
    );
  } catch (error) {
    // If DB connection error
    if (error.message && (error.message.includes('Can\'t reach database server') || error.message.includes('Connection failed'))) {
      return errorResponse(res, 'Database connection is currently unavailable. Please verify PostgreSQL connection.', { details: error.message }, 503);
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    return successResponse(res, 'Login successful', {
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    if (error.message && (error.message.includes('Can\'t reach database server') || error.message.includes('Connection failed'))) {
      return errorResponse(res, 'Database connection is currently unavailable. Please verify PostgreSQL connection.', { details: error.message }, 503);
    }
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    return successResponse(res, 'User profile retrieved successfully', { user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  // Stateless JWT logout - frontend removes token from storage
  return successResponse(res, 'Logged out successfully');
};
