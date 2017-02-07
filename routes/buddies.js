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

router.post('/:id', function(req, res, next) {
  knex('buddies').insert({
    buddy_id: req.params.id,
    user_id: req.session.user.id
  }).then(function (){
    res.redirect('/auth')
  })
})

router.delete('/:id', function (req, res, next) {
  let buddyID = req.params.id;
  knex('buddies').where('buddy_id', buddyID).del().then(function (deleted) {
    res.redirect('/auth')
  })
})

module.exports = router
