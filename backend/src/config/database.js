import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  prisma = global.__db;
}

export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, message: 'Database connected successfully' };
  } catch (error) {
    return {
      connected: false,
      message: 'Database connection failed. Please ensure PostgreSQL is running and DATABASE_URL is valid.',
      error: error.message
    };
  }
};

export default prisma;
