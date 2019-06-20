const mongoose = require('mongoose');
const Article = require('./article.js');

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

authorSchema.virtual('articles', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'authors'
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;