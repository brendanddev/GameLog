
/**
 * @file server.js
 * @author Brendan Dileo, April 2025
 * 
 * Setup for the Express server and SQLite database.
 */

// Express for creating the server and handling requests
const express = require('express');

// Enables CORS
const cors = require('cors');


// Express app setup and port number initialization
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());