const express = require('express');
const register = require('../controllers/register');
const email_check = require('../controllers/email');
const password = require('../controllers/password');

const router = express.Router();

router.post('/auth/register',register);

router.post('/auth/email',email_check)

router.post("/auth/password",password);



module.exports = router;
