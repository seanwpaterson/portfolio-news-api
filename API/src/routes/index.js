// routes/index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json("Welcome to my Portfolio News App.");
});

module.exports = router;