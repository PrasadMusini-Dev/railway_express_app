require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ensureTableExists } = require('./db/db');
const testRoutes = require('./routes/test');
const todoRoutes = require('./routes/todos');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure the table exists
ensureTableExists();

// Routes
app.use('/', testRoutes);
app.use('/todos', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
