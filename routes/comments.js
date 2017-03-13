'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

router.get('/:id', function (req, res, next) {
  let commentID = req.params.id;
  knex('comments').where('id', commentID).first().then(function(comment){
    res.render('comments/single', {
      comment: comment,
    })
    console.log(comment);
  })
})

router.get('/:id/edit', function (req, res, next) {
  let commentID = req.params.id;
  knex('comments').where('id', commentID).first().then(function(comment) {
    res.render('comments/edit', {
      comment: comment,
    })
  })
})

router.delete('/:id', function (req, res, next) {
  let commentID = req.params.id;
  knex('comments').where('id', commentID).del().then(function (deleted) {
    res.redirect('/auth')
  })
})

router.put('/:id',function (req, res, next) {
  let commentID = req.params.id;
  knex('comments').where('id', commentID).update({
    content: req.body.content
  }).then(function (comment){
    res.redirect('/auth')
  })
})

module.exports = router;
