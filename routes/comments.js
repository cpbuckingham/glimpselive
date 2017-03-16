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
  let id = req.params.id;
  knex.select('post_id').from('comments').where("id",id ).first().then(function( commentID ) {
  knex('comments').where('id', id).del().then(function (deleted) {
    res.redirect('/posts/' + commentID.post_id)
    })
  })
})

router.put('/:id',function (req, res, next) {
  let id = req.params.id;
  knex.select('post_id').from('comments').where("id",id ).first().then(function( commentID ) {
  knex('comments').where('id', id).update({
    content: req.body.content
  }).then(function (comment){
    res.redirect('/posts/' + commentID.post_id)
    })
  })
})

module.exports = router;
