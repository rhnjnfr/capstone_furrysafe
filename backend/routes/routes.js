import express from "express";

import { showUsers } from "../controllers/user.js";

const router = express.Router(); 

router.get("/", showUsers);

export default router;