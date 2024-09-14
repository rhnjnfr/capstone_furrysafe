import path from "path";
import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";
import compression from "compression";

const app = express();
const port = process.env.PORT || 5000;

// Use compression middleware for compressing outgoing responses
app.use(compression());

// Use CORS middleware for cross-origin requests
app.use(cors());

// Set the limit for incoming JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Use your routes
app.use(Router);

// Start the server
try {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log("Error: " + err);
}