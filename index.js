const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { read } = require('fs');

const app = express();

const sources = [
    {
        name: 'forbes',
        url: 'https://www.forbes.com/companies/',
        filter: '.stream-item__title'
    }
];

portfolio = [];

articles = [];

app.get('/', (req, res) => {
    res.json("Welcome to my Portfolio News App.");
});

app.get('/login', (req, res) => {
    res.json("This will be the login page");
});

app.get('/register', (req, res) => {
    res.json("This will be the register");
});

app.get('/companies/:company?', (req, res) => {
    if (req.params.company != null) {
        const companies = req.params.company.split('+');

        companies.forEach(company => {
            if (!portfolio.includes(company)) {
                portfolio.push(company);
            }
        });

        articles = [];
        var output = "You now have ";

        portfolio.forEach(company => {
            getArticles(company);
            output += company+" ";
        });

        output += "in your portfolio"

        res.json(output);
    } else {
        res.json("You havent names any stocks to add :(");
    }
});

app.get('/news', (req, res) => {
    res.json(articles);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

function getArticles(company) {

    sources.forEach(source => {
        axios.get(source.url.concat(company))
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html);

                $(source.filter, html).each(function () {
                    const title = $(this).text();
                    const url = $(this).attr("href");

                    if(title.toLowerCase().includes(company)) {
                        articles.push({
                            title,
                            url,
                            source: source.name
                        });
                    }
                });
            });
    });
}
