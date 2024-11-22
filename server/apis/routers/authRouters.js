const express = require('express')
const router = express.Router();

const {verifyToken, verifyAdmin} = require('../middlewares/verify')

module.exports = router;