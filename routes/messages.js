'use strict';
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    res.render('messages/all', {user:user})
})
})

router.get('/new', function (req, res, next) {
  res.render('messages/new')
})

router.get('/:id', function (req, res, next) {
  //knex get single message according to user id
  res.render('messages/single')
})


router.post('/', function(req, res, next) {
  knex('messages').insert({
    note: req.body.note,
    sender_id: req.session.user.id,
    user_id: req.body.dropdownuser.id
  }).then(function (){
    res.redirect('/auth')
  })
})

module.exports = router
