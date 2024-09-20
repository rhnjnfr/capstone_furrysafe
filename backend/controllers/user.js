import { validateUser, createUser, logoutUser} from "../model/userModel.js";

//user models
export const checkUser = (req, res)=>{ //check if user exists 
    validateUser (req,res);
}

export const insertUser = (req, res)=>{
    createUser(req, res); //create user 
}

export const Userlogout = (req, res)=>{
    logoutUser(req, res); //logout req for cookies
}