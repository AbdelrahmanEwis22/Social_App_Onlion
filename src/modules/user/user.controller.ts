import {Router} from "express";
import userService from "./user.service";
const router = Router();
router.get("/", userService.getAllUsers);
export default router;