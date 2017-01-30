'use strict';
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');


router.get('/', function (req, res, next) {
  res.render('buddies/all')
})

router.get('/:id', function (req, res, next) {
  res.render('buddies/single')
})

router.post('/', function(req, res, next) {
  knex('messages').insert({
    requester_id: req.session.user.id,
    user_id: req.query.id
  }).then(function (){
    res.redirect('/auth')
  })
})

module.exports = router
