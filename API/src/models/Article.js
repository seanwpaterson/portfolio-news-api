// models/Article.js

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema(
    {
        title: {
            type: String
        },
        url: {
            type: String
        },
        source: {
            type: String
        }
    }
)

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;