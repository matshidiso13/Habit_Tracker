require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// ROUTES
app.use("/admin", require("./routes/admin"));
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

const db = require ('../models/recipeModel')

//GET all recipe
function getAllRecipes(req, res) {
    res.json(db.recipes)
}
