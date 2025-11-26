
const express = require("express");
const router = express.Router();
const TaskController = require("../Controllers/TaskController");

router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.patch("/:id", TaskController.patchTask);
router.delete("/:id", TaskController.deleteTask);
router.delete("/", TaskController.deleteAllTasks);

module.exports = router;
