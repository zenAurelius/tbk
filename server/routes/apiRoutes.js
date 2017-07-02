var express = require('express');
var router = express.Router();

// AUTHENTICATION
var ctrlAuth = require('../controllers/authent');
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register)

module.exports = router;