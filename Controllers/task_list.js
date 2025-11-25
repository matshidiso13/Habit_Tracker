//user can create a task list
exports.createTaskList = (req, res) => {
    const { title, description } = req.body;
    // Logic to create a task list
    res.status(201).json({ message: 'Task list created successfully', data: { title, description } });
};


//user can view/get all task lists
