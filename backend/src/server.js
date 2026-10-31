import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import prisma, { checkDatabaseConnection } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(PORT, async () => {
      console.log('====================================================');
      console.log(' Brightloop Software - Subscription Management API');
      console.log(` Server is running on: http://localhost:${PORT}`);
      console.log(` Health check endpoint: http://localhost:${PORT}/api/health`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('====================================================');

      // Test database connectivity
      const dbStatus = await checkDatabaseConnection();
      if (dbStatus.connected) {
        console.log('✔ PostgreSQL Database connected successfully via Prisma');
      } else {
        console.warn('⚠ Note on PostgreSQL Database:');
        console.warn(`  ${dbStatus.message}`);
        console.warn('  (API server is running. When your PostgreSQL instance is started and DATABASE_URL is configured, migrations can be applied).');
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const handleShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('Prisma disconnected.');
    } catch (err) {
      console.error('Error during Prisma disconnect:', err);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();
