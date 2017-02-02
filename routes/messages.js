'use strict';
const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (users){
    knex('messages').innerJoin('users', 'users.id', 'messages.sender_id').where('messages.sender_id', userID).then(function (messages) {
    res.render('messages/all', {
      users:users,
      messages:messages
  })
})
})
})

router.get('/new', function (req, res, next) {
  knex('users').then(function (users){
  res.render('messages/new',{
    users:users
  } )
})
})

router.get('/:id', function (req, res, next) {
  //knex get single message according to user id
  res.render('messages/single')
})


router.post('/', function(req, res, next) {
  knex('messages').insert({
    note: req.body.note,
    sender_id: req.session.user.id,
    user_id: req.body.dropdownuser
  }).then(function (){
    res.redirect('/auth')
  })
})

module.exports = router
