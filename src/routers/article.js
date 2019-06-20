const express = require('express');
const Article = require('../models/article.js');
const router = new express.Router();

//list articles
// GET /articles?title=something
// GET /articles?author=id1&author=id2
router.get('/articles', async (req, res) => {
  try{
    const match = {deleted_at: {'$exists': false}};
    if (req.query.title) {
      match.title = {$regex: req.query.title, $options : 'i'};
    }
    if (req.query.authors) {
      match.authors = {'$all': req.query.authors};
    }
    res.status(200).send(await Article.find(match).populate('authors'));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//get article by id
router.get('/articles/:_id', async (req, res) => {
  try{
    const _id = req.params._id;
    const article = await Article.findById(_id).populate('authors');
    if(!article){
      res.status(404).send('article not found');
    } else {
      res.status(200).send(article);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//create article
router.post('/articles', async (req, res) => {
  //add owner's id to the article
  const article = new Article({
    ...req.body
  });

  try{
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//update article
router.patch('/articles/:_id', async (req, res) => {
  //do update the article
  try{
    const _id = req.params._id;
    //check if article exists
    const article = await Article.findById(_id);
    if(!article){
      res.status(404).send('article not found');
      return
    }

    //prevent users from trying to update not valid fields
    const updates = Object.keys(req.body);
    const validFields = ['title', 'short_description', 'long_description', 'authors'];
    if(updates.some(x => validFields.indexOf(x)===-1)){
      res.status(400).send('invalid operation');
      return;
    }

    updates.forEach(field => article[field] = req.body[field]);
    await article.save();
    res.status(200).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//delete article
router.delete('/articles/:_id', async (req, res) => {
  try{
    const _id = req.params._id;
    const article = await Article.findById(_id);
    if(!article){
      res.status(404).send('article not found');
      return
    }

    article.deleted_at = new Date();
    await article.save();
    res.status(200).send(article);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;

