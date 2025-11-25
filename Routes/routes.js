
const router = express.Router();
router.get("/dashboard", authMiddleware, adminOnly, getDashboardData);

export default router;

import express from "express";
import profileRoutes from "./profileRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", profileRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

