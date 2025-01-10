const router = require('express').Router(); 
const userController = require('../controllers/userController.js')
const {verifyToken, verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin} = require('../middleware/verifyToken.js');

router.get('/',verifyAndAuthorization, userController.getUser)

router.delete('/login',verifyAdmin, userController.deleteUser)

router.put('/', verifyAdmin, userController.updateUser)


module.exports = router; 
