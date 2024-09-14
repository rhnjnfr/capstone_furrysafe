import express from "express";

import { checkUser, insertUser} from "../controllers/user.js";

const router = express.Router(); 

router.post("/login", checkUser);
router.post("/buddy-registration", insertUser)
router.post("/shelter-registration", insertUser)


export default router;