'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const flash = require('flash');

function authorizedUser(req, res, next) {
  //
  let userID = req.session.user.id;
  if(userID){
    next();
  } else {
    res.send('restricted')
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

router.get('/:id/edit', authorizedUser, function(req, res, next) {
  let userID = req.session.user.id;
  if ( parseInt(req.params.id, 10) === req.session.user.id){
    knex('users').where('id', userID).first().then(function (user){
          res.render('users/edit', {user: user})
        })
      }else{
    res.send("403")
  }
  })


router.put('/:id', authorizedUser,function (req, res, next) {
  let userID = req.params.id;
  let hash = bcrypt.hashSync(req.body.hashed_password, 12);
  knex('users').where('id', userID).update({
    username: req.body.username,
    hashed_password: hash,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    avatar: req.body.avatar,
  }).then(function (){
    res.redirect('/auth')

  } )
})

module.exports = router
