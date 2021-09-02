const router = require('express').Router()
const UserController = require('../controller/UserController')

router.post('/register', UserController.createUser)
router.post('/auth', UserController.authUser)
router.put('/update/:id', UserController.update)

router.use('/users', router)

module.exports = router