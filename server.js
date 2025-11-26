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

