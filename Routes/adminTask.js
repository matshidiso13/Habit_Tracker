const router = require("express").Router();
const { auth, adminOnly } = require("../middleware/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Admin view all tasks
router.get("/", auth, adminOnly, async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: { owner: { select: { id: true, email: true } } }
  });
  res.json(tasks);
});

// Admin delete any task
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await prisma.task.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

// Admin ban task
router.patch("/:id/ban", auth, adminOnly, async (req, res) => {
  res.json(
    await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: { banned: true }
    })
  );
});

module.exports = router;