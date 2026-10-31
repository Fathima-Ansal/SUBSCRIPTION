import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';

export const seedDatabase = async () => {
  console.log('Seeding initial foundation users into PostgreSQL...');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  const defaultUsers = [
    {
      name: 'System Administrator',
      email: 'admin@brightloop.io',
      password: passwordHash,
      role: 'ADMIN',
      phone: '+1 555-0101',
    },
    {
      name: 'Operations Staff',
      email: 'staff@brightloop.io',
      password: passwordHash,
      role: 'STAFF',
      phone: '+1 555-0102',
    },
    {
      name: 'Acme Enterprise Customer',
      email: 'customer@acmecorp.com',
      password: passwordHash,
      role: 'CUSTOMER',
      phone: '+1 555-0103',
    },
  ];

  for (const user of defaultUsers) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existing) {
      await prisma.user.create({ data: user });
      console.log(`✔ Created user: ${user.name} (${user.role}) - ${user.email}`);
    } else {
      console.log(`ℹ User already exists: ${user.email}`);
    }
  }

  console.log('Database seed finished successfully!');
};

// If run directly
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .catch((err) => {
      console.error('Seed failed:', err.message);
    })
    .finally(() => prisma.$disconnect());
}
