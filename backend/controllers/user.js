import { getUsers, validateUser, createUser  } from "../model/userModel.js";

//get users
export const showUsers = (req, res) => {
    getUsers(req, res); // Directly pass req and res
    // getUsers((err, results) => {
    //     if(err){ 
    //         res.send(err);
    //     }
    //     else{
    //         res.json(results);
    //     }
    // })
};

export const checkUser = (req, res)=>{
    validateUser (req,res);
}

export const insertUser = (req, res)=>{
    createUser(req, res);
}