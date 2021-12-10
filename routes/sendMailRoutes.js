const express = require('express');
const sendMail = require('../controllers/sendMail');

const sendmailRoutes = express.Router();

sendmailRoutes.post('/sendmail',sendMail.sendmail);

module.exports = sendmailRoutes;