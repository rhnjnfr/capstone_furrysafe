// import function from 'firebase-functions';
import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";
import compression from "compression";
import { https } from 'firebase-functions';

const app = express();
const port = process.env.PORT || 5000;

// Use compression middleware for compressing outgoing responses
app.use(compression());

// Use CORS middleware for cross-origin requests
// app.use(cors(
//   {origin: 'http://localhost:8080',
//     credentials: true}
// ));
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // Allows all origins
  },
  credentials: true
}));

// Set the limit for incoming JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Use your routes
app.use(Router);

export const api = https.onRequest(app);

// Start the server
try {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
} catch (err) {
  console.log("Error: " + err);
}