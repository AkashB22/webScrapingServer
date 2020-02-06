let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let articleSchema = new Schema({
    title: String,
    linkUrl: String
});

module.exports = mongoose.model('article', articleSchema);
