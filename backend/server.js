
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

// Endpoint for getting all games from the db
app.get('/api/games', (req, res) => {
    db.all("SELECT * FROM games", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Posts a new game to the db
app.post('/api/games', (req, res) => {
    const { title, platform, genre, hours_played, completed } = req.body;
    const query = `
        INSERT INTO games (title, platform, genre, hours_played, completed) 
        VALUES (?, ?, ?, ?, ?)`;
    
    db.run(query, [title, platform, genre, hours_played, completed], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ status: 'CREATE ENTRY SUCCESFUL', id: this.lastID });
    });
});


// Starts the express server on the port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


