import express from "express";
import multer from "multer"

import { checkUser, insertUser} from "../controllers/user.js";

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/documents'); 
    },
    filename: (req, file, cb) =>{
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename);
    }
})
const upload = multer ({storage}); 

const router = express.Router(); 

router.post("/login", checkUser);
router.post("/buddy-registration", upload.any(), insertUser)
router.post("/shelter-registration", upload.array('documents'), insertUser)


export default router;