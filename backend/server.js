
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

// SQLite for db
const sqlite3 = require('sqlite3').verbose();

// Express app setup and port number initialization
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());


// Creates a Sqlite database locally
const db = new sqlite3.Database("./collection.db", (err) => {
    if (err) {
        console.error("An error occurred while opening the database: ", err.message);
    }
    console.log('Connected to the collection database.');
});

// Runs a command on the database to create a table if dosent exist
db.run(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        platform TEXT,
        genre TEXT,
        hours_played INTEGER,
        completed BOOLEAN
    )
`);

// API Endpoints (Routes)

// Starts the express server on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


