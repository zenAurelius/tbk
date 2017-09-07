var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// AUTHENTICATION
var ctrlAuth = require('../controllers/authent.ctrl');
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);

//USER
var ctrlUser = require('../controllers/user.ctrl');
router.get('/users/:id', auth, ctrlUser.get);
router.get('/user/:id/friends', auth, ctrlUser.getFriends);

//TRAVEL
var ctrlTravel = require('../controllers/travel.ctrl');
router.get('/users/:userid/travels', auth, ctrlTravel.list);
router.post('/travels', auth, ctrlTravel.add);
router.put('/travels', auth, ctrlTravel.update);
router.delete('/travels/:travelid', auth, ctrlTravel.deleteTravel);

//COUNTRY
var ctrlCountry = require('../controllers/country.ctrl');
router.get('/countries', ctrlCountry.list);

//ACCOUNT
var ctrlAccount = require('../controllers/account.ctrl');
router.get('/travel/:travelId/accounts', ctrlAccount.list);
router.post('/accounts', ctrlAccount.add);
router.delete('/accounts/:accountId', auth, ctrlAccount.deleteAccount);

//OPERATION
var ctrlOperation = require('../controllers/operation.ctrl');
router.get('/account/:travelId/operations/', ctrlOperation.list);
router.post('/operations', ctrlOperation.add);
router.put('/operations', ctrlOperation.update);

router.delete('/operations/:operationId', auth, ctrlOperation.deleteOperation);

module.exports = router;