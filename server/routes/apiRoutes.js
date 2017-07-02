var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// AUTHENTICATION
var ctrlAuth = require('../controllers/authent');
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);

//USER
var ctrlUser = require('../controllers/user');
router.get('/users/:id', auth, ctrlUser.get);

module.exports = router;