const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/userControllers');

const {verifyToken, verifyAdmin} = require('../middlewares/verify')

//common
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getOneUserById);
router.get('/search', userControllers.searchUser);
router.post('/', userControllers.createUser);
router.put('/', verifyToken, userControllers.updateUser);



//admin per
router.delete('/:id', verifyToken, verifyAdmin, userControllers.banUser);
router.patch('/:id', verifyToken, verifyAdmin, userControllers.makeAdmin);

module.exports = router;