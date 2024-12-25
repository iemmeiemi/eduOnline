const express = require('express')
const router = express.Router();
const controllers = require('../controllers/classController');

const {verifyToken, verifyInstructor, verifyAdmin} = require('../middlewares/verify');
const uploadCloud = require('../config/cloudinary');


//common
//router.get('/', controllers.getAllUsers);
router.post('/', verifyToken, verifyInstructor, uploadCloud.array('images', 3), controllers.createClass);





module.exports = router;