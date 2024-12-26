const express = require('express');
const router = express.Router();
const controllers = require('../controllers/classController');

const {
    verify,
    verifyToken,
    verifyInstructor,
    verifyAdmin,
} = require('../middlewares/verify');
const uploadCloud = require('../config/cloudinary');

//common
router.get('/', controllers.getAllClass);
router.get('/:id', verify, controllers.getOneClass);
router.get('/instance/:id', verify, controllers.getOneClassInstance);

// router.get('/instance/:id', verify, controllers.getOneClassInstance);

router.post('/join/:id', verifyToken, controllers.joinClass);
router.post(
    '/instance',
    verifyToken,
    verifyInstructor,
    controllers.createClassInstance
);
router.post(
    '/',
    verifyToken,
    verifyInstructor,
    uploadCloud.array('images', 3),
    controllers.createClass
);
router.put(
    '/accept',
    verifyToken,
    verifyInstructor,
    controllers.acceptStudent
);

module.exports = router;
