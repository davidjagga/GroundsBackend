const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg'); // Import the Pool class from pg
// require('dotenv').config();

const app = express();
app.use(express.json());

// const port = process.env.PORT;
// const apiRoutes = require('./routes/api');
const ridesRoutes = require('/ride');
const userRoutes = require('/user');


// // Database connection
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL, // Set this in your .env file
// // });

// // Middleware
// app.use(cors());
app.use('/api/rides', ridesRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

//didn't have this
module.exports = app;