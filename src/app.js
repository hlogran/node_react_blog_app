const express = require('express');

require('./db/mongoose.js');

const postRouter = require('./routers/article.js');
const userRouter = require('./routers/author.js');

const app = express();

app.use(express.json());
app.use(postRouter);
app.use(userRouter);

module.exports = app;