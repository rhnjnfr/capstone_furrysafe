import { validateUser, createUser  } from "../model/userModel.js";

export const checkUser = (req, res)=>{
    validateUser (req,res);
}

export const insertUser = (req, res)=>{
    createUser(req, res);
}