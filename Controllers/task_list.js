const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await prisma.task.create({
      data: { title, description },
    });

    res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();

    res.status(200).json({
      message: "All tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: `Task with id ${id} retrieved successfully`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update task by ID
export const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.status(200).json({
      message: `Task with id ${id} updated successfully`,
      data: updatedTask,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ error: error.message });
  }
};


// Delete task by ID
export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: `Task with id ${id} deleted successfully`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ error: error.message });
  }
};


// Delete all tasks
export const deleteAllTasks = async (req, res) => {
  try {
    await prisma.task.deleteMany();

    res.status(200).json({
      message: "All tasks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
