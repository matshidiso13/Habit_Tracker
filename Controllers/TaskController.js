const Task = require("./../Models/task_list");

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.createTask(req.body);
    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();
    res.status(200).json({
      message: "All tasks retrieved successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = await Task.getTaskById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({
      message: `Task with id ${id} retrieved successfully`,
      data: task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update task (PUT)
exports.updateTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await Task.updateTask(id, req.body);

    res.status(200).json({
      message: `Task ${id} updated successfully`,
      data: updated,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Patch task (PATCH)
exports.patchTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const patched = await Task.patchTask(id, req.body);

    res.status(200).json({
      message: `Task ${id} patched successfully`,
      data: patched,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await Task.deleteTask(id);

    res.status(200).json({
      message: `Task ${id} deleted successfully`,
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteAllTasks();

    res.status(200).json({
      message: "All tasks deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
