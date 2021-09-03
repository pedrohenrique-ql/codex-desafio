const router = require('express').Router()
const UserController = require('../controller/UserController')
const { authorizeUser } = require('../middlewares/Auth')

router.get('/:id', authorizeUser, UserController.visit)
router.post('/register', UserController.createUser)
router.post('/auth', UserController.authUser)
router.put('/update/:id', UserController.update)

router.use('/users', router)

module.exports = router