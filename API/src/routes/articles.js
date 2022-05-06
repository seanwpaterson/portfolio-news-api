// routes/articles.js

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

const sources = [
    {
        name: 'forbes',
        url: 'https://www.forbes.com/companies/',
        filter: '.stream-item__title'
    },
    {
        name: 'market_watch',
        url: 'https://www.marketwatch.com/search?q=',
        filter: '.link'
    },
    {
        name: 'wsj',
        url: 'https://www.wsj.com/search?query=',
        filter: '.WSJTheme--headline--unZqjb45'
    }
];

var articles = [];

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        data: articles
    });
});

router.get('/filter', (req, res) => {
    var portfolio = require('./companies').portfolio;
    var filteredArticles = [];

    if (req.query.source == null && req.query.company == null) {
        res.status(400).json({
            status: 400,
            message: "No Query Parameters Match."
        });
    } else {
        if (req.query.source != null && req.query.company != null) {
        const selectedSources = req.query.source.split(' ');
        const selectedCompanies = req.query.company.split(' ');
        
        articles.forEach(article => {
            if (selectedSources.includes(article.source) && selectedCompanies.includes(article.company)) {
                filteredArticles.push(article);
            }
        });
        } else if (req.query.source != null) {
            const selectedSources = req.query.source.split(' ');
        
            selectedSources.forEach(source => {
                articles.forEach(article => {
                    if (article.source == source) {
                        filteredArticles.push(article);
                    }
                });
            });
        } else if (req.query.company != null) {
            const selectedCompanies = req.query.company.split(' ');
        
            selectedCompanies.forEach(company => {
                articles.forEach(article => {
                    if (article.company == company) {
                        filteredArticles.push(article);
                    }
                });
            });
        }
    }
    res.status(200).json({
        status: 200,
        data: filteredArticles
    });
});

router.get('/update', (req, res) => {
    articles = [];
    var portfolio = require('./companies').portfolio;

    portfolio.forEach(company => {
        getArticles(company);
    });

    res.status(200).json({
        status: 200,
        message: "Articles Updated"
    });
});

function getArticles(company) {
    sources.forEach(source => {
        axios.get(source.url.concat(company))
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html);

                $(source.filter, html).each(function () {
                    const title = $(this).text().trim();
                    const url = $(this).attr("href");

                    if(title.toLowerCase().includes(company)) {
                        articles.push({
                            title,
                            url,
                            company,
                            source: source.name
                        });
                    }
                });
            });
    });
}

module.exports = {
    router,
    articles
}