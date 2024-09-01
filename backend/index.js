import path from "path";

import express from "express";

//import cors
import cors from "cors";

//import routes
import Router from "./routes/routes.js";


const app = express();
const port = process.env.PORT || 5000;

//use express json
app.use(express.json());

//use cors
app.use(cors());

//use router
app.use(Router);

// app.get('/login', (req, res) => {
//   res.send("Server Running")
// })


// app.listen(port, () => {
//     console.log(`https/localhost:${port}`);
//   });


// Start the server
try{
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
catch (err){
  console.log("Error: " + err);
}
