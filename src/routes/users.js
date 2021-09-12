const router = require('express').Router()
const UserController = require('../controller/userController')
const { authorizeUser } = require('../middlewares/Auth')

router.get('/:id', authorizeUser, UserController.visit)
router.get('/', authorizeUser, UserController.list)
router.post('/register', UserController.createUser)
router.post('/auth', UserController.authUser)
router.put('/update/:id', authorizeUser, UserController.update)

module.exports = router