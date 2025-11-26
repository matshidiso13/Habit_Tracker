const port = 3000;
const express = require("express");
const app = express();
const authRouter = require('./Middleware/auth')

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/v1', require('./Middleware/users'))
app.get("/",(req, res) =>{
    res.send("welcome to habit tracker")
});

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
});

// Load task routes
const TaskRoutes = require("./Routes/Taskroutes"); 
app.use("/api/tasks", TaskRoutes);

