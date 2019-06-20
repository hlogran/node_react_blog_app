const express = require('express');
const Author = require('../models/author.js');
const router = new express.Router();

//create new author
router.post('/authors', async (req, res) => {
  const author = new Author(req.body);
  try{
    await author.save();
    res.status(201).send({author});
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//list authors
router.get('/authors', async (req, res) => {
  try{
    res.status(200).send(await Author.find());
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;

