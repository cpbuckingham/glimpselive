'use strict';
const express = require('express');
const router = express.Router();

router.get('/one', function (req, res, next) {
  res.render('featured/one')
})
router.get('/two', function (req, res, next) {
  res.render('featured/two')
})
router.get('/three', function (req, res, next) {
  res.render('featured/three')
})

module.exports = router
