import { validateUser, createUser  } from "../model/userModel.js";

//user models
export const checkUser = (req, res)=>{ //check if user exists 
    validateUser (req,res);
}

export const insertUser = (req, res)=>{
    createUser(req, res); //create user 
}