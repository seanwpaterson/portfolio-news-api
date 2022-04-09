const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', (req, res) => {
    res.json("Welcome to my Portfolio News App.");
});

app.get('/login', (req, res) => {
    res.json("This will be the login page")
});

app.get('/register', (req, res) => {
    res.json("This will be the register")
});

// this is a test change

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));