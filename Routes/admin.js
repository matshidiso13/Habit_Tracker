
const router = express.Router();
router.get("/dashboard", authMiddleware, adminOnly, getDashboardData);

export default router;
