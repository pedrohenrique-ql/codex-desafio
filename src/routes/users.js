const router = require('express').Router();
const UserController = require('../controller/userController');
const { authorizeUser } = require('../middlewares/Auth');

router.get('/', authorizeUser, UserController.list);
router.get('/:id', authorizeUser, UserController.visit);
router.post('/register', UserController.createUser);
router.post('/auth', UserController.authUser);
router.put('/update/:id', authorizeUser, UserController.update);
router.delete('/delete/:id', authorizeUser, UserController.delete);

module.exports = router;