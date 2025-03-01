const router = require('express').Router(); 
const restaurantController = require('../controllers/restaurantController.js')
const {verifyToken,  verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin} = require('../middleware/verifyToken.js');

router.post('/', verifyAndAuthorization, restaurantController.addRestaurant)

router.get('/byId/:id', restaurantController.getRestaurant)

router.get('/:code', verifyAndAuthorization, restaurantController.getRandomRestaurants)

router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant)

router.patch('/:id', verifyVendor, restaurantController.serviceAvailability)


module.exports = router; 
