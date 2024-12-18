const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Import the Pool class from pg
require('dotenv').config();

// const app = express();
// const port = process.env.PORT;
// const apiRoutes = require('./routes/api');
// const ridesRoutes = require('./routes/ride');
// const userRoutes = require('./routes/user');


// // Database connection
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL, // Set this in your .env file
// // });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/api/test', apiRoutes);
// // app.use('/api/rides', ridesRoutes);
// // app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
