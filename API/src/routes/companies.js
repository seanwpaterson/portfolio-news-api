// routes/companies.js

const express = require('express');
const router = express.Router();

var portfolio = [];

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        data: portfolio
    });
});

router.get('/add', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "You haven't input any companies to add.",
        data: portfolio
    });
});

router.get('/add/:company', (req, res) => {
    const companies = req.params.company.split('+');

    companies.forEach(company => {
        if (!portfolio.includes(company)) {
            portfolio.push(company);
        }
    });

    module.exports.portfolio = portfolio;

    res.status(201).json({
        status: 201,
        message: "Successfully added: [" + companies.toString() + "].",
        data: portfolio
    });
});

router.get('/remove-all', (req, res) => {
    portfolio = [];

    module.exports.portfolio = portfolio;

    res.status(200).json({
        status: 200,
        message: "Successfully removed all companies from portfolio.",
        data: portfolio
    });
});

router.get('/remove/:company', (req, res) => {
    const companies = req.params.company.split('+');

    if (portfolio.length == 0) {
        res.status(400).json({
            status: 400,
            message: "Your portfolio is already empty.",
            data: portfolio
        });
    }

    var allPresent = true;

    companies.forEach(company => {
        if (!portfolio.includes(company)) {
            allPresent = false;
        }
    });

    if (allPresent) {
        temp = [];
        portfolio.forEach(company => {
            if (!companies.includes(company)) {
                temp.push(company);
            }
        });
        portfolio = temp;

        module.exports.portfolio = portfolio;

        res.status(200).json({
            status: 200,
            message: "Successfully removed [" + companies.toString() + "] from portfolio.",
            data: portfolio
        });
    } else {
        res.status(400).json({
            status: 400,
            message: "Cannot remove [" + companies.toString() + "] as one or more are not in portfolio.",
            data: portfolio
        });
    }
});

module.exports = {
    router
};