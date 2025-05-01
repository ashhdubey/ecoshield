import express from "express";
import { registerUser, loginUser, myshield } from "../controllers/authController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/myshield', myshield);
export default router;
