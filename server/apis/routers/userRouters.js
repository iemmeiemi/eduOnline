const express = require('express')
const router = express.Router();
const userControllers = require('../controllers/userControllers');

const {verifyToken, verifyAdmin} = require('../middlewares/verify')

//common
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getOneUserById);
router.get('/:email', userControllers.getOneUserByEmail);

router.put('/', verifyToken, userControllers.updateUser);
router.put('/:role', verifyToken, userControllers.updateRoleUser);


// router.get('/search', userControllers.searchUser);
router.put('/', verifyToken, userControllers.updateUser);



//admin per
// router.delete('/:id', verifyToken, verifyAdmin, userControllers.banUser);
// router.patch('/:id', verifyToken, verifyAdmin, userControllers.makeAdmin);

module.exports = router;