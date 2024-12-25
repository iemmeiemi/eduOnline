const express = require('express')
const router = express.Router();
const controllers = require('../controllers/categoryController');

const {verifyToken, verifyInstructor, verifyAdmin} = require('../middlewares/verify');

//common
router.get('/', controllers.getAllCategory);

module.exports = router;