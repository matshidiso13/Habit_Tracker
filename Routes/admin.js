const express = require('express');
const router = express.Router();
const { adminOnly } = require('../Middleware/adminOnly');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.patch("/tasks/:id/ban", adminOnly, async (req, res) => {
    const taskId = parseInt(req.params.id);
  
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { banned: true }
    });
  
    res.json({ message: "Task banned successfully", task });
  });
  