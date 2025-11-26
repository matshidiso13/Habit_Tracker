
const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');
const auth = require('../Middleware/auth'); // your existing auth.js middleware

// ------------------------------
// VIEW PROFILE
// ------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const { username, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(username && { username }),
        ...(email && { email })
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

module.exports = router;
