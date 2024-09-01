import express from "express";

import { checkUser, showUsers, insertUser} from "../controllers/user.js";

const router = express.Router(); 

//testing login
router.post("/login", checkUser);
router.post("/registration", insertUser)


export default router;