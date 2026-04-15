const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./users.db');

// Create a table to store users
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

// Route to handle signup/login data storage
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], (err) => {
        if (err) {
            return res.status(500).send("Error saving to database.");
        }
        res.send("Registration successful! Data stored in users.db.");
    });
});

