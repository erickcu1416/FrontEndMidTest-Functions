import * as functions from "firebase-functions";
import express = require('express');
// import cors = require('cors');
const cors = require('cors');

import authRoutes from "./routes/auth";

const app = express();
app.use(cors({origin: true}));
app.get("/hello-word", (req, res) => {
    return res.status(200).json({ message: "Hello Word" });
});

app.use(authRoutes)

export const router = functions.https.onRequest(app);

// export const corsEnabledFunction = (req: any, res: any) => { 
//     res.set('Access-Control-Allow-Origin', '*');
  
//     if (req.method === 'OPTIONS') {
//       // Send response to OPTIONS requests
//       res.set('Access-Control-Allow-Methods', 'GET, POST');
//       res.set('Access-Control-Allow-Headers', 'Content-Type');
//       res.set('Access-Control-Max-Age', '3600');
//       res.status(204).send('');
//     } else {
//       res.send('Hello World!');
//     }
//   };
