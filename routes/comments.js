'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');


router.put('/:id',function (req, res, next) {
  let commentID = req.params.id;
  knex('comments').where('id', commentID).update({
    content: req.body.content
  }).then(function (comment){
    res.redirect('/posts')
  })
})

module.exports = router;
