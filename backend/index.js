// const express= require("express");
import express from 'express'; 
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';


//const PORT = 3000;   
import { logger } from "./Middlewares/Logger.js";
import { Notfound } from "./Middlewares/Notfound.js";
import { ErrorHandler } from "./Middlewares/ErrorHandler.js";
// import helmet from 'helmet';


 app.use(logger);

// app.use(helmet());




import userRoutes from './routes/users.js';
//const userRoutes= require("./routes/users");

//const posts= require("./routes/posts");
import posts from "./routes/posts.js";
import  authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import TaskRoutes from "./routes/Task.js";
//require("dotenv").config();
import dotenv from "dotenv";
//const cors= require("cors");
dotenv.config();
import cors from "cors";


//const morgan= require("morgan");
import morgan from "morgan";
//const mongoose = require('mongoose');
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/Swagger.js';
import { limiter } from './Middlewares/rateLimiter.js';
app.use(limiter);



//const getUserInfoRoutes= require("./routes/users");

const PORT = process.env.PORT  || 3000; // Use environment variable or default to 3000
 app.use(express.json()); // Middleware to parse JSON
// // Sample in-memory data



const allowedOrigins = [
  'http://localhost:5175',
    'http://localhost:5173',

  'http://localhost:3000',
  'http://localhost:5879',
  'http://localhost:5177',
  'http://localhost:5174',
  "https://mentroship-api.onrender.com/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(morgan("combined"));

// let users = [
//   { id: 1, name: 'Ayaan' },
//   { id: 2, name: 'Fatima' },
//   { id: 3, name: 'Zubeyr' }
// ];
// app.get('/', (req, res) => {
// //  res.send('Hello from Express!');
//       res.json(users)
// });


//console.log(process.env)



//middleware

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/api/users",userRoutes);

// app.use("/api/posts",posts)
app.use("/api/auth", authRoutes);

app.use("/api/admin",adminRoutes)

 app.use("/api/upload", uploadRoutes);

app.use("/api/Tasks", TaskRoutes);

app.get('/api/health', (req, res) => {
    res.json("Server is working... 😊");
})



// Server fronted in Production

if (process.env.NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}








app.use(Notfound);

app.use(ErrorHandler)
mongoose.connect(process.env.NODE_ENV =="development"? process.env.MONGO_URI_DEV : process.env.MONGO_URL_PRO)
  .then(() => console.log('✅ MongoDB connected locally'))
  .catch(err => console.error('❌ Connection error:', err));




// app.post('/', (req, res) => {
//  const userData = req.body;

// //  const newUser={
// //     id: users.length + 1,
// //     name: userData.name,
   
// //  }


//     //  users.push(newUser);

//     //  res.status(201).json(newUser);


//  req.json(users)
 
// }); 

//get one

// app.get('/users/:id', (req, res) => {
//   const user = users.find(u => u.id == req.params.id);
//   if (!user) return res.status(404).send('User not found');
//   res.json(user);
// });


// app.put('/users/:id', (req, res) => {

//      const user = users.find(u => u.id == req.params.id);
//   if (!user) return res.status(404).send('User not found');

//   user.name = req.body.name;
//   //  const updatedData = req.body;

//     res.json(user)
 

// });

// DELETE route
// app.delete('/users/:id', (req, res) => {
// //   const userId = req.params.id;
// //   res.send(`User ${userId} deleted`);

//   users = users.filter(u => u.id != req.params.id);
//     if (!users) return res.status(404).send('User not found');

    
//   res.send('User deleted');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// To run this server, use the command: node index.js


// mongodb+srv://abdalegureyguled:<db_password>@cluster0.sxz8rjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0