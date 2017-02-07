'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('blog/index')
})
router.get('/one', function (req, res, next) {
  res.render('about/one')
})
router.get('/two', function (req, res, next) {
  res.render('about/two')
})
router.get('/three', function (req, res, next) {
  res.render('about/three')
})

module.exports = router
