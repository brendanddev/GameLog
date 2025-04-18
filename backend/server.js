
/**
 * @file server.js
 * @author Brendan Dileo, April 2025
 * 
 * This file sets up the Node.js Express backend server and SQLite database for the 
 * game collection app. It provides RESTful API routes to interact with the database,
 * allowing users to create, retrieve, update, and delete game entries. The API supports
 * both single game operations like creating or deleting a single game, and bulk operations
 * like deleting an entire collection.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

// Required modules
// Express for creating web servers, SQLite for database operations
const express = require('express');  
const cors = require('cors');       
const sqlite3 = require('sqlite3').verbose(); 

// Initializing the express app
// Defines the port for the server
const app = express();  
const port = 3001;    

// Configures middleware for CORS and JSON parsing
app.use(cors());      
app.use(express.json());

// Initializes the database connection using SQLite
const db = new sqlite3.Database("./collection.db", (err) => {
    // Check if there was an error while connecting
    if (err) {
        console.error("An error occurred while opening the database: ", err.message); 
    }
    console.log('Connected to the collection database.');
});

// Creates the games table in the database if one dosent exist
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

// Defines the GET route for retreiving all games from the db 
app.get('/api', (req, res) => {  
    // Queries all records from the games table
    db.all("SELECT * FROM games", [], (err, rows) => {  
        if (err) {
            res.status(500).json({ error: err.message });  
            return;
        }
        // Return all games from the table as json
        res.json(rows);  
    });
});

// Defines the POST route for adding a new game to the db
app.post('/api', (req, res) => { 
    // Extracts the game data from the request body
    const { title, platform, genre, hours_played, completed } = req.body;
    // Parameterized SQL query to prevent SQL injection attacks
    const query = `
        INSERT INTO games (title, platform, genre, hours_played, completed) 
        VALUES (?, ?, ?, ?, ?)`;
    // Runs the query to insert the new game
    db.run(query, [title, platform, genre, hours_played, completed], function(err) { 
        if (err) {  
            res.status(500).json({ error: err.message });  
            return;
        }
        res.json({ status: 'CREATE ENTRY SUCCESFUL', id: this.lastID }); 
    });
});

// Defines the PUT route for replacing all games in the db/collection
app.put('/api', (req, res) => { 
    // Extracts the new games data from the request body
    const newGames = req.body;

    // Serealizes the database operations to ensure exection in order
    db.serialize(() => {  
        // Deletes all records from the table
        db.run("DELETE FROM games", [], (err) => {  
            if (err) {  
                res.status(500).json({ error: err.message }); 
                return;
            }
            // Prepares the insert statement for inserting new games
            // Uses a prepared statement to prevent SQL injection attacks
            const stmt = db.prepare("INSERT INTO games (title, platform, genre, hours_played, completed) VALUES (?, ?, ?, ?, ?)"); 
            // Loops through each game to insert each one into the database
            newGames.forEach(game => {  
                stmt.run(game.title, game.platform, game.genre, game.hours_played, game.completed); 
            });
            
            // Finalizes the prepared statement to release any resources
            stmt.finalize((err) => { 
                if (err) {  
                    res.status(500).json({ error: err.message }); 
                    return;
                }
                res.json({ status: 'UPDATE ENTRY SUCCESFUL' }); 
            });
        });
    });
});

// Defines the DELETE route for deleting all games from the db/collection
app.delete('/api', (req, res) => {
    // Deletes all records from the games table in the db
    db.run("DELETE FROM games", [], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ status: 'DELETE ALL GAME ENTRIES SUCCESFUL' });
    });
});

// Defines the GET route for retrieving a single game by id from the db
app.get('/api/:id', (req, res) => {
    // Retrieves the game id from the url params
    const id = req.params.id;
    // Queries the database to find the game with the specified id
    // Uses a parameterized query to prevent SQL injection attacks
    db.get("SELECT * FROM games WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // If the game could not be found, return an error
        if (!row) {
            res.status(404).json({ error: "Game not found" });
            return;
        }
        // Otherwise return the game data as a json response
        res.json(row);
    });
});

// Defines the PUT route for updating a game by id in the db
app.put('/api/:id', (req, res) => { 
    // Retrieves the game id from the url params
    const id = req.params.id;
    // Extracts the updated game data from the request body
    const { title, platform, genre, hours_played, completed } = req.body;
    
    // Prepares the sql query to update the specified game
    const query = `
        UPDATE games 
        SET title = ?, platform = ?, genre = ?, hours_played = ?, completed = ? 
        WHERE id = ?`;
    
    // Runs the update query with the provided game data
    db.run(query, [title, platform, genre, hours_played, completed, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Check if no rows were updated indicating the game was not found
        if (this.changes === 0) {
            res.status(404).json({ error: "Game not found" });
            return;
        }
        // If the update was successful, return a success message
        res.json({ status: 'UPDATE GAME ENTRY SUCCESSFUL' });
    });
});

// Defines the DELETE route for deleting an induvidual game by id
app.delete('/api/:id', (req, res) => {
    // Retrieves the game id from the url params
    const id = req.params.id;
    
    // Prepares the sql query to delete the specified game
    // Uses a parameterized query to prevent SQL injection attacks
    db.run("DELETE FROM games WHERE id = ?", [id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Check if no rows were deleted indicating the game was not found
        if (this.changes === 0) {
            res.status(404).json({ error: "Game not found" });
            return;
        }
        // If the deletion was successful, return a success message
        res.json({ status: 'DELETE GAME ENTRY SUCCESSFUL' });
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});