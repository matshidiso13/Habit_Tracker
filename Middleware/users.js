const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'please_change_me';
const jwtExpiry = '7d';

// Register 
router.post('/register', async (req, res) => {
 const { username, email, password } = req.body;
 if (!username || !email || !password) return res.status(400).json({ error: 'name, email and password required' });

 try {
   const existing = await prisma.user.findUnique({ where: { email } });
   if (existing) return res.status(400).json({ error: 'Email already in use' });

   const hashed = await bcrypt.hash(password, 10);
   const user = await prisma.user.create({
     data: { username, email, password: hashed },
     select: { id: true, username: true, email: true, role: true }
   });

   const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiry });
   res.status(201).json({ token, user });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
});

// Login
router.post('/login', async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) return res.status(400).json({ error: 'email and password required' });

 try {
   const user = await prisma.user.findUnique({ where: { email } });
   if (!user) return res.status(400).json({ error: 'Invalid credentials' });

   const valid = await bcrypt.compare(password, user.password);
   if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

   const publicUser = { id: user.id, username: user.username, email: user.email, role: user.role };
   const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiry });
   res.json({ token, user: publicUser });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
});

module.exports = router;