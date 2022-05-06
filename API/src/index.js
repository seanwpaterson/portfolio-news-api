// index.js
const express = require('express');

const app = express();

const port = 8000;

const indexRouter = require('./routes/index');
const companiesRouter = require('./routes/companies').router;
const articlesRouter = require('./routes/articles').router;

app.use('/', indexRouter);
app.use('/portfolio', companiesRouter);
app.use('/news', articlesRouter);

app.listen(port, () => console.log(`Server is running on ${port}`));
