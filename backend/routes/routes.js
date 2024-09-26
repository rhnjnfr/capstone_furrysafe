import express from "express";
import multer from "multer"

import { checkUser, insertUser, Userlogout, //user
         shelterrequests, shelterrequestdetails, Image, 
         reviewFunction, displayStatus, displayPetCategory,
         addBreedCategory, addPetCategory, addVaccineCategory, //admin
         getAdminPosition, insertAdminAccount} from "../controllers/user.js";

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

// creation/registration/login paths
router.post("/login", checkUser);
router.post("/buddy-registration", upload.any(), insertUser)
router.post("/shelter-registration", upload.array('documents'), insertUser)
router.post("/logout", Userlogout)

//admin redering paths
router.post("/registration", shelterrequests)
router.get("/request_preview/:id", shelterrequestdetails)
router.get("/request_preview/:id/image", Image);
router.post("/response", reviewFunction);
router.get("/status", displayStatus)
router.get("/load-category", displayPetCategory) 
router.post("/add-breed", addBreedCategory)
router.post("/add-pet-category", addPetCategory)
router.post("/add-pet-vaccine", addVaccineCategory)
router.get("/get-position", getAdminPosition)
router.post("/add-admin-account", insertAdminAccount)
 

export default router;