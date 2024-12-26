const express = require('express')
const router = express.Router();
const controllers = require('../controllers/classController');

const { verify, verifyToken, verifyInstructor, verifyAdmin} = require('../middlewares/verify');
const uploadCloud = require('../config/cloudinary');


//common
router.get('/', controllers.getAllClass);
router.get('/:id', verify, controllers.getOneClass);

router.post('/', verifyToken, verifyInstructor, uploadCloud.array('images', 3), controllers.createClass);



module.exports = router;