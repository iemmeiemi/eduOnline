const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/userControllers');

const {verifyToken} = require('../middlewares/verify')

router.post('/', userControllers.createUser);

module.exports = router;