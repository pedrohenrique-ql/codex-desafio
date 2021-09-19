const router = require('express').Router();
const ProjectController = require('../controller/projectController');
const { authorizeUser } = require('../middlewares/Auth');

router.get('/', authorizeUser, ProjectController.list);
router.get('/:id', authorizeUser, ProjectController.projectDetails);
router.post('/create', authorizeUser, ProjectController.createProject);
router.put('/update/:id', authorizeUser, ProjectController.update);
router.delete('/delete/:id', authorizeUser, ProjectController.delete);

module.exports = router;