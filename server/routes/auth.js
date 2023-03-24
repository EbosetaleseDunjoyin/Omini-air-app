import express  from "express";
import { authSignin, authSignup } from "../controllers/authController.js";

//Start post router
const router = express.Router();

router.post("/signup", authSignup);
router.post("/signin", authSignin);

export default router;