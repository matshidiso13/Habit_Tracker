const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
 await prisma.recipe.deleteMany();
 await prisma.user.deleteMany();

 const passwordHash = await bcrypt.hash('password', 10);

 // Admin
 await prisma.user.create({
   data: {
     name: 'Admin User',
     email: 'admin@charlotte.com',
     password: passwordHash,
     role: 'ADMIN'
   }
 });

 // Regular user
 await prisma.user.create({
   data: {
     name: 'Alice',
     email: 'alice@example.com',
     password: passwordHash,
     role: 'USER',
     recipes: {
       create: [{ title: 'Alice Spaghetti', ingredients: 'spaghetti\ngarlic', steps: '1. Boil\n2. Toss', cookingTime: 20 }]
     }
   }
 });

 console.log('Seed complete');
}

main()
 .catch(e => { console.error(e); process.exit(1); })
 .finally(async () => { await prisma.$disconnect(); });