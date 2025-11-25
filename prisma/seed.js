const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
 //await prisma.recipe.deleteMany();
 //await prisma.user.deleteMany();

 const passwordHash = await bcrypt.hash('password', 10); 

 // Admin
 await prisma.user.create({
   data: {
     username: 'Charlotte',
     email: 'admin@shaper.com',
     password: passwordHash,
     role: 'ADMIN'
   }
 });

 // Regular user
 await prisma.user.create({
   data: {
     username: 'Thembeka',
     email: 'thembeka@shaper.com',
     password: passwordHash,
     role: 'USER'
   }
 });

 console.log('Seed complete');
}

main()
 .catch(e => { console.error(e); process.exit(1); })
 .finally(async () => { await prisma.$disconnect(); });