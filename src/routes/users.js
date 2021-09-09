const router = require('express').Router()
const UserController = require('../controller/userController')
const { authorizeUser } = require('../middlewares/Auth')

router.get('/:id', authorizeUser, UserController.visit)
router.post('/register', UserController.createUser)
router.post('/auth', UserController.authUser)
router.put('/update/:id', authorizeUser, UserController.update)

router.use('/users', router)

module.exports = router