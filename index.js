const express = require('express');
const PORT = process.env.PORT || 3000;
// const cors = require('cors');
// const { Pool } = require('pg'); // Import the Pool class from pg
// require('dotenv').config();

const app = express();
app.use(express.json());

// const port = process.env.PORT;
// const apiRoutes = require('./routes/api');
// const ridesRoutes = require('./api/ride');
// const userRoutes = require('./api/user');


// // Database connection
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL, // Set this in your .env file
// // });

// // Middleware
// app.use(cors());
// app.use('/api/rides', ridesRoutes);
// app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});