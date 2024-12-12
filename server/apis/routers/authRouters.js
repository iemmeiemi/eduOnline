const express = require('express')
const router = express.Router();
const authControllers = require('../controllers/authController');
const {verifyToken, verifyAdmin} = require('../middlewares/verify')

router.post('/refresh-access-token', authControllers.refreshAccessToken);
router.post('/register-google', authControllers.registerGoogle);
router.post('/register', authControllers.register);



module.exports = router;