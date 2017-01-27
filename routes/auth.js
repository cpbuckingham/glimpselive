'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const createAvatar = require('../public/js/octodex_avatar');

// const Users = function() { return knex('users') };
function authorizedUser(req, res, next) {
  //
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }

}

function authorizedAdmin(req, res, next) {
  let userID = req.session.user.admin === true;
  if(userID){
    next();
  } else {
    res.redirect('/')
  }
}

// router.get('/', [authorizedUser], function (req, res, next) {
//   let user = req.session.user;
//       res.render('users/auth', {user: user})
// })

router.get('/', authorizedUser,  function (req, res) {
  let userID = req.session.user.id;
  knex('users').where('id', userID).first().then(function (user){
    knex('posts').then(function (posts){
      knex('posts').where('user_id', userID).then(function (my_posts){
        knex('comments').where('user_id', userID).then(function (comments){
          res.render('users/auth', {
            user: user,
            posts: posts,
            my_posts: my_posts,
            comments: comments,
          })
        })
      })
    })
  })
})



router.get('/signup', function (req, res, next) {
  res.render('users/signup')
})

router.get('/login', function (req, res, next) {
  res.render('users/login');
})

router.post('/signup', function (req, res, next) {
  knex('users').where({
    username: req.body.username
  }).first().then(function(user){
    if(!user){
      let hash = bcrypt.hashSync(req.body.hashed_password, 12);
      createAvatar.generateAvatar(function(created_avatar){
        knex('users').insert({
          username: req.body.username,
          hashed_password: hash,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          admin: req.body.admin,
          avatar: created_avatar,
        }).then(function (){
          res.redirect('/auth/login');
        })
      });
    } else {
      res.redirect('/users');
    }
  })
})

router.post('/login', function (req, res, next) {
  knex('users').where({
    username: req.body.username
  }).first().then(function (user) {
    if(!user){
      res.send('no username')
    } else {
      bcrypt.compare(req.body.hashed_password, user.hashed_password, function(err, result) {
        if(result){
          req.session.user = user;
          res.cookie("loggedin", true);
          console.log(req.session.user.id);
          res.redirect('/auth');
        } else {
          res.redirect('/auth/login')
        }
      })
    }
  })
})

router.get('/logout', function (req, res) {
  req.session = null;
  res.clearCookie('loggedin');
  res.redirect('/auth/login');
})


module.exports = router
