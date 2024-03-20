import express, { request, response } from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import booksRoute from './routes/bookRoutes.js';
import cors from 'cors'
const app = express();

// Middleware for parsing request body
app.use(express.json());


// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World')
})

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App conected to database');
        app.listen(port, () => {
            console.log(`App is listenning to port: ${port}`)
        });
    })
    .catch((err) => {
        console.log(err);
    });

