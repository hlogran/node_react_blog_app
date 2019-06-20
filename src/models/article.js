const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  short_description: {
    type: String,
    required: true,
    trim: true
  },
  long_description: {
    type: String,
    required: true,
    trim: true
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  }],
  deleted_at: {
    type: Date
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;