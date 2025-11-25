import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a task list
export const createTaskList = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTaskList = await prisma.taskList.create({
      data: {
        title,
        description,
      },
    });

    res.status(201).json({
      message: "Task list created successfully",
      data: newTaskList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all task lists
export const getAllTaskLists = async (req, res) => {
  try {
    const taskLists = await prisma.taskList.findMany();

    res.status(200).json({
      message: "All task lists retrieved successfully",
      data: taskLists,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get task list by ID
export const getTaskListById = async (req, res) => {
  try {
    const { id } = req.params;

    const taskList = await prisma.taskList.findUnique({
      where: { id: Number(id) },
    });

    if (!taskList) {
      return res.status(404).json({ message: "Task list not found" });
    }

    res.status(200).json({
      message: `Task list with id ${id} retrieved successfully`,
      data: taskList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update task list by ID
export const updateTaskListById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTaskList = await prisma.taskList.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.status(200).json({
      message: `Task list with id ${id} updated successfully`,
      data: updatedTaskList,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task list not found" });
    }
    res.status(500).json({ error: error.message });
  }
};


// Delete task list by ID
export const deleteTaskListById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.taskList.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: `Task list with id ${id} deleted successfully`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Task list not found" });
    }
    res.status(500).json({ error: error.message });
  }
};


// Delete all task lists
export const deleteAllTaskLists = async (req, res) => {
  try {
    await prisma.taskList.deleteMany();

    res.status(200).json({
      message: "All task lists deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
