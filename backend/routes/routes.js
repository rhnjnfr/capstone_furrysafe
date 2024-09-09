import express from "express";

import { checkUser, insertUser} from "../controllers/user.js";

const router = express.Router(); 

//testing login
router.post("/login", checkUser);
router.post("/registration", insertUser)
router.post("/shelter_registration", insertUser)


export default router;