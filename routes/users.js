'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');

function authorizedUser(req, res, next) {
  //
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('restricted')
  }

}

function authorizedAdmin(req, res, next) {
  //
  let userID = req.session.user;
  knex('users').where('id', userID.id).first().then(function (admin) {
    if(admin.admin){
      next();
    } else {
      res.render('admin/admin')
    }
  })
}

router.get('/', [authorizedUser, authorizedAdmin], function(req, res, next) {
  res.render('users/auth')
})


//This should show users info, posts, and comments
router.get('/:id', [authorizedUser], function (req, res) {
  let userID = req.params.id;
  knex('users').where('id', userID).first().then(function (user){
    knex('posts').where('user_id', userID).then(function (posts){
      knex('comments').where('user_id', userID).then(function (comments){
        res.render('users/single', {
          user: user,
          posts: posts,
          comments: comments,
        })
      })
    })
  })
})

module.exports = router
