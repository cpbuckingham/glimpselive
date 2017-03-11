'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');

function authorizedUser(req, res, next) {
  let userID = req.session.user;
  if(userID){
    next();
  } else {
    res.render('admin/restricted')
  }
}

function authorizedAdmin(req, res, next) {
  let userID = req.session.user;
  knex('users').where('id', userID.id).first().then(function (admin) {
    if(admin.admin){
      next();
    } else {
      res.render('admin/admin')
    }
  })
}

router.get('/', function (req, res, next) {
  knex('users').innerJoin('posts', 'users.id', 'posts.user_id').then(function(posts) {
    res.render('posts/posts', {posts: posts});
  })
})

router.get('/new', authorizedUser, function (req, res, next) {
  res.render('posts/new')
})

router.post('/', authorizedUser, function(req, res, next) {
  knex('posts').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: knex.select('id').from('users').where('id', req.session.user.id)
  }).then(function (){
    res.redirect('/auth')
  })
})

router.get('/:id', function (req, res, next) {
  let postID = req.params.id;
  let userID = req.session.user.id;
  knex('posts').where('id', postID).first().then(function (post) {
    return post;
  })
  .then(function (post) {
    knex('users').innerJoin('comments', 'users.id', 'comments.user_id').where('comments.post_id', postID).then(function (data) {
      knex('users').innerJoin('posts', 'users.id', 'posts.user_id').where('posts.id', postID).first().then(function(posts) {
      res.render('posts/single', {
        postID: postID,
        userID: userID,
        post: post,
        posts: posts,
        data: data,
        })
      })
    })
  })
})

  router.get('/:id/edit', authorizedUser, function(req, res, next) {
    let postID = req.params.id;
    knex('posts').where('id', postID).first().then(function (post) {
      res.render('posts/edit', {post:post})
    })
  })

  router.get('/:id/comment/edit', authorizedUser, function (req, res, next) {
    let postID = req.params.id;
    knex('comments').where('post_id', postID).first().then(function(comment) {
      res.render('comments/edit', {comment: comment})
    })
  })

router.post('/:id', authorizedUser, function (req, res, next) {
  let postID = req.params.id;
  knex('comments').insert({
    content: req.body.content,
    post_id: knex.select('id').from('posts').where('id', postID),
    user_id: knex.select('id').from('users').where('id',req.session.user.id)
  }).then(function (){
    res.redirect('/posts/' + postID);
  })
})

router.delete('/:id', function (req, res, next) {
  let postID = req.params.id;
  knex('posts').where('id', postID).del().then(function (deleted) {
    res.redirect('/auth')
  })
})

router.put('/:id' ,function (req, res, next) {
  let postID = req.params.id;
  knex('posts').where('id', postID).update({
    title: req.body.title,
    body: req.body.body
  }).then(function (post){
    res.redirect('/posts/' + postID)
  } )
})

module.exports = router;
