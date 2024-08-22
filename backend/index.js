import express from "express";

//import cors
import cors from "cors";

//import routes
import Router from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 3001;

//use express json
app.use(express.json());

//use cors
app.use(cors());

//use router
app.use(Router);


app.listen(port, () => {
    console.log(`https/localhost:${port}`);
  });