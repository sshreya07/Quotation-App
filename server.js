const express = require('express');     //syntax known as common js to import modules
const connectDB = require('./config/db');

//initialise express in a variable app
const app = express();

//connecting Database
connectDB();

app.use(express.json());

//mount route file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
