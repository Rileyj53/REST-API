const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController.js');

// routes for non-specific loan requests
router.route('/')
    .get(accountController.getAccounts)
    .post(accountController.createAccount)

// routes for specific loan requests
router.route('/:id')
    .get(accountController.getAccount)
    .put(accountController.updateAccount)
    .delete(accountController.deleteAccount);


module.exports = router;