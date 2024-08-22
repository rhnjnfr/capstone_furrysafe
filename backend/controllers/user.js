import { getUsers  } from "../model/userModel.js";

// export const showUsers = (req, res) => {
//     getUsers ((err, results) => {
//         if(err){
//             res.send("Error: " + err);
//         }
//         else{
//             res.json (results);
//         }
//     })
// }

export const showUsers = (req, res) => {
    getUsers(req, res); // Directly pass req and res
};