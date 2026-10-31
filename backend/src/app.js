import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import customersRoutes from './modules/customers/customers.routes.js';
import productsRoutes from './modules/products/products.routes.js';
import plansRoutes from './modules/plans/plans.routes.js';
import quotationsRoutes from './modules/quotations/quotations.routes.js';
import subscriptionsRoutes from './modules/subscriptions/subscriptions.routes.js';
import discountsRoutes from './modules/discounts/discounts.routes.js';
import invoicesRoutes from './modules/invoices/invoices.routes.js';
import paymentsRoutes from './modules/payments/payments.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';

import { checkDatabaseConnection } from './config/database.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();

// Middlewares
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly permissive
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check API - Exact requirement
app.get('/api/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  return res.status(200).json({
    success: true,
    message: 'Subscription Management API is running',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.connected,
      status: dbStatus.message,
    },
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/quotations', quotationsRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/discounts', discountsRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reports', reportsRoutes);

// Catch 404 & Centralized Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
