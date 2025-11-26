const port = 3000;
const express = require("express");
const app = express();

app.use(express.json());

app.get("/",(req, res) =>{
    res.send("welcome to habit tracker")
});

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`)
});

const profileRoutes = require('./Routes/profile');
app.use('/profile', profileRoutes);