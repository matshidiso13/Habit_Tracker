const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, createdAt: true }
  });
  res.json(user);
});

router.put("/", auth, async (req, res) => {
  const { email, name } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { email, name }
  });
  res.json(updated);
});

module.exports = router;
