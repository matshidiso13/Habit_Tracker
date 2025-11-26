const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllTasks: () => prisma.task.findMany(),

  getTaskById: (id) =>
    prisma.task.findUnique({
      where: { id: Number(id) }
    }),

  createTask: (data) =>
    prisma.task.create({
      data,
    }),

  updateTask: (id, data) =>
    prisma.task.update({
      where: { id: Number(id) },
      data,
    }),

  patchTask: (id, data) =>
    prisma.task.update({
      where: { id: Number(id) },
      data,
    }),

  deleteTask: (id) =>
    prisma.task.delete({
      where: { id: Number(id) }
    }),

  deleteAllTasks: () =>
    prisma.task.deleteMany(),
};
