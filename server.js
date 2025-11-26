const port = 3000;
const express = require("express");
const app = express();

const authRouter = require('./Middleware/auth');
const user = require('./Middleware/users');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/v1', user);

app.get("/", (req, res) => {
    res.send("welcome to habit tracker");
});

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});


const usersRoutes = require('./Middleware/users');
const profileRoutes = require('./Routes/profile');

app.use(express.json());

// user registration & login
app.use('/users', usersRoutes);

// profile routes (view/update)
app.use('/profile', profileRoutes);